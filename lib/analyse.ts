// GA4-hendelser for nettbutikken og kontaktpunktene.
//
// Alt går gjennom `window.gtag`, som defineres av consent-skriptet i
// app/layout.tsx. Har kunden sagt nei, er analytics_storage «denied», og
// Google sender da bare cookieløse signaler — vi trenger ikke sjekke samtykke
// her, og skal ikke gjøre det: da ville vi hatt to kilder til samme sannhet.
//
// Alle funksjonene er trygge å kalle uansett: finnes ikke gtag (blokkering,
// serverrendring), skjer det ingenting.

import type { Product } from "./products";

/** GA4s vareformat. Feltnavnene er Googles, ikke våre — de kan ikke oversettes. */
export interface GaVare {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_variant?: string;
  price: number;
  quantity: number;
}

export const VALUTA = "NOK";

/** Gjør et produkt om til GA4s vareformat. */
export function tilVare(
  produkt: Product,
  antall = 1,
  farge?: string
): GaVare {
  return {
    item_id: produkt.sku,
    item_name: produkt.name,
    item_brand: produkt.brand,
    item_variant: farge,
    price: produkt.price,
    quantity: antall,
  };
}

/** Summen av en handlekurv, slik GA4 vil ha den i `value`. */
export function verdi(varer: GaVare[]): number {
  const sum = varer.reduce((s, v) => s + v.price * v.quantity, 0);
  // GA4 tåler ikke øreavvik fra flyttallsregning — to desimaler holder.
  return Math.round(sum * 100) / 100;
}

type Gtag = (...args: unknown[]) => void;

function gtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { gtag?: Gtag }).gtag;
}

/** Sender en hendelse til GA4. Gjør ingenting hvis gtag ikke finnes. */
export function spor(navn: string, data: Record<string, unknown> = {}) {
  gtag()?.("event", navn, data);
}

/** Varehandel-hendelse med varer, verdi og valuta ferdig utfylt. */
export function sporHandel(
  navn: "view_item" | "add_to_cart" | "remove_from_cart" | "view_cart" | "begin_checkout",
  varer: GaVare[],
  ekstra: Record<string, unknown> = {}
) {
  if (varer.length === 0) return;
  spor(navn, { currency: VALUTA, value: verdi(varer), items: varer, ...ekstra });
}

/** Visning av en produktliste — forsidens utvalg, nettbutikken, søk. */
export function sporListe(listenavn: string, varer: GaVare[]) {
  if (varer.length === 0) return;
  spor("view_item_list", { item_list_name: listenavn, items: varer });
}

/**
 * Kontaktpunkter som ikke er kjøp: telefon, e-post, bookingklikk, påmelding.
 *
 * MERK at `bestill_time_klikk` er et klikk, ikke en bestilling. Selve
 * bookingen skjer inne i Timma-rammen på et annet domene, og vi ser ikke om
 * den fullføres. Merkes denne som konvertering i Google Ads, optimaliserer
 * Google mot folk som klikker — ikke mot folk som faktisk booker time.
 */
export type Kontaktpunkt =
  | "telefonklikk"
  | "epostklikk"
  | "bestill_time_klikk"
  | "kundeklubb_pamelding";

export function sporKontakt(
  punkt: Kontaktpunkt,
  ekstra: Record<string, unknown> = {}
) {
  spor(punkt, ekstra);
}

/**
 * Kryssdomene-sporing til Shopify-kassen.
 *
 * MÅLT, IKKE ANTATT: GA4s linker dekorerer bare EKTE brukerklikk. Et anker
 * vi lager og klikker programmatisk (`isTrusted: false`) blir ikke rørt — det
 * var den første løsningen her, og den virket ikke. Dekorasjonen skjer
 * allerede i capture-fasen, før React ser klikket, og blir stående på lenka
 * etterpå.
 *
 * Derfor: «Til betaling» ER en ekte lenke til butikkdomenet. Kunden klikker,
 * GA4 limer på `_gl`, vi stopper navigasjonen, plukker parameteren og henger
 * den på den virkelige kasse-URL-en når API-et har svart.
 *
 * Uten dette starter kassen en ny økt, og kjøpet tilskrives «henvisning» i
 * stedet for annonsen som skaffet kunden.
 */

/** Plukker `_gl` fra en lenke GA4 har dekorert. */
export function hentGl(href: string | null | undefined): string | null {
  if (!href) return null;
  const m = href.match(/[?&]_gl=([^&#]+)/);
  return m ? m[1] : null;
}

/** Henger `_gl` på kasse-URL-en. Uten parameter returneres URL-en urørt. */
export function medGl(url: string, gl: string | null): string {
  if (!gl) return url;
  if (/[?&]_gl=/.test(url)) return url;
  return url + (url.includes("?") ? "&" : "?") + "_gl=" + gl;
}

/** Sender kunden til kassen. */
export function gaaTilKasse(url: string) {
  if (typeof window !== "undefined") window.location.href = url;
}
