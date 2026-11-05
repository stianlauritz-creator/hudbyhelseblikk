import Link from "next/link";
import { ArrowRight, Ban, Check, Mail, Phone, Sparkles, Tag } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";
import LaserMaskin from "@/components/LaserMaskin";
import { BOOKING_URL, SITE_URL } from "@/lib/site";
import {
  BEHANDLINGSOMRADER,
  FAQ,
  FORLOP,
  HVORFOR,
  LASER_KAMPANJE,
  LASER_KONSULTASJON,
  LASER_NAVN,
  LASER_PRISER,
  NOKKELTALL,
  PASSER_FOR,
  PASSER_IKKE_FOR,
} from "@/lib/laser";

// Én hovedhandling på hele siden: bestill time. Laseren ligger i Timma under
// «Hårfjerning», så BookingButton går rett til /bestill-time som ellers.
// Den lyse varianten brukes på navy bakgrunn (hero og avslutning).
function BestillKnapp({ lys = false, label = "Bestill time" }: { lys?: boolean; label?: string }) {
  if (lys) {
    return (
      <a
        href={BOOKING_URL}
        className="inline-flex items-center gap-2 rounded-full bg-[#c9a96e] px-7 py-3.5 text-sm tracking-wide text-[#1e2d3d] transition-colors hover:bg-[#e5c78f]"
      >
        {label}
        <ArrowRight size={15} />
      </a>
    );
  }
  return <BookingButton label={label} />;
}

function Kampanjemerke({ className = "" }: { className?: string }) {
  if (!LASER_KAMPANJE.aktiv) return null;
  return (
    <p
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#3d4a3e] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white ${className}`}
    >
      <Sparkles size={11} className="shrink-0" />
      {LASER_KAMPANJE.merkelapp}
    </p>
  );
}

export default function LaserPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Behandlinger", item: `${SITE_URL}/behandlinger` },
        { "@type": "ListItem", position: 2, name: "Laser", item: `${SITE_URL}/laser` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — navy med maskinen som motiv */}
      <section className="hero-mork relative overflow-hidden bg-[#1e2d3d] px-6 pb-16 pt-32 text-white md:pb-24 md:pt-40">
        <div
          aria-hidden
          className="absolute -left-40 top-20 h-[28rem] w-[28rem] rounded-full bg-[#c9a96e]/10 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <AnimatedSection eager>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e5c78f]/40 px-3.5 py-1.5 text-xs uppercase tracking-[0.2em] text-[#e5c78f]">
              <Sparkles size={13} className="shrink-0" />
              Nyhet i klinikken
            </p>
            <h1
              className="mb-6 text-4xl font-normal leading-[1.1] md:text-6xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Laserhårfjerning i Grimstad
            </h1>
            <p className="mb-3 text-lg tracking-wide text-[#e5c78f]">{LASER_NAVN}</p>
            <p className="mb-9 max-w-lg text-lg leading-relaxed text-white/75">
              Varig hårreduksjon og sprengte blodkar — med to bølgelengder
              som passer alle hudtyper, og kjøling før hvert eneste skudd.
              Nå hos oss i Odden 1D.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <BestillKnapp lys />
              <a
                href="#priser"
                className="inline-flex items-center gap-2 text-sm tracking-wide text-white/80 transition-colors hover:text-[#e5c78f]"
              >
                Se priser <ArrowRight size={14} />
              </a>
            </div>
            {LASER_KAMPANJE.aktiv && (
              <p className="mt-6 inline-flex items-start gap-2.5 rounded-xl bg-white/10 px-4 py-3 text-sm text-white/85">
                <Tag size={15} className="mt-0.5 shrink-0 text-[#e5c78f]" />
                <span>
                  <strong className="font-medium text-white">{LASER_KAMPANJE.tittel}</strong>{" "}
                  — {LASER_KAMPANJE.kort}
                </span>
              </p>
            )}
          </AnimatedSection>
          <LaserMaskin
            preload
            sizes="(max-width: 768px) 80vw, 480px"
            className="mx-auto h-[22rem] w-full max-w-sm md:h-[34rem] md:max-w-none"
          />
        </div>
      </section>

      {/* Nøkkeltall */}
      <section className="border-b border-[#e8d5b0]/40 bg-[#f5f2ed] px-6 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
          {NOKKELTALL.map((n, i) => (
            <AnimatedSection key={n.enhet} delay={i * 0.08}>
              <p
                className="text-3xl text-[#1e2d3d] md:text-4xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {n.verdi}{" "}
                <span className="text-base tracking-wide text-[#8f6b28]">{n.enhet}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#1a1a1a]/65">{n.tekst}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Hva vi behandler */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#8f6b28]">
              Hva laseren behandler
            </p>
            <h2
              className="mb-4 text-3xl font-normal md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              To behandlinger, én maskin
            </h2>
            <p className="leading-relaxed text-[#1a1a1a]/65">
              GentleMAX Pro Plus er bygd for nettopp disse to tingene. Det er
              derfor vi har valgt den: én maskin som gjør få ting, og gjør dem
              svært godt.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {BEHANDLINGSOMRADER.map((o, i) => (
              <AnimatedSection key={o.id} delay={i * 0.1}>
                <div id={o.id} className="flex h-full flex-col rounded-2xl border border-[#e8d5b0]/40 bg-[#faf9f7] p-8">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8f6b28]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-sm font-medium text-[#8f6b28]">{o.pris}</p>
                  </div>
                  <h3
                    className="mb-3 text-2xl font-normal"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {o.tittel}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-[#1a1a1a]/65">{o.ingress}</p>
                  <ul className="mt-auto space-y-2.5 border-t border-[#e8d5b0]/50 pt-5">
                    {o.punkter.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-[#1a1a1a]/80">
                        <Check size={15} className="mt-0.5 shrink-0 text-[#8f6b28]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Priser */}
      <section id="priser" className="scroll-mt-24 bg-[#f5f2ed] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#8f6b28]">
              Priser
            </p>
            <h2
              className="mb-4 text-3xl font-normal md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hårfjerning per behandling
            </h2>
            <p className="leading-relaxed text-[#1a1a1a]/65">
              Prisen gjelder én behandling av området. De fleste trenger 6–8
              behandlinger for et varig resultat. Flere områder i samme time
              får pakkepris.
            </p>
          </AnimatedSection>

          {LASER_KAMPANJE.aktiv && (
            <AnimatedSection className="mb-10">
              <div className="relative overflow-hidden rounded-2xl bg-[#1e2d3d] p-7 text-white md:p-9">
                <div
                  aria-hidden
                  className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c9a96e]/15 blur-3xl"
                />
                <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
                  <div>
                    <Kampanjemerke className="mb-4" />
                    <h3
                      className="mb-2 text-2xl font-normal md:text-3xl"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {LASER_KAMPANJE.tittel}
                    </h3>
                    <p className="text-white/75">{LASER_KAMPANJE.kort}</p>
                  </div>
                  <ul className="space-y-1.5">
                    {LASER_KAMPANJE.vilkar.map((v) => (
                      <li key={v} className="flex gap-2 text-xs leading-relaxed text-white/70">
                        <span aria-hidden className="text-[#e5c78f]">·</span>
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection>
              <div className="h-full rounded-2xl border border-[#c9a96e]/40 bg-white p-7">
                <h3
                  className="mb-5 text-xl font-normal text-[#1e2d3d]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Før du starter
                </h3>
                <div className="flex items-start justify-between gap-4 border-b border-[#faf9f7] py-3">
                  <div>
                    <p className="text-sm text-[#1a1a1a]/80">{LASER_KONSULTASJON.navn}</p>
                    <p className="mt-0.5 text-xs text-[#1a1a1a]/65">{LASER_KONSULTASJON.note}</p>
                  </div>
                  <p className="whitespace-nowrap text-sm font-medium text-[#8f6b28]">
                    {LASER_KONSULTASJON.pris}
                  </p>
                </div>
                <div className="flex items-start justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm text-[#1a1a1a]/80">Blodkar og rødhet</p>
                    <p className="mt-0.5 text-xs text-[#1a1a1a]/65">
                      Prises etter område — vi setter prisen i konsultasjonen
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-sm font-medium text-[#8f6b28]">
                    Etter konsultasjon
                  </p>
                </div>
              </div>
            </AnimatedSection>
            {LASER_PRISER.map((g, i) => (
              <AnimatedSection key={g.tittel} delay={(i + 1) * 0.06}>
                <div className="h-full rounded-2xl border border-[#e8d5b0]/40 bg-white p-7">
                  <h3
                    className="mb-5 text-xl font-normal text-[#1e2d3d]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {g.tittel}
                  </h3>
                  <div>
                    {g.priser.map((p) => (
                      <div
                        key={p.navn}
                        className="flex items-start justify-between gap-4 border-b border-[#faf9f7] py-3 last:border-b-0"
                      >
                        <div className="min-w-0">
                          <p className="text-sm text-[#1a1a1a]/80">{p.navn}</p>
                          {p.pakke && (
                            <p className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-[#8f6b28]">
                              Pakkepris
                            </p>
                          )}
                        </div>
                        <p className="whitespace-nowrap text-sm font-medium text-[#8f6b28]">{p.pris}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.2} className="mt-10 flex flex-wrap items-center gap-6">
            <BestillKnapp label="Bestill laserhårfjerning" />
            <p className="max-w-md text-sm leading-relaxed text-[#1a1a1a]/65">
              Studentrabatt gjelder ikke laser. Prisene er per behandling og
              betales i klinikken.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Hvorfor denne laseren */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#8f6b28]">
              Hvorfor GentleMAX Pro Plus
            </p>
            <h2
              className="text-3xl font-normal md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Effektiv, skånsom og trygg for flere hudtyper
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2">
            {HVORFOR.map((h, i) => (
              <AnimatedSection key={h.tittel} delay={i * 0.08}>
                <div className="border-l-2 border-[#c9a96e] pl-6">
                  <h3
                    className="mb-3 text-xl font-normal"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {h.tittel}
                  </h3>
                  <p className="leading-relaxed text-[#1a1a1a]/65">{h.tekst}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Slik foregår hårfjerning */}
      <section className="bg-[#f5f2ed] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#8f6b28]">
              Laserhårfjerning
            </p>
            <h2
              className="mb-4 text-3xl font-normal md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Slik foregår det
            </h2>
            <p className="leading-relaxed text-[#1a1a1a]/65">
              De fleste trenger 6–8 behandlinger med 4–8 ukers mellomrom.
              Håret i det behandlede området løsner og faller av i løpet av ett
              til tre uker etter hver gang.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {FORLOP.map((f, i) => (
              <AnimatedSection key={f.tittel} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-[#1e2d3d] p-8 text-white">
                  <p
                    className="mb-4 text-3xl text-[#e5c78f]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {f.tittel}
                  </p>
                  <p className="text-sm leading-relaxed text-white/75">{f.tekst}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Passer for / passer ikke for */}
      <section className="bg-[#faf9f7] px-6 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          <AnimatedSection direction="left">
            <div className="h-full rounded-2xl border border-[#e8d5b0]/40 bg-white p-8">
              <h2
                className="mb-6 text-2xl font-normal"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Passer for
              </h2>
              <ul className="space-y-3">
                {PASSER_FOR.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[#1a1a1a]/75">
                    <Check size={17} className="mt-0.5 shrink-0 text-[#8f6b28]" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className="h-full rounded-2xl border border-[#e8d5b0]/40 bg-white p-8">
              <h2
                className="mb-6 text-2xl font-normal"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ikke for deg nå hvis
              </h2>
              <ul className="space-y-3">
                {PASSER_IKKE_FOR.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[#1a1a1a]/75">
                    <Ban size={17} className="mt-0.5 shrink-0 text-[#1a1a1a]/40" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-[#1a1a1a]/55">
                Usikker? Vi går gjennom helse, medisiner og hud i
                konsultasjonen før første behandling.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <AnimatedSection className="mb-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[#8f6b28]">
              Spørsmål og svar
            </p>
            <h2
              className="text-3xl font-normal md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Det folk lurer på
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.05}>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-[#e8d5b0]/30 bg-white transition-colors open:border-[#c9a96e]/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-[#1a1a1a]/80">
                    <span className="text-sm font-medium leading-snug">{f.q}</span>
                    <span className="shrink-0 text-xl leading-none text-[#8f6b28] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-5 text-sm leading-relaxed text-[#1a1a1a]/65">{f.a}</p>
                </details>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Avslutning — samme handling som heroen */}
      <section className="relative overflow-hidden bg-[#1e2d3d] px-6 py-24 text-white">
        <div
          aria-hidden
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#c9a96e]/10 blur-3xl"
        />
        <AnimatedSection className="relative mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#e5c78f]">
            {LASER_KAMPANJE.aktiv ? LASER_KAMPANJE.tittel : "Timene er åpne"}
          </p>
          <h2
            className="mb-5 text-3xl font-normal md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Klar for å slippe barberhøvelen?
          </h2>
          <p className="mb-9 leading-relaxed text-white/75">
            Bestill time direkte i timeboken, eller start med en konsultasjon
            hvis du vil ha en vurdering først. Konsultasjonen trekkes fra ved
            behandling.
          </p>
          <BestillKnapp lys />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 text-sm text-white/65 sm:flex-row sm:gap-8">
            <a href="tel:37040500" className="inline-flex items-center gap-2 transition-colors hover:text-[#e5c78f]">
              <Phone size={15} /> 370 40 500
            </a>
            <a
              href="mailto:hei@hudbyhelseblikk.no"
              className="inline-flex items-center gap-2 transition-colors hover:text-[#e5c78f]"
            >
              <Mail size={15} /> hei@hudbyhelseblikk.no
            </a>
            <Link href="/behandlinger" className="inline-flex items-center gap-2 transition-colors hover:text-[#e5c78f]">
              Se alle behandlinger <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
