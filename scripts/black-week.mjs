// Black Week 2026: 10 % på ZO Skin Health, 20 % på resten av nettbutikken.
// (Christina, 23.11.2026.)
//
// Setter salgsprisen ned i Shopify og legger ordinærprisen i «Førpris»
// (compareAtPrice). Appen viser da overstrøket pris og avslagsmerke av seg
// selv (components/Pris.tsx), og kassen bruker den nedsatte prisen.
//
//   node --env-file=.env.probe scripts/black-week.mjs            tørrkjøring
//   node --env-file=.env.probe scripts/black-week.mjs --send     sett ned prisene
//   node --env-file=.env.probe scripts/black-week.mjs --tilbake  tilbake til ordinærpris
//
// Ordinærprisene lagres i scripts/black-week-ordinaerpriser.json FØR noe
// endres, og --tilbake leser derfra. Etter --send og --tilbake må siden
// deployes på nytt (produktsidene er prerendret): push en commit til main.
//
// Hoppes over: gavekort, utkast, og varer som allerede har førpris
// (FF-018E restlager står på −20 % fra før).

import { existsSync, readFileSync, writeFileSync } from "node:fs";

const FIL = new URL("./black-week-ordinaerpriser.json", import.meta.url);
const AVSLAG = { zo: 0.1, resten: 0.2 };

const modus = process.argv.includes("--send")
  ? "send"
  : process.argv.includes("--tilbake")
    ? "tilbake"
    : "torr";

const domene = process.env.SHOPIFY_STORE_DOMAIN;
const tokenRes = await fetch(`https://${domene}/admin/oauth/access_token`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    grant_type: "client_credentials",
    client_id: process.env.SHOPIFY_CLIENT_ID,
    client_secret: process.env.SHOPIFY_CLIENT_SECRET,
  }),
});
if (!tokenRes.ok) {
  console.error("Token-utveksling feilet: HTTP", tokenRes.status);
  process.exit(1);
}
const { access_token } = await tokenRes.json();

async function sporr(query, variables) {
  const res = await fetch(`https://${domene}/admin/api/2026-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": access_token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

async function hentAlle() {
  const ut = [];
  let etter = null;
  do {
    const d = await sporr(
      `query ($etter: String) {
        products(first: 100, after: $etter) {
          pageInfo { hasNextPage endCursor }
          nodes {
            id title vendor status isGiftCard
            variants(first: 10) { nodes { id sku price compareAtPrice } }
          }
        }
      }`,
      { etter }
    );
    ut.push(...d.products.nodes);
    etter = d.products.pageInfo.hasNextPage ? d.products.pageInfo.endCursor : null;
  } while (etter);
  return ut;
}

async function settPris(productId, variants) {
  const d = await sporr(
    `mutation ($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        userErrors { field message }
      }
    }`,
    { productId, variants }
  );
  const feil = d.productVariantsBulkUpdate.userErrors;
  if (feil.length) throw new Error(JSON.stringify(feil));
}

if (modus === "tilbake") {
  const lagret = JSON.parse(readFileSync(FIL, "utf8"));
  for (const p of lagret) {
    await settPris(
      p.productId,
      p.variants.map((v) => ({ id: v.id, price: v.ordinaer, compareAtPrice: null }))
    );
    console.log("tilbake:", p.variants.map((v) => `${v.sku} ${v.ordinaer}`).join(", "));
  }
  console.log(`\n${lagret.length} produkter satt tilbake til ordinærpris. Husk ny deploy.`);
  process.exit(0);
}

if (modus === "send" && existsSync(FIL)) {
  console.error(
    "black-week-ordinaerpriser.json finnes allerede — prisene er trolig satt ned.\n" +
      "Kjør --tilbake først, og slett filen, hvis du vil kjøre på nytt."
  );
  process.exit(1);
}

const produkter = await hentAlle();
const plan = [];
const hoppet = [];

for (const p of produkter) {
  const sku = p.variants.nodes.map((v) => v.sku).join("/");
  if (p.isGiftCard || p.vendor.toLowerCase() === "gavekort") {
    hoppet.push(`${sku || p.title}: gavekort`);
    continue;
  }
  if (p.status !== "ACTIVE") {
    hoppet.push(`${sku}: ${p.status}`);
    continue;
  }
  if (p.variants.nodes.some((v) => v.compareAtPrice)) {
    hoppet.push(`${sku}: har førpris fra før`);
    continue;
  }
  const erZo = p.vendor.toLowerCase() === "zo skin health" || sku.startsWith("ZO-");
  const sats = erZo ? AVSLAG.zo : AVSLAG.resten;
  plan.push({
    productId: p.id,
    tittel: p.title,
    vendor: p.vendor,
    sats,
    variants: p.variants.nodes.map((v) => ({
      id: v.id,
      sku: v.sku,
      ordinaer: v.price,
      // Rundes NED til hel krone, så kunden aldri får mindre enn lovet avslag
      ny: String(Math.floor(Number(v.price) * (1 - sats))),
    })),
  });
}

for (const p of plan) {
  for (const v of p.variants) {
    console.log(
      `${v.sku.padEnd(9)} −${p.sats * 100} %  ${String(v.ordinaer).padStart(8)} → ${v.ny.padStart(5)}  ${p.vendor} · ${p.tittel}`
    );
  }
}
console.log(`\nHoppet over (${hoppet.length}):\n  ` + hoppet.join("\n  "));
const zo = plan.filter((p) => p.sats === AVSLAG.zo).length;
console.log(`\n${plan.length} produkter: ${zo} ZO (−10 %), ${plan.length - zo} øvrige (−20 %).`);

if (modus === "torr") {
  console.log("\nTØRRKJØRING — ingenting er endret. Kjør med --send for å sette ned prisene.");
  process.exit(0);
}

writeFileSync(FIL, JSON.stringify(plan, null, 2) + "\n");
let ferdig = 0;
for (const p of plan) {
  await settPris(
    p.productId,
    p.variants.map((v) => ({ id: v.id, price: v.ny, compareAtPrice: v.ordinaer }))
  );
  ferdig++;
}
console.log(`\n${ferdig} produkter satt ned. Ordinærprisene ligger i ${FIL.pathname}. Husk ny deploy.`);
