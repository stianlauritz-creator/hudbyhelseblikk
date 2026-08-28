import Image from "next/image";

/**
 * HUD-lockupen. Ordmerket er en bildefil, ikke tekst.
 *
 * Det er et krav, ikke en preferanse: H-en i «HUD» er spesialtegnet med buet
 * tverrstrek, og den bokstaven finnes ikke i noen font. Logopakken sier det
 * rett ut — «bruk alltid filene, aldri fontens egen H». Derfor er dette ikke
 * satt i Marcellus lenger, og buen er ikke et eget SVG under ordet: den ER
 * tverrstreken, og ligger i filen.
 *
 * Størrelsen styres fortsatt av `--hud-size` i globals.css, som før — send
 * inn en klasse som setter den (`.hud-logo--meny`, `.hud-logo--bunn`), så
 * følger ordmerke og tagline med i samme forhold. Faktoren er valgt slik at
 * lockupen får nøyaktig samme bredde som den gamle tekstversjonen på samme
 * `--hud-size`, så alle måltallene for klaring i menyen står seg.
 *
 * Begge fargevariantene rendres oppå hverandre og krysstones. Grunnen er at
 * to uavhengige mekanismer må kunne styre fargen: forsiden setter `lys` fra
 * React etter mount, mens sidene med mørk hero gjør det i ren CSS via
 * `body:has(.hero-mork)` (se globals.css). Et bytte av `src` ville dessuten
 * gitt et synlig hopp på forsiden, der `lys` er usann fram til hydreringen.
 */

const LOCKUP_BREDDE = 1885;
const LOCKUP_HOYDE = 278;

type Props = {
  /** Klasse på ytterelementet — her setter du `--hud-size`. */
  className?: string;
  /** Klasse på taglinen. Egen prop fordi den har egen farge i menyen. */
  taglineClassName?: string;
  /** Taglinen «Medisinsk hudpleie · Grimstad». Av på små flater. */
  medTagline?: boolean;
  /** Lys variant. Settes fra React der fargen ikke kan avgjøres i CSS. */
  lys?: boolean;
  /** Legger glød bak ordmerket slik teksten har når logoen står på et foto. */
  paaBilde?: boolean;
  /** Preloader ordmerket. På i menyen, som ligger over folden. */
  preload?: boolean;
};

export default function Logo({
  className = "",
  taglineClassName = "",
  medTagline = true,
  lys = false,
  paaBilde = false,
  preload = false,
}: Props) {
  return (
    <span
      className={`hud-logo ${lys ? "hud-logo--lys" : ""} ${paaBilde ? "hud-logo--skygge" : ""} ${className}`}
    >
      <span className="hud-logo-lockup">
        <Image
          src="/merkevare/nett/lockup-gull.png"
          alt="Hud by Helseblikk"
          width={LOCKUP_BREDDE}
          height={LOCKUP_HOYDE}
          preload={preload}
          className="hud-logo-fil hud-logo-fil--gull"
        />
        {/* Ren dekor — den gylne over bærer alt-teksten, og to like
            alt-tekster ville lest logoen to ganger i skjermleser. */}
        <Image
          src="/merkevare/nett/lockup-hvit.png"
          alt=""
          aria-hidden
          width={LOCKUP_BREDDE}
          height={LOCKUP_HOYDE}
          preload={preload}
          className="hud-logo-fil hud-logo-fil--hvit"
        />
      </span>
      {medTagline && (
        <span className={`hud-logo-tagline ${taglineClassName}`}>
          Medisinsk hudpleie · Grimstad
        </span>
      )}
    </span>
  );
}
