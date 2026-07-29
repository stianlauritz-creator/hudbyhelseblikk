"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";

const behandlere = [
  {
    navn: "Mabel Lorine King",
    tittel: "Kosmetisk Dermatologisk Sykepleier",
    href: "/om-mabel",
    bilde: "/mabel.jpg",
    bildePos: "object-[center_45%]",
    tekst:
      "Utdannet sykepleier med videreutdanning i kosmetisk dermatologi. Hun har jobbet i faget siden 2019 og er kjent for medisinsk presisjon, et godt estetisk blikk og naturlige resultater.",
    fokus: "Laser · hudbehandlinger · PMU · injeksjoner",
  },
  {
    navn: "Christina Dalen",
    tittel: "Kosmetisk Sykepleier",
    href: "/om-christina",
    bilde: "/christina-dalen.jpg",
    bildePos: "object-top",
    tekst:
      "Sertifisert Restylane Injector med Julie Horne Lips Masterclass i bagasjen. Christina har en særlig lidenskap for leppebehandlinger og naturlige resultater som fremhever dine egne trekk.",
    fokus: "Lepper · filler · skinboostere · hudpleieveiledning",
  },
];

export default function BehandlerePage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
              Vårt team
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Behandlere
            </h1>
            <p className="text-[#1a1a1a]/55 leading-relaxed">
              Hos oss møter du kvalifisert helsepersonell med medisinsk
              bakgrunn — og et felles mål: naturlige resultater med faglig
              forsvarlighet.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Behandlerkort */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {behandlere.map((b, i) => (
            <AnimatedSection key={b.navn} delay={i * 0.15}>
              <Link href={b.href} className="group block h-full">
                <motion.div
                  whileHover={{
                    y: -4,
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.08)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-[#e8d5b0]/40 bg-white overflow-hidden hover:border-[#c9a96e]/40 transition-colors duration-300 h-full flex flex-col"
                >
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-[#ecddd0] to-[#c9a96e]/20">
                    {b.bilde ? (
                      <Image
                        src={b.bilde}
                        alt={b.navn}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={`object-cover ${b.bildePos} group-hover:scale-[1.02] transition-transform duration-500`}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-[#c9a96e]/60 text-sm text-center px-6">
                          Bilde av {b.navn}
                          <br />
                          <span className="text-xs text-[#c9a96e]/40">
                            Kommer snart
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <h2
                      className="text-xl mb-1 group-hover:text-[#c9a96e] transition-colors"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {b.navn}
                    </h2>
                    <p className="text-xs text-[#c9a96e] tracking-wide mb-4">
                      {b.tittel}
                    </p>
                    <p className="text-sm text-[#1a1a1a]/60 leading-relaxed mb-4">
                      {b.tekst}
                    </p>
                    <p className="text-xs text-[#1a1a1a]/40 mt-auto">
                      {b.fokus}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="text-center mt-16">
          <BookingButton label="Bestill time" />
        </AnimatedSection>
      </section>
    </>
  );
}
