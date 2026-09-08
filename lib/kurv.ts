// Ren kurvlogikk, uten React. Ligger utenfor CartProvider slik at
// linjehåndteringen kan testes — komponenten holder bare tilstanden.
//
// En linje identifiseres av SKU *og* nyanse: to nyanser av samme produkt er
// to linjer. Produkter uten nyanser har `farge` utelatt, ikke tom streng, så
// nøkkelen blir uendret for kurver lagret før fargevalget fantes.

export interface Kurvlinje {
  sku: string;
  farge?: string;
  qty: number;
}

/** Produktformen kurven trenger. Holdes minimal med vilje. */
interface Kurvprodukt {
  sku: string;
  farger?: string[];
}

export const MAKS_ANTALL = 10;

export function linjeNokkel(l: Pick<Kurvlinje, "sku" | "farge">): string {
  return l.farge ? `${l.sku}|${l.farge}` : l.sku;
}

function klipp(qty: number): number {
  return Math.max(1, Math.min(MAKS_ANTALL, Math.floor(qty)));
}

export function leggTil(
  linjer: Kurvlinje[],
  sku: string,
  farge?: string
): Kurvlinje[] {
  const nokkel = linjeNokkel({ sku, farge });
  const finnes = linjer.some((l) => linjeNokkel(l) === nokkel);
  if (finnes) {
    return linjer.map((l) =>
      linjeNokkel(l) === nokkel ? { ...l, qty: klipp(l.qty + 1) } : l
    );
  }
  return [...linjer, farge ? { sku, farge, qty: 1 } : { sku, qty: 1 }];
}

export function fjern(linjer: Kurvlinje[], nokkel: string): Kurvlinje[] {
  return linjer.filter((l) => linjeNokkel(l) !== nokkel);
}

export function settAntall(
  linjer: Kurvlinje[],
  nokkel: string,
  qty: number
): Kurvlinje[] {
  if (qty <= 0) return fjern(linjer, nokkel);
  return linjer.map((l) =>
    linjeNokkel(l) === nokkel ? { ...l, qty: klipp(qty) } : l
  );
}

/**
 * Vasker linjer lest fra localStorage mot katalogen slik den ser ut nå.
 * Kaster linjer for produkter som er ute av sortimentet, nyanser som er
 * tatt ut, og gamle linjer uten nyanse på produkter som nå krever et valg —
 * i det siste tilfellet må kunden velge på nytt, ellers ville ordren gått
 * til klinikken uten at noen visste hvilken nyanse den gjaldt.
 */
export function rensLinjer(
  linjer: Kurvlinje[],
  katalog: Kurvprodukt[]
): Kurvlinje[] {
  if (!Array.isArray(linjer)) return [];
  return linjer.filter((l): l is Kurvlinje => {
    if (!l || typeof l !== "object") return false;
    if (typeof l.sku !== "string" || typeof l.qty !== "number" || l.qty < 1)
      return false;

    const produkt = katalog.find((p) => p.sku === l.sku);
    if (!produkt) return false;

    const nyanser = produkt.farger ?? [];
    if (nyanser.length === 0) return !l.farge;
    return typeof l.farge === "string" && nyanser.includes(l.farge);
  });
}
