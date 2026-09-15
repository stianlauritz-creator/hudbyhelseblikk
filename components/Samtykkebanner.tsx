"use client";

// Banneret som spør om analyse- og markedsføringscookies.
//
// Regelen er enkel: ingenting spores før kunden har sagt ja. Derfor sendes det
// aldri et «granted»-signal herfra uten at det ligger et lagret valg bak, og
// banneret rendrer ingenting på serveren — vi vet ikke hva kunden har svart før
// vi har lest localStorage i nettleseren.
//
// Selve regelverket bor i lib/samtykke.ts. Denne filen er bare grensesnittet.

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  lagreSamtykke,
  lesSamtykke,
  tilConsentMode,
  type Samtykke,
} from "@/lib/samtykke";

declare global {
  interface Window {
    /** Defineres av consent-stubben i app/layout.tsx */
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Navnet andre komponenter lytter på. Endres det her, må det endres der. */
const EVENT_NAVN = "hbh-samtykke";

/** Footeren ber om å få banneret opp igjen — se components/SamtykkeLenke.tsx. */
const AAPNE_EVENT = "hbh-apne-samtykke";

/**
 * localStorage kan kaste allerede på oppslaget i privat modus og i sandkassede
 * rammer — ikke bare på getItem.
 */
function hentLager(): Storage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function meldTilGoogle(s: Samtykke | null) {
  // Optional call: et blokkeringsverktøy kan ha spist stubben.
  window.gtag?.("consent", "update", tilConsentMode(s));
}

/**
 * Samtykket er ekstern tilstand, ikke React-tilstand: det bor i localStorage.
 *
 * `lest: false` er svaret både på serveren og i hydreringsrenderingen — da vet
 * vi ennå ingenting og rendrer ingenting. Først etter hydrering leser
 * useSyncExternalStore klientverdien, og da avgjøres det om banneret skal opp.
 * Snapshotet caches i modulen fordi getSnapshot må gi samme referanse hver gang.
 */
type Status =
  | { lest: false; svar: null }
  | { lest: true; svar: Samtykke | null };

const FOER_HYDRERING: Status = { lest: false, svar: null };
const lyttere = new Set<() => void>();
let naavaerende: Status | null = null;

function abonner(varsle: () => void) {
  lyttere.add(varsle);
  return () => {
    lyttere.delete(varsle);
  };
}

function klientStatus(): Status {
  if (!naavaerende) {
    naavaerende = { lest: true, svar: lesSamtykke(hentLager()) };
  }
  return naavaerende;
}

function serverStatus(): Status {
  return FOER_HYDRERING;
}

function settSvar(svar: Samtykke) {
  naavaerende = { lest: true, svar };
  for (const varsle of lyttere) varsle();
}

/**
 * Setter status tilbake til «ubesvart» slik at banneret kommer opp igjen.
 * Det lagrede valget står i localStorage til kunden svarer på nytt — trykker
 * hun bare vekk, er det gamle valget fremdeles det som gjelder ved neste
 * sidelast.
 */
function gjenaapne() {
  naavaerende = { lest: true, svar: null };
  for (const varsle of lyttere) varsle();
}

export default function Samtykkebanner() {
  const status = useSyncExternalStore(abonner, klientStatus, serverStatus);
  const [detaljer, setDetaljer] = useState(false);
  const [analyse, setAnalyse] = useState(false);
  const [markedsforing, setMarkedsforing] = useState(false);

  const reduserBevegelse = useReducedMotion();
  const id = useId();
  const panelId = `${id}-valg`;
  const analyseId = `${id}-analyse`;
  const markedsforingId = `${id}-markedsforing`;

  // Har kunden svart før, speiles svaret til Google med én gang — også når
  // svaret var nei, slik at Consent Mode har et signal å forholde seg til.
  // Bare første gang: velger kunden noe nå, sender velg() signalet selv.
  const sendt = useRef(false);
  useEffect(() => {
    if (sendt.current || !status.lest) return;
    sendt.current = true;
    if (status.svar) meldTilGoogle(status.svar);
  }, [status]);

  // Kunden kan ombestemme seg fra footeren. Da kommer banneret opp med
  // bryterne synlige og forrige svar fylt inn, så hun ser hva hun endrer fra.
  useEffect(() => {
    const aapne = () => {
      const lagret = lesSamtykke(hentLager());
      setAnalyse(lagret?.analyse ?? false);
      setMarkedsforing(lagret?.markedsforing ?? false);
      setDetaljer(true);
      gjenaapne();
    };
    window.addEventListener(AAPNE_EVENT, aapne);
    return () => window.removeEventListener(AAPNE_EVENT, aapne);
  }, []);

  function velg(valg: { analyse: boolean; markedsforing: boolean }) {
    const s = lagreSamtykke(hentLager(), valg);
    meldTilGoogle(s);
    window.dispatchEvent(new CustomEvent(EVENT_NAVN, { detail: s }));
    settSvar(s);
  }

  // Ikke lest ennå (server + hydrering) eller allerede besvart: ingen banner.
  // AnimatePresence blir stående slik at utgangsanimasjonen rekker å spille.
  const vis = status.lest && status.svar === null;
  const varighet = reduserBevegelse ? 0 : 0.4;
  const knappBase =
    "w-full sm:w-auto sm:flex-1 px-6 py-3 text-sm tracking-wide rounded-full transition-colors " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f6b28]";

  return (
    <AnimatePresence>
      {vis && (
        <motion.div
          initial={reduserBevegelse ? { opacity: 0 } : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduserBevegelse ? { opacity: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: varighet, ease: [0.22, 1, 0.36, 1] }}
          // pointer-events-none på rammen slik at marginen rundt kortet ikke
          // legger et usynlig lokk over siden. Kortet selv tar imot klikk.
          className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-5 pointer-events-none"
        >
          <div
            role="dialog"
            aria-label="Informasjonskapsler"
            className="pointer-events-auto mx-auto w-full max-w-2xl rounded-2xl bg-white
                       border border-[#e8d5b0]/60 shadow-[0_12px_48px_-16px_rgba(26,26,26,0.45)]
                       p-5 sm:p-7"
          >
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#8f6b28] mb-2.5">
              Personvern
            </p>
            <h2
              className="text-xl sm:text-2xl leading-tight text-[#1a1a1a] mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Informasjonskapsler
            </h2>
            <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
              Vi bruker informasjonskapsler for å se hvordan nettsiden brukes, og
              for markedsføring. Du velger selv hva du sier ja til — nødvendige
              kapsler for handlekurv og sikkerhet er alltid på.{" "}
              <a
                href="/personvern"
                className="underline underline-offset-2 hover:text-[#8f6b28] transition-colors"
              >
                Les mer i personvernerklæringen
              </a>
              .
            </p>

            <AnimatePresence initial={false}>
              {detaljer && (
                <motion.div
                  id={panelId}
                  initial={
                    reduserBevegelse
                      ? { opacity: 0 }
                      : { opacity: 0, height: 0 }
                  }
                  animate={
                    reduserBevegelse
                      ? { opacity: 1 }
                      : { opacity: 1, height: "auto" }
                  }
                  exit={
                    reduserBevegelse ? { opacity: 0 } : { opacity: 0, height: 0 }
                  }
                  transition={{ duration: reduserBevegelse ? 0 : 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 pt-1 divide-y divide-[#e8d5b0]/50 border-t border-[#e8d5b0]/50">
                    <div className="flex items-start justify-between gap-4 py-4">
                      <div className="min-w-0">
                        <p className="text-sm text-[#1a1a1a]">Nødvendige</p>
                        <p className="text-xs text-[#1a1a1a]/65 leading-relaxed mt-1">
                          Handlekurv og sikker drift. Uten disse virker ikke
                          siden.
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full border border-[#e8d5b0] bg-[#faf9f7] px-3 py-1 text-xs text-[#3d4a3e]">
                        Alltid på
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4 py-4">
                      <div className="min-w-0">
                        <label
                          htmlFor={analyseId}
                          className="text-sm text-[#1a1a1a] cursor-pointer"
                        >
                          Analyse
                        </label>
                        <p className="text-xs text-[#1a1a1a]/65 leading-relaxed mt-1">
                          Statistikk over hvilke sider som besøkes, så vi ser
                          hva som er nyttig.
                        </p>
                      </div>
                      <span className="relative inline-flex shrink-0 mt-0.5">
                        <input
                          id={analyseId}
                          type="checkbox"
                          checked={analyse}
                          onChange={(e) => setAnalyse(e.target.checked)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className="block h-6 w-11 rounded-full bg-[#e8d5b0] transition-colors
                                     peer-checked:bg-[#8f6b28] peer-hover:bg-[#c9a96e]
                                     peer-checked:peer-hover:bg-[#7a5b20]
                                     peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2
                                     peer-focus-visible:outline-[#8f6b28]"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-0.5 left-0.5 h-5 w-5 rounded-full
                                     bg-white shadow-sm transition-transform peer-checked:translate-x-5"
                        />
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4 py-4">
                      <div className="min-w-0">
                        <label
                          htmlFor={markedsforingId}
                          className="text-sm text-[#1a1a1a] cursor-pointer"
                        >
                          Markedsføring
                        </label>
                        <p className="text-xs text-[#1a1a1a]/65 leading-relaxed mt-1">
                          Lar oss måle hvilke annonser som fører til en
                          bestilling, og vise relevante annonser.
                        </p>
                      </div>
                      <span className="relative inline-flex shrink-0 mt-0.5">
                        <input
                          id={markedsforingId}
                          type="checkbox"
                          checked={markedsforing}
                          onChange={(e) => setMarkedsforing(e.target.checked)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className="block h-6 w-11 rounded-full bg-[#e8d5b0] transition-colors
                                     peer-checked:bg-[#8f6b28] peer-hover:bg-[#c9a96e]
                                     peer-checked:peer-hover:bg-[#7a5b20]
                                     peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2
                                     peer-focus-visible:outline-[#8f6b28]"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-0.5 left-0.5 h-5 w-5 rounded-full
                                     bg-white shadow-sm transition-transform peer-checked:translate-x-5"
                        />
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => velg({ analyse, markedsforing })}
                    className={`${knappBase} sm:flex-none bg-[#8f6b28] text-white hover:bg-[#7a5b20] mt-1`}
                  >
                    Lagre valg
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Godta og avslå har samme størrelse og vekt — valget skal være
                like lett å ta begge veier. */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2.5">
              <button
                type="button"
                onClick={() => velg({ analyse: true, markedsforing: true })}
                className={`${knappBase} bg-[#8f6b28] text-white hover:bg-[#7a5b20]`}
              >
                Godta alle
              </button>
              <button
                type="button"
                onClick={() => velg({ analyse: false, markedsforing: false })}
                className={`${knappBase} bg-white text-[#1a1a1a] border border-[#8f6b28]/50 hover:border-[#8f6b28] hover:bg-[#faf9f7]`}
              >
                Bare nødvendige
              </button>
              <button
                type="button"
                onClick={() => setDetaljer((v) => !v)}
                aria-expanded={detaljer}
                aria-controls={detaljer ? panelId : undefined}
                className="w-full sm:w-auto px-2 py-2 text-sm text-[#1a1a1a]/65 underline underline-offset-4
                           hover:text-[#8f6b28] transition-colors rounded-full
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f6b28]"
              >
                {detaljer ? "Skjul valgene" : "Velg selv"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
