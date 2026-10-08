import Link from "next/link";
import { ArrowRight, Ban, Check, Mail, Phone, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import LaserMaskin from "@/components/LaserMaskin";
import { SITE_URL } from "@/lib/site";
import {
  BEHANDLINGSOMRADER,
  FAQ,
  FORLOP,
  HVORFOR,
  LASER_NAVN,
  NOKKELTALL,
  PASSER_FOR,
  PASSER_IKKE_FOR,
  VENTELISTE_HREF,
} from "@/lib/laser";

// Én hovedhandling på hele siden: ventelisten. Laseren er ikke i Timma ennå,
// så det finnes ingen time å booke — når den er i drift, byttes knappen til
// <BookingButton /> (se lib/laser.ts).
function VentelisteKnapp({ lys = false }: { lys?: boolean }) {
  return (
    <a
      href={VENTELISTE_HREF}
      className={
        lys
          ? "inline-flex items-center gap-2 rounded-full bg-[#c9a96e] px-7 py-3.5 text-sm tracking-wide text-[#1e2d3d] transition-colors hover:bg-[#e5c78f]"
          : "inline-flex items-center gap-2 rounded-full bg-[#1e2d3d] px-7 py-3.5 text-sm tracking-wide text-white transition-colors hover:bg-[#2a3d52]"
      }
    >
      Sett meg på ventelisten
      <ArrowRight size={15} />
    </a>
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
              Nyhet! Kommer snart til klinikken
            </p>
            <h1
              className="mb-6 text-4xl font-normal leading-[1.1] md:text-6xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ny laser i Grimstad
            </h1>
            <p className="mb-3 text-lg tracking-wide text-[#e5c78f]">{LASER_NAVN}</p>
            <p className="mb-9 max-w-lg text-lg leading-relaxed text-white/75">
              Varig hårreduksjon og sprengte blodkar — med to bølgelengder
              som passer alle hudtyper, og kjøling før hvert eneste skudd.
              Snart hos oss i Odden 1D.
            </p>
            <VentelisteKnapp lys />
            <p className="mt-4 text-sm text-white/60">
              Du får beskjed før vi åpner for timer — og prisene først.
            </p>
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

      {/* Hva vi skal behandle */}
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
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#8f6b28]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
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

      {/* Hvorfor denne laseren */}
      <section className="bg-[#f5f2ed] px-6 py-24">
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
      <section className="bg-white px-6 py-24">
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
            Kommer snart
          </p>
          <h2
            className="mb-5 text-3xl font-normal md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Vil du være blant de første?
          </h2>
          <p className="mb-9 leading-relaxed text-white/75">
            Sett deg på ventelisten, så sier vi fra så snart laseren er på plass
            og timene er åpne.
          </p>
          <VentelisteKnapp lys />
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
