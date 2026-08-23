"use client";

import { Sparkles } from "lucide-react";
import KundeklubbSkjema from "@/components/KundeklubbSkjema";

/**
 * Vises på nettbutikken så lenge `BUTIKK_APEN` er false. Produktene er
 * fortsatt synlige nedenfor, men kjøp er av — så dette panelet er stedet
 * kunden faktisk kan gjøre noe: melde seg inn og få 15 % på første kjøp.
 *
 * Bevisst lyst panel: `KundeklubbSkjema` har mørk tekst på samtykke-
 * avkryssingene, og blir uleselig på navy bakgrunn.
 */
export default function ButikkAapnerSnart() {
  return (
    <section className="px-6 pt-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-[#c9a96e]/40 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7] shadow-[0_24px_60px_-30px_rgba(30,45,61,0.28)]">
        <div className="grid gap-9 p-8 sm:p-11 md:grid-cols-[1.05fr_1fr] md:items-start">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a96e]/50 bg-white/70 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.25em] text-[#8f6b28]">
              <Sparkles size={13} className="shrink-0" />
              Åpner snart
            </p>
            <h2
              className="text-3xl leading-tight text-[#1e2d3d] md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Vi legger siste hånd på nettbutikken
            </h2>
            <p className="mt-5 leading-relaxed text-[#1a1a1a]/70">
              Du kan se hele utvalget vårt nedenfor, men vi har ikke åpnet for
              bestilling ennå. Meld deg inn i kundeklubben nå, så får du{" "}
              <strong className="font-medium text-[#8f6b28]">
                15 % på ditt første kjøp
              </strong>{" "}
              — og beskjed med én gang butikken åpner.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[#1a1a1a]/50">
              Vil du handle før den tid, er du velkommen inn i klinikken i
              Odden 1D. Vi har produktene på hylla.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e8d5b0]/60 bg-white p-6">
            <p className="mb-4 text-sm text-[#1a1a1a]/70">
              Meld deg inn — det tar under et minutt.
            </p>
            <KundeklubbSkjema variant="popup" />
          </div>
        </div>
      </div>
    </section>
  );
}
