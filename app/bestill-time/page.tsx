import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, ShieldCheck, Clock3, MapPin } from "lucide-react";
import TimmaEmbed from "@/components/TimmaEmbed";
import BookingSteps from "@/components/BookingSteps";
import AnimatedSection from "@/components/AnimatedSection";
import { TIMMA_STAFF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bestill time",
  description:
    "Bestill time hos Hud by Helseblikk i Grimstad — se ledige timer og book direkte i timeboken vår. Hudkonsultasjon, vipper og bryn, hudbehandlinger og injeksjoner.",
  alternates: { canonical: "/bestill-time" },
};

/**
 * `iTimebok: false` betyr at behandleren ikke ligger i Timma. Ole Arvid booker
 * via PasientSky, og kirurgi krever konsultasjon først — knappen hans skal
 * derfor til /plastikkirurgi, aldri til timeboken over.
 */
const behandlere = [
  {
    navn: "Mabel",
    fullt: "Mabel Lorine King",
    tittel: "Kosmetisk dermatologisk sykepleier",
    bilde: "/mabel-avatar.jpg",
    pos: "object-center",
    href: "/om-mabel",
    iTimebok: true,
  },
  {
    navn: "Christina",
    fullt: "Christina Dalen",
    tittel: "Kosmetisk sykepleier",
    bilde: "/christina-portrett.jpg",
    pos: "object-center",
    href: "/om-christina",
    iTimebok: true,
  },
  {
    navn: "Ole Arvid",
    fullt: "Ole Arvid F. Østerud",
    tittel: "Plastikkirurg og overlege",
    bilde: "/ole-arvid-avatar.jpg",
    pos: "object-center",
    href: "/plastikkirurgi",
    iTimebok: false,
  },
];

const trygghet = [
  {
    icon: CalendarCheck,
    tittel: "Bekreftelse med én gang",
    tekst: "Du får bekreftelse på e-post i det timen er booket, og påminnelse før besøket.",
  },
  {
    icon: ShieldCheck,
    tittel: "Fri avbestilling",
    tekst: "Endre eller avbestill gebyrfritt inntil 24 timer før timen din.",
  },
  {
    icon: Clock3,
    tittel: "Kort ventetid",
    tekst: "Vi holder av tid til nye pasienter hver uke — ofte ledig samme uke.",
  },
];

// ?behandler=mabel|christina forhåndsvelger behandler i timeboken
export default async function BestillTimePage({
  searchParams,
}: {
  searchParams: Promise<{ behandler?: string }>;
}) {
  const { behandler } = await searchParams;
  const valgt = behandler?.toLowerCase();
  const userId = valgt ? TIMMA_STAFF[valgt] : undefined;
  // Bare behandlere som faktisk ligger i Timma kan forhåndsvelges — ellers
  // ville ?behandler=ole+arvid gitt en overskrift uten tilhørende timebok.
  const valgtNavn = behandlere.find(
    (b) => b.iTimebok && b.navn.toLowerCase() === valgt
  )?.navn;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1e2d3d] pt-36 pb-40 px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#c9a96e]/12 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <AnimatedSection eager>
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-[#c9a96e]">
              Timebestilling
            </p>
            <h1
              className="text-4xl leading-[1.1] text-white md:text-6xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {valgtNavn ? `Bestill time hos ${valgtNavn}` : "Bestill time"}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/60 md:text-base">
              Velg behandling, finn en tid som passer — og få bekreftelsen med én
              gang. Timeboken viser alltid oppdatert tilgjengelighet.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Veiviser + timebok, løftet opp over heroen */}
      <section className="relative -mt-24 px-6 pb-24">
        {/* På mobil kommer timeboken først — veiviseren er fin, men den skal
            ikke stå mellom kunden og de ledige timene. På desktop er det plass
            til begge, og rekkefølgen er som før. */}
        <div className="mx-auto flex max-w-5xl flex-col">
          <AnimatedSection className="order-2 mt-8 md:order-1 md:mt-0">
            <div className="rounded-[28px] bg-[#faf9f7] p-6 shadow-[0_28px_70px_-30px_rgba(30,45,61,0.45)] ring-1 ring-[#e8d5b0]/40 sm:p-9">
              <BookingSteps />
            </div>
          </AnimatedSection>

          {/* Full bredde på mobil: timeboken mistet 60 px til sidemarg og
              ramme, og Timmas egne knapper brakk midt i ordet. */}
          <div className="order-1 -mx-6 sm:mx-0 md:order-2 md:mt-8">
            <TimmaEmbed userId={userId} />
          </div>
        </div>
      </section>

      {/* Behandlere */}
      <section className="border-t border-[#e8d5b0]/40 bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="mb-10 text-center">
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-[#8f6b28]">
              Hvem møter deg
            </p>
            <h2
              className="text-2xl text-[#1e2d3d] md:text-3xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Dine behandlere
            </h2>
          </AnimatedSection>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {behandlere.map((b, i) => (
              <AnimatedSection
                key={b.navn}
                delay={i * 0.1}
                // Tre kort i to kolonner etterlater et tomt felt — kortet uten
                // timebok tar hele bredden til vi har plass til tre kolonner.
                className={b.iTimebok ? "" : "sm:col-span-2 lg:col-span-1"}
              >
                <div className="group flex h-full items-center gap-5 rounded-2xl border border-[#e8d5b0]/40 bg-[#faf9f7] p-5 transition-colors duration-300 hover:border-[#c9a96e]/50">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                    <Image
                      src={b.bilde}
                      alt={b.fullt}
                      fill
                      sizes="80px"
                      className={`object-cover ${b.pos}`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-lg text-[#1e2d3d]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {b.fullt}
                    </p>
                    <p className="mt-0.5 text-xs text-[#1a1a1a]/65">{b.tittel}</p>
                    {!b.iTimebok && (
                      <p className="mt-2 text-xs leading-relaxed text-[#1a1a1a]/65">
                        Kirurgi bookes for seg — ikke i timeboken over. Alle
                        inngrep starter med en konsultasjon.
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={
                          b.iTimebok
                            ? `/bestill-time?behandler=${b.navn.toLowerCase()}`
                            : b.href
                        }
                        className="rounded-full bg-[#8f6b28] px-4 py-1.5 text-xs tracking-wide text-white transition-colors hover:bg-[#7a5b20]"
                      >
                        {b.iTimebok ? `Book hos ${b.navn}` : "Book konsultasjon"}
                      </Link>
                      {b.iTimebok && (
                        <Link
                          href={b.href}
                          className="rounded-full border border-[#e8d5b0] px-4 py-1.5 text-xs tracking-wide text-[#1a1a1a]/65 transition-colors hover:border-[#c9a96e] hover:text-[#8f6b28]"
                        >
                          Les mer
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trygghet */}
      <section className="bg-[#f5f2ed] px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 md:grid-cols-3">
            {trygghet.map((t, i) => (
              <AnimatedSection key={t.tittel} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-[#e8d5b0]/30 bg-white p-7">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#c9a96e]/10">
                    <t.icon size={18} className="text-[#8f6b28]" />
                  </div>
                  <h3
                    className="mb-2 text-base text-[#1e2d3d]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {t.tittel}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#1a1a1a]/65">
                    {t.tekst}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#1e2d3d] px-7 py-6 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="flex-shrink-0 text-[#c9a96e]" />
                <p className="text-sm text-white/75">
                  Odden 1D, 4876 Grimstad — 3. etasje på Oddensenteret
                </p>
              </div>
              <a
                href="tel:37040500"
                className="whitespace-nowrap rounded-full border border-white/20 px-5 py-2.5 text-sm tracking-wide text-white transition-colors hover:bg-white/10"
              >
                Ring oss: 370 40 500
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
