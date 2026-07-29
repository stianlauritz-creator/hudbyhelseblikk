"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";

// Tømmer handlekurven én gang — brukes på ordrebekreftelsen etter
// at betalingen er verifisert server-side.
export default function ClearCart() {
  const cart = useCart();

  useEffect(() => {
    cart.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
