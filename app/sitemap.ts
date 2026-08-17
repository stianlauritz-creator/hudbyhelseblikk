import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { BEHANDLINGER } from "@/lib/behandling-detaljer";
import { SITE_URL } from "@/lib/site";

// Statiske ruter. /nettbutikk/takk (ordrebekreftelse) holdes bevisst utenfor.
const STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/bestill-time", priority: 0.9, changeFrequency: "monthly" },
  { path: "/behandlinger", priority: 0.9, changeFrequency: "monthly" },
  // Egen landingsside for plastikkirurgi — eget fagområde, egen behandler og
  // egen bookingkanal (PasientSky), derfor høy prioritet.
  { path: "/plastikkirurgi", priority: 0.9, changeFrequency: "monthly" },
  { path: "/nettbutikk", priority: 0.9, changeFrequency: "weekly" },
  { path: "/prisliste", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gavekort", priority: 0.7, changeFrequency: "monthly" },
  { path: "/kundeklubb", priority: 0.7, changeFrequency: "monthly" },
  { path: "/behandlere", priority: 0.7, changeFrequency: "monthly" },
  { path: "/om-christina", priority: 0.6, changeFrequency: "monthly" },
  { path: "/om-mabel", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kontakt", priority: 0.7, changeFrequency: "yearly" },
  { path: "/kjopsvilkar", priority: 0.3, changeFrequency: "yearly" },
  { path: "/personvern", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })
  );

  // Gavekort selges via Shopifys egen gavekortfunksjon og har ingen
  // produktside — de skal derfor ikke ligge i sitemap.
  const productEntries: MetadataRoute.Sitemap = PRODUCTS.filter(
    (p) => p.brand !== "gavekort"
  ).map((product) => ({
    url: `${SITE_URL}/nettbutikk/${product.sku}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${SITE_URL}${product.image}`],
  }));

  const behandlingEntries: MetadataRoute.Sitemap = BEHANDLINGER.map((b) => ({
    url: `${SITE_URL}/behandlinger/${b.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...behandlingEntries, ...productEntries];
}
