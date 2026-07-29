import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

// Statiske ruter. /nettbutikk/takk (ordrebekreftelse) holdes bevisst utenfor.
const STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/behandlinger", priority: 0.9, changeFrequency: "monthly" },
  { path: "/nettbutikk", priority: 0.9, changeFrequency: "weekly" },
  { path: "/prisliste", priority: 0.8, changeFrequency: "monthly" },
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

  const productEntries: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/nettbutikk/${product.sku}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${SITE_URL}${product.image}`],
  }));

  return [...staticEntries, ...productEntries];
}
