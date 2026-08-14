"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartProvider";
import { BOOKING_URL } from "@/lib/site";

const links = [
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/nettbutikk", label: "Nettbutikk" },
  { href: "/behandlere", label: "Behandlere" },
  { href: "/prisliste", label: "Prisliste" },
  { href: "/gavekort", label: "Gavekort" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

function CartButton({ light = false }: { light?: boolean }) {
  const cart = useCart();
  return (
    <button
      onClick={() => cart.setOpen(true)}
      aria-label="Åpne handlekurv"
      className={`relative p-2 transition-colors ${light ? "text-white hover:text-[#e5c78f] drop-shadow-[0_1px_6px_rgba(30,45,61,0.7)]" : "text-[#1a1a1a]/70 hover:text-[#c9a96e]"}`}
    >
      <ShoppingBag size={19} />
      {cart.count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#c9a96e] text-white text-[10px] flex items-center justify-center">
          {cart.count}
        </span>
      )}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // usePathname() er ikke pålitelig ved første klientrender (menyen ble stående
  // mørk over hero-bildet til man scrollet) — korriger mot faktisk URL ved mount
  const [path, setPath] = useState(pathname);
  useEffect(() => {
    setPath(window.location.pathname);
  }, [pathname]);

  // Forsiden har mørkt hero-bilde — lys tekst til man scroller
  const light = path === "/" && !scrolled && !open;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e8d5b0]/30"
          : "bg-transparent"
      }`}
    >
      {/* Mørk gradient bak menyen på forsiden — hero-bildet er lyst til høyre,
          og uten denne forsvinner «Behandlere» og «Kontakt» inn i bildet */}
      {light && (
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1e2d3d]/75 via-[#1e2d3d]/35 to-transparent pointer-events-none" />
      )}

      <div className="relative max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className={`text-xl tracking-wide transition-colors duration-500 ${light ? "text-white [text-shadow:0_1px_12px_rgba(30,45,61,0.65)]" : "text-[#1a1a1a]"}`}
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Hud by Helseblikk
          </span>
          <span className={`text-[10px] tracking-[0.2em] uppercase font-light mt-0.5 transition-colors duration-500 ${light ? "text-[#e5c78f] [text-shadow:0_1px_10px_rgba(30,45,61,0.7)]" : "text-[#c9a96e]"}`}>
            Medisinsk hudpleie · Grimstad
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm tracking-wide transition-colors duration-200 ${light ? "text-white [text-shadow:0_1px_10px_rgba(30,45,61,0.7)] hover:text-[#e5c78f]" : "text-[#1a1a1a]/70 hover:text-[#c9a96e]"}`}
            >
              {l.label}
            </Link>
          ))}
          <CartButton light={light} />
          <a
            href={BOOKING_URL}
            className="ml-1 px-5 py-2.5 bg-[#c9a96e] text-white text-sm tracking-wide rounded-full hover:bg-[#b8955a] transition-colors duration-200"
          >
            Bestill time
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-1">
          <CartButton light={light} />
          <button
            className={`p-2 transition-colors duration-500 ${light ? "text-white drop-shadow-[0_1px_6px_rgba(30,45,61,0.7)]" : "text-[#1a1a1a]"}`}
            onClick={() => setOpen(!open)}
            aria-label="Meny"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-[#e8d5b0]/30"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-[#1a1a1a]/80 hover:text-[#c9a96e] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={BOOKING_URL}
                className="mt-2 px-5 py-3 bg-[#c9a96e] text-white text-sm tracking-wide rounded-full text-center hover:bg-[#b8955a] transition-colors"
                onClick={() => setOpen(false)}
              >
                Bestill time
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
