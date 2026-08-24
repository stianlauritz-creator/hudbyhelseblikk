// Oppretter FF-018E i Shopify: restlageret av Acticlear Gel-Cream i Elixir
// Cosmeceuticals' gamle tube — 3 stk, 676,- mot ordinært 845,- (20 % avslag).
//
// Hvorfor script og ikke admin-UI-et: produktet må treffe presist på SKU,
// leverandør, «Førpris» (compareAtPrice), lagerstyring OG publisering til
// Headless-kanalen. Bommer man på ett av dem, blir varen enten usynlig i
// appen eller havner i feil merke. Scriptet er idempotent — kjør det om
// igjen om noe må rettes.
//
// BILDET LASTES BEVISST IKKE OPP. mapNode i lib/shopify.ts faller tilbake på
// `local?.image` når Shopify-produktet ikke har noe bilde, så varen bruker
// public/produkter/FF-018E-elixir.jpg fra repoet. Legger du et bilde i Shopify,
// overstyrer det repoets.
//
// Tørrkjøring (viser hva som ville blitt gjort):
//   node --env-file=.env.klubb scripts/legg-inn-restlager.mjs
// På ekte:
//   node --env-file=.env.klubb scripts/legg-inn-restlager.mjs --opprett
//
// .env.klubb trenger SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID,
// SHOPIFY_CLIENT_SECRET — de samme som oppgrader-klubbkoder.mjs bruker.

const PAA_EKTE = process.argv.includes("--opprett");
const API_VERSION = "2026-07";

const VARE = {
  sku: "FF-018E",
  tittel: "Acticlear Gel-Cream (utgående emballasje) — 60 ml",
  leverandor: "Face Formula", // MÅ være dette — VENDOR_TO_BRAND mapper det til face-formula
  pris: "676.00",
  foerPris: "845.00",
  antall: 3,
  beskrivelse:
    "Utgående emballasje — nå 20 % avslag. Acticlear i den forrige tuben fra " +
    "Elixir Cosmeceuticals, merket som i dag heter Face Formula. Vi har tre igjen.",
};

const env = (navn) => {
  const v = process.env[navn];
  if (!v) {
    console.error(`Mangler ${navn} i miljøet — avbryter uten å røre noe.`);
    process.exit(1);
  }
  return v;
};
const domene = env("SHOPIFY_STORE_DOMAIN");

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
  console.error("Token-utveksling feilet: HTTP", tokenRes.status);
  process.exit(1);
}
const { access_token } = await tokenRes.json();

async function gql(query, variables) {
  const res = await fetch(`https://${domene}/admin/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": access_token },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors).slice(0, 600));
  return json.data;
}

const feil = (svar, felt) => {
  const f = svar?.[felt]?.userErrors ?? [];
  if (f.length) throw new Error(`${felt}: ${JSON.stringify(f)}`);
};

// ── Finn maler og mål ──────────────────────────────────────────────────────
// FF-018 er malen: samme merke, samme kanaler, samme kolleksjon.
const oppslag = await gql(
  `query {
     mal: products(first: 1, query: "sku:FF-018") {
       edges { node { id title vendor productType status
                      variants(first: 1) { edges { node { id inventoryItem { id } } } } } }
     }
     finnes: products(first: 1, query: "sku:FF-018E") { edges { node { id title } } }
     lokasjoner: locations(first: 5) { edges { node { id name } } }
     kanaler: publications(first: 25) { edges { node { id name } } }
   }`
);

const mal = oppslag.mal.edges[0]?.node;
if (!mal) {
  console.error("Fant ikke FF-018 i Shopify — kan ikke speile oppsettet. Avbryter.");
  process.exit(1);
}
const alleredeDer = oppslag.finnes.edges[0]?.node ?? null;
const lokasjon = oppslag.lokasjoner.edges[0]?.node;
const kanaler = oppslag.kanaler.edges.map((e) => e.node);

console.log(`${PAA_EKTE ? "OPPRETTER" : "TØRRKJØRING — ingenting endres"}\n`);
console.log(`Mal:        ${mal.title} · ${mal.vendor} · ${mal.productType || "(ingen type)"}`);
console.log(`Lokasjon:   ${lokasjon?.name ?? "FANT INGEN"}`);
console.log(`Kanaler:    ${kanaler.map((k) => k.name).join(", ")}`);
console.log(`\nNy vare:    ${VARE.tittel}`);
console.log(`            SKU ${VARE.sku} · ${VARE.pris} kr (førpris ${VARE.foerPris}) · ${VARE.antall} på lager`);
if (alleredeDer) console.log(`\nMerk: ${VARE.sku} finnes allerede (${alleredeDer.id}) — kjøringen oppdaterer den.`);

if (!PAA_EKTE) {
  console.log("\nKjør på nytt med --opprett for å gjøre det på ekte.");
  process.exit(0);
}

// ── Opprett produktet ──────────────────────────────────────────────────────
let produktId = alleredeDer?.id;
if (!produktId) {
  const svar = await gql(
    `mutation opprett($input: ProductInput!) {
       productCreate(input: $input) {
         userErrors { field message }
         product { id variants(first: 1) { edges { node { id inventoryItem { id } } } } }
       }
     }`,
    {
      input: {
        title: VARE.tittel,
        vendor: VARE.leverandor,
        productType: mal.productType || undefined,
        descriptionHtml: `<p>${VARE.beskrivelse}</p>`,
        status: "ACTIVE",
      },
    }
  );
  feil(svar, "productCreate");
  produktId = svar.productCreate.product.id;
  console.log(`\nProdukt opprettet: ${produktId}`);
}

// ── Variant: SKU, pris, førpris, lagerstyring ──────────────────────────────
const hentVariant = await gql(
  `query($id: ID!) {
     product(id: $id) { variants(first: 1) { edges { node { id inventoryItem { id } } } } }
   }`,
  { id: produktId }
);
const variant = hentVariant.product.variants.edges[0].node;

const varSvar = await gql(
  `mutation oppdater($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
     productVariantsBulkUpdate(productId: $productId, variants: $variants) {
       userErrors { field message }
       productVariants { id sku price compareAtPrice }
     }
   }`,
  {
    productId: produktId,
    variants: [
      {
        id: variant.id,
        price: VARE.pris,
        compareAtPrice: VARE.foerPris,
        inventoryItem: { sku: VARE.sku, tracked: true },
      },
    ],
  }
);
feil(varSvar, "productVariantsBulkUpdate");
const v = varSvar.productVariantsBulkUpdate.productVariants[0];
console.log(`Variant satt: ${v.sku} · ${v.price} (førpris ${v.compareAtPrice})`);

// ── Lagerbeholdning ────────────────────────────────────────────────────────
if (lokasjon) {
  const lagerSvar = await gql(
    `mutation lager($input: InventorySetQuantitiesInput!) {
       inventorySetQuantities(input: $input) { userErrors { field message } }
     }`,
    {
      input: {
        name: "available",
        reason: "correction",
        ignoreCompareQuantity: true,
        quantities: [
          { inventoryItemId: variant.inventoryItem.id, locationId: lokasjon.id, quantity: VARE.antall },
        ],
      },
    }
  );
  feil(lagerSvar, "inventorySetQuantities");
  console.log(`Lager satt:   ${VARE.antall} stk på ${lokasjon.name}`);
}

// ── Publiser til alle kanaler malen ligger i ───────────────────────────────
const pubSvar = await gql(
  `mutation publiser($id: ID!, $input: [PublicationInput!]!) {
     publishablePublish(id: $id, input: $input) { userErrors { field message } }
   }`,
  { id: produktId, input: kanaler.map((k) => ({ publicationId: k.id })) }
);
feil(pubSvar, "publishablePublish");
console.log(`Publisert:    ${kanaler.map((k) => k.name).join(", ")}`);

console.log("\nFerdig. Deploy appen etterpå — produktsidene bygges statisk, så");
console.log("varen dukker først opp på nettstedet etter neste bygg.");
