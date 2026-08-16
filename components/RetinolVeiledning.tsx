import Link from "next/link";
import { Sun, CalendarClock, HeartPulse, MessageCircle } from "lucide-react";
import type { Product } from "@/lib/products";

/**
 * Veiledningsboks for produkter med retinol. Vises på produktsiden.
 * Kunden kan fortsatt kjøpe fritt — dette er informasjon, ikke en sperre.
 */
export default function RetinolVeiledning({ product }: { product: Product }) {
  if (!product.retinol) return null;

  const punkter = [
    {
      icon: CalendarClock,
      text: "Start rolig — gjerne annenhver kveld de første to ukene, og bygg opp gradvis. Rødhet, tørrhet, flassing eller lett svie i starten er normalt, og gir seg når huden venner seg til produktet.",
    },
    {
      icon: Sun,
      text: "Bruk solbeskyttelse med SPF 30–50 hver dag mens du bruker retinol. Huden blir mer solsensitiv, og uten solkrem risikerer du både irritasjon og nye pigmentflekker.",
    },
    {
      icon: HeartPulse,
      text: "Retinol anbefales ikke hvis du er gravid eller ammer. Ta også kontakt med oss før oppstart hvis du bruker reseptbelagte hudmidler, eller nylig har tatt peeling, laser eller nålebehandling.",
    },
  ];

  return (
    <div className="rounded-2xl border border-[#c9a96e]/45 bg-[#f5ede4]/70 p-5 mb-8">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#8f6b28]">
          Inneholder retinol
        </p>
        {product.retinolStyrke && (
          <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#c9a96e]/40 text-[11px] text-[#8f6b28]">
            {product.retinolStyrke}
          </span>
        )}
      </div>

      <h2
        className="text-lg text-[#1a1a1a] mb-3"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Les dette før du starter
      </h2>

      <ul className="space-y-3 mb-4">
        {punkter.map((p) => (
          <li
            key={p.text}
            className="flex items-start gap-2.5 text-sm text-[#1a1a1a]/70 leading-relaxed"
          >
            <p.icon size={15} className="text-[#8f6b28] shrink-0 mt-0.5" />
            {p.text}
          </li>
        ))}
      </ul>

      <div className="flex items-start gap-2.5 pt-4 border-t border-[#c9a96e]/30 text-sm text-[#1a1a1a]/70 leading-relaxed">
        <MessageCircle size={15} className="text-[#8f6b28] shrink-0 mt-0.5" />
        <span>
          Er du usikker på styrke eller oppstart, anbefaler vi en{" "}
          <Link
            href="/behandlinger/hudkonsultasjon"
            className="underline hover:text-[#8f6b28]"
          >
            hudkonsultasjon
          </Link>{" "}
          først — den er gratis og uforpliktende. Du kan også{" "}
          <Link href="/kontakt" className="underline hover:text-[#8f6b28]">
            spørre Christina
          </Link>{" "}
          før du bestiller.
        </span>
      </div>
    </div>
  );
}
