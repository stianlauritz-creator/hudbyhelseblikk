"use client";

import { useState } from "react";
import { Gift } from "lucide-react";
import { gaaTilKasse, hentGl, medGl } from "@/lib/analyse";
import { KASSE_ANKER } from "@/lib/site";

const VALORER = [500, 1000, 1500, 2000];

const fmt = (n: number) => n.toLocaleString("nb-NO") + ",-";

export default function GavekortKjop() {
  const [venter, setVenter] = useState<number | null>(null);
  const [feil, setFeil] = useState(false);

  const kjop = async (
    amount: number,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    // Samme grep som i kurven: lenka finnes bare for at GA4 skal
    // dekorere klikket. Se hentGl i lib/analyse.ts.
    e.preventDefault();
    const gl = hentGl(e.currentTarget.getAttribute("href"));
    if (venter !== null) return;
    setVenter(amount);
    setFeil(false);
    try {
      const res = await fetch("/api/gavekort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        gaaTilKasse(medGl(data.url, gl));
        return;
      }
      setFeil(true);
    } catch {
      setFeil(true);
    }
    setVenter(null);
  };

  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#8f6b28]">
        Velg beløp
      </p>
      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {VALORER.map((v) => (
          <a
            key={v}
            href={KASSE_ANKER}
            onClick={(e) => kjop(v, e)}
            aria-disabled={venter !== null}
            className={`flex items-center justify-center gap-2 rounded-full bg-[#8f6b28] px-5 py-3.5 text-sm tracking-wide text-white transition-colors hover:bg-[#7a5b20] ${
              venter !== null ? "pointer-events-none opacity-60" : ""
            }`}
          >
            <Gift size={14} />
            {venter === v ? "Åpner kassen …" : fmt(v)}
          </a>
        ))}
      </div>
      {feil && (
        <p className="mb-3 text-sm text-red-700">
          Noe gikk galt — prøv igjen, eller ta kontakt så ordner vi det.
        </p>
      )}
      <p className="text-xs leading-relaxed text-[#1a1a1a]/65">
        Du sendes til vår sikre kasse. Gavekortkoden kommer på e-post med én
        gang betalingen er gjennomført.
      </p>
    </div>
  );
}
