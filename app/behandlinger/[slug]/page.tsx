import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Clock, Minus, Repeat, Sparkles, Timer } from "lucide-react";
import { BEHANDLINGER, getBehandling } from "@/lib/behandling-detaljer";
import { SITE_URL } from "@/lib/site";
import AnimatedSection from "@/components/AnimatedSection";
import BookingButton from "@/components/BookingButton";

// Alle behandlinger er statisk kjent — prerendre alt, 404 på ukjente slugs.
export const dynamicParams = false;

export async function generateStaticParams() {
  return BEHANDLINGER.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = getBehandling(slug);
  if (!b) return { title: "Behandling ikke funnet" };
  const title = `${b.navn} i Grimstad`;
  return {
    title,
    description: b.kort,
    alternates: { canonical: `/behandlinger/${b.slug}` },
    openGraph: {
      title: `${title} | Hud by Helseblikk`,
      description: b.kort,
      url: `/behandlinger/${b.slug}`,
      siteName: "Hud by Helseblikk",
      locale: "nb_NO",
      type: "website",
    },
  };
}

export default async function BehandlingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const b = getBehandling(slug);
  if (!b) notFound();

  const relaterte = b.relaterte
    .map((s) => getBehandling(s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const fakta = [
    { icon: Clock, label: "Varighet", verdi: b.varighet },
    b.antall ? { icon: Repeat, label: "Anbefalt", verdi: b.antall } : null,
    b.holdbarhet
      ? { icon: Timer, label: "Holdbarhet", verdi: b.holdbarhet }
      : null,
  ].filter((f): f is NonNullable<typeof f> => Boolean(f));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: b.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Behandlinger",
          item: `${SITE_URL}/behandlinger`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: b.navn,
          item: `${SITE_URL}/behandlinger/${b.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-14 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
              <Link
                href="/behandlinger"
                className="hover:text-[#b8955a] transition-colors"
              >
                Behandlinger
              </Link>
              {" · "}
              {b.kategoriNavn}
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-5 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {b.navn}
            </h1>
            <p className="text-[#1a1a1a]/65 leading-relaxed text-lg max-w-xl mx-auto mb-7">
              {b.kort}
            </p>
            {b.kampanje && (
              <p className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-[#3d4a3e] px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white">
                <Sparkles size={12} className="shrink-0" />
                {b.kampanje.merkelapp}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <BookingButton label="Bestill time" href={b.bookingHref} />
              <span>
                {b.kampanje && (
                  <>
                    {/* Overstrøket førpris er visuell kontekst; skjermlesere
                        får hele setningen i sr-only-teksten i stedet. */}
                    <span aria-hidden className="mr-2 text-[#1a1a1a]/45 line-through">
                      {b.kampanje.forPris}
                    </span>
                    <span className="sr-only">
                      Kampanjepris {b.pris}, ordinær pris {b.kampanje.forPris}.
                    </span>
                  </>
                )}
                <span
                  aria-hidden={b.kampanje ? true : undefined}
                  className="font-medium text-[#8f6b28]"
                >
                  {b.pris}
                </span>
              </span>
            </div>
            {b.kampanje && (
              <p className="mt-4 text-sm leading-relaxed text-[#1a1a1a]/55">
                {b.kampanje.vilkar}
              </p>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Nøkkelfakta */}
      <section className="px-6 -mt-7">
        <AnimatedSection eager className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {fakta.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 bg-white rounded-2xl border border-[#e8d5b0]/40 px-5 py-4"
              >
                <f.icon size={18} className="text-[#8f6b28] shrink-0" />
                <div>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-[#1a1a1a]/65">
                    {f.label}
                  </p>
                  <p className="text-sm text-[#1a1a1a]/80">{f.verdi}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {/* Hva er behandlingen */}
        <AnimatedSection>
          <section>
            <h2
              className="text-2xl md:text-3xl font-normal mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hva er {b.kortNavn?.toLowerCase() ?? b.navn.toLowerCase()}?
            </h2>
            <div className="space-y-4">
              {b.hvaEr.map((avsnitt) => (
                <p
                  key={avsnitt.slice(0, 40)}
                  className="text-[#1a1a1a]/65 leading-relaxed"
                >
                  {avsnitt}
                </p>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Priser — vises når behandlingen har flere varianter */}
        {b.prisliste && b.prisliste.length > 0 && (
          <AnimatedSection>
            <section>
              <h2
                className="text-2xl md:text-3xl font-normal mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Priser
              </h2>
              <div className="rounded-2xl border border-[#e8d5b0]/40 bg-white px-6 py-2">
                {b.prisliste.map((rad) => (
                  <div
                    key={rad.navn}
                    className="flex items-baseline justify-between gap-6 border-b border-[#faf9f7] py-3 last:border-b-0"
                  >
                    <p className="text-sm text-[#1a1a1a]/80">{rad.navn}</p>
                    <p className="whitespace-nowrap text-sm font-medium text-[#8f6b28]">
                      {rad.pris}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#1a1a1a]/45">
                Alle priser er veiledende. Endelig pris avtales ved konsultasjon.
              </p>
            </section>
          </AnimatedSection>
        )}

        {/* Hvem passer det for */}
        <AnimatedSection>
          <section>
            <h2
              className="text-2xl md:text-3xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hvem passer det for?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-white border border-[#e8d5b0]/30">
                <p className="text-xs tracking-[0.2em] uppercase text-[#3d4a3e] mb-4">
                  Passer for
                </p>
                <ul className="space-y-3">
                  {b.passerFor.map((punkt) => (
                    <li key={punkt} className="flex gap-3 text-sm text-[#1a1a1a]/70 leading-relaxed">
                      <Check size={16} className="text-[#8f6b28] shrink-0 mt-0.5" />
                      {punkt}
                    </li>
                  ))}
                </ul>
              </div>
              {b.passerIkkeFor && (
                <div className="p-6 rounded-2xl bg-[#f5f2ed] border border-[#e8d5b0]/30">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/65 mb-4">
                    Ikke egnet ved
                  </p>
                  <ul className="space-y-3">
                    {b.passerIkkeFor.map((punkt) => (
                      <li key={punkt} className="flex gap-3 text-sm text-[#1a1a1a]/65 leading-relaxed">
                        <Minus size={16} className="text-[#1a1a1a]/30 shrink-0 mt-0.5" />
                        {punkt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <p className="text-sm text-[#1a1a1a]/65 mt-4 leading-relaxed">
              Usikker på om behandlingen passer for deg? Book en{" "}
              <Link
                href="/behandlinger/hudkonsultasjon"
                className="text-[#8f6b28] hover:text-[#b8955a] transition-colors"
              >
                hudkonsultasjon
              </Link>
              , så gjør vi en ærlig vurdering sammen.
            </p>
          </section>
        </AnimatedSection>

        {/* Slik foregår det */}
        <AnimatedSection>
          <section>
            <h2
              className="text-2xl md:text-3xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Slik foregår behandlingen
            </h2>
            <div className="space-y-5">
              {b.forlop.map((steg, i) => (
                <div key={steg.tittel} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-[#c9a96e]/10 text-[#8f6b28] flex items-center justify-center text-sm font-medium shrink-0">
                      {i + 1}
                    </div>
                    {i < b.forlop.length - 1 && (
                      <div className="w-px flex-1 bg-[#e8d5b0]/50 my-1" />
                    )}
                  </div>
                  <div className="pb-2">
                    <h3
                      className="font-normal text-lg mb-1"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {steg.tittel}
                    </h3>
                    <p className="text-sm text-[#1a1a1a]/65 leading-relaxed">
                      {steg.tekst}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Resultat */}
        <AnimatedSection>
          <section className="p-7 rounded-2xl bg-gradient-to-br from-[#f5ede4] to-[#faf9f7] border border-[#e8d5b0]/30">
            <p className="text-xs tracking-[0.2em] uppercase text-[#8f6b28] mb-3">
              Hva kan du forvente?
            </p>
            <p className="text-[#1a1a1a]/70 leading-relaxed">{b.resultat}</p>
          </section>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection>
          <section>
            <h2
              className="text-2xl md:text-3xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ofte stilte spørsmål
            </h2>
            <div className="space-y-3">
              {b.faq.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl bg-white border border-[#e8d5b0]/30 open:border-[#c9a96e]/40 transition-colors"
                >
                  <summary className="cursor-pointer list-none px-6 py-4 flex justify-between items-center gap-4 text-[#1a1a1a]/80">
                    <span className="text-sm font-medium leading-snug">
                      {f.q}
                    </span>
                    <span className="text-[#8f6b28] transition-transform group-open:rotate-45 text-xl leading-none shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-5 text-sm text-[#1a1a1a]/65 leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* Relaterte behandlinger */}
        {relaterte.length > 0 && (
          <AnimatedSection>
            <section>
              <h2
                className="text-2xl md:text-3xl font-normal mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Relaterte behandlinger
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relaterte.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/behandlinger/${r.slug}`}
                    className="p-6 rounded-2xl bg-white border border-[#e8d5b0]/30 hover:border-[#c9a96e]/40 hover:-translate-y-0.5 transition-all group"
                  >
                    <h3
                      className="font-normal leading-snug mb-2"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {r.kortNavn ?? r.navn}
                    </h3>
                    <p className="text-xs text-[#8f6b28] mb-3">{r.pris}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-[#8f6b28] group-hover:text-[#b8955a] transition-colors">
                      Les mer
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </AnimatedSection>
        )}
      </div>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#f5f2ed]">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-normal mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Klar for å komme i gang?
          </h2>
          <p className="text-[#1a1a1a]/65 mb-7 leading-relaxed">
            Bestill {(b.kortNavn ?? b.navn).toLowerCase()} eller start med en
            uforpliktende hudkonsultasjon — så finner vi ut hva som passer best
            for deg.
          </p>
          <BookingButton label="Bestill time" href={b.bookingHref} />
        </AnimatedSection>
      </section>
    </>
  );
}
