/**
 * HUD-lockupen fra brand paden (HUD 4a): «HUD» i Marcellus med buen under,
 * «by Helseblikk» i Cormorant Garamond på samme grunnlinje, og taglinen under.
 *
 * All geometri er avledet av én variabel, `--hud-size` (= grunnlinjehøyden på
 * «HUD»), i globals.css. Ikke sett størrelser her — send inn en klasse som
 * setter `--hud-size`, så holder buen, «by Helseblikk» og taglinen samme
 * innbyrdes forhold som i brand paden på alle flater.
 *
 * Farge: «HUD» og «by Helseblikk» arver `currentColor`, så komponenten legger
 * seg etter fargen i konteksten (og de eksisterende .hero-mork-reglene i
 * globals.css virker uendret). Buen har sin egen rosé, taglinen sin egen gull.
 */

type Props = {
  /** Klasse på ytterelementet — her setter du `--hud-size` og tekstfargen. */
  className?: string;
  /** Klasse på taglinen. Egen prop fordi den har egen farge i menyen. */
  taglineClassName?: string;
  /** Taglinen «Medisinsk hudpleie · Grimstad». Av på små flater. */
  medTagline?: boolean;
  /**
   * Buen. Brand paden, regel 03: under 24 px høyde skal den droppes —
   * streken blir under én piksel og forsvinner i grøten.
   */
  medBue?: boolean;
  /** Legger glød bak buen slik teksten har når logoen står på et foto. */
  paaBilde?: boolean;
};

export default function Logo({
  className = "",
  taglineClassName = "",
  medTagline = true,
  medBue = true,
  paaBilde = false,
}: Props) {
  return (
    <span className={`hud-logo ${paaBilde ? "hud-logo--skygge" : ""} ${className}`}>
      <span className="hud-logo-lockup">
        <span className="hud-logo-hud">
          <span className="hud-logo-ord">HUD</span>
          {medBue && (
            <svg
              className="hud-logo-bue"
              viewBox="0 0 120 18"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M8 5 Q60 20 112 5" vectorEffect="non-scaling-stroke" />
            </svg>
          )}
        </span>
        <span className="hud-logo-by">by Helseblikk</span>
      </span>
      {medTagline && (
        <span className={`hud-logo-tagline ${taglineClassName}`}>
          Medisinsk hudpleie · Grimstad
        </span>
      )}
    </span>
  );
}
