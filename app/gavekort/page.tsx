import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Mail, Phone, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import GavekortKjop from "@/components/GavekortKjop";

export const metadata: Metadata = {
  title: "Gavekort",
  description:
    "Gi bort god hudhelse. Gavekort hos Hud by Helseblikk i Grimstad gjelder både behandlinger og hudpleieprodukter, og er gyldig i 12 måneder.",
  alternates: { canonical: "/gavekort" },
  openGraph: {
    title: "Gavekort | Hud by Helseblikk",
    url: "/gavekort",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

const punkter = [
  "Gjelder alle behandlinger og hele produktutvalget",
  "Sendes som kode på e-post rett etter kjøp",
  "Kan brukes flere ganger til beløpet er brukt opp",
  "Ønsker du et annet beløp, eller kortet i papir? Ta kontakt, så ordner vi det",
];

export default function GavekortPage() {
  return (
    <>
      {/* .hero-mork lysner toppmenyen — se regelen i globals.css */}
      <section className="hero-mork relative overflow-hidden bg-[#1e2d3d] px-6 pt-36 pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#c9a96e]/12 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <AnimatedSection eager>
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-[#c9a96e]">
              En gave som varer
            </p>
            <h1
              className="text-4xl leading-[1.1] text-white md:text-6xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Gavekort
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/60 md:text-base">
              Gi bort god hudhelse. Gavekortet vårt gjelder både behandlinger og
              hudpleieprodukter — mottakeren velger selv hva som passer.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative -mt-16 px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection>
            <div className="rounded-[28px] bg-white p-8 shadow-[0_28px_70px_-30px_rgba(30,45,61,0.45)] ring-1 ring-[#e8d5b0]/40 sm:p-12">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c9a96e]/10">
                  <Gift size={20} className="text-[#8f6b28]" />
                </span>
                <h2
                  className="text-xl text-[#1e2d3d]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Slik fungerer det
                </h2>
              </div>

              <ul className="mb-10 space-y-3.5">
                {punkter.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-[#1a1a1a]/65">
                    <Sparkles size={15} className="mt-0.5 flex-shrink-0 text-[#8f6b28]" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mb-10">
                <GavekortKjop />
              </div>

              <div className="rounded-2xl bg-[#faf9f7] p-6 ring-1 ring-[#e8d5b0]/40">
                <p className="mb-5 text-sm leading-relaxed text-[#1a1a1a]/65">
                  Vil du ha et annet beløp, kortet i papir, eller trenger du
                  hjelp til å velge? Ta kontakt, så ordner vi det.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="tel:37040500"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#8f6b28] px-6 py-3.5 text-sm tracking-wide text-white transition-colors hover:bg-[#7a5b20]"
                  >
                    <Phone size={15} />
                    Ring 370 40 500
                  </a>
                  <a
                    href="mailto:hei@hudbyhelseblikk.no?subject=Bestilling%20av%20gavekort"
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#e8d5b0] px-6 py-3.5 text-sm tracking-wide text-[#1a1a1a]/70 transition-colors hover:border-[#c9a96e] hover:text-[#8f6b28]"
                  >
                    <Mail size={15} />
                    Send e-post
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="mt-8 text-center text-sm text-[#1a1a1a]/65">
              Usikker på hva du skal gi?{" "}
              <Link
                href="/behandlinger"
                className="text-[#8f6b28] underline underline-offset-2 hover:no-underline"
              >
                Se behandlingene våre
              </Link>{" "}
              — eller la mottakeren velge selv.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
