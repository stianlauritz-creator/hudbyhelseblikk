// Felles base-URL for SEO (sitemap, robots, canonical, JSON-LD).
// Når eget domene er på plass: sett NEXT_PUBLIC_SITE_URL i Vercel
// (f.eks. https://hudbyhelseblikk.no) — alt oppdateres automatisk.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hudbyhelseblikk.vercel.app";

export const SITE_NAME = "Hud By Helseblikk";

// Juridisk enhet bak nettbutikken (Brønnøysundregistrene, juli 2026).
export const ORG = {
  name: "Hud By Helseblikk",
  legalName: "Helseblikk Hud AS",
  orgNr: "830 724 052",
  email: "hei@helseblikk.no",
  phone: "370 40 500",
  phoneHref: "tel:37040500",
  address: "Odden 1D, 4876 Grimstad",
};
