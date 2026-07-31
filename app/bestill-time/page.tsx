import type { Metadata } from "next";
import TimmaEmbed from "@/components/TimmaEmbed";
import { TIMMA_STAFF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bestill time",
  description:
    "Bestill time hos Hud By Helseblikk i Grimstad — se ledige timer og book direkte i timeboken vår. Hudkonsultasjon, laser, injeksjoner og hudbehandlinger.",
  alternates: { canonical: "/bestill-time" },
};

// ?behandler=mabel|christina forhåndsvelger behandler i timeboken
export default async function BestillTimePage({
  searchParams,
}: {
  searchParams: Promise<{ behandler?: string }>;
}) {
  const { behandler } = await searchParams;
  const userId = behandler ? TIMMA_STAFF[behandler.toLowerCase()] : undefined;
  return (
    <>
      <section className="pt-32 pb-10 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
            Timebestilling
          </p>
          <h1
            className="text-4xl md:text-5xl font-normal mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Bestill time
          </h1>
          <p className="text-[#1a1a1a]/55 leading-relaxed">
            Velg behandling og finn en tid som passer deg — timeboken viser
            alltid oppdatert tilgjengelighet. Du får bekreftelse med én gang.
          </p>
        </div>
      </section>

      {/* Steg-indikator — viser kunden hvor enkel bookingen er */}
      <section className="pb-8 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto">
          <ol className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Velg behandling", "Velg behandler", "Velg tid", "Bekreft"].map(
              (steg, i) => (
                <li
                  key={steg}
                  className="flex items-center gap-2.5 rounded-xl bg-white/70 border border-[#e8d5b0]/40 px-3.5 py-2.5"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#c9a96e] text-white text-xs flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-[#1a1a1a]/70">
                    {steg}
                  </span>
                </li>
              )
            )}
          </ol>
        </div>
      </section>

      <section className="pb-24 px-6 bg-gradient-to-b from-[#faf9f7] to-white">
        <div className="max-w-3xl mx-auto">
          <TimmaEmbed userId={userId} />
        </div>
      </section>
    </>
  );
}
