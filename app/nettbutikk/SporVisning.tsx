"use client";

import { useEffect, useRef } from "react";
import { sporHandel, tilVare } from "@/lib/analyse";
import type { Product } from "@/lib/products";

/**
 * Sender `view_item` for produktet som vises.
 *
 * Produktsiden er en serverkomponent (den prerendres statisk), og GA4 lever
 * bare i nettleseren. Derfor denne: den rendrer ingenting, men får produktet
 * som prop og sender hendelsen når siden monteres hos kunden.
 */
export default function SporVisning({ produkt }: { produkt: Product }) {
  // React monterer komponenter to ganger i utvikling, og App Router
  // gjenbruker denne komponenten når kunden går fra ett produkt til et annet.
  // Vi husker derfor hvilket SKU vi har sendt for: ny sku ⇒ ny hendelse,
  // samme sku ⇒ ingenting.
  const sendtFor = useRef<string | null>(null);

  useEffect(() => {
    if (sendtFor.current === produkt.sku) return;
    sendtFor.current = produkt.sku;
    sporHandel("view_item", [tilVare(produkt)]);
  }, [produkt]);

  return null;
}
