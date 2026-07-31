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

// Timma-nettbooking. Bookingen er bakt inn på /bestill-time;
// TIMMA_URL brukes som direkte-lenke/reserve hvis innbakingen feiler.
export const TIMMA_URL = "https://bestill.timma.no/reservation/helseblikkhudas";
export const BOOKING_URL = "/bestill-time";

// Timmas ansatt-ID-er — ?user-id=... forhåndsvelger behandler i timeboken
export const TIMMA_STAFF: Record<string, string> = {
  mabel: "6a6d006f6c90d51876177b74",
  christina: "6a6d002687e3fa187092d8d7",
  stian: "6a6cfef533130c186ada8c94",
};
