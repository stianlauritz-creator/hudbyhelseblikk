"use client";

import Image from "next/image";
import Link from "next/link";
import { Gift, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { AKTIVE_KAMPANJER, type Kampanje } from "@/lib/kampanjer";
import { PRODUCTS, formatPrice, type Brand } from "@/lib/products";

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

function knappTekst(kampanje: Kampanje) {
  return kampanje.merkeFilter
    ? `Se ${kampanje.merke} i nettbutikken`
    : "Se hele utvalget";
}

/**
 * Hele kampanjekortet er klikkbart (`Klikkflate`), så dette er en ren
 * visuell knapp — ikke en egen lenke. To lenker til samme sted i samme kort
 * gir dobbel opplesing for skjermlesere og ekstra tab-stopp uten gevinst.
 * Den lyser opp når musa er hvor som helst over kortet (`group-hover`).
 */
function Knapp({ kampanje }: { kampanje: Kampanje }) {
  return (
    <span className="inline-block self-start rounded-full border border-[#c9a96e] px-5 py-2.5 text-xs tracking-wide text-[#8f6b28] transition-colors group-hover:bg-[#8f6b28] group-hover:text-white">
      {knappTekst(kampanje)}
    </span>
  );
}

/**
 * Usynlig lenke som dekker hele kortet — det er denne som gjør hele kampanjen
 * klikkbar. Ligger på z-10 over innholdet; kortene har ingen andre interaktive
 * elementer, så den stjeler ingen klikk.
 *
 * `onVelgMerke` er til nettbutikken, som viser kampanjene på SIN EGEN side og
 * lenker til seg selv med ?merke=. Det er en klientside-navigasjon til samme
 * rute: Next bytter URL, men remounter ikke siden og re-rendrer den ikke, så
 * en effekt som leser ?merke= ville aldri kjørt og klikket så dødt ut. Derfor
 * setter vi filteret direkte via callbacken — lenken får fortsatt oppdatere
 * URL-en, så adressen er delbar og «åpne i ny fane» virker.
 */
function Klikkflate({
  kampanje,
  onVelgMerke,
}: {
  kampanje: Kampanje;
  onVelgMerke?: (merke: Brand | null) => void;
}) {
  return (
    <Link
      href={butikkLenke(kampanje)}
      onClick={() => onVelgMerke?.(kampanje.merkeFilter ?? null)}
      className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f6b28]"
      aria-label={`${kampanje.merke}: ${kampanje.tittel}. ${knappTekst(kampanje)}`}
    />
  );
}

/**
 * Full bredde med merkets eget kampanjebanner øverst. Bannerteksten er brent
 * inn i bildet og er ren pynt — den samme informasjonen står i tittel,
 * ingress og vilkår under. På mobil beskjæres banneret mot produktsiden, der
 * det er noe å se; den innbrente teksten ville uansett vært uleselig.
 */
function KampanjeRad({
  kampanje,
  index,
  onVelgMerke,
}: {
  kampanje: Kampanje;
  index: number;
  onVelgMerke?: (merke: Brand | null) => void;
}) {
  const gaveProdukt = PRODUCTS.find((p) => p.sku === kampanje.gave.sku);

  return (
    <AnimatedSection delay={index * 0.08}>
      <article className="group relative overflow-hidden rounded-2xl border border-[#e8d5b0]/50 bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#c9a96e]/60 hover:shadow-[0_20px_40px_-18px_rgba(30,45,61,0.18)]">
        <Klikkflate kampanje={kampanje} onVelgMerke={onVelgMerke} />
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
function KampanjeKort({
  kampanje,
  index,
  onVelgMerke,
}: {
  kampanje: Kampanje;
  index: number;
  onVelgMerke?: (merke: Brand | null) => void;
}) {
  const gaveProdukt = PRODUCTS.find((p) => p.sku === kampanje.gave.sku);

  return (
    <AnimatedSection delay={index * 0.08}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8d5b0]/50 bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#c9a96e]/60 hover:shadow-[0_20px_40px_-18px_rgba(30,45,61,0.18)]">
        <Klikkflate kampanje={kampanje} onVelgMerke={onVelgMerke} />
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
  onVelgMerke,
}: {
  variant?: "banner" | "kort";
  className?: string;
  /** Settes av nettbutikken, som lenker til seg selv — se Klikkflate. */
  onVelgMerke?: (merke: Brand | null) => void;
}) {
  if (AKTIVE_KAMPANJER.length === 0) return null;

  if (variant === "banner") {
    return (
      <div className={`space-y-8 ${className}`.trim()}>
        {AKTIVE_KAMPANJER.map((k, i) => (
          <KampanjeRad
            key={k.id}
            kampanje={k}
            index={i}
            onVelgMerke={onVelgMerke}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${className}`.trim()}
    >
      {AKTIVE_KAMPANJER.map((k, i) => (
        <KampanjeKort
          key={k.id}
          kampanje={k}
          index={i}
          onVelgMerke={onVelgMerke}
        />
      ))}
    </div>
  );
}
