"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS, type Product } from "@/lib/products";

export interface CartLine {
  sku: string;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  add: (sku: string) => void;
  remove: (sku: string) => void;
  setQty: (sku: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  items: { product: Product; qty: number }[];
}

const CartContext = createContext<CartContextValue | null>(null);

export const FREE_SHIPPING_LIMIT = 1000;
export const SHIPPING_COST = 79;

const STORAGE_KEY = "hbh-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartLine[] = JSON.parse(raw);
        setLines(parsed.filter((l) => PRODUCTS.some((p) => p.sku === l.sku)));
      }
    } catch {
      // korrupt lagring — start tomt
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  const add = (sku: string) => {
    setLines((prev) => {
      const hit = prev.find((l) => l.sku === sku);
      if (hit)
        return prev.map((l) =>
          l.sku === sku ? { ...l, qty: Math.min(l.qty + 1, 10) } : l
        );
      return [...prev, { sku, qty: 1 }];
    });
    setOpen(true);
  };

  const remove = (sku: string) =>
    setLines((prev) => prev.filter((l) => l.sku !== sku));

  const setQty = (sku: string, qty: number) => {
    if (qty <= 0) return remove(sku);
    setLines((prev) =>
      prev.map((l) => (l.sku === sku ? { ...l, qty: Math.min(qty, 10) } : l))
    );
  };

  const clear = () => setLines([]);

  const value = useMemo<CartContextValue>(() => {
    const items = lines
      .map((l) => ({
        product: PRODUCTS.find((p) => p.sku === l.sku)!,
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
    };
  }, [lines, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart må brukes innenfor CartProvider");
  return ctx;
}
