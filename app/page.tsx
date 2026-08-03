"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";
import {
  Sparkles,
  Zap,
  Droplets,
  Syringe,
  ShoppingBag,
  Eye,
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
    icon: Zap,
    title: "Laserbehandlinger",
    desc: "Akne, rødhet, hårfjerning og rosacea med medisinsk laser",
    href: "/behandlinger#laser",
  },
  {
    icon: Syringe,
    title: "Injeksjonsbehandlinger",
    desc: "Filler, muskelavslappende, PRP og Restylane",
    href: "/behandlinger#injeksjon",
  },
  {
    icon: ShoppingBag,
    title: "Hudprodukter",
    desc: "ZO Skin Health og Face Formula — kjøp i klinikken eller i nettbutikken",
    href: "/nettbutikk",
  },
];

const testimonials = [
  {
    text: "Mabel er nøyaktig, ærlig og imøtekommende. Resultatet overgikk forventningene mine.",
    name: "Camilla H.",
  },
  {
    text: "Endelig en klinikk i Grimstad som tar hudpleie på alvor. Profesjonell og trygg.",
    name: "Line S.",
  },
  {
    text: "Fantastisk resultat etter laserbehandling. Rødhet og blodkar er borte etter tre behandlinger.",
    name: "Karianne L.",
  },
];

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
            src="/mabel.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_38%]"
          />
        </motion.div>
        {/* Mørkt overlegg for lesbarhet */}
        <div className="absolute inset-0 bg-[#1e2d3d]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e2d3d]/60 via-[#1e2d3d]/10 to-[#1e2d3d]/25" />

        <div className="relative max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
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
            className="text-5xl md:text-7xl font-normal leading-tight mb-6 text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Naturlig skjønnhet,
            <br />
            <em className="text-[#e5c78f] not-italic">medisinsk kvalitet</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Vi kombinerer medisinsk kompetanse med estetisk presisjon.
            Hos oss er forebygging, naturlig skjønnhet og faglig forsvarlighet i fokus.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <BookingButton label="Bestill time" />
            <Link
              href="/behandlinger"
              className="text-sm tracking-wide text-white/80 hover:text-[#e5c78f] transition-colors border-b border-white/30 hover:border-[#e5c78f] pb-0.5"
            >
              Se alle behandlinger →
            </Link>
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

      {/* Behandlingskategorier */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection eager className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-3">
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
                      <k.icon size={18} className="text-[#c9a96e]" />
                    </div>
                    <h3
                      className="text-lg font-normal mb-2 group-hover:text-[#c9a96e] transition-colors"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {k.title}
                    </h3>
                    <p className="text-sm text-[#1a1a1a]/55 leading-relaxed">
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
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-3">
              Møt dine behandlere
            </p>
            <h2
              className="text-3xl md:text-4xl font-normal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Kvalifisert helsepersonell
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Mabel */}
            <AnimatedSection direction="left">
              <div className="rounded-2xl bg-white border border-[#e8d5b0]/40 overflow-hidden h-full flex flex-col">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src="/mabel.jpg"
                    alt="Mabel Lorine King, kosmetisk dermatologisk sykepleier"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-[center_45%]"
                  />
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <h3
                    className="text-xl mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Mabel Lorine King
                  </h3>
                  <p className="text-xs text-[#c9a96e] tracking-wide mb-4">
                    Kosmetisk Dermatologisk Sykepleier
                  </p>
                  <p className="text-sm text-[#1a1a1a]/60 leading-relaxed mb-5">
                    Sykepleier med videreutdanning i kosmetisk dermatologi.
                    I faget siden 2019 — kjent for et godt estetisk blikk,
                    forebygging og faglig forsvarlighet.
                  </p>
                  <Link
                    href="/om-mabel"
                    className="text-sm tracking-wide text-[#c9a96e] border-b border-[#c9a96e]/40 hover:border-[#c9a96e] pb-0.5 transition-colors mt-auto self-start"
                  >
                    Les mer om Mabel →
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Christina */}
            <AnimatedSection direction="right">
              <div className="rounded-2xl bg-white border border-[#e8d5b0]/40 overflow-hidden h-full flex flex-col">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src="/christina-dalen.jpg"
                    alt="Christina Dalen, kosmetisk sykepleier"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <h3
                    className="text-xl mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Christina Dalen
                  </h3>
                  <p className="text-xs text-[#c9a96e] tracking-wide mb-4">
                    Kosmetisk Sykepleier
                  </p>
                  <p className="text-sm text-[#1a1a1a]/60 leading-relaxed mb-5">
                    Sertifisert Restylane Injector med særlig lidenskap for
                    leppebehandlinger. Naturlige resultater som fremhever dine
                    egne trekk.
                  </p>
                  <Link
                    href="/om-christina"
                    className="text-sm tracking-wide text-[#c9a96e] border-b border-[#c9a96e]/40 hover:border-[#c9a96e] pb-0.5 transition-colors mt-auto self-start"
                  >
                    Les mer om Christina →
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-3">
              Hva kundene sier
            </p>
            <h2
              className="text-3xl md:text-4xl font-normal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Kundeomtaler
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.15}>
                <div className="p-8 rounded-2xl bg-[#faf9f7] border border-[#e8d5b0]/30">
                  <p className="text-2xl text-[#c9a96e]/40 mb-4 leading-none"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    "
                  </p>
                  <p className="text-[#1a1a1a]/70 leading-relaxed text-sm mb-6">
                    {t.text}
                  </p>
                  <p className="text-xs tracking-wide text-[#c9a96e]">
                    — {t.name}
                  </p>
                </div>
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
            En konsultasjon koster 490,- og trekkes fra ved behandling eller
            produktkjøp samme dag. Vi tar deg med på en gjennomgang av hudens
            tilstand og lager en plan som passer deg.
          </p>
          <BookingButton label="Bestill konsultasjon" />
        </AnimatedSection>
      </section>
    </>
  );
}
