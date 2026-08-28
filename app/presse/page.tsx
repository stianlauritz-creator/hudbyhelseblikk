import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Presse og merkevare",
  description:
    "Last ned logo, farger og typografi for Hud by Helseblikk. For samarbeidspartnere, trykkeri, senter og presse.",
  alternates: { canonical: "/presse" },
};

// Logovariantene slik de ligger i public/merkevare/. `mork` styrer om ruta
// tegnes på navy — de hvite filene er usynlige på lys bakgrunn, så de må vises
// på flaten de faktisk er laget for. `bredde` er visningsbredden i ruta;
// filene selv er høyoppløste og skal lastes ned, ikke hentes herfra med
// høyreklikk.
const varianter: {
  fil: string;
  navn: string;
  bruk: string;
  mork?: boolean;
  bredde: string;
}[] = [
  {
    fil: "hud-logo-horisontal-gull.png",
    navn: "Horisontal — gull",
    bruk: "Primærlogo. Lys bakgrunn.",
    bredde: "w-56",
  },
  {
    fil: "hud-logo-horisontal-hvit.png",
    navn: "Horisontal — hvit",
    bruk: "Primærlogo. Mørk bakgrunn.",
    mork: true,
    bredde: "w-56",
  },
  {
    fil: "hud-logo-stablet-gull.png",
    navn: "Stablet — gull",
    bruk: "Trykk, emballasje, kvadratiske flater.",
    bredde: "w-32",
  },
  {
    fil: "hud-logo-stablet-hvit.png",
    navn: "Stablet — hvit",
    bruk: "Samme, på mørk bakgrunn.",
    mork: true,
    bredde: "w-32",
  },
  {
    fil: "hud-ikon-h-gull.png",
    navn: "H-ikon — gull",
    bruk: "Ikon og vannmerke, der navnet allerede står.",
    bredde: "w-14",
  },
  {
    fil: "hud-ikon-h-hvit.png",
    navn: "H-ikon — hvit",
    bruk: "Samme, på mørk bakgrunn.",
    mork: true,
    bredde: "w-14",
  },
  {
    fil: "hud-profilbilde-rund.png",
    navn: "Profilbilde",
    bruk: "Instagram og Facebook. Mosegrønn bunn.",
    bredde: "w-24",
  },
  {
    fil: "hud-bue-favicon.png",
    navn: "Buen",
    bruk: "Favicon og detalj. Finnes også som SVG i pakka.",
    bredde: "w-20",
  },
];

const farger: { navn: string; hex: string; hvitTekst?: boolean }[] = [
  { navn: "Gull", hex: "#c9a96e" },
  { navn: "Gull tekst", hex: "#8f6b28", hvitTekst: true },
  { navn: "Mosegrønn", hex: "#3d4a3e", hvitTekst: true },
  { navn: "Navy", hex: "#1e2d3d", hvitTekst: true },
  { navn: "Nude", hex: "#ecddd0" },
  { navn: "Off-white", hex: "#faf9f7" },
];

const fonter: { navn: string; bruk: string }[] = [
  { navn: "Julius Sans One", bruk: "«HUD» og overskrifter i versaler" },
  { navn: "Cormorant Garamond", bruk: "«by Helseblikk» og sitater" },
  { navn: "Jost", bruk: "Tagline, brødtekst og knapper" },
];

const regler: string[] = [
  "H-en med buet tverrstrek er logoens kjennetegn. Bruk alltid den tegnede H-en fra filene — aldri fontens egen H.",
  "Logoen står i mørk gull (#8f6b28) på lys bakgrunn, og i varmhvit på mosegrønn eller navy. Ingen andre farger.",
  "Én linje er primærvarianten. Den stablede brukes på kvadratiske flater og smale spalter. Under 24 px høyde: bruk H-ikonet.",
  "Komprimer eller strekk aldri lockupen — avstandene H–U og U–D er optisk avstemt.",
];

export default function PressePage() {
  return (
    <section className="pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
          Presse og merkevare
        </p>
        <h1
          className="text-4xl md:text-5xl font-normal mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Logo og merkevare
        </h1>
        <p className="text-[#1a1a1a]/75 leading-relaxed mb-10 max-w-2xl">
          Her ligger logoen, fargene og typografien vår i riktig utgave, klar
          til bruk. Skal du lage skilt, annonse, program eller en omtale av
          klinikken, kan du hente det du trenger herfra — uten å spørre først.
          Alle PNG-filene har gjennomsiktig bakgrunn og høy oppløsning.
        </p>

        <div className="flex flex-wrap gap-3 mb-16">
          <a
            href="/merkevare/hud-by-helseblikk-logopakke.zip"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8f6b28] text-white text-sm tracking-wide hover:bg-[#7a5b20] transition-colors"
          >
            <Download size={16} />
            Last ned hele logopakken (ZIP)
          </a>
          <a
            href="/merkevare/hud-brand-pad.png"
            download
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#e8d5b0] text-sm tracking-wide text-[#1a1a1a] hover:border-[#c9a96e] hover:text-[#8f6b28] transition-colors"
          >
            <Download size={16} />
            Brand pad som bilde
          </a>
        </div>

        <h2
          className="text-2xl font-normal mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Logovarianter
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {varianter.map((v) => (
            <div
              key={v.fil}
              className="border border-[#e8d5b0]/50 rounded-xl overflow-hidden flex flex-col"
            >
              <div
                className={`flex-1 flex items-center justify-center px-6 py-10 ${v.mork ? "bg-[#1e2d3d]" : "bg-[#faf9f7]"}`}
              >
                <Image
                  src={`/merkevare/${v.fil}`}
                  alt={`Hud by Helseblikk — ${v.navn}`}
                  width={600}
                  height={600}
                  className={`${v.bredde} h-auto`}
                />
              </div>
              <div className="px-5 py-4 border-t border-[#e8d5b0]/50">
                <p className="text-sm mb-1">{v.navn}</p>
                <p className="text-xs text-[#1a1a1a]/60 mb-3">{v.bruk}</p>
                <a
                  href={`/merkevare/${v.fil}`}
                  download
                  className="inline-flex items-center gap-1.5 text-xs text-[#8f6b28] hover:text-[#7a5b20] transition-colors"
                >
                  <Download size={13} />
                  Last ned PNG
                </a>
              </div>
            </div>
          ))}
        </div>

        <h2
          className="text-2xl font-normal mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Farger
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
          {farger.map((f) => (
            <div
              key={f.hex}
              className="rounded-xl overflow-hidden border border-[#e8d5b0]/50"
            >
              <div
                className="h-20 flex items-end p-3"
                style={{ background: f.hex }}
              >
                <span
                  className={`text-[10px] tracking-widest uppercase ${f.hvitTekst ? "text-white/80" : "text-[#1a1a1a]/75"}`}
                >
                  {f.navn}
                </span>
              </div>
              <p className="px-3 py-2 text-xs font-mono text-[#1a1a1a]/70">
                {f.hex}
              </p>
            </div>
          ))}
        </div>

        <h2
          className="text-2xl font-normal mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Typografi
        </h2>
        <ul className="mb-4 divide-y divide-[#e8d5b0]/50 border-y border-[#e8d5b0]/50">
          {fonter.map((f) => (
            <li
              key={f.navn}
              className="py-4 flex flex-wrap items-baseline justify-between gap-2"
            >
              <span className="text-lg">{f.navn}</span>
              <span className="text-xs text-[#1a1a1a]/60">{f.bruk}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-[#1a1a1a]/60 mb-16">
          Alle tre er gratis og ligger på{" "}
          <a
            href="https://fonts.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8f6b28] hover:text-[#7a5b20] underline underline-offset-2"
          >
            Google Fonts
          </a>
          .
        </p>

        <h2
          className="text-2xl font-normal mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Slik bruker du logoen
        </h2>
        <ol className="space-y-4 mb-16">
          {regler.map((r, i) => (
            <li key={i} className="flex gap-4">
              <span className="text-xs text-[#8f6b28] pt-1 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-[#1a1a1a]/75 leading-relaxed">{r}</p>
            </li>
          ))}
        </ol>

        <div className="p-7 rounded-2xl bg-gradient-to-br from-[#f5ede4] to-[#faf9f7] border border-[#e8d5b0]/30">
          <h2 className="text-lg font-normal mb-2">Trenger du noe annet?</h2>
          <p className="text-sm text-[#1a1a1a]/70 leading-relaxed mb-4">
            Bilder fra klinikken, portretter av behandlerne eller logoen i et
            format som ikke ligger her — si fra, så sender vi det.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={`mailto:${ORG.email}`}
              className="text-[#8f6b28] hover:text-[#7a5b20] transition-colors"
            >
              {ORG.email}
            </a>
            <a
              href={ORG.phoneHref}
              className="text-[#8f6b28] hover:text-[#7a5b20] transition-colors"
            >
              {ORG.phone}
            </a>
            <Link
              href="/kontakt"
              className="text-[#1a1a1a]/60 hover:text-[#8f6b28] transition-colors"
            >
              Kontaktsiden →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
