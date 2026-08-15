import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Siden finnes ikke",
  robots: { index: false },
};

const lenker = [
  { href: "/behandlinger", tekst: "Behandlinger" },
  { href: "/prisliste", tekst: "Prisliste" },
  { href: "/nettbutikk", tekst: "Nettbutikk" },
  { href: "/bestill-time", tekst: "Bestill time" },
];

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center px-6 py-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#8f6b28]">
          Feil 404
        </p>
        <h1
          className="mb-5 text-4xl leading-tight text-[#1e2d3d] md:text-5xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Denne siden finnes ikke
        </h1>
        <p className="mb-10 leading-relaxed text-[#1a1a1a]/65">
          Siden kan ha blitt flyttet eller fjernet. Prøv en av lenkene under —
          eller ring oss på{" "}
          <a
            href="tel:37040500"
            className="text-[#8f6b28] underline underline-offset-2 hover:no-underline"
          >
            370 40 500
          </a>
          , så hjelper vi deg.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[#8f6b28] px-7 py-3 text-sm tracking-wide text-white transition-colors hover:bg-[#7a5b20]"
          >
            Til forsiden
          </Link>
          {lenker.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-[#e8d5b0] px-6 py-3 text-sm tracking-wide text-[#1a1a1a]/65 transition-colors hover:border-[#c9a96e] hover:text-[#8f6b28]"
            >
              {l.tekst}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
