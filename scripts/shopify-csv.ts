// Genererer Shopify-produktimport (CSV) fra produktkatalogen.
// Kjør: node scripts/shopify-csv.ts > shopify-import.csv
// Gavekort (GK-*) utelates — Shopify har innebygd gavekortfunksjon.

import { PRODUCTS, BRAND_INFO } from "../lib/products";
import { PRODUCT_DETAILS } from "../lib/product-details";

const IMAGE_BASE = "https://hudbyhelseblikk.vercel.app";

const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;

function bodyHtml(sku: string, desc: string): string {
  const d = PRODUCT_DETAILS[sku];
  if (!d) return `<p>${desc}</p>`;
  const parts: string[] = [`<p><strong>${d.intro}</strong></p>`];
  for (const p of d.longDesc) parts.push(`<p>${p}</p>`);
  if (d.benefits.length) {
    parts.push(
      `<h3>Fordeler</h3><ul>${d.benefits.map((b) => `<li>${b}</li>`).join("")}</ul>`
    );
  }
  if (d.usage.length) {
    parts.push(
      `<h3>Slik brukes produktet</h3><ol>${d.usage.map((u) => `<li>${u}</li>`).join("")}</ol>`
    );
  }
  if (d.ingredients.length) {
    parts.push(
      `<h3>Nøkkelingredienser</h3><ul>${d.ingredients
        .map((i) => `<li><strong>${i.name}:</strong> ${i.effect}</li>`)
        .join("")}</ul>`
    );
  }
  if (d.skinTypes.length) {
    parts.push(`<p><em>Passer for: ${d.skinTypes.join(", ")}</em></p>`);
  }
  return parts.join("");
}

const header = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Alt Text",
  "SEO Title",
  "SEO Description",
  "Status",
];

const rows = PRODUCTS.filter((p) => p.brand !== "gavekort").map((p) => {
  const brand = BRAND_INFO[p.brand].label;
  return [
    p.sku.toLowerCase(),
    esc(`${p.name} — ${p.size}`),
    esc(bodyHtml(p.sku, p.desc)),
    esc(brand),
    "Hudpleie",
    esc(`${brand}, ${p.size}`),
    "TRUE",
    "Title",
    "Default Title",
    p.sku,
    "0",
    "deny",
    "manual",
    String(p.price),
    "TRUE",
    "TRUE",
    `${IMAGE_BASE}${p.image}`,
    esc(`${brand} ${p.name}`),
    esc(`${brand} ${p.name} | Hud By Helseblikk`),
    esc(PRODUCT_DETAILS[p.sku]?.intro ?? p.desc),
    "active",
  ].join(",");
});

console.log([header.join(","), ...rows].join("\n"));
