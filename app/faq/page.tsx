"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    sporsmal: "Hva skjer på en konsultasjon?",
    svar:
      "Vi starter med en grundig gjennomgang av hudens tilstand — vi ser på tekstur, tone, fuktbalanse, porer og eventuelle problemområder. Deretter lager vi en individuell plan med anbefalte behandlinger og produkter. Konsultasjonen koster 490,- og dette trekkes fra dersom du velger behandling eller kjøper produkter samme dag.",
  },
  {
    sporsmal: "Gjør behandlingene vondt?",
    svar:
      "De fleste behandlinger oppleves som lite til moderat ubehagelige. Laserbehandlinger kan gi en varmefølelse, injeksjoner gir et lite stikk, og microneedling kan kjennes som fint sandpapir. Vi bruker bedøvelseskrem der det er aktuelt for å minimere ubehag. Din komfort er prioritet — si alltid fra underveis.",
  },
  {
    sporsmal: "Hvor lang tid tar en behandling?",
    svar:
      "Det varierer med behandlingstype. Enkle behandlinger som vipper og bryn tar 30–60 minutter. Hudbehandlinger som microneedling og laserbehandlinger tar typisk 45–90 minutter inkludert forberedelse. Injeksjonsbehandlinger tar gjerne 30–60 minutter avhengig av omfang.",
  },
  {
    sporsmal: "Hvor mange behandlinger trenger jeg?",
    svar:
      "Dette avhenger av tilstanden og behandlingstypen. Laserbehandlinger for akne anbefales 4–6 ganger med 2–4 ukers mellomrom. Lipplaser og øvelokk-laser tar 3–4 behandlinger. Microneedling gir best resultat ved 3–6 behandlinger. Vi gir deg en konkret anbefaling etter konsultasjon.",
  },
  {
    sporsmal: "Hva er nedetiden etter laser?",
    svar:
      "De fleste laserbehandlinger har liten nedetid. Du kan oppleve lett rødhet og svie i 1–3 dager. Ablative behandlinger som øyelokkslaser kan gi noe mer synlig rødhet i opptil en uke. Vi gir deg alltid en detaljert etterveiledning og råd om hva du bør unngå i perioden etter.",
  },
  {
    sporsmal: "Kan jeg trene etter injeksjonsbehandling?",
    svar:
      "Vi anbefaler å unngå hard fysisk trening de første 24–48 timene etter injeksjonsbehandling. Økt blodsirkulasjon og svette kan øke risikoen for hevelse og nedsatt effekt. Unngå også sauna, varme bad og direkte sol i samme periode.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.sporsmal,
    acceptedAnswer: { "@type": "Answer", text: f.svar },
  })),
};

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
              Ofte stilte spørsmål
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              FAQ
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={faq.sporsmal} delay={i * 0.07}>
              <div className="rounded-2xl border border-[#e8d5b0]/40 bg-white overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                >
                  <span
                    className="font-normal text-base"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {faq.sporsmal}
                  </span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={18} className="text-[#c9a96e]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-7 pb-6">
                        <div className="h-px bg-[#e8d5b0]/40 mb-4" />
                        <p className="text-sm text-[#1a1a1a]/65 leading-relaxed">
                          {faq.svar}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="mt-16 text-center">
          <p className="text-sm text-[#1a1a1a]/45 mb-6">
            Har du et spørsmål som ikke er besvart her?
          </p>
          <BookingButton label="Kontakt oss" />
        </AnimatedSection>
      </section>
    </>
  );
}
