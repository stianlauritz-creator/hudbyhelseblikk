"use client";

import { useState } from "react";
import Script from "next/script";
import { TIMMA_URL } from "@/lib/site";

declare global {
  interface Window {
    iFrameResize?: (options: object, selector: string) => void;
  }
}

// Timma-bookingen innbakt med iframe-resizer (samme versjon som Timmas
// child-script), så rammen alltid følger innholdets høyde uten scrollbar.
// Faller tilbake til fast høyde + direkte-lenke hvis scriptet ikke laster.
// userId forhåndsvelger behandler i timeboken (Timmas ?user-id-parameter).
export default function TimmaEmbed({ userId }: { userId?: string }) {
  const [loaded, setLoaded] = useState(false);
  const src = userId ? `${TIMMA_URL}?user-id=${userId}` : TIMMA_URL;

  const initResizer = () => {
    if (window.iFrameResize) {
      window.iFrameResize({ checkOrigin: false }, "#timma-booking");
    }
  };

  return (
    <div>
      <div className="relative rounded-2xl border border-[#e8d5b0]/40 bg-white overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#faf9f7]">
            <p className="text-sm text-[#1a1a1a]/40 animate-pulse">
              Laster timeboken …
            </p>
          </div>
        )}
        <iframe
          id="timma-booking"
          src={src}
          title="Bestill time hos Hud By Helseblikk"
          width="100%"
          frameBorder="0"
          onLoad={() => {
            setLoaded(true);
            initResizer();
          }}
          className="relative w-full min-h-[820px]"
        />
      </div>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/2.8.3/iframeResizer.min.js"
        strategy="afterInteractive"
        onLoad={initResizer}
      />
      <p className="text-xs text-[#1a1a1a]/40 text-center mt-4">
        Vises ikke timeboken?{" "}
        <a
          href={TIMMA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c9a96e] underline hover:no-underline"
        >
          Åpne den i eget vindu
        </a>{" "}
        — eller ring oss på{" "}
        <a href="tel:37040500" className="text-[#c9a96e] underline hover:no-underline">
          370 40 500
        </a>
        .
      </p>
    </div>
  );
}
