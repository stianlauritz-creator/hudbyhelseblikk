"use client";

import Link from "next/link";
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
    kategori: "Hudbehandlinger",
    items: [
      { navn: "Kjemisk peeling", pris: "Fra 1.500,-", note: "ZO-peeling tilpasset din hud — type avklares ved konsultasjon" },
      { navn: "Microneedling (Dermapen)", pris: "Fra 2.690,-", note: "Kurpris ved 3 behandlinger — spør oss" },
      { navn: "Mesoterapi", pris: "Fra 1.900,-" },
    ],
  },
  {
    kategori: "Laserbehandlinger",
    items: [
      { navn: "Aknebehandling (Nd:YAG)", pris: "Fra 1.800,-", note: "Flere behandlinger anbefales — kurpris ved konsultasjon" },
      { navn: "Blodkarbehandling", pris: "Fra 1.500,-" },
      { navn: "Hårfjerning med laser", pris: "Fra 650,- pr. område", note: "Pris avhenger av områdets størrelse — se full oversikt ved booking" },
      { navn: "Lipplaser", pris: "Fra 1.900,-" },
      { navn: "Øyelokk-laser", pris: "Fra 2.900,-" },
      { navn: "Rosacea-behandling", pris: "Fra 1.900,-" },
    ],
  },
  {
    kategori: "Injeksjonsbehandlinger",
    items: [
      { navn: "Restylane (filler)", pris: "Fra 2.400,- (0,5 ml)", note: "1 ml fra 3.500,- — prises per ml" },
      { navn: "Fjerning av filler", pris: "1.500,-" },
      {
        navn: "Muskelavslappende injeksjoner — 1 område",
        pris: "2.200,-",
        note: "Gjelder ikke studentrabatt",
      },
      {
        navn: "Muskelavslappende injeksjoner — 2 områder",
        pris: "3.400,-",
        note: "Gjelder ikke studentrabatt",
      },
      {
        navn: "Muskelavslappende injeksjoner — 3 områder",
        pris: "4.300,-",
        note: "Gjelder ikke studentrabatt",
      },
      { navn: "PRP-behandling", pris: "Fra 3.900,-" },
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
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
              Oversikt
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Prisliste
            </h1>
            <p className="text-[#1a1a1a]/65 leading-relaxed">
              Alle priser er veiledende. Endelig pris avtales ved konsultasjon.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Studentrabatt-banner */}
      <div className="bg-[#3d4a3e] text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <span className="text-xs tracking-[0.2em] uppercase text-[#8f6b28]">
            Studentrabatt
          </span>
          <span className="text-sm text-white/80">
            20% rabatt på alle behandlinger med gyldig studentbevis.
            Gjelder ikke muskelavslappende injeksjoner.
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
                  {kat.items.map((item) => {
                    const erProdukt = kat.kategori === "Hudprodukter";
                    return (
                      <div
                        key={item.navn}
                        className="group flex items-start justify-between gap-6 border-b border-[#faf9f7] py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm text-[#1a1a1a]/80">{item.navn}</p>
                          {item.note && (
                            <p className="mt-0.5 text-xs text-[#1a1a1a]/35">
                              {item.note}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-4">
                          <p className="whitespace-nowrap text-sm font-medium text-[#8f6b28]">
                            {item.pris}
                          </p>
                          <Link
                            href={erProdukt ? "/nettbutikk" : "/bestill-time"}
                            aria-label={
                              erProdukt
                                ? `Se ${item.navn} i nettbutikken`
                                : `Bestill time for ${item.navn}`
                            }
                            className="whitespace-nowrap rounded-full border border-[#e8d5b0] px-3.5 py-1.5 text-xs tracking-wide text-[#1a1a1a]/65 transition-colors hover:border-[#c9a96e] hover:bg-[#8f6b28] hover:text-white"
                          >
                            {erProdukt ? "Se i butikk" : "Bestill"}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}

          <AnimatedSection delay={0.4} className="pt-8 text-center">
            <p className="text-sm text-[#1a1a1a]/65 mb-8">
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
