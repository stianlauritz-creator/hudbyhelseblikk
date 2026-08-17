"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";
import { AKTIVE_KAMPANJER } from "@/lib/kampanjer";
import {
  Sparkles,
  Star,
  Droplets,
  Syringe,
  ShoppingBag,
  Eye,
  Scissors,
} from "lucide-react";

const behandlingsKategorier = [
  {
    icon: Eye,
    title: "Vipper & Bryn",
    desc: "Farging, forming og brynslaminering for perfekte bryn",
    href: "/behandlinger#vipper-bryn",
  },
  {
    icon: Droplets,
    title: "Hudbehandlinger",
    desc: "Kjemisk peeling, microneedling og mesoterapi for strålende hud",
    href: "/behandlinger#hudbehandlinger",
  },
  {
    icon: Syringe,
    title: "Injeksjonsbehandlinger",
    desc: "Medisinsk rynkebehandling og filler — lepper, volum og skinbooster",
    href: "/behandlinger#injeksjon",
  },
  {
    icon: Scissors,
    title: "Plastikkirurgi",
    desc: "Øyelokk, ører, arr og føflekker — i lokalbedøvelse",
    href: "/plastikkirurgi",
  },
  {
    icon: ShoppingBag,
    title: "Hudprodukter",
    desc: "ZO Skin Health og Face Formula — kjøp i klinikken eller i nettbutikken",
    href: "/nettbutikk",
  },
];

// Behandlerseksjonen på forsiden. Ole Arvid er med her fordi plastikkirurgi
// er et nytt fagområde folk ikke forventer i en hudklinikk — det er nettopp
// på forsiden det må presenteres. Bildene beskjæres 4:3 fra 3:4-portretter,
// derfor de ulike object-posisjonene.
const forsideBehandlere = [
  {
    navn: "Mabel Lorine King",
    tittel: "Kosmetisk Dermatologisk Sykepleier",
    bilde: "/mabel.jpg",
    alt: "Mabel Lorine King, kosmetisk dermatologisk sykepleier",
    pos: "object-[center_5%]",
    tekst:
      "Sykepleier med videreutdanning i kosmetisk dermatologi. I faget siden 2019 — kjent for et godt estetisk blikk, forebygging og faglig forsvarlighet.",
    href: "/om-mabel",
    lenke: "Les mer om Mabel →",
  },
  {
    navn: "Christina Dalen",
    tittel: "Kosmetisk Sykepleier",
    bilde: "/christina-portrett.jpg",
    alt: "Christina Dalen, kosmetisk sykepleier",
    pos: "object-top",
    tekst:
      "Sertifisert Restylane Injector med særlig lidenskap for leppebehandlinger. Naturlige resultater som fremhever dine egne trekk.",
    href: "/om-christina",
    lenke: "Les mer om Christina →",
  },
  {
    navn: "Ole Arvid F. Østerud",
    tittel: "Plastikkirurg og Overlege",
    bilde: "/ole-arvid.jpg",
    alt: "Ole Arvid F. Østerud, plastikkirurg og overlege",
    pos: "object-[center_8%]",
    tekst:
      "Plastikkirurg med bred sykehuserfaring og særskilt kompetanse innen ansiktskirurgi. Øyelokk, ører, arr og føflekker — alt i lokalbedøvelse.",
    href: "/plastikkirurgi",
    lenke: "Les mer om plastikkirurgi →",
  },
];

// Ekte Google-omtaler (Helseblikk samlet)
const GOOGLE_OMTALER_URL = "https://maps.google.com/?cid=1808162704109245046";

const testimonials = [
  {
    text: "Her blir egne ønsker og behov ivaretatt uten å kjenne på følelsen av å bli pakket på behandlinger. God informasjon og oppfølging, og det merkes at kompetansen er høy. Super fornøyd med Mabel!",
    name: "Mari Sigvaldsen",
  },
  {
    text: "Er veldig fornøyd behandlinger på Helseblikk og servicen man får der ☺️ Kosmetisk sykepleier Mabel er kjempedyktig og kan anbefales på det varmeste ❤️",
    name: "Victoria Dec",
  },
  {
    text: "Kjempefornøyd etter hudpleiebehandling her! Fikk god informasjon og veiledning. Mabel er kjempedyktig 👍🏼",
    name: "Carmen Keen",
  },
];

function Stjerner() {
  return (
    <span className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-[#c9a96e] text-[#c9a96e]" />
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background: Mabel i behandling, rolig push-out */}
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/hero-konsultasjon.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[88%_center] md:object-center"
          />
        </motion.div>
        {/* Mørk gradient venstre — teksten der, Mabel synlig til høyre */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e2d3d]/85 via-[#1e2d3d]/72 to-[#1e2d3d]/60 md:bg-gradient-to-r md:from-[#1e2d3d]/95 md:from-15% md:via-[#1e2d3d]/60 md:via-45% md:to-transparent md:to-80%" />

        <div className="relative w-full max-w-6xl mx-auto px-6 pt-28 pb-20">
          <div className="max-w-2xl text-center md:text-left">
          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="text-xs tracking-[0.3em] uppercase text-[#e5c78f] mb-6"
          >
            Medisinsk hudpleie · Grimstad
          </motion.p>

          <motion.h1
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="text-5xl md:text-7xl font-normal leading-[1.08] mb-6 text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Naturlig skjønnhet,
            <br />
            <em className="text-[#e5c78f] not-italic">medisinsk kvalitet</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed"
          >
            Vi kombinerer medisinsk kompetanse med estetisk presisjon.
            Hos oss er forebygging, naturlig skjønnhet og faglig forsvarlighet i fokus.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            <BookingButton label="Bestill time" />
            <Link
              href="/behandlinger"
              className="text-sm tracking-wide text-white/80 hover:text-[#e5c78f] transition-colors border-b border-white/30 hover:border-[#e5c78f] pb-0.5"
            >
              Se alle behandlinger →
            </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* Kampanjestripe — forsvinner når ingen kampanjer er aktive */}
      {AKTIVE_KAMPANJER.length > 0 && (
        <div className="bg-[#3d4a3e] text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-6 py-4 text-center sm:flex-row sm:text-left">
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c9a96e]">
              <Sparkles size={13} className="shrink-0" />
              Akkurat nå
            </span>
            <span className="text-sm text-white/80">
              {AKTIVE_KAMPANJER[0].tittel} —{" "}
              <Link
                href="/kampanjer"
                className="underline underline-offset-4 hover:text-[#c9a96e]"
              >
                se alle kampanjene
              </Link>
            </span>
          </div>
        </div>
      )}

      {/* Behandlingskategorier */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection eager className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-3">
              Våre tjenester
            </p>
            <h2
              className="text-3xl md:text-4xl font-normal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Behandlinger
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {behandlingsKategorier.map((k, i) => (
              <AnimatedSection key={k.title} delay={i * 0.1}>
                <Link href={k.href} className="group block">
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.08)" }}
                    transition={{ duration: 0.3 }}
                    className="p-8 rounded-2xl border border-[#e8d5b0]/40 bg-[#faf9f7] hover:border-[#c9a96e]/40 transition-colors duration-300 h-full"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-5">
                      <k.icon size={18} className="text-[#8f6b28]" />
                    </div>
                    <h3
                      className="text-lg font-normal mb-2 group-hover:text-[#8f6b28] transition-colors"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {k.title}
                    </h3>
                    <p className="text-sm text-[#1a1a1a]/65 leading-relaxed">
                      {k.desc}
                    </p>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Behandlere – kort seksjon */}
      <section className="py-24 px-6 bg-[#f5f2ed]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-3">
              Møt dine behandlere
            </p>
            <h2
              className="text-3xl md:text-4xl font-normal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Kvalifisert helsepersonell
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Alle tre kommer inn nedenfra med forskyvning. Tidligere brukte
                kortene direction="right", men x:40 på et kort som fyller
                mobilbredden ga vannrett rullefelt til animasjonen var ferdig. */}
            {forsideBehandlere.map((b, i) => (
              <AnimatedSection key={b.navn} delay={i * 0.15}>
                <div className="rounded-2xl bg-white border border-[#e8d5b0]/40 overflow-hidden h-full flex flex-col">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={b.bilde}
                      alt={b.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={`object-cover ${b.pos}`}
                    />
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <h3
                      className="text-xl mb-1"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {b.navn}
                    </h3>
                    <p className="text-xs text-[#8f6b28] tracking-wide mb-4">
                      {b.tittel}
                    </p>
                    <p className="text-sm text-[#1a1a1a]/65 leading-relaxed mb-5">
                      {b.tekst}
                    </p>
                    <Link
                      href={b.href}
                      className="text-sm tracking-wide text-[#8f6b28] border-b border-[#c9a96e]/40 hover:border-[#c9a96e] pb-0.5 transition-colors mt-auto self-start"
                    >
                      {b.lenke}
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-3">
              Hva kundene sier
            </p>
            <h2
              className="text-3xl md:text-4xl font-normal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Kundeomtaler
            </h2>
            <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-[#e8d5b0]/60 bg-[#faf9f7] px-6 py-3">
              <span className="flex items-center gap-2">
                <Stjerner />
                <span className="text-sm text-[#1a1a1a]/80">5,0 av 5</span>
              </span>
              <a
                href={GOOGLE_OMTALER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#8f6b28] underline underline-offset-2 hover:no-underline"
              >
                15 omtaler på Google →
              </a>
            </div>
            <p className="mt-3 text-xs text-[#1a1a1a]/65">
              Omtalene gjelder Helseblikk samlet — legesenter, gynekolog,
              fysioterapi og hudklinikk.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.15}>
                <figure className="h-full flex flex-col p-8 rounded-2xl bg-[#faf9f7] border border-[#e8d5b0]/30">
                  <Stjerner />
                  <blockquote className="text-[#1a1a1a]/70 leading-relaxed text-sm mt-5 mb-6">
                    {t.text}
                  </blockquote>
                  <figcaption className="mt-auto text-xs tracking-wide text-[#8f6b28]">
                    — {t.name}
                    <span className="block text-[#1a1a1a]/65 mt-0.5">
                      Google-omtale
                    </span>
                  </figcaption>
                </figure>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA-banner */}
      <section className="py-24 px-6 bg-[#1e2d3d]">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
            Klar for å starte?
          </p>
          <h2
            className="text-3xl md:text-4xl font-normal text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Book en hudkonsultasjon
          </h2>
          <p className="text-white/50 mb-10 leading-relaxed">
            Konsultasjonen koster 490,- og trekkes fra igjen når du gjennomfører
            en behandling eller handler produkter for over 1.500,-. Vi tar deg
            med på en gjennomgang av hudens tilstand og lager en plan som passer
            deg — så bestemmer du selv om du vil gå videre.
          </p>
          <BookingButton label="Bestill hudkonsultasjon" />
        </AnimatedSection>
      </section>
    </>
  );
}
