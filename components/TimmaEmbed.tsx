"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { TIMMA_URL } from "@/lib/site";

const TIMMA_ORIGIN = "https://bestill.timma.no";

declare global {
  interface Window {
    iFrameResize?: (options: object, selector: string) => void;
  }
}

// Timma-timeboken innbakt i sidens design.
//
// Tre ting må stemme for at dette skal oppføre seg som en del av siden:
//  1. Svare «i-am-genie» på Timmas «are-you-genie?» — ellers vises bare en
//     teaser som åpner bookingen i ny fane.
//  2. heightCalculationMethod «lowestElement». Timmas CSS setter height:100%
//     på body, så standardmetoden (bodyOffset) måler iframens egen høyde og
//     rammen vokser aldri — innholdet ble klippet og scrollen låste seg.
//  3. Svare på «give-cookie-preferences», ellers viser Timma sin egen
//     cookiebanner oppå vår.
export default function TimmaEmbed({ userId }: { userId?: string }) {
  const [loaded, setLoaded] = useState(false);
  const src = userId ? `${TIMMA_URL}?user-id=${userId}` : TIMMA_URL;

  const initResizer = () => {
    window.iFrameResize?.(
      {
        checkOrigin: [TIMMA_ORIGIN],
        heightCalculationMethod: "lowestElement",
        scrolling: false,
        minHeight: 620,
      },
      "#timma-booking"
    );
  };

  // Timma spør «are-you-genie?» rett etter oppstart — ofte før React har
  // rukket å registrere lytteren. Vi svarer derfor proaktivt i noen sekunder;
  // barnet reagerer på «i-am-genie» når som helst.
  useEffect(() => {
    const frame = document.getElementById(
      "timma-booking"
    ) as HTMLIFrameElement | null;
    let forsøk = 0;
    const id = setInterval(() => {
      frame?.contentWindow?.postMessage("i-am-genie", TIMMA_ORIGIN);
      if (++forsøk > 24) clearInterval(id); // ~6 sekunder
    }, 250);
    const ferdig = setTimeout(() => setLoaded(true), 2500);
    return () => {
      clearInterval(id);
      clearTimeout(ferdig);
    };
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== TIMMA_ORIGIN) return;
      setLoaded(true);
      const frame = document.getElementById(
        "timma-booking"
      ) as HTMLIFrameElement | null;
      const barn = frame?.contentWindow;
      if (!barn) return;

      if (e.data === "are-you-genie?") {
        barn.postMessage("i-am-genie", TIMMA_ORIGIN);
      }

      if (e.data === "give-cookie-preferences") {
        barn.postMessage(
          { type: "cookie-preferences", value: { GA4: true, pixel: true } },
          TIMMA_ORIGIN
        );
      }

      // Timmas datovelger o.l. åpnes øverst i rammen — rull den i syne
      if (e.data === "modal-open" && frame) {
        const top = frame.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(top - 24, 0), behavior: "smooth" });
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[28px] bg-white p-1.5 shadow-[0_24px_60px_-24px_rgba(30,45,61,0.28)] ring-1 ring-[#e8d5b0]/50 sm:p-3"
      >
        {!loaded && (
          <div className="absolute inset-0 z-10 flex min-h-[620px] flex-col items-center justify-center gap-3 rounded-[28px] bg-[#faf9f7]">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-[#c9a96e]"
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>
            <p className="text-sm text-[#1a1a1a]/45">Henter ledige timer …</p>
          </div>
        )}
        <iframe
          id="timma-booking"
          src={src}
          title="Bestill time hos Hud By Helseblikk"
          onLoad={() => {
            setLoaded(true);
            initResizer();
          }}
          className="block w-full rounded-[22px] border-0"
          style={{ minHeight: 620 }}
        />
      </motion.div>

      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/2.8.3/iframeResizer.min.js"
        strategy="afterInteractive"
        onLoad={initResizer}
      />

      <p className="mt-5 text-center text-xs text-[#1a1a1a]/40">
        Vises ikke timeboken?{" "}
        <a
          href={TIMMA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c9a96e] underline underline-offset-2 hover:no-underline"
        >
          Åpne den i eget vindu
        </a>{" "}
        — eller ring oss på{" "}
        <a
          href="tel:37040500"
          className="text-[#c9a96e] underline underline-offset-2 hover:no-underline"
        >
          370 40 500
        </a>
        .
      </p>
    </div>
  );
}
