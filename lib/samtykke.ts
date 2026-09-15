// Samtykke til analyse- og markedsføringscookies.
//
// Ekomloven krever aktivt samtykke før slike cookies settes, og Google krever
// Consent Mode v2 for EØS-trafikk — uten et samtykkesignal modellerer ikke
// Google konverteringene, så dette er like mye markedsføring som jus.
//
// Modellen er bevisst liten: to kategorier kunden kan si ja eller nei til.
// Alt som er teknisk nødvendig (handlekurv, sikkerhet) spør vi ikke om, fordi
// det ikke krever samtykke.

export interface Samtykke {
  /** Google Analytics og annen måling av hvordan siden brukes */
  analyse: boolean;
  /** Google Ads, konverteringssporing og remarketing */
  markedsforing: boolean;
  /** Når valget ble tatt (ISO). Samtykke er ikke evig. */
  tidspunkt: string;
  /** Versjon av teksten kunden sa ja til — se SAMTYKKE_VERSJON */
  versjon: number;
}

export const SAMTYKKE_NOKKEL = "hbh-samtykke";

/**
 * Økes når vi endrer HVA vi spør om — legger til en kategori, tar i bruk en ny
 * leverandør. Da er gamle svar ikke lenger svar på det spørsmålet, og banneret
 * kommer opp igjen. Ren ordlydspussing skal ikke øke tallet.
 */
export const SAMTYKKE_VERSJON = 1;

/** Datatilsynet anbefaler å spørre på nytt minst årlig. */
export const SAMTYKKE_MAKS_ALDER_DAGER = 365;

export const INGEN_SAMTYKKE: Samtykke = {
  analyse: false,
  markedsforing: false,
  tidspunkt: "",
  versjon: SAMTYKKE_VERSJON,
};

export type ConsentVerdi = "granted" | "denied";

/**
 * Leser lagret samtykke.
 *
 * `null` betyr «kunden har ikke svart» — som ikke er det samme som nei:
 * banneret skal vises, men ingenting skal spores imens. Utdatert eller
 * ødelagt lagring behandles likt, altså som ubesvart.
 */
export function lesSamtykke(
  lager: Storage | undefined,
  naa: Date = new Date()
): Samtykke | null {
  if (!lager) return null;

  let raa: string | null;
  try {
    raa = lager.getItem(SAMTYKKE_NOKKEL);
  } catch {
    // Privat modus eller blokkerte cookies. Da sporer vi ikke.
    return null;
  }
  if (!raa) return null;

  let lagret: unknown;
  try {
    lagret = JSON.parse(raa);
  } catch {
    return null;
  }

  if (typeof lagret !== "object" || lagret === null) return null;
  const s = lagret as Partial<Samtykke>;

  if (s.versjon !== SAMTYKKE_VERSJON) return null;
  if (typeof s.analyse !== "boolean" || typeof s.markedsforing !== "boolean") {
    return null;
  }

  const gitt = s.tidspunkt ? Date.parse(s.tidspunkt) : NaN;
  if (Number.isNaN(gitt)) return null;
  // Nøyaktig ett år er utløpt, ikke så vidt gyldig — «minst årlig» betyr at
  // året er den ytterste grensen.
  const dager = (naa.getTime() - gitt) / 86_400_000;
  if (dager >= SAMTYKKE_MAKS_ALDER_DAGER) return null;

  return {
    analyse: s.analyse,
    markedsforing: s.markedsforing,
    tidspunkt: s.tidspunkt!,
    versjon: SAMTYKKE_VERSJON,
  };
}

/** Lagrer kundens valg og returnerer det som ble lagret. */
export function lagreSamtykke(
  lager: Storage | undefined,
  valg: { analyse: boolean; markedsforing: boolean },
  naa: Date = new Date()
): Samtykke {
  const s: Samtykke = {
    analyse: valg.analyse,
    markedsforing: valg.markedsforing,
    tidspunkt: naa.toISOString(),
    versjon: SAMTYKKE_VERSJON,
  };
  try {
    lager?.setItem(SAMTYKKE_NOKKEL, JSON.stringify(s));
  } catch {
    // Kan ikke lagre — valget gjelder da bare denne økten. Bedre enn å kaste
    // en feil opp i ansiktet på kunden.
  }
  return s;
}

/**
 * Oversetter til signalene Google Consent Mode v2 forventer.
 *
 * Merk at markedsføring styrer tre signaler. Glemmer vi `ad_user_data` eller
 * `ad_personalization`, virker ikke konverteringssporingen i Google Ads.
 */
export function tilConsentMode(
  s: Samtykke | null
): Record<string, ConsentVerdi> {
  const av = (ja: boolean): ConsentVerdi => (ja ? "granted" : "denied");
  const analyse = s?.analyse ?? false;
  const marked = s?.markedsforing ?? false;

  return {
    analytics_storage: av(analyse),
    ad_storage: av(marked),
    ad_user_data: av(marked),
    ad_personalization: av(marked),
    personalization_storage: av(marked),
    // Nødvendige kategorier. Krever ikke samtykke, så de spør vi ikke om.
    functionality_storage: "granted",
    security_storage: "granted",
  };
}

/**
 * Timma-bookingen spør rammen vår om cookie-preferanser. Før svarte vi ja til
 * både GA4 og pixel uansett hva kunden mente — nå speiler vi kundens valg.
 */
export function tilTimmaPreferanser(s: Samtykke | null): {
  GA4: boolean;
  pixel: boolean;
} {
  return { GA4: s?.analyse ?? false, pixel: s?.markedsforing ?? false };
}
