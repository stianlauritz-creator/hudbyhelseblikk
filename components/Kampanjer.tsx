"use client";

import Image from "next/image";
import Link from "next/link";
import { Gift, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { AKTIVE_KAMPANJER, type Kampanje } from "@/lib/kampanjer";
import { PRODUCTS, formatPrice } from "@/lib/products";

function KampanjeKort({ kampanje, index }: { kampanje: Kampanje; index: number }) {
  const gaveProdukt = PRODUCTS.find((p) => p.sku === kampanje.gave.sku);
  const butikkLenke = kampanje.merkeFilter
    ? `/nettbutikk?merke=${kampanje.merkeFilter}`
    : "/nettbutikk";

  return (
    <AnimatedSection delay={index * 0.08}>
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8d5b0]/50 bg-white">
        <div className="flex items-start gap-4 border-b border-[#e8d5b0]/40 bg-[#faf9f7] p-5">
          {gaveProdukt && (
            <div className="relative h-20 w-20 shrink-0 rounded-xl bg-white">
              <Image
                src={gaveProdukt.image}
                alt={kampanje.gave.navn}
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f6b28]">
              {kampanje.merke}
            </p>
            <h3
              className="mt-1 text-lg leading-snug text-[#1a1a1a]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {kampanje.tittel}
            </h3>
            {kampanje.merkelapp && (
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#3d4a3e] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
                <Sparkles size={11} className="shrink-0" />
                {kampanje.merkelapp}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-sm leading-relaxed text-[#1a1a1a]/70">
            {kampanje.ingress}
          </p>

          <p className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#f5ede4] px-4 py-3 text-sm text-[#1a1a1a]/80">
            <Gift size={15} className="mt-0.5 shrink-0 text-[#8f6b28]" />
            <span>
              Du får{" "}
              <strong className="font-medium">{kampanje.gave.navn}</strong> —
              verdi {formatPrice(kampanje.gave.verdi)}
            </span>
          </p>

          <ul className="mt-4 space-y-1.5">
            {kampanje.vilkar.map((v) => (
              <li
                key={v}
                className="flex gap-2 text-xs leading-relaxed text-[#1a1a1a]/65"
              >
                <span aria-hidden className="text-[#c9a96e]">
                  ·
                </span>
                {v}
              </li>
            ))}
          </ul>

          <Link
            href={butikkLenke}
            className="mt-6 self-start rounded-full border border-[#c9a96e] px-5 py-2.5 text-xs tracking-wide text-[#8f6b28] transition-colors hover:bg-[#8f6b28] hover:text-white"
          >
            {kampanje.merkeFilter
              ? `Se ${kampanje.merke} i nettbutikken`
              : "Se hele utvalget"}
          </Link>
        </div>
      </article>
    </AnimatedSection>
  );
}

/**
 * Kampanjekortene. Brukes både på /kampanjer og som seksjon i nettbutikken.
 * Rendrer ingenting når ingen kampanjer er aktive i lib/kampanjer.ts.
 */
export default function Kampanjer({ className = "" }: { className?: string }) {
  if (AKTIVE_KAMPANJER.length === 0) return null;
  return (
    <div
      className={`grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${className}`.trim()}
    >
      {AKTIVE_KAMPANJER.map((k, i) => (
        <KampanjeKort key={k.id} kampanje={k} index={i} />
      ))}
    </div>
  );
}
