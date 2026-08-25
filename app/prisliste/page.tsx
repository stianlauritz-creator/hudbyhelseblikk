"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";

interface Prisrad {
  navn: string;
  pris: string;
  note?: string;
  /** Tilleggsvalg som ikke bestilles alene — da gir «Bestill» ingen mening */
  utenBestill?: boolean;
}

interface Priskategori {
  kategori: string;
  /** Kort forklaring under kategorioverskriften (f.eks. mva-forbehold) */
  intro?: string;
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
        pris: "Fra 1.500,-",
        note: "Vi har flere typer — 1.500,- til 2.000,- avhengig av type og styrke",
      },
      { navn: "ZO Stimulation Peel", pris: "2.100,-" },
      { navn: "Face Formula signaturbehandling", pris: "1.900,-" },
      { navn: "Mesoterapi", pris: "Fra 1.900,-" },
    ],
    underkategorier: [
      {
        tittel: "Microneedling (Dermapen)",
        items: [
          { navn: "Microneedling (Dermapen)", pris: "2.690,-", note: "Kurpris ved 3 behandlinger — spør oss" },
          { navn: "Microneedling (Dermapen) med mesoterapi", pris: "3.690,-" },
          { navn: "Microneedling (Dermapen) med eksosomer", pris: "3.890,-" },
        ],
      },
      {
        tittel: "Tillegg til microneedling",
        items: [
          { navn: "Kjemisk peel i samme behandling", pris: "800,-", utenBestill: true },
          { navn: "Ekstra område (hals eller bryst)", pris: "800,-", utenBestill: true },
          { navn: "LED-lys", pris: "300,-", utenBestill: true },
        ],
      },
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
    kategori: "Plastikkirurgi (lokalbedøvelse)",
    intro:
      "Utføres av plastikkirurg og overlege Ole Arvid F. Østerud. Prisene under er inkludert mva (25 %), som gjelder for rent kosmetiske inngrep. Er inngrepet medisinsk begrunnet, er det som regel fritatt for mva — og dermed billigere. Konsultasjonen avgjør hva som gjelder for deg.",
    items: [
      { navn: "Øyelokksoperasjon", pris: "27.500,-" },
      { navn: "Øyebrynsløft", pris: "43.750,-" },
      { navn: "Korreksjon av utstående ører (begge sider)", pris: "43.750,-" },
      { navn: "Korreksjon av utstående ører (én side)", pris: "31.250,-" },
      { navn: "Øreforminskning (begge sider)", pris: "43.750,-" },
      { navn: "Forminskning av øreflipp", pris: "25.000,-" },
      {
        navn: "Korreksjon av splittet/skadet øreflipp (én side)",
        pris: "6.250,-",
      },
      { navn: "Arrkorreksjon inntil 5 cm", pris: "12.500,-" },
      { navn: "Arrkorreksjon inntil 10 cm", pris: "31.250,-" },
      {
        navn: "Fettransplantasjon",
        pris: "56.250,-",
        note: "Brukes blant annet sammen med arrkorreksjon",
      },
      { navn: "Føflekkfjerning med penest mulig arr", pris: "12.500,-" },
      { navn: "Rekonstruksjon av brystvorte", pris: "43.750,-" },
      { navn: "Korreksjon av inndratt brystvorte", pris: "12.500,-" },
      {
        navn: "Konsultasjon hos plastikkirurg",
        pris: "1.500,-",
        note: "Trekkes fra ved inngrep",
      },
      {
        navn: "Second opinion med skriftlig tilbakemelding",
        pris: "18.750,-",
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

/**
 * Hvor «Bestill»-knappen peker:
 *  - booking:  Timma-timeboken
 *  - produkt:  nettbutikken
 *  - kirurgi:  /plastikkirurgi — Ole Arvid ligger ikke i Timma (PasientSky),
 *              og alle inngrep starter med konsultasjon.
 */
type RadVariant = "booking" | "produkt" | "kirurgi";

const RAD_LENKE: Record<RadVariant, { href: string; label: string }> = {
  booking: { href: "/bestill-time", label: "Bestill" },
  produkt: { href: "/nettbutikk", label: "Se i butikk" },
  kirurgi: { href: "/plastikkirurgi", label: "Les mer" },
};

function Prisrader({
  items,
  variant = "booking",
}: {
  items: Prisrad[];
  variant?: RadVariant;
}) {
  const lenke = RAD_LENKE[variant];
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div
          key={item.navn}
          className="group flex items-start justify-between gap-6 border-b border-[#faf9f7] py-3"
        >
          <div className="min-w-0">
            <p className="text-sm text-[#1a1a1a]/80">{item.navn}</p>
            {/* Dempet tekst skal ikke være lysere enn /65 (var /35). */}
            {item.note && (
              <p className="mt-0.5 text-xs text-[#1a1a1a]/65">{item.note}</p>
            )}
          </div>
          <div className="flex flex-shrink-0 items-center gap-4">
            <p className="whitespace-nowrap text-sm font-medium text-[#8f6b28]">
              {item.pris}
            </p>
            {item.utenBestill ? null : (
            <Link
              href={lenke.href}
              aria-label={
                variant === "produkt"
                  ? `Se ${item.navn} i nettbutikken`
                  : variant === "kirurgi"
                    ? `Les mer om ${item.navn} hos plastikkirurgen`
                    : `Bestill time for ${item.navn}`
              }
              className="whitespace-nowrap rounded-full border border-[#e8d5b0] px-3.5 py-1.5 text-xs tracking-wide text-[#1a1a1a]/65 transition-colors hover:border-[#c9a96e] hover:bg-[#8f6b28] hover:text-white"
            >
              {lenke.label}
            </Link>
            )}
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
          {/* Mørk bakgrunn ⇒ den lyse gulltonen. #8f6b28 gir bare 2,4:1 her,
              og #c9a96e 4,2:1 — under AA. #e5c78f gir 5,7:1. */}
          <span className="text-xs tracking-[0.2em] uppercase text-[#e5c78f]">
            Studentrabatt
          </span>
          <span className="text-sm text-white/80">
            20% rabatt på hud-, vippe- og brynsbehandlinger med gyldig
            studentbevis. Gjelder ikke medisinsk rynkebehandling eller
            plastikkirurgi.
          </span>
        </div>
      </div>

      {/* Prisliste */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          {priskategorier.map((kat, i) => {
            const variant: RadVariant =
              kat.kategori === "Hudprodukter"
                ? "produkt"
                : kat.kategori.startsWith("Plastikkirurgi")
                  ? "kirurgi"
                  : "booking";
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

                  {kat.intro && (
                    <p className="mb-5 max-w-xl text-sm leading-relaxed text-[#1a1a1a]/65">
                      {kat.intro}
                    </p>
                  )}

                  {kat.items && (
                    <Prisrader items={kat.items} variant={variant} />
                  )}

                  {kat.underkategorier?.map((under, ui) => (
                    <div key={under.tittel} className={ui > 0 ? "mt-8" : ""}>
                      <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#8f6b28]">
                        {under.tittel}
                      </p>
                      <Prisrader items={under.items} />
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
