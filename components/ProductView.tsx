"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  Store,
  CreditCard,
  Check,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  Plus,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useCart } from "@/components/CartProvider";
import { BRAND_INFO, formatPrice, type Product } from "@/lib/products";
import type { ProductDetails } from "@/lib/product-details";

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#e8d5b0]/40">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span
          className="text-lg text-[#1a1a1a] group-hover:text-[#8f6b28] transition-colors"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={17} className="text-[#8f6b28]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RelatedCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/nettbutikk/${product.sku}`}
      className="group block h-full rounded-2xl border border-[#e8d5b0]/40 bg-white overflow-hidden hover:border-[#c9a96e]/40 transition-colors duration-300"
    >
      <div className="relative aspect-square bg-[#faf9f7]">
        <Image
          src={product.image}
          alt={`${BRAND_INFO[product.brand].label} ${product.name}`}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-contain p-6 group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#8f6b28] mb-1.5">
          {BRAND_INFO[product.brand].label}
        </p>
        <h3
          className="text-base leading-snug mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {product.name}
        </h3>
        <p className="text-sm font-medium text-[#1a1a1a] mt-2">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}

export default function ProductView({
  product,
  details,
  related,
}: {
  product: Product;
  details?: ProductDetails;
  related: Product[];
}) {
  const cart = useCart();
  const brand = BRAND_INFO[product.brand];
  const crossSell = related[0];

  // Sticky kjøpslinje vises når hoved-CTA er scrollet ut av bildet
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { margin: "0px 0px -60px 0px" });

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-28 px-6">
        <nav className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-[#1a1a1a]/65">
          <Link href="/nettbutikk" className="hover:text-[#8f6b28] transition-colors">
            Nettbutikk
          </Link>
          <ChevronRight size={12} />
          <Link
            href={`/nettbutikk?merke=${product.brand}`}
            className="hover:text-[#8f6b28] transition-colors"
          >
            {brand.label}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#1a1a1a]/70">{product.name}</span>
        </nav>
      </div>

      {/* Produkt: bilde + info */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Bilde */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative aspect-square rounded-3xl bg-[#faf9f7] border border-[#e8d5b0]/30 overflow-hidden">
              <Image
                src={product.image}
                alt={`${brand.label} ${product.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-12"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-3">
              {brand.label}
            </p>
            <h1
              className="text-3xl md:text-4xl font-normal mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {product.name}
            </h1>
            <p className="text-sm text-[#1a1a1a]/65 mb-5">{product.size}</p>

            <p className="text-[#1a1a1a]/65 leading-relaxed mb-5">
              {details?.intro ?? product.desc}
            </p>

            {details && details.skinTypes.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-7">
                <span className="text-xs tracking-wide uppercase text-[#1a1a1a]/65 mr-1">
                  Passer for
                </span>
                {details.skinTypes.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full bg-[#f5ede4] text-xs text-[#1a1a1a]/65"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            <div
              ref={ctaRef}
              className="flex items-center justify-between gap-4 py-5 border-y border-[#e8d5b0]/40 mb-6"
            >
              <p className="text-2xl font-medium text-[#1a1a1a]">
                {formatPrice(product.price)}
              </p>
              <button
                onClick={() => cart.add(product.sku)}
                className="px-7 py-3.5 bg-[#8f6b28] text-white text-sm tracking-wide rounded-full hover:bg-[#7a5b20] transition-colors flex items-center gap-2"
              >
                <ShoppingBag size={16} />
                Legg i kurv
              </button>
            </div>

            {/* Tillit */}
            <ul className="space-y-2.5 mb-7 text-sm text-[#1a1a1a]/65">
              <li className="flex items-center gap-2.5">
                <Truck size={15} className="text-[#8f6b28] shrink-0" />
                79,- i frakt — gratis ved kjøp over 1.000,-
              </li>
              <li className="flex items-center gap-2.5">
                <Store size={15} className="text-[#8f6b28] shrink-0" />
                Hent gratis i klinikken i Odden 1D, Grimstad
              </li>
              <li className="flex items-center gap-2.5">
                <CreditCard size={15} className="text-[#8f6b28] shrink-0" />
                Trygg kortbetaling
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={15} className="text-[#8f6b28] shrink-0" />
                <span>
                  Usikker på valget?{" "}
                  <Link href="/kontakt" className="underline hover:text-[#8f6b28]">
                    Christina hjelper deg gjerne
                  </Link>
                </span>
              </li>
            </ul>

            {/* Kuratert kryssalg */}
            {crossSell && (
              <div className="rounded-2xl bg-[#f5ede4]/60 border border-[#e8d5b0]/40 p-4 mb-8">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#8f6b28] mb-3">
                  Anbefales sammen med
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/nettbutikk/${crossSell.sku}`}
                    className="relative w-16 h-16 rounded-xl bg-white shrink-0 overflow-hidden"
                  >
                    <Image
                      src={crossSell.image}
                      alt={`${BRAND_INFO[crossSell.brand].label} ${crossSell.name}`}
                      fill
                      sizes="64px"
                      className="object-contain p-2"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/nettbutikk/${crossSell.sku}`}
                      className="block text-sm leading-snug hover:text-[#8f6b28] transition-colors truncate"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {crossSell.name}
                    </Link>
                    <p className="text-xs text-[#1a1a1a]/65 mt-0.5">
                      {formatPrice(crossSell.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => cart.add(crossSell.sku)}
                    aria-label={`Legg ${crossSell.name} i kurv`}
                    className="w-9 h-9 rounded-full bg-white border border-[#c9a96e]/40 text-[#8f6b28] hover:bg-[#8f6b28] hover:text-white transition-colors flex items-center justify-center shrink-0"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* Fordeler — synlig */}
            {details && details.benefits.length > 0 && (
              <ul className="space-y-2 mb-8">
                {details.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-sm text-[#1a1a1a]/65 leading-relaxed"
                  >
                    <Check size={15} className="text-[#8f6b28] shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {/* Dybde i accordion */}
            {details && (
              <div className="border-t border-[#e8d5b0]/40">
                {details.longDesc.length > 0 && (
                  <Accordion title="Om produktet" defaultOpen>
                    <div className="space-y-3">
                      {details.longDesc.map((p, i) => (
                        <p
                          key={i}
                          className="text-sm text-[#1a1a1a]/65 leading-relaxed"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </Accordion>
                )}

                {details.usage.length > 0 && (
                  <Accordion title="Slik bruker du produktet">
                    <ol className="space-y-2.5">
                      {details.usage.map((u, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-[#1a1a1a]/65 leading-relaxed"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#c9a96e]/10 text-[#8f6b28] text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          {u}
                        </li>
                      ))}
                    </ol>
                  </Accordion>
                )}

                {details.ingredients.length > 0 && (
                  <Accordion title="Nøkkelingredienser">
                    <dl className="space-y-3">
                      {details.ingredients.map((ing) => (
                        <div key={ing.name}>
                          <dt className="text-sm font-medium text-[#1a1a1a]/80">
                            {ing.name}
                          </dt>
                          <dd className="text-sm text-[#1a1a1a]/65 leading-relaxed">
                            {ing.effect}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Accordion>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Passer godt sammen med */}
      {related.length > 0 && (
        <section className="py-16 px-6 bg-[#f5f2ed]">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-10">
              <h2
                className="text-2xl md:text-3xl font-normal"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Passer godt sammen med
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <AnimatedSection key={p.sku} delay={i * 0.08}>
                  <RelatedCard product={p} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky kjøpslinje */}
      <AnimatePresence>
        {!ctaInView && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 inset-x-0 z-40 bg-[#faf9f7]/95 backdrop-blur border-t border-[#e8d5b0]/50"
          >
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p
                  className="text-sm truncate"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {product.name}
                </p>
                <p className="text-xs text-[#1a1a1a]/65">
                  {formatPrice(product.price)}
                </p>
              </div>
              <button
                onClick={() => cart.add(product.sku)}
                className="px-6 py-2.5 bg-[#8f6b28] text-white text-sm tracking-wide rounded-full hover:bg-[#7a5b20] transition-colors flex items-center gap-2 shrink-0"
              >
                <ShoppingBag size={15} />
                Legg i kurv
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
