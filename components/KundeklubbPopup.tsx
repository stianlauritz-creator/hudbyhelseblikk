"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import KundeklubbSkjema from "@/components/KundeklubbSkjema";

const NOKKEL = "kundeklubb-popup";
const DAGER_SKJULT = 30;
const SEKUNDER_FOR_VISNING = 12;
const SCROLL_TERSKEL = 0.5;

function skalSkjules(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const lagret = window.localStorage.getItem(NOKKEL);
    if (!lagret) return false;
    if (lagret === "medlem") return true;
    const til = Number(lagret);
    return Number.isFinite(til) && til > Date.now();
  } catch {
    return true; // localStorage blokkert — la være å mase
  }
}

function husk(verdi: "medlem" | "lukket") {
  try {
    window.localStorage.setItem(
      NOKKEL,
      verdi === "medlem"
        ? "medlem"
        : String(Date.now() + DAGER_SKJULT * 24 * 60 * 60 * 1000)
    );
  } catch {
    /* ignorer */
  }
}

export default function KundeklubbPopup() {
  const [aapen, setAapen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduserBevegelse = useReducedMotion();

  useEffect(() => {
    if (skalSkjules()) return;

    let vist = false;

    const vedScroll = () => {
      const hoyde = document.documentElement.scrollHeight - window.innerHeight;
      if (hoyde <= 0) return;
      if (window.scrollY / hoyde >= SCROLL_TERSKEL) vis();
    };

    function vis() {
      if (vist) return;
      vist = true;
      setAapen(true);
      window.removeEventListener("scroll", vedScroll);
      clearTimeout(timer);
    }

    const timer = setTimeout(vis, SEKUNDER_FOR_VISNING * 1000);
    window.addEventListener("scroll", vedScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", vedScroll);
    };
  }, []);

  // Esc lukker, og fokus flyttes inn i panelet når det åpnes
  useEffect(() => {
    if (!aapen) return;
    const vedTast = (e: KeyboardEvent) => {
      if (e.key === "Escape") lukk();
    };
    window.addEventListener("keydown", vedTast);
    panelRef.current?.querySelector<HTMLElement>("input, button")?.focus();
    return () => window.removeEventListener("keydown", vedTast);
  }, [aapen]);

  function lukk() {
    husk("lukket");
    setAapen(false);
  }

  function bleMedlem() {
    husk("medlem");
    setTimeout(() => setAapen(false), 4000);
  }

  return (
    <AnimatePresence>
      {aapen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduserBevegelse ? 0 : 0.3 }}
            onClick={lukk}
            className="fixed inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm z-[70]"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="kk-tittel"
            initial={reduserBevegelse ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduserBevegelse ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{
              duration: reduserBevegelse ? 0 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed z-[80] bg-white shadow-xl
                       inset-x-0 bottom-0 rounded-t-2xl p-6 pb-8
                       md:inset-auto md:bottom-auto md:top-1/2 md:left-1/2
                       md:-translate-x-1/2 md:-translate-y-1/2
                       md:w-[26rem] md:rounded-2xl md:p-8"
          >
            <button
              onClick={lukk}
              aria-label="Lukk"
              className="absolute top-4 right-4 p-2 text-[#1a1a1a]/65 hover:text-[#1a1a1a] transition-colors"
            >
              <X size={18} />
            </button>

            <p className="text-[10px] tracking-[0.25em] uppercase text-[#8f6b28] mb-3">
              Kundeklubben
            </p>
            <h2
              id="kk-tittel"
              className="text-2xl leading-tight mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Få 10 % på ditt første kjøp
            </h2>
            <p className="text-sm text-[#1a1a1a]/65 leading-relaxed mb-6">
              Bli medlem, så sender vi rabattkoden på e-post — og du hører fra
              oss først når det skjer noe hos oss.
            </p>

            <KundeklubbSkjema variant="popup" onFerdig={bleMedlem} />

            <p className="text-[11px] text-[#1a1a1a]/65 text-center mt-4">
              <a href="/kundeklubb" className="underline">
                Les mer om klubben
              </a>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
