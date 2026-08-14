// Slår opp det faktiske GraphQL-skjemaet i Shopify Admin API, slik at
// mutasjonene i app/api/kundeklubb/route.ts ikke bygger på antakelser.
// Feltnavn endrer seg mellom API-versjoner.
//
// Kjør: node --env-file=.env.probe scripts/probe-shopify.mjs
// .env.probe skal inneholde SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID,
// SHOPIFY_CLIENT_SECRET — og skal ikke committes.

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

async function sporr(query) {
  const res = await fetch(`https://${domene}/admin/api/2026-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": access_token,
    },
    body: JSON.stringify({ query }),
  });
  return res.json();
}

async function felter(typenavn) {
  const r = await sporr(
    `{ __type(name: "${typenavn}") { inputFields { name } } }`
  );
  const f = r.data?.__type?.inputFields;
  console.log(`\n=== ${typenavn} ===`);
  console.log(f ? f.map((x) => x.name).join(", ") : "FINNES IKKE");
  return f ? f.map((x) => x.name) : [];
}

const kunde = await felter("CustomerInput");
await felter("CustomerEmailMarketingConsentInput");
await felter("CustomerSmsMarketingConsentInput");
const rabatt = await felter("DiscountCodeBasicInput");
await felter("DiscountItemsInput");
await felter("DiscountCustomerSelectionInput");

const forventetKunde = [
  "email",
  "firstName",
  "phone",
  "tags",
  "emailMarketingConsent",
  "smsMarketingConsent",
];
const forventetRabatt = [
  "title",
  "code",
  "startsAt",
  "customerSelection",
  "customerGets",
  "usageLimit",
  "appliesOncePerCustomer",
];

console.log("\n=== KONTROLL ===");
for (const [navn, forventet, faktisk] of [
  ["CustomerInput", forventetKunde, kunde],
  ["DiscountCodeBasicInput", forventetRabatt, rabatt],
]) {
  const mangler = forventet.filter((f) => !faktisk.includes(f));
  console.log(
    mangler.length === 0
      ? `${navn}: alle forventede felter finnes`
      : `${navn}: MANGLER ${mangler.join(", ")}`
  );
}

await felter("DiscountCustomerGetsInput");
await felter("DiscountCustomerGetsValueInput");
await felter("DiscountCollectionsInput");
