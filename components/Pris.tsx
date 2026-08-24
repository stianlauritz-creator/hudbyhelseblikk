import { formatPrice, type Product } from "@/lib/products";

/**
 * Avslag i hele prosent, eller null når varen ikke er nedsatt.
 * `foerPris` er ordinærprisen — settes i lib/products.ts eller hentes fra
 * Shopifys «Sammenlign med»-pris via mapNode.
 */
export function avslagIProsent(produkt: Product): number | null {
  if (!produkt.foerPris || produkt.foerPris <= produkt.price) return null;
  return Math.round((1 - produkt.price / produkt.foerPris) * 100);
}

const STORRELSER = {
  liten: { pris: "text-xs", foer: "text-[10px]", merke: "text-[9px] px-1.5 py-0.5" },
  kort: { pris: "text-sm font-medium", foer: "text-xs", merke: "text-[10px] px-2 py-0.5" },
  stor: { pris: "text-2xl font-medium", foer: "text-base", merke: "text-xs px-2.5 py-1" },
} as const;

/**
 * Pris med ordinærpris overstrøket og avslagsmerke når varen er nedsatt.
 * Ellers bare prisen, akkurat som før — så dette er trygt å bruke overalt.
 */
export default function Pris({
  produkt,
  storrelse = "kort",
}: {
  produkt: Product;
  storrelse?: keyof typeof STORRELSER;
}) {
  const avslag = avslagIProsent(produkt);
  const s = STORRELSER[storrelse];

  if (avslag === null) {
    return <p className={`${s.pris} text-[#1a1a1a]`}>{formatPrice(produkt.price)}</p>;
  }

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <p className={`${s.pris} text-[#8f6b28]`}>{formatPrice(produkt.price)}</p>
      <p className={`${s.foer} text-[#1a1a1a]/50 line-through`}>
        {formatPrice(produkt.foerPris!)}
      </p>
      <span
        className={`${s.merke} rounded-full bg-[#8f6b28] uppercase tracking-[0.12em] text-white`}
      >
        −{avslag}&nbsp;%
      </span>
    </div>
  );
}
