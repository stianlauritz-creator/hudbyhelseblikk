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

// Midlertidig PasientSky-booking (Mabels kalender fra helseblikk.no).
// Byttes til Timma-lenke når Timma er satt opp.
export const BOOKING_URL =
  "https://psno-patient-platform-fe.svc.pasientsky.no/embedded/planner/booking?serviceProviderId=24a78dc0-9caf-11ed-a4d7-727736e10ded&calendarId=d6218414-b66a-11ed-9c4d-8ef8f73e23fe";
