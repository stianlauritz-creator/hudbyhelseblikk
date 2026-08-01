"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TIMMA_URL } from "@/lib/site";

const TIMMA_ORIGIN = "https://bestill.timma.no";

// Timma-timeboken innbakt uten iframe-resizer: vi lytter direkte på
// høyde-meldingene fra Timmas child-script og setter høyden selv. Det gir
// samme auto-høyde, men uten resizer-biblioteket som overstyrte sidens scroll.
//
// Timma-appen spør «are-you-genie?» ved oppstart; svarer vi «i-am-genie»
// rendres hele bookingflyten inline i stedet for en teaser som åpner ny fane.
export default function TimmaEmbed({ userId }: { userId?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState(900);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const src = userId ? `${TIMMA_URL}?user-id=${userId}` : TIMMA_URL;

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== TIMMA_ORIGIN) return;
      const frame = frameRef.current;

      if (e.data === "are-you-genie?") {
        frame?.contentWindow?.postMessage("i-am-genie", TIMMA_ORIGIN);
        return;
      }

      // iframe-resizer-protokollen: "[iFrameSizer]<id>:<høyde>:<bredde>:..."
      if (typeof e.data === "string" && e.data.startsWith("[iFrameSizer]")) {
        const tall = e.data.split(":");
        const h = Number(tall[1]);
        if (Number.isFinite(h) && h > 200) setHeight(Math.ceil(h) + 24);
        return;
      }

      // Timma sender også scrollY når brukeren navigerer mellom steg —
      // rull da toppen av timeboken inn i bildet på vår side.
      if (e.data && typeof e.data === "object" && "scrollY" in e.data) {
        const top = frame?.getBoundingClientRect().top ?? 0;
        if (top < -40) frame?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        className="relative rounded-[28px] bg-white p-1.5 sm:p-3 shadow-[0_24px_60px_-24px_rgba(30,45,61,0.28)] ring-1 ring-[#e8d5b0]/50"
      >
        {!loaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-[28px] bg-[#faf9f7]">
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
          ref={frameRef}
          id="timma-booking"
          src={src}
          title="Bestill time hos Hud By Helseblikk"
          onLoad={() => setLoaded(true)}
          scrolling="no"
          className="w-full rounded-[22px] border-0 block"
          style={{ height }}
        />
      </motion.div>

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
