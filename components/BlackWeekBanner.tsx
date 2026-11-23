import Link from "next/link";
import { BLACK_WEEK } from "@/lib/black-week";

/**
 * Black Week-banneret. Svart flate med vilje — den skal skille seg fra
 * resten av siden, som ellers er krem, navy og gull. Rendrer ingenting når
 * kampanjen er av (lib/black-week.ts).
 *
 * `lenke` utelates der banneret allerede står i nettbutikken.
 */
export default function BlackWeekBanner({ lenke }: { lenke?: string }) {
  if (!BLACK_WEEK.aktiv) return null;

  return (
    <section
      aria-label="Black Week-tilbud"
      className="bg-[#111111] px-6 py-10 text-white sm:py-12"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#e5c78f]">
            Tilbud i nettbutikken · ut november
          </p>
          <p
            className="mt-2 text-4xl leading-none sm:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Black Week
          </p>
        </div>

        <div className="flex items-stretch gap-5 sm:gap-10">
          <div className="max-w-[9.5rem] sm:max-w-none">
            <p
              className="text-4xl leading-none text-[#e5c78f] sm:text-5xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              −{BLACK_WEEK.resten}&nbsp;%
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/80">
              Face Formula og ColoreScience
            </p>
          </div>
          <div aria-hidden className="w-px bg-white/20" />
          <div className="max-w-[9.5rem] sm:max-w-none">
            <p
              className="text-4xl leading-none text-[#e5c78f] sm:text-5xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              −{BLACK_WEEK.zo}&nbsp;%
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/80">
              ZO Skin Health
            </p>
          </div>
        </div>

        {lenke ? (
          <Link
            href={lenke}
            className="rounded-full bg-[#e5c78f] px-7 py-3 text-sm tracking-wide text-[#111111] transition-colors hover:bg-white"
          >
            Se tilbudene
          </Link>
        ) : (
          <p className="max-w-[16rem] text-sm leading-relaxed text-white/80">
            Prisene er allerede satt ned — du trenger ingen kode.
          </p>
        )}
      </div>
    </section>
  );
}
