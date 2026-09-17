"use client";

import { useEffect } from "react";
import { sporKontakt } from "@/lib/analyse";
import { BOOKING_URL, TIMMA_STAFF, TIMMA_URL } from "@/lib/site";

// Timma-ID-ene snudd, slik at direktelenker med ?user-id=… rapporterer samme
// behandlernavn som de interne lenkene med ?behandler=….
const TIMMA_ID_TIL_BEHANDLER: Record<string, string> = Object.fromEntries(
  Object.entries(TIMMA_STAFF).map(([navn, id]) => [id, navn])
);

/** Peker lenka til timeboken — enten den innbakte siden eller Timma direkte? */
function erBookinglenke(url: URL): boolean {
  if (url.origin === window.location.origin) {
    return url.pathname === BOOKING_URL || url.pathname.startsWith(`${BOOKING_URL}/`);
  }
  const timma = new URL(TIMMA_URL);
  return url.host === timma.host && url.pathname.startsWith(timma.pathname);
}

/**
 * Sporer kontaktpunktene som ikke er kjøp: telefon, e-post og bookingklikk.
 *
 * Én lytter på `document` i stedet for håndtering på hver enkelt lenke — da
 * slipper vi å endre lenker spredt over hele siden, og nye lenker blir sporet
 * av seg selv.
 *
 * Komponenten rendrer ingenting og monteres én gang i rot-layouten.
 */
export default function Kontaktsporing() {
  useEffect(() => {
    function vedKlikk(e: MouseEvent) {
      const maal = e.target;
      if (!(maal instanceof Element)) return;

      // Klikket treffer ofte et ikon eller en span inni lenka, ikke lenka selv.
      const lenke = maal.closest("a");
      const href = lenke?.getAttribute("href");
      if (!href) return;

      const fraSide = window.location.pathname;

      if (href.startsWith("tel:")) {
        sporKontakt("telefonklikk", { nummer: href.slice(4), fra_side: fraSide });
        return;
      }

      if (href.startsWith("mailto:")) {
        // Noen mailto-lenker har ?subject=… på slutten — bare adressen er interessant.
        const adresse = href.slice(7).split("?")[0];
        sporKontakt("epostklikk", { adresse, fra_side: fraSide });
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return; // Ugyldig eller ukjent href — ikke noe å spore.
      }

      if (!erBookinglenke(url)) return;

      const behandler =
        url.searchParams.get("behandler") ??
        TIMMA_ID_TIL_BEHANDLER[url.searchParams.get("user-id") ?? ""];

      // MERK: dette er et KLIKK, ikke en fullført bestilling. Selve bookingen
      // skjer inne i Timma-rammen på et annet domene, og vi ser ikke om den
      // fullføres.
      sporKontakt("bestill_time_klikk", {
        maal: url.origin === window.location.origin ? "nettside" : "timma",
        fra_side: fraSide,
        ...(behandler ? { behandler } : {}),
      });
    }

    // Capture-fasen så vi rekker å måle før Next.js' ruting overtar klikket, og
    // passive så handleren aldri kan blokkere eller forsinke navigasjonen.
    document.addEventListener("click", vedKlikk, { capture: true, passive: true });
    return () => document.removeEventListener("click", vedKlikk, { capture: true });
  }, []);

  return null;
}
