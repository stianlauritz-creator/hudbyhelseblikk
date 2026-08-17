import { PRODUCTS, type Brand, type Product } from "./products";

// Shopify Storefront API-integrasjon. Når SHOPIFY_STORE_DOMAIN og
// SHOPIFY_STOREFRONT_TOKEN er satt i Vercel, er Shopify autoritativ
// produktkilde (staben redigerer i Shopify-adminen); uten dem faller alt
// tilbake til den statiske katalogen i lib/products.ts.

const API_VERSION = "2025-01";
const REVALIDATE_SECONDS = 300; // staben ser endringene sine innen 5 min

export function shopifyConfigured(): boolean {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_TOKEN
  );
}

async function storefront<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T | null> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token) return null;

  try {
    const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.errors) {
      console.error("Shopify-feil:", JSON.stringify(json.errors).slice(0, 300));
      return null;
    }
    return json.data as T;
  } catch {
    return null;
  }
}

const VENDOR_TO_BRAND: Record<string, Brand> = {
  "zo skin health": "zo",
  "face formula": "face-formula",
  colorescience: "colorescience",
  gavekort: "gavekort",
};

interface ProductsQueryResult {
  products: {
    edges: {
      node: {
        handle: string;
        title: string;
        description: string;
        vendor: string;
        featuredImage: { url: string; altText: string | null } | null;
        variants: {
          edges: {
            node: {
              id: string;
              sku: string;
              price: { amount: string };
              availableForSale: boolean;
            };
          }[];
        };
      };
    }[];
  };
}

const PRODUCTS_QUERY = `{
  products(first: 250) {
    edges {
      node {
        handle
        title
        description
        vendor
        featuredImage { url altText }
        variants(first: 1) { edges { node { id sku price { amount } availableForSale } } }
      }
    }
  }
}`;

// Variant-ID per SKU trengs for å bygge Shopify-handlekurven ved checkout.
const variantIdBySku = new Map<string, string>();

function mapNode(
  node: ProductsQueryResult["products"]["edges"][number]["node"]
): Product | null {
  const variant = node.variants.edges[0]?.node;
  if (!variant?.sku) return null;
  variantIdBySku.set(variant.sku, variant.id);

  // Titler fra vår import har formen «Navn — Størrelse»
  const [name, size] = node.title.includes(" — ")
    ? node.title.split(" — ")
    : [node.title, ""];

  const local = PRODUCTS.find((p) => p.sku === variant.sku);
  return {
    sku: variant.sku,
    brand: VENDOR_TO_BRAND[node.vendor.toLowerCase()] ?? local?.brand ?? "annet",
    name,
    size: size || local?.size || "",
    price: Math.round(Number(variant.price.amount)),
    desc: local?.desc ?? node.description.slice(0, 300),
    image: node.featuredImage?.url ?? local?.image ?? "/produkter/placeholder.jpg",
    // Retinol og nyanser er merking vi eier selv — Shopify har den ikke
    retinol: local?.retinol,
    retinolStyrke: local?.retinolStyrke,
    farger: local?.farger,
    // Lagerstatus er Shopify sin når butikken er koblet på; den statiske
    // katalogen brukes bare som fallback.
    utsolgt: variant.availableForSale === false,
  };
}

// Autoritativ katalog: Shopify når konfigurert og tilgjengelig, ellers statisk.
export async function getCatalog(): Promise<Product[]> {
  if (!shopifyConfigured()) return PRODUCTS;
  const data = await storefront<ProductsQueryResult>(PRODUCTS_QUERY);
  if (!data || data.products.edges.length === 0) return PRODUCTS;
  const mapped = data.products.edges
    .map((e) => mapNode(e.node))
    .filter((p): p is Product => p !== null);
  return mapped.length > 0 ? mapped : PRODUCTS;
}

interface CartCreateResult {
  cartCreate: {
    cart: { checkoutUrl: string } | null;
    userErrors: { message: string }[];
  };
}

// Oppretter Shopify-handlekurv fra våre kurvlinjer og returnerer checkout-URL.
export async function createShopifyCheckout(
  lines: { sku: string; qty: number }[]
): Promise<string | null> {
  if (!shopifyConfigured()) return null;

  // Sørg for ferskt sku→variant-oppslag
  await getCatalog();

  const cartLines = lines
    .map((l) => ({
      merchandiseId: variantIdBySku.get(l.sku),
      quantity: Math.max(1, Math.min(10, Math.floor(l.qty))),
    }))
    .filter((l): l is { merchandiseId: string; quantity: number } =>
      Boolean(l.merchandiseId)
    );
  if (cartLines.length === 0) return null;

  const data = await storefront<CartCreateResult>(
    `mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }`,
    { input: { lines: cartLines } }
  );
  if (!data?.cartCreate.cart) {
    console.error(
      "Shopify cartCreate-feil:",
      JSON.stringify(data?.cartCreate.userErrors ?? "ukjent").slice(0, 300)
    );
    return null;
  }
  return data.cartCreate.cart.checkoutUrl;
}

// Gavekortet ligger som eget Shopify-produkt med én variant per valør.
// Slår opp varianten som matcher beløpet og oppretter handlekurv for den.
export async function createGavekortCheckout(
  amount: number
): Promise<string | null> {
  if (!shopifyConfigured()) return null;

  const data = await storefront<{
    products: {
      edges: {
        node: {
          variants: {
            edges: { node: { id: string; price: { amount: string } } }[];
          };
        };
      }[];
    };
  }>(`{
    products(first: 5, query: "gavekort") {
      edges {
        node {
          variants(first: 20) { edges { node { id price { amount } } } }
        }
      }
    }
  }`);

  const variants =
    data?.products.edges.flatMap((e) =>
      e.node.variants.edges.map((v) => v.node)
    ) ?? [];
  const hit = variants.find(
    (v) => Math.round(Number(v.price.amount)) === amount
  );
  if (!hit) return null;

  const cart = await storefront<CartCreateResult>(
    `mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }`,
    { input: { lines: [{ merchandiseId: hit.id, quantity: 1 }] } }
  );
  return cart?.cartCreate.cart?.checkoutUrl ?? null;
}
