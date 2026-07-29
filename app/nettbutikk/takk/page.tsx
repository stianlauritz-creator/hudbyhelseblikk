"use client";

import { useEffect } from "react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { useCart } from "@/components/CartProvider";

export default function TakkPage() {
  const cart = useCart();

  useEffect(() => {
    cart.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="pt-40 pb-32 px-6 min-h-[70vh] bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
      <div className="max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
            Bestilling mottatt
          </p>
          <h1
            className="text-4xl md:text-5xl font-normal mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Tusen takk!
          </h1>
          <p className="text-[#1a1a1a]/55 leading-relaxed mb-10">
            Vi har mottatt bestillingen din og sender deg en bekreftelse på
            e-post. Valgte du henting i klinikken, gir vi beskjed så snart
            produktene er klare i Odden 1D, Grimstad.
          </p>
          <Link
            href="/nettbutikk"
            className="text-sm tracking-wide text-[#c9a96e] border-b border-[#c9a96e]/40 hover:border-[#c9a96e] pb-0.5 transition-colors"
          >
            Tilbake til nettbutikken →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
