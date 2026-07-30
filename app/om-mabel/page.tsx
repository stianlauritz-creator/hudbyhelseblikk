"use client";

import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";

const spesialiteter = [
  "Hudkonsultasjon og hudanalyse",
  "Laserbehandlinger (akne, rødhet, hårfjerning, rosacea)",
  "Dermapen / Microneedling",
  "Kjemiske peelinger",
  "Injeksjonsbehandlinger (filler, PRP, muskelavslappende)",
];

const utdanning = [
  "Sykepleier, Universitetet i Agder",
  "Videreutdanning kosmetisk dermatologi, USN",
  "Kosmetisk dermatologisk sykepleier siden 2019",
];

export default function OmMabelPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
              Din behandler
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Mabel Lorine King
            </h1>
            <p className="text-[#c9a96e] tracking-wide text-sm">
              Kosmetisk Dermatologisk Sykepleier
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Hovedinnhold */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Bilde */}
          <AnimatedSection direction="left" className="md:sticky md:top-28">
            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-[#ecddd0] to-[#c9a96e]/20 relative overflow-hidden">
              <Image
                src="/mabel.jpg"
                alt="Mabel Lorine King i behandling, kosmetisk dermatologisk sykepleier"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2d3d]/10 to-transparent" />
              {/* Dekorativt element */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-sm rounded-xl p-4">
                <p
                  className="text-sm font-normal"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Mabel Lorine King
                </p>
                <p className="text-xs text-[#c9a96e] mt-0.5">
                  Kosmetisk Dermatologisk Sykepleier
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Tekst */}
          <div className="space-y-10">
            <AnimatedSection direction="right">
              <h2
                className="text-2xl font-normal mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Om Mabel
              </h2>
              <div className="space-y-4 text-[#1a1a1a]/65 leading-relaxed">
                <p>
                  Mabel er utdannet sykepleier ved Universitetet i Agder og har
                  siden tatt videreutdanning i kosmetisk dermatologi ved USN.
                  Hun bringer medisinsk presisjon og trygghet inn i alt hun
                  gjør, med et øye for detaljene som gir naturlige resultater.
                </p>
                <p>
                  Hun har jobbet som kosmetisk dermatologisk sykepleier siden
                  2019 og har bred erfaring med et vidt spekter av behandlinger.
                  Mabel brenner for forebygging, naturlige resultater og faglig
                  forsvarlighet.
                </p>
                <p>
                  «Mabel er nøyaktig, ærlig, imøtekommende og har et godt
                  estetisk blikk» — dette er tilbakemeldingen vi hører igjen og
                  igjen fra fornøyde pasienter.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div className="p-6 rounded-2xl bg-[#faf9f7] border border-[#e8d5b0]/30">
                <p
                  className="text-lg font-normal mb-1 text-[#c9a96e] italic"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  «Forebygging, naturlig skjønnhet, resultater
                  og faglig forsvarlighet.»
                </p>
                <p className="text-xs text-[#1a1a1a]/40 mt-3">— Mabels filosofi</p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <h3
                className="text-xl font-normal mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Spesialiteter
              </h3>
              <ul className="space-y-2.5">
                {spesialiteter.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-sm text-[#1a1a1a]/65">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <h3
                className="text-xl font-normal mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Utdanning & erfaring
              </h3>
              <ul className="space-y-2.5">
                {utdanning.map((u) => (
                  <li key={u} className="flex items-start gap-3 text-sm text-[#1a1a1a]/65">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3d4a3e] flex-shrink-0 mt-1.5" />
                    {u}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.25}>
              <div className="pt-4 border-t border-[#e8d5b0]/30">
                <p className="text-xs text-[#1a1a1a]/40 mb-6">
                  Ansvarlig lege: Débora Dias De Oliveira
                </p>
                <BookingButton label="Bestill time hos Mabel" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
