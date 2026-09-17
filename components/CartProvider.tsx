"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PRODUCTS, type Product } from "@/lib/products";
import {
  linjeNokkel,
  leggTil,
  fjern,
  settAntall,
  rensLinjer,
  type Kurvlinje,
  MAKS_ANTALL,
} from "@/lib/kurv";
import { sporHandel, tilVare } from "@/lib/analyse";

export type CartLine = Kurvlinje;

/** En kurvlinje slått sammen med produktet den peker på. */
export interface Kurvpost {
  nokkel: string;
  product: Product;
  farge?: string;
  qty: number;
}

interface CartContextValue {
  lines: Kurvlinje[];
  /** Nyanse er påkrevd for produkter som har `farger`. */
  add: (sku: string, farge?: string) => void;
  remove: (nokkel: string) => void;
  setQty: (nokkel: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  items: Kurvpost[];
  catalog: Product[];
}

const CartContext = createContext<CartContextValue | null>(null);

export const FREE_SHIPPING_LIMIT = 1000;
// «Standard»-satsen i Shopify. Postens billigste (postkasse, 59,-) gjelder
// bare pakker under 5 kg, så 75 er det de fleste ordrer faktisk får.
export const SHIPPING_COST = 75;

const STORAGE_KEY = "hbh-cart";

export function CartProvider({
  children,
  catalog = PRODUCTS,
}: {
  children: React.ReactNode;
  // Sendes fra rot-layouten: Shopify-katalogen når den er koblet til,
  // ellers den statiske produktlisten.
  catalog?: Product[];
}) {
  const [lines, setLines] = useState<Kurvlinje[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setLines(rensLinjer(JSON.parse(raw), catalog));
      }
    } catch {
      // korrupt lagring — start tomt
    }
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  const items = useMemo<Kurvpost[]>(
    () =>
      lines
        .map((l) => ({
          nokkel: linjeNokkel(l),
          product: catalog.find((p) => p.sku === l.sku)!,
          farge: l.farge,
          qty: l.qty,
        }))
        .filter((i) => i.product),
    [lines, catalog]
  );

  const gaVarer = (poster: Kurvpost[]) =>
    poster.map((i) => tilVare(i.product, i.qty, i.farge));

  // Husker forrige åpen-tilstand slik at view_cart fyrer på overgangen lukket
  // → åpen. En useEffect ville vært setState-i-effekt, som repoet avviser.
  const varApen = useRef(false);

  const add = (sku: string, farge?: string) => {
    const produkt = catalog.find((p) => p.sku === sku);
    // Utsolgte varer skal ikke kunne havne i kurven, uansett hvor «Legg i
    // kurv» måtte dukke opp
    if (!produkt || produkt.utsolgt) return;
    // Krever produktet et nyansevalg, slipper vi ikke gjennom uten et gyldig
    // ett — ellers ville klinikken fått en ordre uten å vite hvilken.
    const nyanser = produkt.farger ?? [];
    if (nyanser.length > 0 && (!farge || !nyanser.includes(farge))) return;

    const nyanse = nyanser.length > 0 ? farge : undefined;

    // Ved MAKS_ANTALL skjer det ingenting med kurven, og da er det heller
    // ingenting å rapportere.
    const alt = items.find(
      (i) => i.nokkel === linjeNokkel({ sku, farge: nyanse })
    );
    if (!alt || alt.qty < MAKS_ANTALL) {
      sporHandel("add_to_cart", [tilVare(produkt, 1, nyanse)]);
    }
    setLines((prev) => leggTil(prev, sku, nyanse));
    // Skuffen åpnes her uten view_cart: add_to_cart forteller allerede hva
    // kunden gjorde, og to handelshendelser på ett klikk ville telt dobbelt.
    varApen.current = true;
    setOpen(true);
  };

  const remove = (nokkel: string) => {
    // Linja må leses før den fjernes — remove får bare nøkkelen, og etterpå
    // finnes det ingenting igjen å rapportere.
    const post = items.find((i) => i.nokkel === nokkel);
    if (post) sporHandel("remove_from_cart", gaVarer([post]));
    setLines((prev) => fjern(prev, nokkel));
  };

  const settApen = (neste: boolean) => {
    if (neste && !varApen.current) sporHandel("view_cart", gaVarer(items));
    varApen.current = neste;
    setOpen(neste);
  };

  const setQty = (nokkel: string, qty: number) => {
    // Minusknappen i kurvskuffen går hit, ikke via remove(). Uten dette ville
    // remove_from_cart nesten aldri fyrt — remove() har i praksis ingen
    // kaller i grensesnittet.
    const post = items.find((i) => i.nokkel === nokkel);
    if (post) {
      // settAntall klipper til [1, MAKS_ANTALL] og fjerner linja på 0. Vi
      // rapporterer differansen mot det som FAKTISK blir stående, ellers
      // teller vi endringer som aldri skjedde.
      const nytt =
        qty <= 0 ? 0 : Math.max(1, Math.min(MAKS_ANTALL, Math.floor(qty)));
      const diff = nytt - post.qty;
      if (diff < 0) {
        sporHandel("remove_from_cart", [
          tilVare(post.product, -diff, post.farge),
        ]);
      } else if (diff > 0) {
        sporHandel("add_to_cart", [tilVare(post.product, diff, post.farge)]);
      }
    }
    setLines((prev) => settAntall(prev, nokkel, qty));
  };

  const clear = () => setLines([]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const shipping =
      subtotal === 0 || subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST;
    return {
      lines,
      add,
      remove,
      setQty,
      clear,
      open,
      setOpen: settApen,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      items,
      catalog,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, open, catalog, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart må brukes innenfor CartProvider");
  return ctx;
}
