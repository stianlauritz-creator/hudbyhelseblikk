// Engangsjobb: medlemmene som meldte seg inn mens velkomstrabatten var 10 %
// skal få 15 % — samme som nye medlemmer får etter e2193fc (23.08.2026).
//
// Hvorfor NY kode og ikke bare skru den gamle opp til 15 %: kodene har
// `usageLimit: 1`. Har noen allerede brukt sin, hjelper det ingenting å endre
// prosenten — koden er oppbrukt. En ny kode virker uansett. Den gamle
// deaktiveres i samme slengen, så ingen ender på 10 % ved et uhell.
//
// Kjør tørrkjøring først (rører ingenting, skriver ut planen):
//   node --env-file=.env.klubb scripts/oppgrader-klubbkoder.mjs
// Kjør på ekte:
//   node --env-file=.env.klubb scripts/oppgrader-klubbkoder.mjs --send
//
// .env.klubb (gitignorert) må ha:
//   SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET,
//   SHOPIFY_KLUBB_COLLECTION_ID, RESEND_API_KEY, KLUBB_HEMMELIGHET
// Alle seks ligger i Vercel-prosjektet fra før.

import { EMNE, avmeldingsUrl, html, tekst } from "./klubb-oppgradering-mal.mjs";

const PAA_EKTE = process.argv.includes("--send");
const RABATT_PROSENT = 0.15;
const API_VERSION = "2026-07";

const env = (navn) => {
  const v = process.env[navn];
  if (!v) {
    console.error(`Mangler ${navn} i miljøet — avbryter uten å røre noe.`);
    process.exit(1);
  }
  return v;
};

const domene = env("SHOPIFY_STORE_DOMAIN");
const kolleksjon = env("SHOPIFY_KLUBB_COLLECTION_ID");

// ── Shopify ────────────────────────────────────────────────────────────────

const tokenRes = await fetch(`https://${domene}/admin/oauth/access_token`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    grant_type: "client_credentials",
    client_id: env("SHOPIFY_CLIENT_ID"),
    client_secret: env("SHOPIFY_CLIENT_SECRET"),
  }),
});
if (!tokenRes.ok) {
  console.error("Token-utveksling mot Shopify feilet: HTTP", tokenRes.status);
  process.exit(1);
}
const { access_token } = await tokenRes.json();

async function gql(query, variables) {
  const res = await fetch(`https://${domene}/admin/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": access_token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors).slice(0, 400));
  return json.data;
}

// ── Rabattkode ─────────────────────────────────────────────────────────────

// Uten I, O, 0 og 1 — de forveksles når koden skrives av fra en e-post.
// Samme alfabet som lib/kundeklubb.ts, med vilje.
const ALFABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const lagRabattkode = () =>
  "KLUBB-" +
  Array.from({ length: 6 }, () => ALFABET[Math.floor(Math.random() * ALFABET.length)]).join("");

const FINN_MEDLEMMER = `
query medlemmer {
  customers(first: 100, query: "tag:kundeklubb") {
    edges { node { id email firstName tags } }
  }
}`;

const FINN_KODER = `
query koder($sok: String!) {
  codeDiscountNodes(first: 25, query: $sok) {
    edges {
      node {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            status
            asyncUsageCount
            codes(first: 5) { edges { node { code } } }
          }
        }
      }
    }
  }
}`;

const OPPRETT_RABATT = `
mutation opprett($input: DiscountCodeBasicInput!) {
  discountCodeBasicCreate(basicCodeDiscount: $input) {
    userErrors { field message }
    codeDiscountNode { id }
  }
}`;

const DEAKTIVER = `
mutation deaktiver($id: ID!) {
  discountCodeDeactivate(id: $id) {
    userErrors { field message }
  }
}`;

// ── E-post ─────────────────────────────────────────────────────────────────

const AVSENDER = "Hud by Helseblikk <klubb@klubb.hudbyhelseblikk.no>";

async function sendEpost({ til, fornavn, kode }) {
  const avmeld = avmeldingsUrl(til);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: AVSENDER,
      to: til,
      subject: EMNE,
      html: html(kode, fornavn, avmeld),
      text: tekst(kode, fornavn, avmeld),
      // Gmail og Yahoo krever ett-klikks avmelding av masseutsendere.
      ...(avmeld
        ? {
            headers: {
              "List-Unsubscribe": `<${avmeld}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }
        : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
}

// ── Kjøring ────────────────────────────────────────────────────────────────

const data = await gql(FINN_MEDLEMMER);
const medlemmer = data.customers.edges.map((e) => e.node).filter((k) => k.email);

if (medlemmer.length === 0) {
  console.log("Fant ingen kunder med taggen «kundeklubb». Ingenting å gjøre.");
  process.exit(0);
}

console.log(
  `${PAA_EKTE ? "KJØRER PÅ EKTE" : "TØRRKJØRING — ingenting endres"} · ${medlemmer.length} medlem(mer)\n`
);

for (const medlem of medlemmer) {
  const epost = medlem.email;
  const gamle = await gql(FINN_KODER, { sok: `title:'${epost}'` });
  const treff = gamle.codeDiscountNodes.edges
    .map((e) => ({ id: e.node.id, ...e.node.codeDiscount }))
    .filter((d) => d.title);

  const nyKode = lagRabattkode();
  console.log(`${epost}${medlem.firstName ? ` (${medlem.firstName})` : ""}`);
  for (const d of treff) {
    console.log(
      `   gammel: ${d.codes?.edges?.[0]?.node?.code ?? "?"} · ${d.title} · ${d.status} · brukt ${d.asyncUsageCount} gang(er)`
    );
  }
  if (treff.length === 0) console.log("   gammel: fant ingen — sender bare ny kode");
  console.log(`   ny:     ${nyKode} · 15 % · én bruk`);

  if (!PAA_EKTE) {
    console.log("");
    continue;
  }

  const opprettet = await gql(OPPRETT_RABATT, {
    input: {
      title: `Kundeklubb 15 % (oppgradert) — ${epost}`,
      code: nyKode,
      startsAt: new Date().toISOString(),
      usageLimit: 1,
      appliesOncePerCustomer: true,
      context: { all: "ALL" },
      customerGets: {
        value: { percentage: RABATT_PROSENT },
        items: { collections: { add: [kolleksjon] } },
      },
    },
  });
  const feil = opprettet.discountCodeBasicCreate.userErrors;
  if (feil.length > 0) {
    console.error("   KODE FEILET:", JSON.stringify(feil), "— hopper over, ingen e-post sendt\n");
    continue;
  }

  for (const d of treff) {
    if (d.status !== "ACTIVE") continue;
    const av = await gql(DEAKTIVER, { id: d.id });
    const df = av.discountCodeDeactivate.userErrors;
    if (df.length > 0) console.error("   kunne ikke deaktivere gammel kode:", JSON.stringify(df));
    else console.log("   gammel kode deaktivert");
  }

  try {
    await sendEpost({ til: epost, fornavn: medlem.firstName || undefined, kode: nyKode });
    console.log("   e-post sendt\n");
  } catch (e) {
    // Koden finnes nå — bare e-posten sviktet. Skriv den ut så den kan sendes for hånd.
    console.error(`   E-POST FEILET (${e.message}) — send ${nyKode} manuelt til ${epost}\n`);
  }
}

console.log(
  PAA_EKTE
    ? "Ferdig."
    : "\nTørrkjøring ferdig. Kjør på nytt med --send for å opprette koder og sende e-post."
);
