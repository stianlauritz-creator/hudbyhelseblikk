"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import Kampanjer from "@/components/Kampanjer";
import { AKTIVE_KAMPANJER } from "@/lib/kampanjer";
import { BUTIKK_APEN } from "@/lib/site";

export default function KampanjerPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-[#f5ede4] to-[#faf9f7] px-6 pt-32 pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedSection eager>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#8f6b28]">
              Akkurat nå
            </p>
            <h1
              className="mb-6 text-4xl font-normal md:text-5xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Kampanjer og tilbud
            </h1>
            <p className="leading-relaxed text-[#1a1a1a]/65">
              {AKTIVE_KAMPANJER.length > 0
                ? "Her ligger kampanjene som gjelder nå — både i klinikken i Odden 1D og i nettbutikken. Vi oppdaterer siden når noe nytt kommer, så du finner alltid det som er aktuelt her."
                : "Vi har ingen kampanjer akkurat nå. Meld deg inn i kundeklubben, så er du blant de første som får vite når neste tilbud kommer."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Kampanjekort */}
      {AKTIVE_KAMPANJER.length > 0 && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <Kampanjer variant="banner" />
            <AnimatedSection delay={0.3}>
              <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-[#1a1a1a]/55">
                Gavene gjelder så langt beholdningen rekker og kan ikke byttes i
                penger eller kombineres med andre rabatter.
                {BUTIKK_APEN
                  ? ""
                  : " Nettbutikken åpner for bestilling om kort tid — frem til da får du kampanjene i klinikken."}
              </p>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Kundeklubb */}
      <section className="bg-[#f5f2ed] px-6 py-20">
        <AnimatedSection className="mx-auto max-w-2xl text-center">
          <h2
            className="mb-4 text-2xl font-normal md:text-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Få kampanjene først
          </h2>
          <p className="mb-8 leading-relaxed text-[#1a1a1a]/65">
            Medlemmer i kundeklubben får beskjed før kampanjene legges ut her —
            og 15 % på sitt første produktkjøp.
          </p>
          <Link
            href="/kundeklubb"
            className="inline-block rounded-full bg-[#8f6b28] px-8 py-3.5 text-sm tracking-wide text-white transition-colors hover:bg-[#7a5b20]"
          >
            Bli medlem
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
