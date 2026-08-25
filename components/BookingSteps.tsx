"use client";

import { motion } from "framer-motion";

// Rekkefølgen følger timeboken slik den faktisk ser ut: Timma legger
// behandler-nedtrekket øverst, over tjenestelista. Sto det motsatt her,
// motsa veiviseren skjermbildet rett under den.
const STEG = [
  {
    tittel: "Velg behandler",
    tekst: "Mabel eller Christina — eller la det stå på «alle behandlere»",
  },
  { tittel: "Velg behandling", tekst: "Hele menyen med pris og varighet" },
  { tittel: "Velg tid", tekst: "Ledige timer i sanntid" },
  { tittel: "Bekreft", tekst: "Bekreftelse på e-post med én gang" },
];

// Statisk veiviser over timeboken: viser kunden hvor kort veien er.
export default function BookingSteps() {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STEG.map((s, i) => (
        <motion.li
          key={s.tittel}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-3.5"
        >
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#8f6b28] text-sm font-medium text-white shadow-[0_4px_12px_-4px_rgba(201,169,110,0.7)]">
            {i + 1}
          </span>
          <span className="min-w-0 pt-1">
            <span
              className="block text-[15px] leading-tight text-[#1e2d3d]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {s.tittel}
            </span>
            <span className="mt-1.5 block text-xs leading-relaxed text-[#1a1a1a]/65">
              {s.tekst}
            </span>
          </span>
        </motion.li>
      ))}
    </ol>
  );
}
