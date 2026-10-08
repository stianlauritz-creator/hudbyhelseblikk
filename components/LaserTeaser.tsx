import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import LaserMaskin from "@/components/LaserMaskin";
import { LASER_KOMMER_SNART, LASER_NAVN } from "@/lib/laser";

/**
 * «Nyhet! Kommer snart»-kortet for den nye laseren. Står på forsiden og
 * øverst på /behandlinger, og forsvinner av seg selv når
 * LASER_KOMMER_SNART settes til false i lib/laser.ts.
 */
export default function LaserTeaser({ className = "" }: { className?: string }) {
  if (!LASER_KOMMER_SNART) return null;

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
            Nyhet! Kommer snart til klinikken
          </p>
          <h2
            className="mb-4 text-3xl font-normal leading-tight md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ny laser: {LASER_NAVN}
          </h2>
          <p className="mb-7 max-w-md leading-relaxed text-white/75">
            Varig hårreduksjon og sprengte blodkar — med to bølgelengder for
            alle hudtyper og kjøling før hvert skudd.
          </p>
          <span className="inline-flex items-center gap-2 text-sm tracking-wide text-[#e5c78f] transition-colors group-hover:text-white">
            Les mer og sett deg på ventelisten
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
