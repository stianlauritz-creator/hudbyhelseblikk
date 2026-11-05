import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import LaserMaskin from "@/components/LaserMaskin";
import { LASER_FRA_PRIS, LASER_KAMPANJE, LASER_KOMMER_SNART, LASER_NAVN } from "@/lib/laser";

/**
 * Nyhetskortet for laseren. Står på forsiden og øverst på /behandlinger.
 * Før åpning sa det «kommer snart» med venteliste; fra 05.11.2026 er laseren
 * i drift, og kortet viser pris, kampanje og lenke til /laser. Teksten styres
 * av LASER_KOMMER_SNART og LASER_KAMPANJE i lib/laser.ts.
 */
export default function LaserTeaser({ className = "" }: { className?: string }) {
  const merkelapp = LASER_KOMMER_SNART
    ? "Nyhet! Kommer snart til klinikken"
    : LASER_KAMPANJE.aktiv
      ? `Nyhet · ${LASER_KAMPANJE.tittel}`
      : "Nyhet i klinikken";
  const ingress = LASER_KOMMER_SNART
    ? "Varig hårreduksjon og sprengte blodkar — med to bølgelengder for alle hudtyper og kjøling før hvert skudd."
    : `Varig hårreduksjon fra ${LASER_FRA_PRIS} per område og behandling av sprengte blodkar — to bølgelengder for alle hudtyper og kjøling før hvert skudd.`;
  const lenketekst = LASER_KOMMER_SNART
    ? "Les mer og sett deg på ventelisten"
    : "Se priser og bestill time";

  return (
    <AnimatedSection className={className}>
      <Link
        href="/laser"
        className="group relative grid grid-cols-1 items-center overflow-hidden rounded-2xl bg-[#1e2d3d] text-white md:grid-cols-[1.4fr_1fr]"
      >
        {/* Svak gullglød i hjørnet — gir dybde uten å konkurrere med teksten */}
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#c9a96e]/15 blur-3xl"
        />
        <div className="relative px-7 py-10 md:px-12 md:py-14">
          {/* Mørk navy ⇒ den lyse gulltonen #e5c78f for kontrast */}
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e5c78f]/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#e5c78f]">
            <Sparkles size={12} className="shrink-0" />
            {merkelapp}
          </p>
          <h2
            className="mb-4 text-3xl font-normal leading-tight md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {LASER_KOMMER_SNART ? "Ny laser" : "Laserhårfjerning"}: {LASER_NAVN}
          </h2>
          <p className="mb-7 max-w-md leading-relaxed text-white/75">{ingress}</p>
          <span className="inline-flex items-center gap-2 text-sm tracking-wide text-[#e5c78f] transition-colors group-hover:text-white">
            {lenketekst}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
        <LaserMaskin
          sizes="(max-width: 768px) 70vw, 400px"
          className="mx-auto -mb-6 h-64 w-56 md:mb-0 md:h-[22rem] md:w-full"
        />
      </Link>
    </AnimatedSection>
  );
}
