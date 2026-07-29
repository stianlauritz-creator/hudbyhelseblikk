import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, BRAND_INFO } from "@/lib/products";
import { PRODUCT_DETAILS } from "@/lib/product-details";
import { SITE_URL } from "@/lib/site";
import ProductView from "@/components/ProductView";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ sku: p.sku }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sku: string }>;
}): Promise<Metadata> {
  const { sku } = await params;
  const product = PRODUCTS.find((p) => p.sku === sku);
  if (!product) return { title: "Produkt ikke funnet" };
  const brand = BRAND_INFO[product.brand].label;
  const description = PRODUCT_DETAILS[sku]?.intro ?? product.desc;
  return {
    title: `${brand} ${product.name}`,
    description,
    alternates: { canonical: `/nettbutikk/${sku}` },
    openGraph: {
      title: `${brand} ${product.name}`,
      description,
      images: [{ url: product.image, width: 800, height: 800 }],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = PRODUCTS.find((p) => p.sku === sku);
  if (!product) notFound();

  const details = PRODUCT_DETAILS[sku];

  // Relaterte produkter: fra details.related, ellers tre andre fra samme merke
  const relatedSkus =
    details?.related?.filter((s) => PRODUCTS.some((p) => p.sku === s)) ?? [];
  const related =
    relatedSkus.length > 0
      ? relatedSkus.map((s) => PRODUCTS.find((p) => p.sku === s)!)
      : PRODUCTS.filter((p) => p.brand === product.brand && p.sku !== sku).slice(
          0,
          3
        );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${BRAND_INFO[product.brand].label} ${product.name}`,
    sku: product.sku,
    image: `${SITE_URL}${product.image}`,
    description: details?.intro ?? product.desc,
    brand: { "@type": "Brand", name: BRAND_INFO[product.brand].label },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/nettbutikk/${product.sku}`,
      priceCurrency: "NOK",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "Hud By Helseblikk" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductView product={product} details={details} related={related} />
    </>
  );
}
