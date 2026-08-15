"use client";

import { useState } from "react";
import { Gift } from "lucide-react";

const VALORER = [500, 1000, 1500, 2000];

const fmt = (n: number) => n.toLocaleString("nb-NO") + ",-";

export default function GavekortKjop() {
  const [venter, setVenter] = useState<number | null>(null);
  const [feil, setFeil] = useState(false);

  const kjop = async (amount: number) => {
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
        window.location.href = data.url;
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
          <button
            key={v}
            onClick={() => kjop(v)}
            disabled={venter !== null}
            className="flex items-center justify-center gap-2 rounded-full bg-[#8f6b28] px-5 py-3.5 text-sm tracking-wide text-white transition-colors hover:bg-[#7a5b20] disabled:opacity-60"
          >
            <Gift size={14} />
            {venter === v ? "Åpner kassen …" : fmt(v)}
          </button>
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
