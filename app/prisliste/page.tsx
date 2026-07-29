"use client";

import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";

const priskategorier = [
  {
    kategori: "Konsultasjon",
    items: [
      { navn: "Hudkonsultasjon", pris: "490,-", note: "Trekkes fra ved behandling/kjøp samme dag" },
    ],
  },
  {
    kategori: "Vipper & Bryn",
    items: [
      { navn: "Farging/forming vipper og bryn inkl. voks", pris: "590,-" },
      { navn: "Brynslaminering inkl. farge, forming og voks", pris: "890,-", note: "Varighet 4–8 uker" },
      { navn: "Farging og forming bryn inkl. voks", pris: "490,-" },
      { navn: "Farging vipper", pris: "290,-" },
    ],
  },
  {
    kategori: "Permanent Makeup",
    items: [
      { navn: "PMU Powderbrows inkl. refill", pris: "6.500,-", note: "Gjelder ikke studentrabatt" },
      { navn: "PMU Lepper inkl. refill", pris: "6.500,-", note: "Gjelder ikke studentrabatt" },
    ],
  },
  {
    kategori: "Hudbehandlinger",
    items: [
      { navn: "Kjemisk peeling", pris: "Pris ved konsultasjon" },
      { navn: "Microneedling (Dermapen)", pris: "Pris ved konsultasjon" },
      { navn: "Mesoterapi", pris: "Pris ved konsultasjon" },
    ],
  },
  {
    kategori: "Laserbehandlinger",
    items: [
      { navn: "Aknebehandling (Nd:YAG)", pris: "Pris ved konsultasjon" },
      { navn: "Blodkarbehandling", pris: "Pris ved konsultasjon" },
      { navn: "Hårfjerning med laser", pris: "Pris ved konsultasjon" },
      { navn: "Lipplaser", pris: "Pris ved konsultasjon" },
      { navn: "Øyelokk-laser", pris: "Pris ved konsultasjon" },
      { navn: "Rosacea-behandling", pris: "Pris ved konsultasjon" },
    ],
  },
  {
    kategori: "Injeksjonsbehandlinger",
    items: [
      { navn: "Restylane (filler)", pris: "Pris ved konsultasjon" },
      { navn: "Fjerning av filler", pris: "Pris ved konsultasjon" },
      {
        navn: "Muskelavslappende injeksjoner",
        pris: "Pris ved konsultasjon",
        note: "Gjelder ikke studentrabatt",
      },
      { navn: "PRP-behandling", pris: "Pris ved konsultasjon" },
    ],
  },
  {
    kategori: "Hudprodukter",
    items: [
      { navn: "Face Formula (tidl. Elixir Cosmeceuticals)", pris: "Fra 249,-", note: "Se hele utvalget i nettbutikken" },
      { navn: "ZO Skin Health", pris: "Fra 645,-", note: "Se hele utvalget i nettbutikken" },
      { navn: "ColoreScience", pris: "Fra 495,-", note: "Se hele utvalget i nettbutikken" },
    ],
  },
];

export default function PrislistePage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
              Oversikt
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Prisliste
            </h1>
            <p className="text-[#1a1a1a]/55 leading-relaxed">
              Alle priser er veiledende. Endelig pris avtales ved konsultasjon.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Studentrabatt-banner */}
      <div className="bg-[#3d4a3e] text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <span className="text-xs tracking-[0.2em] uppercase text-[#c9a96e]">
            Studentrabatt
          </span>
          <span className="text-sm text-white/80">
            20% rabatt på alle behandlinger med gyldig studentbevis.
            Gjelder ikke muskelavslappende injeksjoner og PMU.
          </span>
        </div>
      </div>

      {/* Prisliste */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {priskategorier.map((kat, i) => (
            <AnimatedSection key={kat.kategori} delay={i * 0.05}>
              <div>
                <h2
                  className="text-xl font-normal mb-1 text-[#1a1a1a]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {kat.kategori}
                </h2>
                <div className="h-px bg-[#e8d5b0]/60 mb-4" />
                <div className="space-y-1">
                  {kat.items.map((item) => (
                    <div
                      key={item.navn}
                      className="flex justify-between items-start gap-8 py-3 border-b border-[#faf9f7]"
                    >
                      <div>
                        <p className="text-sm text-[#1a1a1a]/80">{item.navn}</p>
                        {item.note && (
                          <p className="text-xs text-[#1a1a1a]/35 mt-0.5">
                            {item.note}
                          </p>
                        )}
                      </div>
                      <p className="text-sm font-medium text-[#c9a96e] whitespace-nowrap">
                        {item.pris}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}

          <AnimatedSection delay={0.4} className="pt-8 text-center">
            <p className="text-sm text-[#1a1a1a]/40 mb-8">
              Usikker på hvilken behandling som passer deg? Book en
              hudkonsultasjon — vi hjelper deg å finne riktig løsning.
            </p>
            <BookingButton label="Bestill konsultasjon — 490,-" />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
