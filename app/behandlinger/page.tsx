"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";
import { motion } from "framer-motion";

interface Behandling {
  navn: string;
  desc: string;
  pris: string;
  slug?: string;
}

interface Seksjon {
  id: string;
  title: string;
  intro: string;
  bilde?: string;
  bildeAlt?: string;
  bildeAspekt?: string;
  /** Behandlinger uten undergruppe */
  behandlinger?: Behandling[];
  /** Egne underkategorier under samme overskrift (f.eks. injeksjoner) */
  undergrupper?: { tittel: string; behandlinger: Behandling[] }[];
}

const sections: Seksjon[] = [
  {
    id: "konsultasjon",
    title: "Hudkonsultasjon",
    intro:
      "En grundig gjennomgang av hudens tilstand. Vi lager en individuell plan og anbefaler riktige behandlinger for deg.",
    behandlinger: [
      {
        navn: "Konsultasjon",
        slug: "hudkonsultasjon",
        desc: "Grundig hudanalyse og behandlingsplan. Beløpet trekkes fra ved gjennomført behandling eller produktkjøp over 1.500,-.",
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
        slug: "farging-forming-vipper-bryn",
        desc: "Komplett pakke for vipper og bryn med farging, forming og voks.",
        pris: "690,-",
      },
      {
        navn: "Brynslaminering",
        slug: "brynslaminering",
        desc: "Gir fulle, velformede bryn i 4–8 uker. Inkluderer farge, forming og voks.",
        pris: "890,-",
      },
      {
        navn: "Farging og forming bryn inkl. voks",
        slug: "farging-forming-bryn",
        desc: "Perfekt definerte bryn med farging og forming. Voks inkludert.",
        pris: "590,-",
      },
      {
        navn: "Farging vipper",
        slug: "farging-vipper",
        desc: "Naturlig, varig farge på vippene.",
        pris: "290,-",
      },
    ],
  },
  {
    id: "hudbehandlinger",
    title: "Hudbehandlinger",
    bilde: "/hudbehandling.jpg",
    bildeAlt: "Hudbehandling i klinikken",
    bildeAspekt: "aspect-[4/3] sm:aspect-[16/9]",
    intro:
      "Avanserte behandlinger som forynger huden, stimulerer kollagenproduksjon og gir synlige resultater.",
    behandlinger: [
      {
        navn: "Kjemisk peeling",
        slug: "kjemisk-peeling",
        desc: "Vi har flere ulike peelinger og tilpasser type og styrke til huden din og ønsket ditt. Fjerner døde hudceller, jevner ut hudtonen og stimulerer cellefornying.",
        pris: "Fra 1.500,-",
      },
      {
        navn: "ZO Stimulation Peel",
        slug: "zo-stimulation-peel",
        desc: "Medisinsk peeling fra ZO Skin Health. Løser opp døde hudceller og setter fart på hudens egen fornying — for jevnere hudtone, finere struktur og mer glød.",
        pris: "2.100,-",
      },
      {
        navn: "Face Formula signaturbehandling",
        slug: "face-formula-signaturbehandling",
        desc: "Face Formulas egen ansiktsbehandling, satt sammen med merkets aktive produkter etter hva huden din trenger.",
        pris: "1.900,-",
      },
      {
        navn: "Microneedling (Dermapen)",
        slug: "dermapen",
        desc: "Stimulerer hudens naturlige kollagenproduksjon. Effektivt mot arr, porer, rynker og ujevn hudtone. Kan kombineres med mesoterapi, eksosomer, peel og LED-lys.",
        pris: "Fra 2.690,-",
      },
      {
        navn: "Mesoterapi",
        slug: "mesoterapi",
        desc: "Tilføring av vitaminer, hyaluronsyre og næringsstoffer direkte i huden for økt fuktighet og glød.",
        pris: "Fra 1.900,-",
      },
    ],
  },
  {
    id: "injeksjon",
    title: "Injeksjonsbehandlinger",
    intro:
      "Trygge behandlinger med naturlige resultater. Alltid under ansvar av autorisert helsepersonell, og alltid med en faglig vurdering først.",
    undergrupper: [
      {
        tittel: "Medisinsk rynkebehandling",
        behandlinger: [
          {
            navn: "Lite område",
            slug: "muskelavslappende-behandling",
            desc: "Mindre partier som nese eller hake.",
            pris: "1.400,-",
          },
          {
            navn: "1 område",
            slug: "muskelavslappende-behandling",
            desc: "For eksempel sinnarynken, pannen eller smilerynkene rundt øynene.",
            pris: "2.000,-",
          },
          {
            navn: "2 områder",
            slug: "muskelavslappende-behandling",
            desc: "To behandlingsområder i samme time.",
            pris: "3.400,-",
          },
          {
            navn: "3 områder",
            slug: "muskelavslappende-behandling",
            desc: "Tre behandlingsområder i samme time.",
            pris: "4.300,-",
          },
          {
            navn: "Anspent kjeve / tanngnissing",
            slug: "muskelavslappende-behandling",
            desc: "Slapper av tyggemusklene ved bruksisme — gir ofte mindre kjevesmerter og hodepine.",
            pris: "3.600,-",
          },
          {
            navn: "Svettebehandling",
            slug: "muskelavslappende-behandling",
            desc: "Demper kraftig svette i armhulene i 4–6 måneder.",
            pris: "4.600,-",
          },
        ],
      },
      {
        tittel: "Filler",
        behandlinger: [
          {
            navn: "Leppebehandling",
            slug: "filler",
            desc: "Hyaluronsyre for fyldigere lepper med naturlig resultat. Pris etter mengde og ønsket resultat.",
            pris: "2.400,- – 3.400,-",
          },
          {
            navn: "Volumbehandling",
            slug: "filler",
            desc: "Gjenoppretter volum og definerer konturer i kinn, kjevelinje eller hake.",
            pris: "3.600,-",
          },
          {
            navn: "Skinbooster 1 ml",
            slug: "filler",
            desc: "Hyaluronsyre som fukter huden innenfra — gir glød og bedre hudkvalitet.",
            pris: "2.900,-",
          },
          {
            navn: "Skinbooster 2 ml",
            slug: "filler",
            desc: "Større område eller kraftigere fuktboost.",
            pris: "5.200,-",
          },
          {
            navn: "Fjerning av filler",
            slug: "fjerning-av-filler",
            desc: "Trygg oppløsning av hyaluronsyrefiller med hyaluronidase — også filler satt andre steder.",
            pris: "1.500,-",
          },
        ],
      },
    ],
  },
  {
    id: "kirurgi",
    title: "Kirurgiske inngrep",
    intro:
      "Plastikkirurg og overlege Ole Arvid F. Østerud utfører estetiske inngrep hos oss — alt i lokalbedøvelse. Inngrep som krever narkose vurderes grundig og henvises videre til sykehus.",
    behandlinger: [
      {
        navn: "Øyelokksoperasjon",
        desc: "Fjerner overflødig hud på øvre øyelokk og gir et mer uthvilt uttrykk.",
        pris: "27.500,-",
      },
      {
        navn: "Øyebrynsløft",
        desc: "Løfter brynet og åpner blikket.",
        pris: "43.750,-",
      },
      {
        navn: "Korreksjon av utstående ører",
        desc: "Én eller begge sider. Også øreforminskning.",
        pris: "Fra 31.250,-",
      },
      {
        navn: "Øreflipp",
        desc: "Korreksjon av splittet eller skadet øreflipp, og forminskning.",
        pris: "Fra 6.250,-",
      },
      {
        navn: "Arrkorreksjon",
        desc: "Korreksjon av små og større arr, med fettransplantasjon der det trengs.",
        pris: "Fra 12.500,-",
      },
      {
        navn: "Føflekkfjerning",
        desc: "Fjerning med penest mulig arr.",
        pris: "12.500,-",
      },
    ],
  },
  {
    id: "produkter",
    title: "Hudprodukter",
    bilde: "/produkter-benk.jpg",
    bildeAlt: "ZO Skin Health — klargjøring i klinikken",
    bildeAspekt: "aspect-[16/9] sm:aspect-[21/9]",
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

/**
 * Hvor kortene sender kunden videre:
 *  - booking:  Timma-timeboken (Mabel og Christina)
 *  - produkt:  nettbutikken
 *  - kirurgi:  /plastikkirurgi — Ole Arvid ligger IKKE i Timma, han booker
 *              via PasientSky, og kirurgi krever konsultasjon først.
 */
type KortVariant = "booking" | "produkt" | "kirurgi";

function BehandlingKort({
  behandlinger,
  variant = "booking",
}: {
  behandlinger: Behandling[];
  variant?: KortVariant;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {behandlinger.map((b, bi) => (
        <AnimatedSection key={b.navn} delay={bi * 0.1}>
          <motion.div
            whileHover={{ y: -3, boxShadow: "0 16px 32px -8px rgba(0,0,0,0.06)" }}
            transition={{ duration: 0.25 }}
            className="h-full p-7 rounded-2xl bg-white border border-[#e8d5b0]/30 hover:border-[#c9a96e]/30 transition-colors"
          >
            <div className="flex justify-between items-start gap-4">
              <h3
                className="font-normal text-lg leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {b.navn}
              </h3>
              <span className="text-[#8f6b28] font-medium text-sm whitespace-nowrap">
                {b.pris}
              </span>
            </div>
            <p className="text-sm text-[#1a1a1a]/65 leading-relaxed mt-3">
              {b.desc}
            </p>
            {variant === "booking" && (
              <div className="mt-5 flex items-center gap-5">
                {b.slug && (
                  <Link
                    href={`/behandlinger/${b.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm tracking-wide text-[#8f6b28] transition-colors hover:text-[#b8955a]"
                  >
                    Les mer
                    <ArrowRight size={14} />
                  </Link>
                )}
                <Link
                  href="/bestill-time"
                  className="inline-flex items-center gap-1.5 text-sm tracking-wide text-[#1a1a1a]/65 transition-colors hover:text-[#8f6b28]"
                >
                  Bestill time
                </Link>
              </div>
            )}
            {variant === "produkt" && (
              <Link
                href="/nettbutikk"
                className="mt-5 inline-flex items-center gap-1.5 text-sm tracking-wide text-[#8f6b28] transition-colors hover:text-[#b8955a]"
              >
                Se i nettbutikken
                <ArrowRight size={14} />
              </Link>
            )}
            {variant === "kirurgi" && (
              <Link
                href="/plastikkirurgi"
                className="mt-5 inline-flex items-center gap-1.5 text-sm tracking-wide text-[#8f6b28] transition-colors hover:text-[#b8955a]"
              >
                Les mer og book konsultasjon
                <ArrowRight size={14} />
              </Link>
            )}
          </motion.div>
        </AnimatedSection>
      ))}
    </div>
  );
}

export default function BehandlingerPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
              Hva vi tilbyr
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Behandlinger
            </h1>
            <p className="text-[#1a1a1a]/65 leading-relaxed text-lg">
              Vi tilbyr et bredt spekter av medisinsk hudpleie — fra enkel
              farging til avanserte hudbehandlinger og injeksjoner.
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
              alt="Microneedling-behandling med Dermapen hos Hud by Helseblikk"
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
              className="whitespace-nowrap text-[#1a1a1a]/65 hover:text-[#8f6b28] transition-colors py-1 px-2 rounded-full hover:bg-[#c9a96e]/5"
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
                <p className="text-xs tracking-[0.2em] uppercase text-[#8f6b28] mb-2">
                  {String(si + 1).padStart(2, "0")}
                </p>
                <h2
                  className="text-2xl md:text-3xl font-normal mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {seksjon.title}
                </h2>
                <p className="text-[#1a1a1a]/65 leading-relaxed max-w-xl">
                  {seksjon.intro}
                </p>
              </div>
            </AnimatedSection>

            {seksjon.bilde && (
              <AnimatedSection className="mb-10">
                <div
                  className={`relative overflow-hidden rounded-2xl ${seksjon.bildeAspekt}`}
                >
                  <Image
                    src={seksjon.bilde}
                    alt={seksjon.bildeAlt ?? seksjon.title}
                    fill
                    sizes="(max-width: 1152px) 100vw, 1104px"
                    className="object-cover"
                  />
                </div>
              </AnimatedSection>
            )}

            {seksjon.behandlinger && (
              <BehandlingKort
                behandlinger={seksjon.behandlinger}
                variant={
                  seksjon.id === "produkter"
                    ? "produkt"
                    : seksjon.id === "kirurgi"
                      ? "kirurgi"
                      : "booking"
                }
              />
            )}

            {seksjon.undergrupper?.map((gruppe, gi) => (
              <div key={gruppe.tittel} className={gi > 0 ? "mt-12" : ""}>
                <AnimatedSection>
                  <div className="mb-5 flex items-center gap-4">
                    <h3
                      className="text-lg text-[#1e2d3d] md:text-xl"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {gruppe.tittel}
                    </h3>
                    <div className="h-px flex-1 bg-[#e8d5b0]/60" />
                  </div>
                </AnimatedSection>
                <BehandlingKort behandlinger={gruppe.behandlinger} />
              </div>
            ))}

            {/* Timma-timeboken har ikke Ole Arvids kalender — kirurgi skal
                aldri sendes til /bestill-time. */}
            <AnimatedSection delay={0.3} className="mt-6">
              {seksjon.id === "kirurgi" ? (
                <div>
                  <Link
                    href="/plastikkirurgi"
                    className="inline-flex items-center gap-2 rounded-full bg-[#8f6b28] px-8 py-4 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-[#7a5b20]"
                  >
                    Om plastikkirurgi og konsultasjon
                    <ArrowRight size={16} />
                  </Link>
                  <p className="mt-4 max-w-xl text-sm text-[#1a1a1a]/65">
                    Kirurgi bookes for seg — ikke i timeboken vår. Alle inngrep
                    starter med en konsultasjon hos Ole Arvid.
                  </p>
                </div>
              ) : (
                <BookingButton label={`Bestill ${seksjon.title.toLowerCase()}`} />
              )}
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
            <strong>20% rabatt</strong> på hud-, vippe- og brynsbehandlinger med
            gyldig studentbevis. Gjelder ikke medisinsk rynkebehandling eller
            kirurgiske inngrep.
          </p>
        </AnimatedSection>
      </section>
    </>
  );
}
