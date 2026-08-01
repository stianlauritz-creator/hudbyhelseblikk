"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";
import { motion } from "framer-motion";

const sections = [
  {
    id: "konsultasjon",
    title: "Hudkonsultasjon",
    intro:
      "En grundig gjennomgang av hudens tilstand. Vi lager en individuell plan og anbefaler riktige behandlinger for deg.",
    behandlinger: [
      {
        navn: "Konsultasjon",
        desc: "Grundig hudanalyse og behandlingsplan. Konsultasjonsprisen trekkes fra ved behandling eller produktkjøp samme dag.",
        pris: "490,-",
      },
    ],
  },
  {
    id: "vipper-bryn",
    title: "Vipper & Bryn",
    intro:
      "Fra enkel farging til avansert laminering — vi former og definerer blikket ditt.",
    behandlinger: [
      {
        navn: "Farging/forming vipper og bryn inkl. voks",
        desc: "Komplett pakke for vipper og bryn med farging, forming og voks.",
        pris: "590,-",
      },
      {
        navn: "Brynslaminering",
        desc: "Gir fulle, velformede bryn i 4–8 uker. Inkluderer farge, forming og voks.",
        pris: "890,-",
      },
      {
        navn: "Farging og forming bryn inkl. voks",
        desc: "Perfekt definerte bryn med farging og forming.",
        pris: "490,-",
      },
      {
        navn: "Farging vipper",
        desc: "Naturlig, varig farge på vippene.",
        pris: "290,-",
      },
    ],
  },
  {
    id: "hudbehandlinger",
    title: "Hudbehandlinger",
    intro:
      "Avanserte behandlinger som forynger huden, stimulerer kollagenproduksjon og gir synlige resultater.",
    behandlinger: [
      {
        navn: "Kjemisk peeling",
        desc: "Fjerner døde hudceller, jevner ut hudtonen og stimulerer cellefornying. Tilpasset din hudtype.",
        pris: "Fra 1.500,-",
      },
      {
        navn: "Microneedling (Dermapen)",
        desc: "Stimulerer hudens naturlige kollagenproduksjon. Effektivt mot arr, porer, rynker og ujevn hudtone.",
        pris: "Fra 2.690,-",
      },
      {
        navn: "Mesoterapi",
        desc: "Tilføring av vitaminer, hyaluronsyre og næringsstoffer direkte i huden for økt fuktighet og glød.",
        pris: "Fra 1.900,-",
      },
    ],
  },
  {
    id: "laser",
    title: "Laserbehandlinger",
    intro:
      "Medisinsk laser for en rekke hudtilstander. Trygge, dokumenterte behandlinger med varige resultater.",
    behandlinger: [
      {
        navn: "Aknebehandling (Nd:YAG)",
        desc: "Reduserer inflammatorisk akne effektivt. 4–6 behandlinger anbefalt, hver 2–4. uke.",
        pris: "Fra 1.800,-",
      },
      {
        navn: "Blodkarbehandling",
        desc: "Behandler sprengte blodkar og diffus rødhet. Rask og effektiv.",
        pris: "Fra 1.500,-",
      },
      {
        navn: "Hårfjerning med laser",
        desc: "Permanent reduksjon av uønsket hår. Tilpasset hudtype og hårfarge.",
        pris: "Fra 650,- pr. område",
      },
      {
        navn: "Lipplaser",
        desc: "Øker kollagenproduksjon, fuktighet og gir plumpere lepper. 3–4 behandlinger anbefalt, hver 2–3. uke.",
        pris: "Fra 1.900,-",
      },
      {
        navn: "Øyelokk-laser",
        desc: "Reduserer rynker rundt øynene og øker kollagenproduktion via ablasjon.",
        pris: "Fra 2.900,-",
      },
      {
        navn: "Rosacea-behandling",
        desc: "Reduserer vedvarende rødhet og synlige blodkar ved rosacea.",
        pris: "Fra 1.900,-",
      },
    ],
  },
  {
    id: "injeksjon",
    title: "Injeksjonsbehandlinger",
    intro:
      "Trygge, FDA-godkjente behandlinger med naturlige resultater. Alltid under ansvar av autorisert helsepersonell.",
    behandlinger: [
      {
        navn: "Restylane (filler)",
        desc: "Hyaluronsyrebasert filler for naturlig volum og konturering.",
        pris: "Fra 2.400,-",
      },
      {
        navn: "Fjerning av filler",
        desc: "Trygg oppløsning av hyaluronsyrefiller med hyaluronidase.",
        pris: "1.500,-",
      },
      {
        navn: "Muskelavslappende injeksjoner",
        desc: "Reduserer dynamiske rynker og gir et ferskere utseende. Gjelder ikke studentrabatt.",
        pris: "Fra 2.200,-",
      },
      {
        navn: "PRP-behandling",
        desc: "Platelet Rich Plasma — kroppens egne vekstfaktorer stimulerer kollagen og cellefornyelse.",
        pris: "Fra 3.900,-",
      },
    ],
  },
  {
    id: "produkter",
    title: "Hudprodukter",
    intro:
      "Vi fører kun produkter med dokumentert effekt og trygge ingredienser.",
    behandlinger: [
      {
        navn: "ZO Skin Health",
        desc: "Medisinsk hudpleie utviklet av dermatolog Dr. Zein Obagi — hudfornyelse, pigmentering, rosacea og solbeskyttelse.",
        pris: "Fra 645,-",
      },
      {
        navn: "Face Formula (tidl. Elixir Cosmeceuticals)",
        desc: "Norskutviklet hudpleie med dokumenterte virkestoffer, utviklet for nordisk hud. Hele sortimentet i nettbutikken.",
        pris: "Fra 249,-",
      },
      {
        navn: "ColoreScience",
        desc: "100 % mineralsk solbeskyttelse og korrigerende SPF-produkter — beskytter, behandler og perfeksjonerer i ett.",
        pris: "Fra 495,-",
      },
    ],
  },
];

export default function BehandlingerPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
              Hva vi tilbyr
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Behandlinger
            </h1>
            <p className="text-[#1a1a1a]/60 leading-relaxed text-lg">
              Vi tilbyr et bredt spekter av medisinsk hudpleie — fra enkel
              farging til avanserte laserbehandlinger og injeksjoner.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Fra klinikken */}
      <section className="px-6 -mb-4">
        <AnimatedSection className="max-w-5xl mx-auto">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden">
            <Image
              src="/behandling-banner.jpg"
              alt="Microneedling-behandling med Dermapen hos Hud By Helseblikk"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2d3d]/30 to-transparent" />
            <p className="absolute bottom-4 left-6 text-white/90 text-xs tracking-[0.2em] uppercase">
              Fra klinikken — microneedling med Dermapen
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Navigasjon */}
      <section className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-[#e8d5b0]/30">
        <div className="max-w-6xl mx-auto px-6 py-3 flex gap-4 overflow-x-auto scrollbar-hide text-sm">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="whitespace-nowrap text-[#1a1a1a]/50 hover:text-[#c9a96e] transition-colors py-1 px-2 rounded-full hover:bg-[#c9a96e]/5"
            >
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* Behandlingsseksjoner */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {sections.map((seksjon, si) => (
          <section key={seksjon.id} id={seksjon.id}>
            <AnimatedSection>
              <div className="mb-10">
                <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-2">
                  {String(si + 1).padStart(2, "0")}
                </p>
                <h2
                  className="text-2xl md:text-3xl font-normal mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {seksjon.title}
                </h2>
                <p className="text-[#1a1a1a]/55 leading-relaxed max-w-xl">
                  {seksjon.intro}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {seksjon.behandlinger.map((b, bi) => (
                <AnimatedSection key={b.navn} delay={bi * 0.1}>
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 16px 32px -8px rgba(0,0,0,0.06)" }}
                    transition={{ duration: 0.25 }}
                    className="p-7 rounded-2xl bg-white border border-[#e8d5b0]/30 hover:border-[#c9a96e]/30 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h3
                        className="font-normal text-lg leading-snug"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {b.navn}
                      </h3>
                      <span className="text-[#c9a96e] font-medium text-sm whitespace-nowrap">
                        {b.pris}
                      </span>
                    </div>
                    <p className="text-sm text-[#1a1a1a]/55 leading-relaxed mt-3">
                      {b.desc}
                    </p>
                    {seksjon.id !== "produkter" && (
                      <Link
                        href="/bestill-time"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm tracking-wide text-[#c9a96e] transition-colors hover:text-[#b8955a]"
                      >
                        Bestill time
                        <ArrowRight size={14} />
                      </Link>
                    )}
                    {seksjon.id === "produkter" && (
                      <Link
                        href="/nettbutikk"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm tracking-wide text-[#c9a96e] transition-colors hover:text-[#b8955a]"
                      >
                        Se i nettbutikken
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.3} className="mt-6">
              <BookingButton label={`Bestill ${seksjon.title.toLowerCase()}`} />
            </AnimatedSection>
          </section>
        ))}
      </div>

      {/* Studentrabatt-banner */}
      <section className="py-12 px-6 bg-[#f5f2ed]">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#3d4a3e] mb-2">
            Studentrabatt
          </p>
          <p className="text-[#1a1a1a]/70">
            <strong>20% rabatt</strong> på alle behandlinger med gyldig
            studentbevis. Gjelder ikke muskelavslappende injeksjoner.
          </p>
        </AnimatedSection>
      </section>
    </>
  );
}
