"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
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
} from "@/lib/kurv";

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
export const SHIPPING_COST = 79;

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

  const add = (sku: string, farge?: string) => {
    const produkt = catalog.find((p) => p.sku === sku);
    // Utsolgte varer skal ikke kunne havne i kurven, uansett hvor «Legg i
    // kurv» måtte dukke opp
    if (!produkt || produkt.utsolgt) return;
    // Krever produktet et nyansevalg, slipper vi ikke gjennom uten et gyldig
    // ett — ellers ville klinikken fått en ordre uten å vite hvilken.
    const nyanser = produkt.farger ?? [];
    if (nyanser.length > 0 && (!farge || !nyanser.includes(farge))) return;

    setLines((prev) => leggTil(prev, sku, nyanser.length > 0 ? farge : undefined));
    setOpen(true);
  };

  const remove = (nokkel: string) =>
    setLines((prev) => fjern(prev, nokkel));

  const setQty = (nokkel: string, qty: number) =>
    setLines((prev) => settAntall(prev, nokkel, qty));

  const clear = () => setLines([]);

  const value = useMemo<CartContextValue>(() => {
    const items: Kurvpost[] = lines
      .map((l) => ({
        nokkel: linjeNokkel(l),
        product: catalog.find((p) => p.sku === l.sku)!,
        farge: l.farge,
        qty: l.qty,
      }))
      .filter((i) => i.product);
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
      setOpen,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      items,
      catalog,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, open, catalog]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart må brukes innenfor CartProvider");
  return ctx;
}
