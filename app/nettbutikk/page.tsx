"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Truck, Store, CreditCard, Sparkles, Info } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { useCart } from "@/components/CartProvider";
import KundeklubbPopup from "@/components/KundeklubbPopup";
import ButikkAapnerSnart from "@/components/ButikkAapnerSnart";
import Kampanjer from "@/components/Kampanjer";
import { AKTIVE_KAMPANJER } from "@/lib/kampanjer";
import { BUTIKK_APEN } from "@/lib/site";
import {
  BRAND_INFO,
  formatPrice,
  type Brand,
  type Product,
} from "@/lib/products";

type Filter = "alle" | Brand;

const filters: { id: Filter; label: string }[] = [
  { id: "alle", label: "Alle produkter" },
  { id: "zo", label: "ZO Skin Health" },
  { id: "face-formula", label: "Face Formula" },
  { id: "colorescience", label: "ColoreScience" },
  { id: "gavekort", label: "Gavekort" },
  { id: "annet", label: "Annet" },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const cart = useCart();
  return (
    <AnimatedSection delay={Math.min(index % 4, 3) * 0.06}>
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.08)" }}
        transition={{ duration: 0.3 }}
        className="group relative h-full flex flex-col rounded-2xl border border-[#e8d5b0]/40 bg-white overflow-hidden hover:border-[#c9a96e]/40 transition-colors duration-300"
      >
        <Link
          href={`/nettbutikk/${product.sku}`}
          className="absolute inset-0 z-10"
          aria-label={`${BRAND_INFO[product.brand].label} ${product.name}`}
        />
        <div className="relative aspect-square bg-[#faf9f7]">
          <Image
            src={product.image}
            alt={`${BRAND_INFO[product.brand].label} ${product.name}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 sm:p-6 group-hover:scale-[1.03] transition-transform duration-500"
          />
        </div>
        <div className="flex-1 flex flex-col p-3.5 sm:p-5">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#8f6b28] mb-1.5">
            {BRAND_INFO[product.brand].label}
          </p>
          <h2
            className="text-base leading-snug mb-1"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {product.name}
          </h2>
          <p className="text-xs text-[#1a1a1a]/65 mb-3">
            {product.size}
            {product.farger && product.farger.length > 0 && (
              <> · {product.farger.join(", ")}</>
            )}
          </p>
          {product.retinol && (
            <p className="inline-flex self-start items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full bg-[#f5ede4] border border-[#c9a96e]/40 text-[10px] text-[#8f6b28]">
              <Info size={11} className="shrink-0" />
              Retinol{product.retinolStyrke ? ` ${product.retinolStyrke}` : ""} — les før bruk
            </p>
          )}
          <p className="text-xs text-[#1a1a1a]/65 leading-relaxed mb-4 line-clamp-3">
            {product.desc}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-[#1a1a1a]">
              {formatPrice(product.price)}
            </p>
            {product.utsolgt ? (
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#1a1a1a]/45">
                Utsolgt
              </span>
            ) : BUTIKK_APEN ? (
              <button
                onClick={() => cart.add(product.sku)}
                className="relative z-20 px-4 py-2 bg-[#8f6b28] text-white text-xs tracking-wide rounded-full hover:bg-[#7a5b20] transition-colors flex items-center gap-1.5"
              >
                <ShoppingBag size={13} />
                Legg i kurv
              </button>
            ) : (
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#8f6b28]">
                Åpner snart
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

const SIDESTORRELSE = 24;

export default function NettbutikkPage() {
  const { catalog } = useCart();
  const [filter, setFilter] = useState<Filter>("alle");
  const [antallVist, setAntallVist] = useState(SIDESTORRELSE);

  // ?merke=zo|face-formula|colorescience fra f.eks. produktsidenes breadcrumb
  useEffect(() => {
    const merke = new URLSearchParams(window.location.search).get("merke");
    if (merke && filters.some((f) => f.id === merke)) {
      setFilter(merke as Filter);
    }
  }, []);

  const visible = useMemo(
    () =>
      filter === "alle"
        ? catalog
        : catalog.filter((p) => p.brand === filter),
    [filter, catalog]
  );

  // Vis et utsnitt først — 73 produkter på én gang er tungt på mobil
  const synlige = visible.slice(0, antallVist);
  const harFlere = visible.length > antallVist;

  const velgFilter = (id: Filter) => {
    setFilter(id);
    setAntallVist(SIDESTORRELSE);
  };

  // Vis bare filterknapper det finnes produkter for
  const activeFilters = useMemo(
    () =>
      filters.filter(
        (f) => f.id === "alle" || catalog.some((p) => p.brand === f.id)
      ),
    [catalog]
  );

  return (
    <>
      {/* Fraktbanner når butikken er åpen — ellers «Åpner snart»-panelet,
          siden fraktvilkår er meningsløse så lenge man ikke kan bestille. */}
      <div className="pt-20 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        {BUTIKK_APEN ? (
          <div className="bg-[#1e2d3d] text-white">
            <div className="max-w-6xl mx-auto px-6 py-3.5 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
              <Sparkles size={15} className="text-[#c9a96e] shrink-0" />
              <span className="text-sm text-white/85">
                <span className="text-[#c9a96e] font-medium">Gratis frakt</span>{" "}
                på ordre over 1 000 kr — eller hent bestillingen gratis hos oss i
                Grimstad.
              </span>
            </div>
          </div>
        ) : (
          <ButikkAapnerSnart />
        )}
      </div>

      {/* Header */}
      <section className="pt-12 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
              Hudprodukter
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Nettbutikk
            </h1>
            <p className="text-[#1a1a1a]/65 leading-relaxed">
              Produktene vi bruker og anbefaler i klinikken — medisinsk hudpleie
              fra ZO Skin Health, norskutviklede Face Formula (tidligere Elixir
              Cosmeceuticals) og mineralsk solbeskyttelse fra ColoreScience.
              {BUTIKK_APEN
                ? " Bestill med levering hjem, eller hent gratis hos oss i Grimstad."
                : " Vi åpner for bestilling om kort tid — produktene får du kjøpt i klinikken i mellomtiden."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Veilednings-banner */}
      <div className="bg-[#3d4a3e] text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <span className="text-xs tracking-[0.2em] uppercase text-[#8f6b28]">
            Usikker på valget?
          </span>
          <span className="text-sm text-white/80">
            Vår kosmetiske sykepleier Christina hjelper deg gjerne med
            produktveiledning —{" "}
            <Link href="/kontakt" className="underline hover:text-[#8f6b28]">
              ta kontakt
            </Link>{" "}
            eller spør ved neste besøk.
          </span>
        </div>
      </div>

      {/* Pågående kampanjer — skjuler seg selv når ingen er aktive */}
      {AKTIVE_KAMPANJER.length > 0 && (
        <section className="px-6 pt-16">
          <div className="mx-auto max-w-6xl">
            <AnimatedSection className="mb-8 text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#8f6b28]">
                Akkurat nå
              </p>
              <h2
                className="text-2xl font-normal md:text-3xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Kampanjer
              </h2>
            </AnimatedSection>
            <Kampanjer />
            <AnimatedSection delay={0.3} className="mt-8 text-center">
              <Link
                href="/kampanjer"
                className="text-sm text-[#8f6b28] underline underline-offset-4 hover:text-[#7a5b20]"
              >
                Se alle kampanjer og vilkår
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Filter + produkter */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="flex flex-wrap justify-center gap-2 mb-6">
            {activeFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => velgFilter(f.id)}
                className={`px-5 py-2 rounded-full text-sm tracking-wide border transition-colors duration-200 ${
                  filter === f.id
                    ? "bg-[#8f6b28] text-white border-[#c9a96e]"
                    : "bg-white text-[#1a1a1a]/65 border-[#e8d5b0]/60 hover:border-[#c9a96e]/60 hover:text-[#8f6b28]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </AnimatedSection>

          {filter !== "alle" && (
            <AnimatedSection className="text-center mb-10">
              <p className="text-sm text-[#1a1a1a]/65 max-w-2xl mx-auto leading-relaxed">
                {BRAND_INFO[filter].tagline}
              </p>
            </AnimatedSection>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-10">
            {synlige.map((p, i) => (
              <ProductCard key={p.sku} product={p} index={i} />
            ))}
          </div>

          {harFlere && (
            <div className="mt-12 flex flex-col items-center gap-3">
              <p className="text-xs text-[#1a1a1a]/65">
                Viser {synlige.length} av {visible.length} produkter
              </p>
              <button
                onClick={() => setAntallVist((n) => n + SIDESTORRELSE)}
                className="rounded-full border border-[#c9a96e] px-8 py-3 text-sm tracking-wide text-[#8f6b28] transition-colors hover:bg-[#8f6b28] hover:text-white"
              >
                Vis flere produkter
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Levering og betaling — kun relevant når butikken tar bestillinger */}
      <section className={`py-20 px-6 bg-[#f5f2ed] ${BUTIKK_APEN ? "" : "hidden"}`}>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2
              className="text-2xl md:text-3xl font-normal"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Levering og betaling
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Truck,
                title: "Levering i hele Norge",
                desc: "Frakt med Posten fra 59,- — gratis ved kjøp over 1.000,-",
              },
              {
                icon: Store,
                title: "Hent i klinikken",
                desc: "Hent bestillingen gratis hos oss i Odden 1D, Grimstad",
              },
              {
                icon: CreditCard,
                title: "Trygg betaling",
                desc: "Betal enkelt og sikkert med kort i kassen",
              },
            ].map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="p-7 rounded-2xl bg-white border border-[#e8d5b0]/30 h-full">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-4">
                    <f.icon size={18} className="text-[#8f6b28]" />
                  </div>
                  <h3
                    className="text-base mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#1a1a1a]/65 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.2} className="text-center mt-12">
            <p className="text-xs text-[#1a1a1a]/65 max-w-xl mx-auto leading-relaxed">
              Aktive produkter med retinol og syrer bør tilpasses din hud. Er du
              i tvil, anbefaler vi en hudkonsultasjon før du starter (490,-, som
              trekkes fra ved produktkjøp over 1.500,-).
            </p>
          </AnimatedSection>
        </div>
      </section>

      <KundeklubbPopup />
    </>
  );
}

