"use client";

import { motion } from "framer-motion";

const STEG = [
  { tall: "1", tittel: "Velg behandling", tekst: "Se hele menyen med pris og varighet" },
  { tall: "2", tittel: "Velg behandler", tekst: "Mabel eller Christina — eller først ledige" },
  { tall: "3", tittel: "Velg tid", tekst: "Ledige timer oppdateres i sanntid" },
  { tall: "4", tittel: "Bekreft", tekst: "Bekreftelse på e-post med én gang" },
];

// Statisk veiviser over timeboken: viser kunden hvor kort veien er.
export default function BookingSteps() {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0">
      {STEG.map((s, i) => (
        <motion.li
          key={s.tall}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-start gap-3.5 rounded-2xl bg-white/70 px-4 py-4 ring-1 ring-[#e8d5b0]/45 lg:rounded-none lg:bg-transparent lg:ring-0 lg:px-5 lg:py-0"
        >
          {/* forbindelseslinje mellom stegene (kun desktop) */}
          {i < STEG.length - 1 && (
            <span
              aria-hidden
              className="hidden lg:block absolute left-[calc(1.25rem+18px)] top-9 h-[calc(100%-2.25rem)] w-px bg-gradient-to-b from-[#e8d5b0] to-transparent"
            />
          )}
          <span className="relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a96e] text-sm font-medium text-white shadow-[0_4px_12px_-4px_rgba(201,169,110,0.7)]">
            {s.tall}
          </span>
          <span className="pt-1">
            <span
              className="block text-[15px] leading-tight text-[#1e2d3d]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {s.tittel}
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-[#1a1a1a]/45">
              {s.tekst}
            </span>
          </span>
        </motion.li>
      ))}
    </ol>
  );
}
