"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/om-mabel", label: "Om Mabel" },
  { href: "/prisliste", label: "Prisliste" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className="text-xl tracking-wide text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Hud By Helseblikk
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] font-light mt-0.5">
            Medisinsk hudpleie · Grimstad
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-[#1a1a1a]/70 hover:text-[#c9a96e] transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/kontakt"
            className="ml-2 px-5 py-2.5 bg-[#c9a96e] text-white text-sm tracking-wide rounded-full hover:bg-[#b8955a] transition-colors duration-200"
          >
            Bestill time
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-[#1a1a1a]"
          onClick={() => setOpen(!open)}
          aria-label="Meny"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
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
                href="/kontakt"
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
