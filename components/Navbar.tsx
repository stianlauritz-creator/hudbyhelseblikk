"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartProvider";
import Logo from "@/components/Logo";
import { BUTIKK_APEN } from "@/lib/site";
import { BOOKING_URL } from "@/lib/site";

// Toppmenyen på desktop. Målt i nettleseren: HUD-lockupen (192 px) +
// sju lenker + «Bestill time» fyller baren nesten ut ved 1024 px — klaringen
// mellom logo og «Behandlinger» er 39,4 px der. En åttende lenke spiste opp
// resten allerede med den gamle, smalere ordmerken, og de 15 pikslene
// bildelockupen frigjorde endrer ikke det: «Plastikkirurgi» holdes fortsatt
// utenfor her — den er godt lenket fra forsiden, Behandlinger, Behandlere,
// Prisliste, Bestill time og footeren.
const links = [
  { href: "/behandlinger", label: "Behandlinger" },
  { href: "/nettbutikk", label: "Nettbutikk" },
  { href: "/behandlere", label: "Behandlere" },
  { href: "/prisliste", label: "Prisliste" },
  { href: "/gavekort", label: "Gavekort" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

// Mobilmenyen er en vertikal liste uten plassproblem — der tar vi
// «Plastikkirurgi» med, rett under Behandlinger.
const mobilLinks = [
  links[0],
  { href: "/plastikkirurgi", label: "Plastikkirurgi" },
  links[1],
  { href: "/kampanjer", label: "Kampanjer" },
  ...links.slice(2),
];

function CartButton({ light = false }: { light?: boolean }) {
  const cart = useCart();
  // Butikken stengt for bestilling ⇒ ingen handlekurv i toppen
  if (!BUTIKK_APEN) return null;
  return (
    <button
      onClick={() => cart.setOpen(true)}
      aria-label="Åpne handlekurv"
      className={`nav-ikon relative p-2 transition-colors ${light ? "text-white hover:text-[#e5c78f] drop-shadow-[0_1px_6px_rgba(30,45,61,0.7)]" : "text-[#1a1a1a]/70 hover:text-[#8f6b28]"}`}
    >
      <ShoppingBag size={19} />
      {cart.count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#8f6b28] text-white text-[10px] flex items-center justify-center">
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
  // usePathname() kan IKKE brukes til å bestemme hva som rendres her. Sidene er
  // statisk prerendret, og da lages HTML-en for kilde-pathen — verdien i
  // nettleseren kan avvike, og forsiden fikk hydreringsfeil (React #418) fordi
  // serveren utelot gradienten som klienten tegnet. Next-dokumentasjonen
  // (use-pathname.md) foreskriver en stabil fallback på serveren som først
  // oppdateres etter mount: derfor null her, ikke `pathname`.
  const [path, setPath] = useState<string | null>(null);
  useEffect(() => {
    setPath(window.location.pathname);
  }, [pathname]);

  // Forsiden har mørkt hero-bilde — lys tekst til man scroller
  const light = path === "/" && !scrolled && !open;

  // Baren er ugjennomsiktig i to tilfeller: når man har scrollet, og når
  // mobilmenyen står åpen. Det andre manglet: menypanelet under er hvitt,
  // men selve baren ble stående gjennomsiktig, samtidig som `light` slås av
  // fordi `open` er sann. Resultatet var nesten svart logo rett på hero-
  // bildet — «Medisinsk hudpleie · Grimstad» forsvant helt.
  const massiv = scrolled || open;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      // Sider med mørk hero merker seg selv med .hero-mork, og globals.css
      // lysner menyen med `body:has(.hero-mork)`. Den regelen må vike så snart
      // baren blir hvit — derfor dette attributtet å henge den på. Det følger
      // `massiv`, ikke `scrolled`: med mobilmenyen åpen på /gavekort er baren
      // hvit uten at man har scrollet, og lys tekst ville blitt hvit på hvitt.
      // Server-rendret verdi er «false», som er startverdien for både
      // `scrolled` og `open`, så ingen hydreringsforskjell.
      data-massiv={massiv ? "true" : "false"}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        massiv
          ? // Kantlinjen bare ved scroll — er menyen åpen, har panelet under
            // sin egen border-t, og de to ville lagt seg oppå hverandre.
            `bg-white/95 backdrop-blur-md shadow-sm ${scrolled ? "border-b border-[#e8d5b0]/30" : ""}`
          : "bg-transparent"
      }`}
    >
      {/* Mørk gradient bak menyen på forsiden — hero-bildet er lyst til høyre,
          og uten denne forsvinner «Behandlere» og «Kontakt» inn i bildet */}
      {light && (
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1e2d3d]/75 via-[#1e2d3d]/35 to-transparent pointer-events-none" />
      )}

      <div className="relative max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo — HUD-lockupen. Størrelsen styres av --hud-size i
            .hud-logo--meny (globals.css), ikke her. Ordmerket er en fil, så
            fargen settes med `lys` (variantbytte), ikke med text-*. */}
        <Link href="/" className="group shrink-0" aria-label="Hud by Helseblikk — til forsiden">
          <Logo
            lys={light}
            paaBilde={light}
            preload
            className="nav-logo hud-logo--meny"
            taglineClassName={`nav-undertittel transition-colors duration-500 ${light ? "text-[#e5c78f] [text-shadow:0_1px_10px_rgba(30,45,61,0.7)]" : "text-[#8f6b28]"}`}
          />
        </Link>

        {/* Desktop nav. Byttet fra md: til lg: — med åtte lenker (og allerede
            med sju) kolliderte menyen med logoen mellom 768 og ~950 px.
            Hamburgeren tar over hele det området i stedet. */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-lenke text-sm tracking-wide transition-colors duration-200 ${light ? "text-white [text-shadow:0_1px_10px_rgba(30,45,61,0.7)] hover:text-[#e5c78f]" : "text-[#1a1a1a]/70 hover:text-[#8f6b28]"}`}
            >
              {l.label}
            </Link>
          ))}
          <CartButton light={light} />
          <a
            href={BOOKING_URL}
            className="ml-1 px-5 py-2.5 bg-[#8f6b28] text-white text-sm tracking-wide rounded-full hover:bg-[#7a5b20] transition-colors duration-200"
          >
            Bestill time
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center gap-1">
          <CartButton light={light} />
          <button
            className={`nav-ikon p-2 transition-colors duration-500 ${light ? "text-white drop-shadow-[0_1px_6px_rgba(30,45,61,0.7)]" : "text-[#1a1a1a]"}`}
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
            className="lg:hidden bg-white border-t border-[#e8d5b0]/30"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {mobilLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-[#1a1a1a]/80 hover:text-[#8f6b28] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={BOOKING_URL}
                className="mt-2 px-5 py-3 bg-[#8f6b28] text-white text-sm tracking-wide rounded-full text-center hover:bg-[#7a5b20] transition-colors"
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
