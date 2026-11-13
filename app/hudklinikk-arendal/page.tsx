import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";
import { ORG, SITE_URL } from "@/lib/site";
import { LASER_FRA_PRIS, LASER_KONSULTASJON, LASER_NAVN } from "@/lib/laser";
import { getBehandling } from "@/lib/behandling-detaljer";

// Landingsside for søk fra Arendal («hudklinikk Arendal», «laserhårfjerning
// Arendal»). ÉN slik side, med ekte nytte: kjørevei, åpningstider og hva som
// skiller klinikken. Ikke kopier den til Lillesand, Tvedestrand osv. — en
// rekke nesten like stedssider er det Google kaller «doorway pages», og kan
// trekke hele nettstedet ned.

const TITTEL = "Hudklinikk og laserhårfjerning nær Arendal";
const BESKRIVELSE =
  "Hud by Helseblikk ligger i Grimstad sentrum, rundt 20 minutter fra Arendal. Laserhårfjerning med Candela GentleMAX Pro Plus, injeksjoner og hudbehandlinger.";

export const metadata: Metadata = {
  title: TITTEL,
  description: BESKRIVELSE,
  alternates: { canonical: "/hudklinikk-arendal" },
  openGraph: {
    title: `${TITTEL} | Hud by Helseblikk`,
    description: BESKRIVELSE,
    url: "/hudklinikk-arendal",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

const GRUNNER = [
  {
    tittel: "Laser med to bølgelengder",
    tekst: `${LASER_NAVN} har både alexandrit (755 nm) og Nd:YAG (1064 nm) i samme maskin. Vi velger bølgelengde etter huden din, så laseren kan brukes på alle hudtyper. Kjølespray før hvert skudd demper ubehaget.`,
  },
  {
    tittel: "Medisinsk klinikk",
    tekst:
      "Behandlingene utføres av kosmetiske sykepleiere, med lege Débora Dias De Oliveira som medisinsk ansvarlig. Er vi i tvil om noe i huden din, ser legen på det først.",
  },
  {
    tittel: "Åpne priser",
    tekst: `Hele prislisten ligger på nettsiden. Laserhårfjerning koster fra ${LASER_FRA_PRIS} per behandling, og konsultasjon ${LASER_KONSULTASJON.pris} som trekkes fra når du gjennomfører behandling.`,
  },
];

const BEHANDLINGER: { navn: string; tekst: string; href: string }[] = [
  {
    navn: "Laserhårfjerning",
    tekst: `Ansikt og kropp, fra ${LASER_FRA_PRIS} per behandling. Pakkepris på flere områder.`,
    href: "/laser",
  },
  ...["laserharfjerning-menn", "laser-blodkar", "filler", "muskelavslappende-behandling", "profhilo", "dermapen", "kjemisk-peeling", "hudkonsultasjon"]
    .map((slug) => getBehandling(slug))
    .filter((b): b is NonNullable<typeof b> => Boolean(b))
    .map((b) => ({ navn: b.kortNavn ?? b.navn, tekst: b.pris, href: `/behandlinger/${b.slug}` })),
];

const APNINGSTIDER = [
  ["Mandag", "09–18"],
  ["Tirsdag", "09–16"],
  ["Onsdag", "09–17"],
  ["Torsdag", "09–16"],
  ["Fredag", "09–16"],
];

export default function HudklinikkArendalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hud by Helseblikk", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Nær Arendal", item: `${SITE_URL}/hudklinikk-arendal` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="pt-32 pb-14 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
              Grimstad · rundt 20 minutter fra Arendal
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-5 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {TITTEL}
            </h1>
            <p className="text-[#1a1a1a]/65 leading-relaxed text-lg max-w-xl mx-auto mb-7">
              Hud by Helseblikk er en medisinsk hudklinikk på Oddensenteret i Grimstad sentrum,
              en kort kjøretur på E18 fra Arendal.
            </p>
            <BookingButton label="Bestill time" />
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-normal mb-10 text-center"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Derfor er det verdt turen
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GRUNNER.map((g, i) => (
              <AnimatedSection key={g.tittel} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-[#e8d5b0]/40 bg-white p-7">
                  <h3 className="text-xl font-normal mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
                    {g.tittel}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#1a1a1a]/65">{g.tekst}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-normal mb-10 text-center"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Behandlinger
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BEHANDLINGER.map((b) => (
              <Link
                key={b.href}
                href={b.href}
                className="group rounded-2xl border border-[#e8d5b0]/30 bg-[#faf9f7] p-6 transition-all hover:-translate-y-0.5 hover:border-[#c9a96e]/40"
              >
                <h3 className="text-lg font-normal mb-1.5" style={{ fontFamily: "var(--font-playfair)" }}>
                  {b.navn}
                </h3>
                <p className="text-sm text-[#1a1a1a]/65 mb-3">{b.tekst}</p>
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#8f6b28]">
                  Les mer <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[#1a1a1a]/65">
            Se alle{" "}
            <Link href="/behandlinger" className="underline underline-offset-4 hover:text-[#8f6b28]">
              behandlinger
            </Link>{" "}
            og hele{" "}
            <Link href="/prisliste" className="underline underline-offset-4 hover:text-[#8f6b28]">
              prislisten
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-normal mb-5" style={{ fontFamily: "var(--font-playfair)" }}>
              Slik finner du oss fra Arendal
            </h2>
            <p className="text-sm leading-relaxed text-[#1a1a1a]/65 mb-5">
              Følg E18 vestover mot Kristiansand og ta av mot Grimstad sentrum. Klinikken ligger på
              Oddensenteret, rett ved havna. Kjøreturen er på omtrent 20 kilometer.
            </p>
            <p className="flex items-start gap-2.5 text-sm text-[#1a1a1a]/80">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#8f6b28]" />
              <a
                href="https://maps.google.com/maps?q=Odden+1D,+4876+Grimstad"
                className="underline underline-offset-4 hover:text-[#8f6b28]"
              >
                {ORG.address}
              </a>
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-normal mb-5" style={{ fontFamily: "var(--font-playfair)" }}>
              Åpningstider
            </h2>
            <ul className="space-y-2 text-sm text-[#1a1a1a]/80">
              {APNINGSTIDER.map(([dag, tid]) => (
                <li key={dag} className="flex items-center justify-between border-b border-[#e8d5b0]/40 pb-2">
                  <span className="flex items-center gap-2.5">
                    <Clock size={14} className="text-[#8f6b28]" />
                    {dag}
                  </span>
                  <span>{tid}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-[#1a1a1a]/65">
              Mandag har vi åpent til 18, så du rekker en time etter jobb.
            </p>
          </AnimatedSection>
        </div>
        <AnimatedSection className="mt-14 text-center">
          <BookingButton label="Bestill time" />
        </AnimatedSection>
      </section>
    </>
  );
}
