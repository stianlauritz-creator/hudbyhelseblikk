// Felles base-URL for SEO (sitemap, robots, canonical, JSON-LD).
// Når eget domene er på plass: sett NEXT_PUBLIC_SITE_URL i Vercel
// (f.eks. https://hudbyhelseblikk.no) — alt oppdateres automatisk.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hudbyhelseblikk.vercel.app";

export const SITE_NAME = "Hud by Helseblikk";

// Juridisk enhet bak nettbutikken (Brønnøysundregistrene, juli 2026).
export const ORG = {
  name: "Hud by Helseblikk",
  legalName: "Helseblikk Hud AS",
  orgNr: "830 724 052",
  email: "hei@hudbyhelseblikk.no",
  phone: "370 40 500",
  phoneHref: "tel:37040500",
  address: "Odden 1D, 4876 Grimstad",
};

// Nettbutikken er åpen for bestilling (lansert 2026-08-24). Handlekurv,
// «Legg i kurv», kassen og fraktbanneret er på.
// SLIK STENGER DU IGJEN: sett denne til false. Da forsvinner kurven og
// kjøpsknappene, kassen svarer 503, og «Åpner snart»-panelet med
// kundeklubb-innmelding kommer tilbake av seg selv.
export const BUTIKK_APEN = true;

// Google Tag Manager. Containeren lastes på alle sider, men fyrer ingen
// tagger som setter cookies før kunden har samtykket — se lib/samtykke.ts og
// consent-default-skriptet i app/layout.tsx.
//
// Dette er KLINIKKENS EGEN container (konto «Helseblikk Hud»), ikke byråets.
// Byrået får tilgang som bruker i stedet, slik at målingen blir liggende her
// hvis samarbeidet tar slutt. Byråets container GTM-595MVFNW ble brukt
// 15.–17.09.2026 og er nå ute.
//
// ÉN container om gangen. Legges byråets inn i tillegg, fyrer alt dobbelt.
//
// MERK: container-ID-en er også navngitt i personvernerklæringen
// (app/personvern/page.tsx). Byttes den her, må den byttes der også.
export const GTM_ID = "GTM-N6W4329Q";

// Google Analytics 4. Lastes direkte av siden, IKKE via GTM-containeren.
// VIKTIG: legges det inn en GA4-tagg for samme måle-ID i GTM, telles hvert
// besøk to ganger. Si fra til den som forvalter containeren.
export const GA4_ID = "G-40XZHXYT4B";

/**
 * Domener som hører til samme reise, og som GA4 derfor må se som ÉN økt.
 *
 * Kassen ligger hos Shopify. Uten kryssdomene-kobling starter kassen en ny
 * økt, og kjøpet tilskrives «henvisning fra hudbyhelseblikk.no» i stedet for
 * annonsen som faktisk skaffet kunden — altså nøyaktig det tallet
 * annonsebudsjettet styres etter.
 */
export const KRYSSDOMENER = [
  "hudbyhelseblikk.no",
  "hud-by-helseblikk.myshopify.com",
];

// Timma-nettbooking. Bookingen er bakt inn på /bestill-time;
// TIMMA_URL brukes som direkte-lenke/reserve hvis innbakingen feiler.
export const TIMMA_URL = "https://bestill.timma.no/helseblikkhudas";
export const BOOKING_URL = "/bestill-time";

// Timmas ansatt-ID-er — ?user-id=... forhåndsvelger behandler i timeboken
export const TIMMA_STAFF: Record<string, string> = {
  mabel: "6a6d006f6c90d51876177b74",
  christina: "6a6d002687e3fa187092d8d7",
  stian: "6a6cfef533130c186ada8c94",
};
