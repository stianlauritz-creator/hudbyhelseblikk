import { describe, it, expect, beforeEach } from "vitest";
import {
  INGEN_SAMTYKKE,
  SAMTYKKE_NOKKEL,
  SAMTYKKE_VERSJON,
  lesSamtykke,
  lagreSamtykke,
  tilConsentMode,
  tilTimmaPreferanser,
} from "../samtykke";

/** Minimal localStorage-erstatning — vitest kjører i node, uten nettleser. */
function lager(): Storage {
  const data = new Map<string, string>();
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (k: string) => data.get(k) ?? null,
    key: (i: number) => [...data.keys()][i] ?? null,
    removeItem: (k: string) => void data.delete(k),
    setItem: (k: string, v: string) => void data.set(k, v),
  } as Storage;
}

describe("lesSamtykke", () => {
  let l: Storage;
  beforeEach(() => {
    l = lager();
  });

  it("gir null når kunden ikke har svart ennå", () => {
    // Null betyr «ikke spurt» og er ikke det samme som «nei» — banneret
    // skal vises, men ingenting skal spores.
    expect(lesSamtykke(l)).toBeNull();
  });

  it("tåler at nettleseren nekter oss lagring", () => {
    const sperret = {
      getItem: () => {
        throw new Error("blokkert");
      },
    } as unknown as Storage;
    expect(lesSamtykke(sperret)).toBeNull();
  });

  it("tåler ødelagt innhold uten å kaste", () => {
    l.setItem(SAMTYKKE_NOKKEL, "{ikke json");
    expect(lesSamtykke(l)).toBeNull();
  });

  it("leser tilbake et lagret valg", () => {
    lagreSamtykke(l, { analyse: true, markedsforing: false });
    const s = lesSamtykke(l);
    expect(s?.analyse).toBe(true);
    expect(s?.markedsforing).toBe(false);
  });

  it("glemmer samtykke som er eldre enn ett år", () => {
    const ifjor = new Date("2025-09-15T12:00:00Z");
    const idag = new Date("2026-09-15T12:00:00Z");
    lagreSamtykke(l, { analyse: true, markedsforing: true }, ifjor);
    expect(lesSamtykke(l, idag)).toBeNull();
  });

  it("beholder samtykke som fortsatt er ferskt", () => {
    const imars = new Date("2026-03-15T12:00:00Z");
    const idag = new Date("2026-09-15T12:00:00Z");
    lagreSamtykke(l, { analyse: true, markedsforing: true }, imars);
    expect(lesSamtykke(l, idag)?.analyse).toBe(true);
  });

  it("glemmer samtykke gitt til en eldre versjon av teksten", () => {
    // Endrer vi hva vi spør om, er det gamle svaret ikke lenger et svar
    // på det spørsmålet.
    l.setItem(
      SAMTYKKE_NOKKEL,
      JSON.stringify({
        analyse: true,
        markedsforing: true,
        tidspunkt: new Date().toISOString(),
        versjon: SAMTYKKE_VERSJON - 1,
      })
    );
    expect(lesSamtykke(l)).toBeNull();
  });
});

describe("tilConsentMode", () => {
  it("nekter alt som kan nektes når kunden ikke har svart", () => {
    const c = tilConsentMode(null);
    expect(c.analytics_storage).toBe("denied");
    expect(c.ad_storage).toBe("denied");
    expect(c.ad_user_data).toBe("denied");
    expect(c.ad_personalization).toBe("denied");
  });

  it("holder nødvendige kategorier åpne — de krever ikke samtykke", () => {
    const c = tilConsentMode(null);
    expect(c.security_storage).toBe("granted");
    expect(c.functionality_storage).toBe("granted");
  });

  it("skiller analyse fra markedsføring", () => {
    const c = tilConsentMode({ ...INGEN_SAMTYKKE, analyse: true });
    expect(c.analytics_storage).toBe("granted");
    expect(c.ad_storage).toBe("denied");
    expect(c.ad_personalization).toBe("denied");
  });

  it("åpner alle de tre annonsesignalene samlet", () => {
    // Google krever ad_user_data og ad_personalization i tillegg til
    // ad_storage. Glemmer vi ett av dem, virker ikke konverteringssporingen.
    const c = tilConsentMode({ ...INGEN_SAMTYKKE, markedsforing: true });
    expect(c.ad_storage).toBe("granted");
    expect(c.ad_user_data).toBe("granted");
    expect(c.ad_personalization).toBe("granted");
  });
});

describe("tilTimmaPreferanser", () => {
  it("sier nei til Timmas sporing når kunden ikke har svart", () => {
    // Bookingrammen spurte før om lov og fikk ja uansett hva kunden mente.
    expect(tilTimmaPreferanser(null)).toEqual({ GA4: false, pixel: false });
  });

  it("speiler kundens valg", () => {
    expect(
      tilTimmaPreferanser({ ...INGEN_SAMTYKKE, analyse: true })
    ).toEqual({ GA4: true, pixel: false });
    expect(
      tilTimmaPreferanser({ ...INGEN_SAMTYKKE, markedsforing: true })
    ).toEqual({ GA4: false, pixel: true });
  });
});
