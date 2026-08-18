import Image from "next/image";
import { ExternalLink, ShieldCheck } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { SITE_URL } from "@/lib/site";

// Débora sin behandlerside hos Helseblikk — hun tar imot pasienter der,
// ikke i Timma-timeboken vår.
const HELSEBLIKK_DEBORA_URL =
  "https://helseblikk.no/spesialist/debora-dias-de-oliveira/";

const kompetanse = [
  "Indremedisin",
  "Allergi og klinisk immunologi",
  "Estetisk medisin",
  "Helhetlig pasientvurdering",
];

const hosHelseblikk = [
  "Oppfølging av livsstilsrelaterte sykdommer som høyt blodtrykk, diabetes, KOLS og hjertesykdom",
  "Total gjennomgang av medisiner og laboratorieundersøkelser",
  "Ernæringsgjennomgang og forslag til aktivitet og trening",
  "Veiledning og undersøkelser for idrettsutøvere",
];

export default function OmDeboraPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: "Débora Dias De Oliveira",
      jobTitle: "Lege",
      url: `${SITE_URL}/om-debora`,
      image: `${SITE_URL}/debora.jpg`,
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
          name: "Ansvarlig lege",
          item: `${SITE_URL}/om-debora`,
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

      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
              Ansvarlig lege
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Débora Dias De Oliveira
            </h1>
            <p className="text-[#8f6b28] tracking-wide text-sm">
              Lege — ansvarlig lege ved Hud by Helseblikk
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
                src="/debora.jpg"
                alt="Débora Dias De Oliveira, ansvarlig lege hos Hud by Helseblikk"
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
                  Débora Dias De Oliveira
                </p>
                <p className="text-xs text-[#8f6b28] mt-0.5">Ansvarlig lege</p>
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
                Om Débora
              </h2>
              <div className="space-y-4 text-[#1a1a1a]/65 leading-relaxed">
                <p>
                  Débora er opprinnelig fra Brasil og har praktisert som lege
                  siden 2001. Gjennom lang klinisk erfaring har hun bygget en
                  bred faglig kompetanse innen indremedisin, allergi, klinisk
                  immunologi og estetisk medisin.
                </p>
                <p>
                  Styrken hennes er en helhetlig tilnærming til pasientene, der
                  både fysiske, psykiske og livsrelaterte faktorer inngår i
                  vurderingen. Det er den samme tenkningen vi bygger
                  hudbehandlingene våre på: årsaken først, behandlingen etterpå.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.1}>
              <div className="p-6 rounded-2xl bg-[#faf9f7] border border-[#e8d5b0]/30">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck
                    size={18}
                    className="text-[#8f6b28] shrink-0"
                    aria-hidden
                  />
                  <p className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/65">
                    Rollen som ansvarlig lege
                  </p>
                </div>
                <p className="text-[#1a1a1a]/65 leading-relaxed text-sm">
                  Débora har det medisinskfaglige ansvaret ved Hud by
                  Helseblikk. Det betyr at det står en lege bak den medisinske
                  hudpleien vår — og at behandlingene skjer innenfor faglig
                  forsvarlige rammer.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.15}>
              <h3
                className="text-xl font-normal mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Kompetanseområder
              </h3>
              <ul className="space-y-2.5">
                {kompetanse.map((k) => (
                  <li
                    key={k}
                    className="flex items-center gap-3 text-sm text-[#1a1a1a]/65"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8f6b28] flex-shrink-0" />
                    {k}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <h3
                className="text-xl font-normal mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Legetime hos Helseblikk
              </h3>
              <p className="text-sm text-[#1a1a1a]/65 leading-relaxed mb-5">
                Débora tar imot pasienter hos Helseblikk, utenfor
                fastlegeordningen og uten henvisning. Blant det hun tilbyr der:
              </p>
              <ul className="space-y-2.5 mb-7">
                {hosHelseblikk.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-sm text-[#1a1a1a]/65 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3d4a3e] flex-shrink-0 mt-1.5" />
                    {h}
                  </li>
                ))}
              </ul>
              <a
                href={HELSEBLIKK_DEBORA_URL}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full border border-[#e8d5b0] px-6 py-3 text-sm tracking-wide text-[#8f6b28] transition-colors hover:border-[#c9a96e] hover:bg-[#8f6b28] hover:text-white"
              >
                Se Débora hos Helseblikk
                <ExternalLink size={15} className="shrink-0" aria-hidden />
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
