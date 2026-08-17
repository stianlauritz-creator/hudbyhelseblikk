import Image from "next/image";
import {
  Ban,
  Check,
  ClipboardList,
  ExternalLink,
  FileText,
  Hospital,
  Info,
  ShieldCheck,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { SITE_URL } from "@/lib/site";
import {
  ERFARING,
  ETTER_INNGREPET,
  FAQ,
  FORLOP,
  FOR_INNGREPET,
  HELSEBLIKK_PLASTIKKIRURGI_URL,
  HOS_HELSEBLIKK,
  INNGREP,
  PASIENTSKY_BOOKING_URL,
  PRISER,
} from "@/lib/plastikkirurgi";

/**
 * Booking hos Ole Arvid går via PasientSky — samme lenke som på helseblikk.no.
 * Derfor en helt vanlig ekstern lenke, ikke <BookingButton /> (Timma).
 */
function BookingLenke({
  label = "Bestill time hos Ole Arvid",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={PASIENTSKY_BOOKING_URL}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-2 rounded-full bg-[#8f6b28] px-8 py-4 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-[#7a5b20] ${className}`}
    >
      {label}
      <ExternalLink size={15} className="shrink-0" aria-hidden />
    </a>
  );
}

const nokkelfakta = [
  {
    icon: Ban,
    label: "Kun lokalbedøvelse",
    verdi: "Ingen narkose — du reiser hjem samme dag",
  },
  {
    icon: FileText,
    label: "Ingen henvisning",
    verdi: "Bestill time direkte",
  },
  {
    icon: Stethoscope,
    label: "Plastikkirurg og overlege",
    verdi: "Kort ventetid i Grimstad",
  },
];

export default function PlastikkirurgiPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: "Ole Arvid F. Østerud",
      jobTitle: "Plastikkirurg og overlege",
      medicalSpecialty: "PlasticSurgery",
      url: `${SITE_URL}/plastikkirurgi`,
      image: `${SITE_URL}/ole-arvid.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Odden 1D",
        postalCode: "4876",
        addressLocality: "Grimstad",
        addressCountry: "NO",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Plastikkirurgi",
          item: `${SITE_URL}/plastikkirurgi`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
              Plastikkirurgi
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-5 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Estetisk plastikkirurgi i Grimstad
            </h1>
            <p className="text-[#1a1a1a]/65 leading-relaxed text-lg max-w-xl mx-auto mb-4">
              Øyelokk, ører, arr og føflekker — små, presise inngrep i
              lokalbedøvelse hos plastikkirurg og overlege Ole Arvid F. Østerud.
            </p>
            <p className="text-sm text-[#1a1a1a]/65 mb-8">
              Ingen henvisning nødvendig. Åpne priser. Kort ventetid.
            </p>
            <div className="flex flex-col items-center gap-3">
              <BookingLenke />
              <p className="text-xs text-[#1a1a1a]/65">
                Timeboken til Ole Arvid åpnes hos Helseblikk i nytt vindu
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Nøkkelfakta */}
      <section className="px-6 -mt-7">
        <AnimatedSection eager className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {nokkelfakta.map((f) => (
              <div
                key={f.label}
                className="flex items-start gap-3 bg-white rounded-2xl border border-[#e8d5b0]/40 px-5 py-4"
              >
                <f.icon size={18} className="text-[#8f6b28] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/65">
                    {f.label}
                  </p>
                  <p className="text-sm text-[#1a1a1a]/80 leading-snug">
                    {f.verdi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Kun lokalbedøvelse — tydelig, ikke fotnote */}
      <section className="px-6 pt-14">
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-[#1e2d3d] px-7 py-8 md:px-10 md:py-10">
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-3">
              Viktig å vite
            </p>
            <h2
              className="text-2xl md:text-3xl font-normal text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Vi gjør kun inngrep i lokalbedøvelse
            </h2>
            <p className="text-white/80 leading-relaxed">
              Alt som utføres hos oss gjøres med lokalbedøvelse. Du er våken
              under inngrepet og kan reise hjem samme dag. Inngrep som krever
              narkose gjør vi ikke her — de blir vurdert grundig på
              konsultasjonen, og Ole Arvid hjelper deg videre med henvisning til
              sykehus hvis det er riktig for deg.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Om Ole Arvid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <AnimatedSection direction="left" className="md:sticky md:top-28">
            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-[#ecddd0] to-[#c9a96e]/20 relative overflow-hidden">
              <Image
                src="/ole-arvid.jpg"
                alt="Ole Arvid F. Østerud, plastikkirurg og overlege"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                preload
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2d3d]/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-sm rounded-xl p-4">
                <p
                  className="text-sm font-normal"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Ole Arvid F. Østerud
                </p>
                <p className="text-xs text-[#8f6b28] mt-0.5">
                  Plastikkirurg og overlege
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-10">
            <AnimatedSection direction="right">
              <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
                Din kirurg
              </p>
              <h2
                className="text-2xl md:text-3xl font-normal mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Om Ole Arvid
              </h2>
              <div className="space-y-4 text-[#1a1a1a]/65 leading-relaxed">
                <p>
                  Ole Arvid F. Østerud er plastikkirurg og overlege med bred
                  erfaring fra offentlig sykehus. Han har jobbet ved
                  Universitetssykehuset Nord-Norge, Rikshospitalet og Oslo
                  universitetssykehus, Sykehuset Telemark og
                  Helgelandssykehuset, der han var fagansvarlig overlege.
                </p>
                <p>
                  Han har ledet flere forskningsprosjekter som er publisert i
                  norske og internasjonale fagfora, og har vært representert i
                  Norsk plastikkirurgisk forening. Ansiktskirurgi er et av hans
                  særskilte kompetanseområder, og en av nisjene hans er presis
                  kirurgi der detaljene avgjør sluttresultatet.
                </p>
                <p>
                  Ole Arvid legger stor vekt på god kommunikasjon, grundige
                  forklaringer og realistiske forventninger. Du skal forstå hva
                  som skal gjøres, hva du kan forvente og hva det koster, før du
                  bestemmer deg.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div className="p-6 rounded-2xl bg-[#faf9f7] border border-[#e8d5b0]/30">
                <p
                  className="text-lg font-normal mb-1 text-[#8f6b28] italic leading-snug"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  «Alle problemstillinger tas på alvor og vurderes grundig.»
                </p>
                <p className="text-sm text-[#1a1a1a]/65 mt-4 leading-relaxed">
                  Mange går lenge med plager som påvirker selvfølelse, komfort
                  eller livskvalitet, fordi de tror problemet er «for lite» til
                  å ta opp. Det er det sjelden.
                </p>
                <p className="text-xs text-[#1a1a1a]/65 mt-3">
                  — Ole Arvids filosofi
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <h3
                className="text-xl font-normal mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Erfaring
              </h3>
              <ul className="space-y-2.5">
                {ERFARING.map((e) => (
                  <li
                    key={e}
                    className="flex items-start gap-3 text-sm text-[#1a1a1a]/65"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8f6b28] flex-shrink-0 mt-1.5" />
                    {e}
                  </li>
                ))}
              </ul>
              <ul className="mt-2.5 space-y-2.5">
                <li className="flex items-start gap-3 text-sm text-[#1a1a1a]/65">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3d4a3e] flex-shrink-0 mt-1.5" />
                  Har ledet forskningsprosjekter publisert i norske og
                  internasjonale fagfora
                </li>
                <li className="flex items-start gap-3 text-sm text-[#1a1a1a]/65">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3d4a3e] flex-shrink-0 mt-1.5" />
                  Har vært representert i Norsk plastikkirurgisk forening
                </li>
                <li className="flex items-start gap-3 text-sm text-[#1a1a1a]/65">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3d4a3e] flex-shrink-0 mt-1.5" />
                  Særskilt kompetanse innen ansiktskirurgi
                </li>
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="pt-4 border-t border-[#e8d5b0]/30">
                <BookingLenke label="Bestill konsultasjon" />
                <p className="mt-3 text-xs text-[#1a1a1a]/65">
                  Bookingen ligger hos Helseblikk og åpnes i nytt vindu.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Inngrep */}
      <section className="py-16 px-6 bg-[#f5f2ed]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="max-w-2xl mb-10">
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
              Estetiske inngrep
            </p>
            <h2
              className="text-3xl md:text-4xl font-normal mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Dette kan vi gjøre for deg
            </h2>
            <p className="text-[#1a1a1a]/65 leading-relaxed">
              Alle inngrepene under utføres i lokalbedøvelse på klinikken i
              Grimstad. Prisen som står er ink. mva — den som gjelder for rent
              kosmetiske inngrep. Er problemstillingen medisinsk begrunnet blir
              prisen lavere, og det avgjøres på konsultasjonen.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INNGREP.map((i, idx) => (
              <AnimatedSection key={i.navn} delay={Math.min(idx, 5) * 0.05}>
                <div className="h-full rounded-2xl bg-white border border-[#e8d5b0]/30 p-6 flex flex-col">
                  <h3
                    className="text-lg font-normal leading-snug mb-3"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {i.navn}
                  </h3>
                  <p className="text-sm text-[#1a1a1a]/65 leading-relaxed flex-1">
                    {i.beskrivelse}
                  </p>
                  <div className="mt-5 pt-4 border-t border-[#e8d5b0]/40 flex items-baseline justify-between gap-3">
                    <span className="text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/65">
                      Fra
                    </span>
                    <span className="text-sm font-medium text-[#8f6b28]">
                      {i.pris}{" "}
                      <span className="font-normal text-[#1a1a1a]/65">
                        ink. mva
                      </span>
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Priser */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
              Åpne priser
            </p>
            <h2
              className="text-3xl md:text-4xl font-normal mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Priser
            </h2>
            <div className="rounded-2xl bg-[#faf9f7] border border-[#e8d5b0]/40 p-6 mb-8">
              <div className="flex items-start gap-3">
                <Info
                  size={18}
                  className="text-[#8f6b28] shrink-0 mt-0.5"
                  aria-hidden
                />
                <div className="space-y-3 text-sm text-[#1a1a1a]/65 leading-relaxed">
                  <p>
                    <span className="text-[#1a1a1a]/80">
                      Hvorfor to priser?
                    </span>{" "}
                    Førstekonsultasjonen avgjør om inngrepet regnes som
                    medisinsk begrunnet eller kosmetisk, og det bestemmer
                    momsen. Medisinsk begrunnede inngrep er som regel
                    mva-frie, og prisen blir da eks. mva. Rent kosmetiske
                    inngrep er mva-pliktige, og da kommer 25 % mva i tillegg.
                  </p>
                  <p>
                    Prisen i gull under er ink. mva, siden det er den som
                    gjelder for de fleste estetiske inngrep. Du får tydelig
                    beskjed om hva som gjelder for deg, og endelig pris, før noe
                    avtales.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            <div className="rounded-2xl border border-[#e8d5b0]/40 bg-white px-6 py-2">
              {PRISER.map((rad) => (
                <div
                  key={rad.navn}
                  className="flex flex-col gap-1.5 border-b border-[#faf9f7] py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <div className="min-w-0">
                    <p className="text-sm text-[#1a1a1a]/80">{rad.navn}</p>
                    {rad.note && (
                      <p className="mt-0.5 text-xs text-[#1a1a1a]/65">
                        {rad.note}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-shrink-0 items-baseline gap-3 sm:flex-col sm:items-end sm:gap-0.5">
                    <p className="whitespace-nowrap text-sm font-medium text-[#8f6b28]">
                      {rad.inkMva}{" "}
                      <span className="font-normal text-[#1a1a1a]/65">
                        ink. mva
                      </span>
                    </p>
                    <p className="whitespace-nowrap text-xs text-[#1a1a1a]/65">
                      {rad.eksMva} eks. mva
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#1a1a1a]/65">
              Alle priser er veiledende. Endelig pris avtales på konsultasjonen,
              før noe bestilles.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Slik foregår det */}
      <section className="py-16 px-6 bg-[#f5f2ed]">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-normal mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Slik foregår det
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="space-y-5">
              {FORLOP.map((steg, i) => (
                <div key={steg.tittel} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-[#c9a96e]/15 text-[#8f6b28] flex items-center justify-center text-sm font-medium shrink-0">
                      {i + 1}
                    </div>
                    {i < FORLOP.length - 1 && (
                      <div className="w-px flex-1 bg-[#e8d5b0]/70 my-1" />
                    )}
                  </div>
                  <div className="pb-2">
                    <h3
                      className="font-normal text-lg mb-1"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {steg.tittel}
                    </h3>
                    <p className="text-sm text-[#1a1a1a]/65 leading-relaxed">
                      {steg.tekst}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Forberedelse og restitusjon */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="max-w-2xl mb-9">
            <h2
              className="text-3xl md:text-4xl font-normal mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Forberedelse og restitusjon
            </h2>
            <p className="text-[#1a1a1a]/65 leading-relaxed">
              Du får alltid råd tilpasset ditt inngrep. Dette er hovedreglene.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatedSection>
              <div className="h-full p-7 rounded-2xl bg-white border border-[#e8d5b0]/30">
                <div className="flex items-center gap-3 mb-5">
                  <ClipboardList
                    size={18}
                    className="text-[#8f6b28] shrink-0"
                    aria-hidden
                  />
                  <p className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/65">
                    Før inngrepet
                  </p>
                </div>
                <ul className="space-y-3.5">
                  {FOR_INNGREPET.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-sm text-[#1a1a1a]/65 leading-relaxed"
                    >
                      <Check
                        size={16}
                        className="text-[#8f6b28] shrink-0 mt-0.5"
                        aria-hidden
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.08}>
              <div className="h-full p-7 rounded-2xl bg-[#faf9f7] border border-[#e8d5b0]/30">
                <div className="flex items-center gap-3 mb-5">
                  <ShieldCheck
                    size={18}
                    className="text-[#8f6b28] shrink-0"
                    aria-hidden
                  />
                  <p className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/65">
                    Etter inngrepet
                  </p>
                </div>
                <ul className="space-y-3.5">
                  {ETTER_INNGREPET.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-sm text-[#1a1a1a]/65 leading-relaxed"
                    >
                      <Check
                        size={16}
                        className="text-[#8f6b28] shrink-0 mt-0.5"
                        aria-hidden
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trygghet og risiko */}
      <section className="py-16 px-6 bg-[#f5f2ed]">
        <div className="max-w-3xl mx-auto space-y-5">
          <AnimatedSection>
            <div className="p-7 md:p-9 rounded-2xl bg-white border border-[#e8d5b0]/40">
              <div className="flex items-center gap-3 mb-5">
                <TriangleAlert
                  size={18}
                  className="text-[#8f6b28] shrink-0"
                  aria-hidden
                />
                <p className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/65">
                  Trygghet og risiko
                </p>
              </div>
              <h2
                className="text-2xl md:text-3xl font-normal mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Alle inngrep innebærer en risiko
              </h2>
              <div className="space-y-4 text-[#1a1a1a]/65 leading-relaxed">
                <p>
                  Selv små inngrep kan gi hevelse, blåmerker, infeksjon,
                  blødning, endret følelse i huden, eller arr som ikke blir helt
                  som forventet. Det skal du kjenne til før du bestemmer deg.
                </p>
                <p>
                  Ole Arvid går grundig gjennom fordeler, ulemper og realistiske
                  forventninger med deg, og påtar seg bare inngrep han mener er
                  medisinsk forsvarlige. Er svaret at et inngrep ikke bør
                  gjøres, sier han det.
                </p>
              </div>
              <ul className="mt-6 space-y-3 border-t border-[#e8d5b0]/40 pt-6">
                {[
                  "Kosmetiske inngrep utføres ikke på personer under 18 år.",
                  "For kosmetiske inngrep får du alltid betenkningstid mellom konsultasjon og inngrep.",
                  "Inngrep som krever narkose henvises til sykehus.",
                ].map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 text-sm text-[#1a1a1a]/70 leading-relaxed"
                  >
                    <Check
                      size={16}
                      className="text-[#8f6b28] shrink-0 mt-0.5"
                      aria-hidden
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Dekkes det av det offentlige? */}
          <AnimatedSection delay={0.08}>
            <div className="p-7 md:p-9 rounded-2xl bg-gradient-to-br from-[#f5ede4] to-[#faf9f7] border border-[#e8d5b0]/30">
              <h2
                className="text-2xl md:text-3xl font-normal mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Dekkes det av det offentlige?
              </h2>
              <div className="space-y-4 text-[#1a1a1a]/65 leading-relaxed">
                <p>
                  De fleste estetisk begrunnede inngrep dekkes ikke av det
                  offentlige, og betales av deg selv.
                </p>
                <p>
                  Har problemstillingen en medisinsk begrunnelse, kan den ofte
                  behandles i det offentlige helsevesenet. Da hjelper Ole Arvid
                  deg med henvisning til riktig sted. Velger du å gjøre
                  inngrepet hos oss i stedet, betaler du selv.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Medisinske og generelle inngrep — kryss-lenke til helseblikk.no */}
      <section className="py-16 px-6">
        <AnimatedSection className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-[#e8d5b0]/40 bg-white p-7 md:p-9">
            <div className="flex items-center gap-3 mb-5">
              <Hospital
                size={18}
                className="text-[#8f6b28] shrink-0"
                aria-hidden
              />
              <p className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/65">
                Medisinske og generelle inngrep
              </p>
            </div>
            <h2
              className="text-2xl md:text-3xl font-normal mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ikke estetisk? Da hører det hjemme hos Helseblikk
            </h2>
            <p className="text-[#1a1a1a]/65 leading-relaxed mb-6">
              Denne siden handler om de estetiske inngrepene. Ole Arvid gjør
              også en rekke medisinske og generelle inngrep — de er samlet hos
              Helseblikk, men det er samme kirurg og samme klinikk i Grimstad.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-7">
              {HOS_HELSEBLIKK.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-sm text-[#1a1a1a]/65 leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] flex-shrink-0 mt-1.5" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href={HELSEBLIKK_PLASTIKKIRURGI_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[#e8d5b0] px-6 py-3 text-sm tracking-wide text-[#8f6b28] transition-colors hover:border-[#c9a96e] hover:bg-[#8f6b28] hover:text-white"
            >
              Se medisinske inngrep hos Helseblikk
              <ExternalLink size={15} className="shrink-0" aria-hidden />
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* FAQ */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-normal mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ofte stilte spørsmål
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl bg-white border border-[#e8d5b0]/30 open:border-[#c9a96e]/40 transition-colors"
                >
                  <summary className="cursor-pointer list-none px-6 py-4 flex justify-between items-center gap-4 text-[#1a1a1a]/80">
                    <span className="text-sm font-medium leading-snug">
                      {f.q}
                    </span>
                    <span className="text-[#8f6b28] transition-transform group-open:rotate-45 text-xl leading-none shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-5 text-sm text-[#1a1a1a]/65 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#1e2d3d]">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
            Neste steg
          </p>
          <h2
            className="text-3xl md:text-4xl font-normal text-white mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Start med en konsultasjon
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Ingen henvisning nødvendig. På konsultasjonen får du en grundig
            vurdering, en ærlig anbefaling og tydelig pris — så bestemmer du
            selv om du vil gå videre. Konsultasjonen koster 1.500,- ink. mva og
            trekkes fra hvis du gjennomfører et inngrep.
          </p>
          <div className="flex flex-col items-center gap-3">
            <BookingLenke />
            <p className="text-xs text-white/70">
              Bookingen til Ole Arvid ligger hos Helseblikk og åpnes i nytt
              vindu
            </p>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
