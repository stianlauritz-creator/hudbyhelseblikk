"use client";

import Image from "next/image";
import Link from "next/link";
import { Gift, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { AKTIVE_KAMPANJER, type Kampanje } from "@/lib/kampanjer";
import { PRODUCTS, formatPrice } from "@/lib/products";

function butikkLenke(kampanje: Kampanje) {
  return kampanje.merkeFilter
    ? `/nettbutikk?merke=${kampanje.merkeFilter}`
    : "/nettbutikk";
}

function Merkelapp({ tekst }: { tekst: string }) {
  return (
    <p className="inline-flex items-center gap-1.5 rounded-full bg-[#3d4a3e] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
      <Sparkles size={11} className="shrink-0" />
      {tekst}
    </p>
  );
}

function Gaveboks({ kampanje }: { kampanje: Kampanje }) {
  return (
    <p className="flex items-start gap-2.5 rounded-xl bg-[#f5ede4] px-4 py-3 text-sm text-[#1a1a1a]/80">
      <Gift size={15} className="mt-0.5 shrink-0 text-[#8f6b28]" />
      <span>
        Du får <strong className="font-medium">{kampanje.gave.navn}</strong> —
        verdi {formatPrice(kampanje.gave.verdi)}
      </span>
    </p>
  );
}

function Vilkar({ vilkar }: { vilkar: string[] }) {
  return (
    <ul className="space-y-1.5">
      {vilkar.map((v) => (
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
  );
}

function Knapp({ kampanje }: { kampanje: Kampanje }) {
  return (
    <Link
      href={butikkLenke(kampanje)}
      className="inline-block self-start rounded-full border border-[#c9a96e] px-5 py-2.5 text-xs tracking-wide text-[#8f6b28] transition-colors hover:bg-[#8f6b28] hover:text-white"
    >
      {kampanje.merkeFilter
        ? `Se ${kampanje.merke} i nettbutikken`
        : "Se hele utvalget"}
    </Link>
  );
}

/**
 * Full bredde med merkets eget kampanjebanner øverst. Bannerteksten er brent
 * inn i bildet og er ren pynt — den samme informasjonen står i tittel,
 * ingress og vilkår under. På mobil beskjæres banneret mot produktsiden, der
 * det er noe å se; den innbrente teksten ville uansett vært uleselig.
 */
function KampanjeRad({ kampanje, index }: { kampanje: Kampanje; index: number }) {
  const gaveProdukt = PRODUCTS.find((p) => p.sku === kampanje.gave.sku);

  return (
    <AnimatedSection delay={index * 0.08}>
      <article className="overflow-hidden rounded-2xl border border-[#e8d5b0]/50 bg-white">
        {/* Mobil beskjærer mot høyre kant: bannerne har teksten til venstre og
            produktet til høyre, og 3/2 treffer akkurat forbi siste tekstlinje
            i begge, så ingen halve ord blir stående. */}
        {kampanje.banner ? (
          <div className="relative aspect-[3/2] w-full bg-[#faf9f7] sm:aspect-[1800/537]">
            <Image
              src={kampanje.banner.src}
              alt={kampanje.banner.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-right sm:object-center"
            />
          </div>
        ) : (
          <div className="flex items-center gap-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7] px-6 py-8 sm:px-10">
            {gaveProdukt && (
              <div className="relative h-24 w-24 shrink-0 rounded-xl bg-white sm:h-28 sm:w-28">
                <Image
                  src={gaveProdukt.image}
                  alt={kampanje.gave.navn}
                  fill
                  sizes="112px"
                  className="object-contain p-3"
                />
              </div>
            )}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f6b28]">
                {kampanje.merke}
              </p>
              <p
                className="mt-1 text-2xl leading-tight text-[#1e2d3d] sm:text-3xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {kampanje.tittel}
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1.5fr_1fr] md:items-start md:gap-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f6b28]">
              {kampanje.merke}
            </p>
            <h3
              className="mt-1.5 text-xl leading-snug text-[#1a1a1a] sm:text-2xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {kampanje.tittel}
            </h3>
            {kampanje.merkelapp && (
              <div className="mt-3">
                <Merkelapp tekst={kampanje.merkelapp} />
              </div>
            )}
            <p className="mt-4 leading-relaxed text-[#1a1a1a]/70">
              {kampanje.ingress}
            </p>
            <div className="mt-6">
              <Knapp kampanje={kampanje} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Gaveboks kampanje={kampanje} />
            <Vilkar vilkar={kampanje.vilkar} />
          </div>
        </div>
      </article>
    </AnimatedSection>
  );
}

/** Kompakt kort til nettbutikken — banneret får ligge på /kampanjer. */
function KampanjeKort({ kampanje, index }: { kampanje: Kampanje; index: number }) {
  const gaveProdukt = PRODUCTS.find((p) => p.sku === kampanje.gave.sku);

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
              <div className="mt-2">
                <Merkelapp tekst={kampanje.merkelapp} />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-sm leading-relaxed text-[#1a1a1a]/70">
            {kampanje.ingress}
          </p>
          <div className="mt-4">
            <Gaveboks kampanje={kampanje} />
          </div>
          <div className="mt-4">
            <Vilkar vilkar={kampanje.vilkar} />
          </div>
          <div className="mt-6">
            <Knapp kampanje={kampanje} />
          </div>
        </div>
      </article>
    </AnimatedSection>
  );
}

/**
 * Kampanjene. `variant="banner"` gir full bredde med merkenes egne bannere
 * (brukes på /kampanjer), `variant="kort"` gir et kompakt rutenett (brukes i
 * nettbutikken). Rendrer ingenting når ingen kampanjer er aktive.
 */
export default function Kampanjer({
  variant = "kort",
  className = "",
}: {
  variant?: "banner" | "kort";
  className?: string;
}) {
  if (AKTIVE_KAMPANJER.length === 0) return null;

  if (variant === "banner") {
    return (
      <div className={`space-y-8 ${className}`.trim()}>
        {AKTIVE_KAMPANJER.map((k, i) => (
          <KampanjeRad key={k.id} kampanje={k} index={i} />
        ))}
      </div>
    );
  }

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
