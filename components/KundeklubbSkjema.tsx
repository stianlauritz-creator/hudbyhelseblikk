"use client";

import { useState } from "react";

type Status = "klar" | "sender" | "ferdig" | "feil";

export default function KundeklubbSkjema({
  variant = "side",
  onFerdig,
}: {
  variant?: "popup" | "side";
  onFerdig?: () => void;
}) {
  const [fornavn, setFornavn] = useState("");
  const [epost, setEpost] = useState("");
  const [telefon, setTelefon] = useState("");
  const [samtykkeEpost, setSamtykkeEpost] = useState(false);
  const [samtykkeSms, setSamtykkeSms] = useState(false);
  const [felle, setFelle] = useState(""); // honningkrukke
  const [status, setStatus] = useState<Status>("klar");
  const [feilmelding, setFeilmelding] = useState("");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sender") return;
    setStatus("sender");
    setFeilmelding("");

    try {
      const res = await fetch("/api/kundeklubb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fornavn,
          epost,
          telefon,
          samtykkeEpost,
          samtykkeSms,
          felle,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeilmelding(data.feil ?? "Noe gikk galt. Prøv igjen.");
        setStatus("feil");
        return;
      }
      setStatus("ferdig");
      onFerdig?.();
    } catch {
      setFeilmelding("Får ikke kontakt. Sjekk nettforbindelsen og prøv igjen.");
      setStatus("feil");
    }
  }

  if (status === "ferdig") {
    return (
      <div className="text-center py-4">
        <p
          className="text-2xl mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Velkommen!
        </p>
        <p className="text-[#1a1a1a]/65 text-sm leading-relaxed">
          Rabattkoden ligger i innboksen din. Finner du den ikke, sjekk
          søppelposten.
        </p>
      </div>
    );
  }

  const kompakt = variant === "popup";

  return (
    <form onSubmit={send} className={kompakt ? "space-y-3" : "space-y-4"}>
      {/* Honningkrukke — skjult for mennesker, fylles ut av roboter */}
      <div
        className="absolute w-px h-px overflow-hidden -left-[9999px]"
        aria-hidden="true"
      >
        <label htmlFor="kk-firma">Firma</label>
        <input
          id="kk-firma"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={felle}
          onChange={(e) => setFelle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="kk-fornavn" className="sr-only">
          Fornavn
        </label>
        <input
          id="kk-fornavn"
          type="text"
          autoComplete="given-name"
          placeholder="Fornavn (valgfritt)"
          value={fornavn}
          onChange={(e) => setFornavn(e.target.value)}
          className="w-full px-4 py-3 border border-[#e8d5b0] rounded-lg bg-white text-[#1a1a1a] placeholder:text-[#1a1a1a]/65 focus:outline-none focus:border-[#c9a96e]"
        />
      </div>

      <div>
        <label htmlFor="kk-epost" className="sr-only">
          E-postadresse
        </label>
        <input
          id="kk-epost"
          type="email"
          required
          autoComplete="email"
          placeholder="E-postadresse"
          value={epost}
          onChange={(e) => setEpost(e.target.value)}
          className="w-full px-4 py-3 border border-[#e8d5b0] rounded-lg bg-white text-[#1a1a1a] placeholder:text-[#1a1a1a]/65 focus:outline-none focus:border-[#c9a96e]"
        />
      </div>

      <div>
        <label htmlFor="kk-telefon" className="sr-only">
          Telefonnummer
        </label>
        <input
          id="kk-telefon"
          type="tel"
          autoComplete="tel"
          placeholder="Telefon (valgfritt)"
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
          className="w-full px-4 py-3 border border-[#e8d5b0] rounded-lg bg-white text-[#1a1a1a] placeholder:text-[#1a1a1a]/65 focus:outline-none focus:border-[#c9a96e]"
        />
      </div>

      <label className="flex gap-3 items-start cursor-pointer">
        <input
          type="checkbox"
          checked={samtykkeEpost}
          onChange={(e) => setSamtykkeEpost(e.target.checked)}
          className="mt-1 accent-[#c9a96e]"
        />
        <span className="text-xs text-[#1a1a1a]/65 leading-relaxed">
          Ja, send meg tilbud og nyheter på e-post.
        </span>
      </label>

      <label className="flex gap-3 items-start cursor-pointer">
        <input
          type="checkbox"
          checked={samtykkeSms}
          onChange={(e) => setSamtykkeSms(e.target.checked)}
          className="mt-1 accent-[#c9a96e]"
        />
        <span className="text-xs text-[#1a1a1a]/65 leading-relaxed">
          Ja, send meg SMS om ledige timer og kampanjer.
        </span>
      </label>

      {feilmelding && (
        <p className="text-xs text-[#a33] leading-relaxed" role="alert">
          {feilmelding}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sender"}
        className="w-full px-6 py-3.5 bg-[#8f6b28] text-white text-sm tracking-wide rounded-full hover:bg-[#7a5b20] transition-colors disabled:opacity-60"
      >
        {status === "sender" ? "Melder deg inn …" : "Bli medlem"}
      </button>

      <p className="text-[11px] text-[#1a1a1a]/65 leading-relaxed">
        Du kan melde deg av når som helst. Se{" "}
        <a href="/personvern" className="underline">
          personvernerklæringen
        </a>
        .
      </p>
    </form>
  );
}
