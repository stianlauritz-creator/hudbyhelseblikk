"use client";

import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";

const spesialiteter = [
  "Leppebehandlinger og filler",
  "Rynkebehandling (medisinske injeksjoner)",
  "Biostimulatorer og skinboostere (Profhilo m.fl.)",
  "Mesoterapi og microneedling (Dermapen)",
  "Kjemisk peeling",
  "Hudpleieveiledning — ZO Skin Health og Face Formula",
];

const utdanning = [
  "Utdannet sykepleier",
  "Sertifisert Restylane Injector (2023)",
  "Julie Horne Lips Training Masterclass (2024)",
  "Erfaring som kosmetisk sykepleier fra klinikk i Kristiansand",
];

export default function OmChristinaPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
              Din behandler
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Christina Dalen
            </h1>
            <p className="text-[#8f6b28] tracking-wide text-sm">
              Kosmetisk Sykepleier
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Hovedinnhold */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Bilde */}
          <AnimatedSection direction="left" className="md:sticky md:top-28">
            <div className="aspect-[3/4] rounded-2xl relative overflow-hidden bg-gradient-to-br from-[#ecddd0] to-[#c9a96e]/20">
              <Image
                src="/christina-portrett.jpg"
                alt="Christina Dalen, kosmetisk sykepleier"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2d3d]/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-sm rounded-xl p-4">
                <p
                  className="text-sm font-normal"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Christina Dalen
                </p>
                <p className="text-xs text-[#8f6b28] mt-0.5">
                  Kosmetisk Sykepleier
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
                Om Christina
              </h2>
              <div className="space-y-4 text-[#1a1a1a]/65 leading-relaxed">
                <p>
                  Christina er utdannet sykepleier og har gjennom kursing og
                  praktisk klinisk arbeid bygget solid erfaring innen estetiske
                  behandlinger. Hun ble sertifisert Restylane Injector i 2023
                  og deltok på Julie Horne Lips Training Masterclass i 2024.
                </p>
                <p>
                  Hun har en særlig lidenskap for leppebehandlinger og for
                  naturlige resultater som fremhever den enkeltes trekk — aldri
                  mer enn det som kler deg.
                </p>
                <p>
                  For Christina er relasjonen til pasienten det viktigste. Møtene
                  skal preges av kunnskap, forståelse og tillit, i en trygg og
                  komfortabel atmosfære.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div className="p-6 rounded-2xl bg-[#faf9f7] border border-[#e8d5b0]/30">
                <p
                  className="text-lg font-normal mb-1 text-[#8f6b28] italic"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  «Naturlige resultater som forsterker dine egne
                  skjønnhetstrekk.»
                </p>
                <p className="text-xs text-[#1a1a1a]/65 mt-3">
                  — Christinas filosofi
                </p>
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
                  <li
                    key={s}
                    className="flex items-center gap-3 text-sm text-[#1a1a1a]/65"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8f6b28] flex-shrink-0" />
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
                  <li
                    key={u}
                    className="flex items-start gap-3 text-sm text-[#1a1a1a]/65"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3d4a3e] flex-shrink-0 mt-1.5" />
                    {u}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.25}>
              <div className="pt-4 border-t border-[#e8d5b0]/30">
                <p className="text-xs text-[#1a1a1a]/65 mb-6">
                  Ansvarlig lege: Débora Dias De Oliveira
                </p>
                <BookingButton
                  label="Bestill time hos Christina"
                  href="/bestill-time?behandler=christina"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
