// Ren logikk for kundeklubben — ingen nettverk, ingen Shopify. Testes i
// lib/__tests__/kundeklubb.test.ts.

export type PaameldingInput = {
  fornavn?: string;
  epost: string;
  telefon?: string;
  samtykkeEpost: boolean;
  samtykkeSms: boolean;
};

export type ValideringsResultat =
  | { ok: true; verdi: PaameldingInput }
  | { ok: false; feil: string };

/**
 * Norsk mobilnummer til E.164. Shopify krever landkode for SMS-samtykke.
 * Returnerer null hvis nummeret ikke kan tolkes.
 */
export function normaliserTelefon(raa: string): string | null {
  const kun = raa.replace(/[\s\-()./]/g, "");
  if (!kun) return null;

  let siffer: string;
  if (kun.startsWith("+47")) siffer = kun.slice(3);
  else if (kun.startsWith("0047")) siffer = kun.slice(4);
  else if (kun.startsWith("47") && kun.length === 10) siffer = kun.slice(2);
  else siffer = kun;

  if (!/^\d{8}$/.test(siffer)) return null;
  return `+47${siffer}`;
}

const EPOST_MONSTER = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validerPaamelding(input: unknown): ValideringsResultat {
  if (typeof input !== "object" || input === null) {
    return { ok: false, feil: "Ugyldig skjema." };
  }
  const i = input as Record<string, unknown>;

  const epost = String(i.epost ?? "")
    .trim()
    .toLowerCase();
  if (!EPOST_MONSTER.test(epost)) {
    return { ok: false, feil: "Skriv inn en gyldig e-postadresse." };
  }

  const samtykkeEpost = i.samtykkeEpost === true;
  if (!samtykkeEpost) {
    return { ok: false, feil: "Du må godta å motta e-post for å bli medlem." };
  }

  const samtykkeSms = i.samtykkeSms === true;

  const telefonRaa = String(i.telefon ?? "").trim();
  let telefon: string | undefined;
  if (telefonRaa) {
    const normalisert = normaliserTelefon(telefonRaa);
    if (!normalisert) {
      return { ok: false, feil: "Telefonnummeret ser ikke riktig ut." };
    }
    telefon = normalisert;
  }

  if (samtykkeSms && !telefon) {
    return { ok: false, feil: "Skriv inn telefonnummeret ditt for å få SMS." };
  }

  const fornavnRaa = String(i.fornavn ?? "").trim();
  const fornavn = fornavnRaa ? fornavnRaa.slice(0, 60) : undefined;

  return {
    ok: true,
    verdi: { fornavn, epost, telefon, samtykkeEpost, samtykkeSms },
  };
}

// Uten I, O, 0 og 1 — de forveksles når koden skrives av fra en e-post.
const ALFABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function lagRabattkode(tilfeldig: () => number = Math.random): string {
  let hale = "";
  for (let i = 0; i < 6; i++) {
    hale += ALFABET[Math.floor(tilfeldig() * ALFABET.length)];
  }
  return `KLUBB-${hale}`;
}
