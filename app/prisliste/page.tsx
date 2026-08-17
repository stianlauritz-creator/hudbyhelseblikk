"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";

interface Prisrad {
  navn: string;
  pris: string;
  note?: string;
}

interface Priskategori {
  kategori: string;
  items?: Prisrad[];
  /** Egne underkategorier under samme overskrift (f.eks. injeksjoner) */
  underkategorier?: { tittel: string; items: Prisrad[] }[];
}

const priskategorier: Priskategori[] = [
  {
    kategori: "Konsultasjon",
    items: [
      {
        navn: "Hudkonsultasjon",
        pris: "490,-",
        note: "Trekkes fra ved gjennomført behandling eller produktkjøp over 1.500,-",
      },
    ],
  },
  {
    kategori: "Vipper & Bryn",
    items: [
      { navn: "Farging/forming vipper og bryn inkl. voks", pris: "690,-" },
      { navn: "Brynslaminering inkl. farge, forming og voks", pris: "890,-", note: "Varighet 4–8 uker" },
      { navn: "Farging og forming bryn inkl. voks", pris: "590,-" },
      { navn: "Farging vipper", pris: "290,-" },
    ],
  },
  {
    kategori: "Hudbehandlinger",
    items: [
      {
        navn: "Kjemisk peeling",
        pris: "1.500,- – 2.000,-",
        note: "Vi har flere typer — peelingen tilpasses huden din og ønsket ditt",
      },
      { navn: "Microneedling (Dermapen)", pris: "Fra 2.690,-", note: "Kurpris ved 3 behandlinger — spør oss" },
      { navn: "Mesoterapi", pris: "Fra 1.900,-" },
    ],
  },
  {
    kategori: "Injeksjonsbehandlinger",
    underkategorier: [
      {
        tittel: "Medisinsk rynkebehandling",
        items: [
          { navn: "Lite område", pris: "1.400,-" },
          { navn: "1 område", pris: "2.000,-" },
          { navn: "2 områder", pris: "3.400,-" },
          { navn: "3 områder", pris: "4.300,-" },
          { navn: "Anspent kjeve / tanngnissing", pris: "3.600,-" },
          { navn: "Svettebehandling", pris: "4.600,-" },
        ],
      },
      {
        tittel: "Filler",
        items: [
          { navn: "Leppebehandling", pris: "2.400,- – 3.400,-", note: "Pris etter mengde og ønsket resultat" },
          { navn: "Volumbehandling", pris: "3.600,-" },
          { navn: "Skinbooster 1 ml", pris: "2.900,-" },
          { navn: "Skinbooster 2 ml", pris: "5.200,-" },
          { navn: "Fjerning av filler", pris: "1.500,-" },
        ],
      },
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

function Prisrader({ items, erProdukt }: { items: Prisrad[]; erProdukt: boolean }) {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div
          key={item.navn}
          className="group flex items-start justify-between gap-6 border-b border-[#faf9f7] py-3"
        >
          <div className="min-w-0">
            <p className="text-sm text-[#1a1a1a]/80">{item.navn}</p>
            {item.note && (
              <p className="mt-0.5 text-xs text-[#1a1a1a]/35">{item.note}</p>
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
      ))}
    </div>
  );
}

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
            Gjelder ikke medisinsk rynkebehandling.
          </span>
        </div>
      </div>

      {/* Prisliste */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {priskategorier.map((kat, i) => {
            const erProdukt = kat.kategori === "Hudprodukter";
            return (
              <AnimatedSection key={kat.kategori} delay={i * 0.05}>
                <div>
                  <h2
                    className="text-xl font-normal mb-1 text-[#1a1a1a]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {kat.kategori}
                  </h2>
                  <div className="h-px bg-[#e8d5b0]/60 mb-4" />

                  {kat.items && (
                    <Prisrader items={kat.items} erProdukt={erProdukt} />
                  )}

                  {kat.underkategorier?.map((under, ui) => (
                    <div key={under.tittel} className={ui > 0 ? "mt-8" : ""}>
                      <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#8f6b28]">
                        {under.tittel}
                      </p>
                      <Prisrader items={under.items} erProdukt={false} />
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            );
          })}

          <AnimatedSection delay={0.4} className="pt-8 text-center">
            <p className="text-sm text-[#1a1a1a]/65 mb-8">
              Usikker på hvilken behandling som passer deg? Book en
              hudkonsultasjon til 490,- — beløpet trekkes fra igjen når du
              gjennomfører en behandling eller handler produkter for over
              1.500,-.
            </p>
            <BookingButton label="Bestill hudkonsultasjon" />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
