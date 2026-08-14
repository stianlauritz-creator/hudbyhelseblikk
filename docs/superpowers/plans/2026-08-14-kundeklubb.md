# Kundeklubb Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Et påmeldingsskjema på hudbyhelseblikk.no som oppretter kunden i Shopify med dokumentert samtykke per kanal, lager en unik engangs rabattkode på 10 % som ikke gjelder gavekort, og sender koden på e-post.

**Architecture:** Popup og medlemsside deler én skjemakomponent. Skjemaet poster til én Route Handler (`app/api/kundeklubb/route.ts`) som orkestrerer tre steg mot Shopify Admin API: opprett kunde → opprett rabattkode → send e-post. Admin-tilgang skjer med client credentials-grant som gir et token med 24 timers levetid, mellomlagret i modulminne. All ren logikk (validering, telefonnormalisering, kodegenerering) ligger i `lib/kundeklubb.ts` og er enhetstestet uten nettverk.

**Tech Stack:** Next.js 16.2.3 (App Router, Route Handlers), React 19.2.4, TypeScript, Tailwind 4, framer-motion 12, Shopify Admin GraphQL API 2026-07, Resend for e-post, Vitest for tester.

## Global Constraints

- **Next.js 16.2.3** — les `node_modules/next/dist/docs/` før du bruker et API du ikke har verifisert i denne versjonen. Route Handlers bruker Web `Request`/`Response`; `POST` caches ikke.
- **Shopify Admin API-versjon: `2026-07`** — samme versjon som er satt på appen i Dev Dashboard.
- **Tilgjengelige Shopify-scopes er nøyaktig `write_customers,write_discounts,read_products`.** Ingen oppgave skal kreve mer. Alt som trenger `write_products` (f.eks. å opprette kolleksjoner) gjøres manuelt i Shopify-adminen.
- **Språk:** all brukervendt tekst på norsk bokmål. Du/deg-form.
- **Farger:** gull `#c9a96e` (hover `#b8955a`), krem `#faf9f7`, mørk `#1a1a1a`, blågrå `#1e2d3d`. Overskrifter bruker `var(--font-playfair)`.
- **Mobil-først-felle i dette prosjektet:** `sticky` uten `md:`-prefiks har lagt elementer over teksten på mobil før. Bruk alltid `md:sticky md:top-*` for kolonneelementer.
- **Ingen hemmeligheter i repoet.** `SHOPIFY_CLIENT_SECRET` og `RESEND_API_KEY` settes kun i Vercel.
- **Aldri `NEXT_PUBLIC_`-prefiks på noe som rører Admin API eller e-post.**

---

## Forutsetninger som må være på plass før Task 3

Disse gjøres i eksterne systemer, ikke i kode. Task 1 og 2 kan kjøres uten dem.

**A. Kolleksjon uten gavekort (Shopify-admin, manuelt)**

Rabatten skal ikke gjelde gavekort. Shopify-rabatter kan ikke uttrykke «alt unntatt X», så rabatten må peke på en kolleksjon. Appen mangler `write_products` med vilje, så kolleksjonen lages for hånd:

1. Shopify-admin → Produkter → Samlinger → **Opprett samling**
2. Tittel: `Klubbrabatt — uten gavekort`
3. Type: **Automatisert**
4. Betingelse: `Produkttype` `er ikke lik` `Gift Card`
5. Lagre, og kontroller at «Gavekort - Hud by Helseblikk» **ikke** er i samlingen
6. Kopier samlings-ID-en fra URL-en (tallet i `/collections/123456789`)
7. Legg i Vercel som `SHOPIFY_KLUBB_COLLECTION_ID` med verdien `gid://shopify/Collection/123456789`

**B. Resend-konto og DNS (one.com)**

1. Opprett konto på resend.com, legg til domenet `hudbyhelseblikk.no`
2. Resend viser tre DNS-oppføringer (SPF, DKIM, retur-sti) — legges inn hos one.com
3. Vent på grønn «Verified» hos Resend
4. Lag API-nøkkel, legg i Vercel som `RESEND_API_KEY` (Sensitive, alle miljøer)

**C. Rotert klienthemmelighet**

`SHOPIFY_CLIENT_SECRET` i Vercel (Sensitive, alle miljøer). Den gamle er kompromittert og må roteres i Dev Dashboard først.

**Miljøvariabler totalt:**

| Navn | Satt? | Brukes av |
|---|---|---|
| `SHOPIFY_STORE_DOMAIN` | ✅ | Task 2 |
| `SHOPIFY_CLIENT_ID` | ✅ | Task 2 |
| `SHOPIFY_CLIENT_SECRET` | ⬜ | Task 2 |
| `SHOPIFY_KLUBB_COLLECTION_ID` | ⬜ | Task 3 |
| `RESEND_API_KEY` | ⬜ | Task 4 |

---

## Filstruktur

| Fil | Ansvar |
|---|---|
| `lib/kundeklubb.ts` | Ren logikk: validering, telefonnormalisering, kodegenerering. Ingen nettverk. |
| `lib/shopify-admin.ts` | Token-utveksling med mellomlagring + `adminGraphql()`. Ingen domenelogikk. |
| `lib/klubb-epost.ts` | Velkomst-e-post: HTML-mal og utsending via Resend. |
| `app/api/kundeklubb/route.ts` | Orkestrering: valider → kunde → kode → e-post. |
| `components/KundeklubbSkjema.tsx` | Delt skjema, brukt av både popup og medlemsside. |
| `components/KundeklubbPopup.tsx` | Visningslogikk: terskel, frekvens, mobilplassering. |
| `app/kundeklubb/page.tsx` + `layout.tsx` | Medlemsside med metadata. |
| `lib/__tests__/kundeklubb.test.ts` | Enhetstester for ren logikk. |
| `scripts/probe-shopify.mjs` | Engangs verifisering av at mutasjonene finnes i 2026-07. |

---

### Task 1: Testoppsett og ren logikk

Kodebasen har ingen tester i dag. Denne oppgaven innfører Vitest og bygger all logikk som kan testes uten nettverk.

**Files:**
- Create: `lib/kundeklubb.ts`
- Create: `lib/__tests__/kundeklubb.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json` (devDependencies + `test`-script)

**Interfaces:**
- Consumes: ingenting
- Produces:
  - `type PaameldingInput = { fornavn?: string; epost: string; telefon?: string; samtykkeEpost: boolean; samtykkeSms: boolean }`
  - `validerPaamelding(input: unknown): { ok: true; verdi: PaameldingInput } | { ok: false; feil: string }`
  - `normaliserTelefon(raa: string): string | null` — returnerer E.164 (`+47XXXXXXXX`) eller `null`
  - `lagRabattkode(tilfeldig?: () => number): string` — format `KLUBB-XXXXXX`

- [ ] **Step 1: Installer Vitest**

```bash
npm install -D vitest@^3
```

- [ ] **Step 2: Legg til test-script i package.json**

I `"scripts"`, etter `"lint": "eslint"`:

```json
    "test": "vitest run",
    "test:watch": "vitest"
```

- [ ] **Step 3: Opprett vitest.config.ts**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/__tests__/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: Skriv testene (de skal feile)**

Opprett `lib/__tests__/kundeklubb.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  validerPaamelding,
  normaliserTelefon,
  lagRabattkode,
} from "../kundeklubb";

describe("normaliserTelefon", () => {
  it("gjør åttesifret norsk nummer om til E.164", () => {
    expect(normaliserTelefon("40012345")).toBe("+4740012345");
  });

  it("tåler mellomrom og bindestrek", () => {
    expect(normaliserTelefon("400 12 345")).toBe("+4740012345");
    expect(normaliserTelefon("400-12-345")).toBe("+4740012345");
  });

  it("beholder nummer som allerede har landkode", () => {
    expect(normaliserTelefon("+4740012345")).toBe("+4740012345");
    expect(normaliserTelefon("004740012345")).toBe("+4740012345");
  });

  it("avviser nummer med feil lengde", () => {
    expect(normaliserTelefon("123")).toBeNull();
    expect(normaliserTelefon("400123456789")).toBeNull();
  });

  it("avviser tomt og søppel", () => {
    expect(normaliserTelefon("")).toBeNull();
    expect(normaliserTelefon("ikke et nummer")).toBeNull();
  });
});

describe("validerPaamelding", () => {
  const gyldig = {
    epost: "ida@example.com",
    samtykkeEpost: true,
    samtykkeSms: false,
  };

  it("godtar minste gyldige innmelding", () => {
    const r = validerPaamelding(gyldig);
    expect(r.ok).toBe(true);
  });

  it("avviser uten e-postsamtykke", () => {
    const r = validerPaamelding({ ...gyldig, samtykkeEpost: false });
    expect(r).toEqual({ ok: false, feil: "Du må godta å motta e-post for å bli medlem." });
  });

  it("avviser ugyldig e-post", () => {
    const r = validerPaamelding({ ...gyldig, epost: "ikke-en-epost" });
    expect(r.ok).toBe(false);
  });

  it("avviser SMS-samtykke uten telefonnummer", () => {
    const r = validerPaamelding({ ...gyldig, samtykkeSms: true });
    expect(r).toEqual({
      ok: false,
      feil: "Skriv inn telefonnummeret ditt for å få SMS.",
    });
  });

  it("normaliserer telefonnummeret i returverdien", () => {
    const r = validerPaamelding({ ...gyldig, telefon: "400 12 345", samtykkeSms: true });
    expect(r.ok && r.verdi.telefon).toBe("+4740012345");
  });

  it("trimmer og småskriver e-post", () => {
    const r = validerPaamelding({ ...gyldig, epost: "  Ida@Example.COM " });
    expect(r.ok && r.verdi.epost).toBe("ida@example.com");
  });

  it("avviser ugyldig telefonnummer selv uten SMS-samtykke", () => {
    const r = validerPaamelding({ ...gyldig, telefon: "12" });
    expect(r.ok).toBe(false);
  });

  it("avviser noe som ikke er et objekt", () => {
    expect(validerPaamelding(null).ok).toBe(false);
    expect(validerPaamelding("hei").ok).toBe(false);
  });
});

describe("lagRabattkode", () => {
  it("har formatet KLUBB- pluss seks tegn", () => {
    expect(lagRabattkode()).toMatch(/^KLUBB-[0-9A-Z]{6}$/);
  });

  it("utelater tegn som forveksles: I, O, 0, 1", () => {
    for (let i = 0; i < 200; i++) {
      expect(lagRabattkode()).not.toMatch(/[IO01]/);
    }
  });

  it("gir forskjellige koder", () => {
    const sett = new Set(Array.from({ length: 100 }, () => lagRabattkode()));
    expect(sett.size).toBeGreaterThan(90);
  });
});
```

- [ ] **Step 5: Kjør testene og se at de feiler**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "../kundeklubb"`

- [ ] **Step 6: Skriv implementasjonen**

Opprett `lib/kundeklubb.ts`:

```ts
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

  const epost = String(i.epost ?? "").trim().toLowerCase();
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
```

- [ ] **Step 7: Kjør testene og se at de passerer**

Run: `npm test`
Expected: PASS — alle tester grønne

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/kundeklubb.ts lib/__tests__/kundeklubb.test.ts
git commit -m "Kundeklubb: validering, telefonnormalisering og kodegenerering med tester"
```

---

### Task 2: Shopify Admin-klient

Token-utveksling og GraphQL-kall. Ingen domenelogikk her — den ligger i Task 3.

**Files:**
- Create: `lib/shopify-admin.ts`
- Create: `scripts/probe-shopify.mjs`

**Interfaces:**
- Consumes: ingenting fra Task 1
- Produces:
  - `adminGraphql<T>(query: string, variables?: Record<string, unknown>): Promise<T>` — kaster `Error` ved HTTP-feil eller GraphQL-`errors`
  - `adminKonfigurert(): boolean`

- [ ] **Step 1: Skriv Admin-klienten**

Opprett `lib/shopify-admin.ts`:

```ts
// Shopify Admin API. Tilgang skjer med client credentials-grant: klient-ID og
// -hemmelighet byttes inn i et token som varer ~24 timer. Tokenet mellomlagres
// i modulminnet slik at vi ikke veksler ved hvert kall.

const API_VERSION = "2026-07";

let bufretToken: { verdi: string; utloeper: number } | null = null;

export function adminKonfigurert(): boolean {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_CLIENT_ID &&
      process.env.SHOPIFY_CLIENT_SECRET
  );
}

async function hentToken(): Promise<string> {
  const naa = Date.now();
  if (bufretToken && bufretToken.utloeper > naa + 60_000) {
    return bufretToken.verdi;
  }

  const domene = process.env.SHOPIFY_STORE_DOMAIN;
  const res = await fetch(`https://${domene}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    // Ikke logg kroppen — den kan inneholde legitimasjon
    throw new Error(`Shopify token-utveksling feilet: HTTP ${res.status}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  bufretToken = {
    verdi: data.access_token,
    utloeper: naa + data.expires_in * 1000,
  };
  return data.access_token;
}

export async function adminGraphql<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!adminKonfigurert()) {
    throw new Error("Shopify Admin er ikke konfigurert (mangler miljøvariabler)");
  }

  const token = await hentToken();
  const domene = process.env.SHOPIFY_STORE_DOMAIN;

  const res = await fetch(
    `https://${domene}/admin/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Shopify Admin API: HTTP ${res.status}`);
  }

  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify Admin API: ${JSON.stringify(json.errors).slice(0, 300)}`);
  }
  if (!json.data) {
    throw new Error("Shopify Admin API: tomt svar");
  }
  return json.data;
}
```

- [ ] **Step 2: Skriv probe-scriptet**

Feltnavn i Shopifys API endrer seg mellom versjoner. Dette scriptet slår opp
det faktiske skjemaet i `2026-07` **før** Task 3 skrives, slik at mutasjonene
ikke bygges på antakelser.

Opprett `scripts/probe-shopify.mjs`:

```js
// Kjør: node --env-file=.env.probe scripts/probe-shopify.mjs
// .env.probe skal inneholde SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID,
// SHOPIFY_CLIENT_SECRET. Filen skal IKKE committes.

const domene = process.env.SHOPIFY_STORE_DOMAIN;

const tokenRes = await fetch(`https://${domene}/admin/oauth/access_token`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    grant_type: "client_credentials",
    client_id: process.env.SHOPIFY_CLIENT_ID,
    client_secret: process.env.SHOPIFY_CLIENT_SECRET,
  }),
});
const { access_token } = await tokenRes.json();

async function sporr(query) {
  const res = await fetch(
    `https://${domene}/admin/api/2026-07/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": access_token,
      },
      body: JSON.stringify({ query }),
    }
  );
  return res.json();
}

// Hvilke felter finnes på CustomerInput?
const kunde = await sporr(`{
  __type(name: "CustomerInput") { inputFields { name type { name kind ofType { name } } } }
}`);
console.log("=== CustomerInput ===");
console.log(kunde.data.__type.inputFields.map((f) => f.name).join(", "));

// Hvordan ser samtykke-inputen ut?
for (const navn of [
  "CustomerEmailMarketingConsentInput",
  "CustomerSmsMarketingConsentInput",
]) {
  const t = await sporr(`{ __type(name: "${navn}") { inputFields { name } } }`);
  console.log(`\n=== ${navn} ===`);
  console.log(t.data.__type?.inputFields.map((f) => f.name).join(", ") ?? "FINNES IKKE");
}

// Rabattinput
const rabatt = await sporr(`{
  __type(name: "DiscountCodeBasicInput") { inputFields { name } }
}`);
console.log("\n=== DiscountCodeBasicInput ===");
console.log(rabatt.data.__type.inputFields.map((f) => f.name).join(", "));

const items = await sporr(`{ __type(name: "DiscountItemsInput") { inputFields { name } } }`);
console.log("\n=== DiscountItemsInput ===");
console.log(items.data.__type?.inputFields.map((f) => f.name).join(", ") ?? "FINNES IKKE");
```

- [ ] **Step 3: Kjør proben og noter resultatet**

```bash
printf 'SHOPIFY_STORE_DOMAIN=hud-by-helseblikk.myshopify.com\nSHOPIFY_CLIENT_ID=bc0a64924a245ec5ede3d6371a68f66e\nSHOPIFY_CLIENT_SECRET=<den roterte hemmeligheten>\n' > .env.probe
node --env-file=.env.probe scripts/probe-shopify.mjs
```

Expected: lister med feltnavn for hver type.

**Sammenlign med det Task 3 bruker:**
- `CustomerInput` skal inneholde `email`, `firstName`, `phone`, `tags`, `emailMarketingConsent`, `smsMarketingConsent`
- `DiscountCodeBasicInput` skal inneholde `title`, `code`, `startsAt`, `customerSelection`, `customerGets`, `usageLimit`, `appliesOncePerCustomer`

Avviker noe, **rett kallet i Task 3 etter det proben sier** — proben er fasit, ikke denne planen.

- [ ] **Step 4: Slett hemmeligheten**

```bash
rm .env.probe
grep -q "^\.env" .gitignore || echo ".env*" >> .gitignore
```

- [ ] **Step 5: Commit**

```bash
git add lib/shopify-admin.ts scripts/probe-shopify.mjs .gitignore
git commit -m "Kundeklubb: Shopify Admin-klient med client credentials og skjema-probe"
```

---

### Task 3: API-ruten

**Files:**
- Create: `app/api/kundeklubb/route.ts`
- Test: manuell verifisering mot ekte Shopify (se steg 4–6)

**Interfaces:**
- Consumes: `validerPaamelding`, `lagRabattkode` fra Task 1; `adminGraphql`, `adminKonfigurert` fra Task 2; `sendVelkomstEpost` fra Task 4
- Produces: `POST /api/kundeklubb` som tar `{ fornavn?, epost, telefon?, samtykkeEpost, samtykkeSms, felle? }` og svarer `{ ok: true }` eller `{ feil: string }`

> **Rekkefølge:** skriv ruten uten e-postkallet først (steg 1), verifiser mot Shopify (steg 4–6), og koble på e-post i Task 4. Da isolerer du feil til ett system om gangen.

- [ ] **Step 1: Skriv ruten**

Opprett `app/api/kundeklubb/route.ts`:

```ts
import { NextResponse } from "next/server";
import { validerPaamelding, lagRabattkode } from "@/lib/kundeklubb";
import { adminGraphql, adminKonfigurert } from "@/lib/shopify-admin";

const RABATT_PROSENT = 0.1;

type KundeSvar = {
  customerCreate: {
    customer: { id: string; email: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

type RabattSvar = {
  discountCodeBasicCreate: {
    codeDiscountNode: { id: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

const OPPRETT_KUNDE = `
mutation opprettKunde($input: CustomerInput!) {
  customerCreate(input: $input) {
    customer { id email }
    userErrors { field message }
  }
}`;

const OPPRETT_RABATT = `
mutation opprettRabatt($input: DiscountCodeBasicInput!) {
  discountCodeBasicCreate(basicCodeDiscount: $input) {
    codeDiscountNode { id }
    userErrors { field message }
  }
}`;

export async function POST(req: Request) {
  if (!adminKonfigurert()) {
    console.error("Kundeklubb: Shopify Admin mangler miljøvariabler");
    return NextResponse.json(
      { feil: "Påmelding er midlertidig utilgjengelig. Prøv igjen senere." },
      { status: 503 }
    );
  }

  let kropp: unknown;
  try {
    kropp = await req.json();
  } catch {
    return NextResponse.json({ feil: "Ugyldig skjema." }, { status: 400 });
  }

  // Honningkrukke: skjult felt som mennesker aldri fyller ut. Svar 200 slik at
  // roboten tror den lyktes og ikke prøver på nytt.
  if ((kropp as Record<string, unknown>)?.felle) {
    return NextResponse.json({ ok: true });
  }

  const validering = validerPaamelding(kropp);
  if (!validering.ok) {
    return NextResponse.json({ feil: validering.feil }, { status: 400 });
  }
  const { fornavn, epost, telefon, samtykkeSms } = validering.verdi;

  const naa = new Date().toISOString();

  const kundeInput: Record<string, unknown> = {
    email: epost,
    tags: ["kundeklubb"],
    emailMarketingConsent: {
      marketingState: "SUBSCRIBED",
      marketingOptInLevel: "SINGLE_OPT_IN",
      consentUpdatedAt: naa,
    },
  };
  if (fornavn) kundeInput.firstName = fornavn;
  if (telefon) kundeInput.phone = telefon;
  if (telefon && samtykkeSms) {
    // Merk: `consentCollectedFrom` finnes IKKE i 2026-07 — verifisert med
    // scripts/probe-shopify.mjs. Legges det til, feiler hver SMS-påmelding.
    kundeInput.smsMarketingConsent = {
      marketingState: "SUBSCRIBED",
      marketingOptInLevel: "SINGLE_OPT_IN",
      consentUpdatedAt: naa,
    };
  }

  let alleredeMedlem = false;
  try {
    const svar = await adminGraphql<KundeSvar>(OPPRETT_KUNDE, { input: kundeInput });
    const feil = svar.customerCreate.userErrors;
    if (feil.length > 0) {
      const teksten = feil.map((f) => f.message).join(" ");
      if (/taken|allerede/i.test(teksten)) {
        alleredeMedlem = true;
      } else {
        console.error("Kundeklubb: customerCreate userErrors", teksten);
        return NextResponse.json(
          { feil: "Vi fikk ikke registrert deg. Prøv igjen om litt." },
          { status: 502 }
        );
      }
    }
  } catch (e) {
    console.error("Kundeklubb: customerCreate feilet", e);
    return NextResponse.json(
      { feil: "Vi fikk ikke registrert deg. Prøv igjen om litt." },
      { status: 502 }
    );
  }

  // Er hun allerede medlem, skal hun ikke få en ny rabattkode. Svar likevel
  // nøytralt, slik at skjemaet ikke røper hvem som står i registeret.
  if (alleredeMedlem) {
    return NextResponse.json({ ok: true, alleredeMedlem: true });
  }

  const kode = lagRabattkode();
  const kolleksjon = process.env.SHOPIFY_KLUBB_COLLECTION_ID;
  if (!kolleksjon) {
    console.error("Kundeklubb: SHOPIFY_KLUBB_COLLECTION_ID mangler — kunde opprettet uten kode", epost);
    return NextResponse.json({ ok: true, utenKode: true });
  }

  try {
    const svar = await adminGraphql<RabattSvar>(OPPRETT_RABATT, {
      input: {
        title: `Kundeklubb 10 % — ${epost}`,
        code: kode,
        startsAt: naa,
        usageLimit: 1,
        appliesOncePerCustomer: true,
        // `customerSelection` finnes IKKE i 2026-07 — erstattet av `context`,
        // som er PÅKREVD. Uten den: «Context can't be blank».
        context: { all: "ALL" },
        customerGets: {
          value: { percentage: RABATT_PROSENT },
          items: { collections: { add: [kolleksjon] } },
        },
      },
    });
    const feil = svar.discountCodeBasicCreate.userErrors;
    if (feil.length > 0) {
      // Kunden er opprettet — kode kan sendes manuelt. Logg tydelig.
      console.error("Kundeklubb: RABATTKODE FEILET for", epost, JSON.stringify(feil));
      return NextResponse.json({ ok: true, utenKode: true });
    }
  } catch (e) {
    console.error("Kundeklubb: RABATTKODE FEILET for", epost, e);
    return NextResponse.json({ ok: true, utenKode: true });
  }

  // Task 4 kobler på e-postutsending her.
  console.log("Kundeklubb: opprettet medlem med kode", kode);

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Kjør bygget**

Run: `npm run build`
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Start lokal server**

```bash
npx --yes vercel@latest env pull .env.local
npm run dev
```

> Merk: `vercel env pull` gir placeholder for verdier merket «Sensitive» — det har ødelagt lokale bygg i dette prosjektet før. Fungerer det ikke, skriv `.env.local` for hånd med de ekte verdiene, og **slett filen etterpå**.

- [ ] **Step 4: Test avvisning uten samtykke**

```bash
curl -s -X POST localhost:3000/api/kundeklubb -H "Content-Type: application/json" \
  -d '{"epost":"test1@example.com","samtykkeEpost":false,"samtykkeSms":false}'
```

Expected: `{"feil":"Du må godta å motta e-post for å bli medlem."}` med status 400

- [ ] **Step 5: Test gyldig påmelding**

```bash
curl -s -X POST localhost:3000/api/kundeklubb -H "Content-Type: application/json" \
  -d '{"fornavn":"Testmedlem","epost":"klubbtest1@example.com","telefon":"40000009","samtykkeEpost":true,"samtykkeSms":true}'
```

Expected: `{"ok":true}` — og i Shopify-adminen under Kunder skal `klubbtest1@example.com` finnes med taggen `kundeklubb`, abonnert på både e-post og SMS. Under Rabatter skal `KLUBB-XXXXXX` ligge med 10 %, én gangs bruk, begrenset til samlingen.

- [ ] **Step 6: Test dobbel påmelding**

Kjør kommandoen fra steg 5 én gang til.

Expected: `{"ok":true,"alleredeMedlem":true}` — og **ingen ny rabattkode** i Shopify.

- [ ] **Step 7: Rydd opp testdata**

Slett testkunden og testkodene i Shopify-adminen.

- [ ] **Step 8: Commit**

```bash
git add app/api/kundeklubb/route.ts
git commit -m "Kundeklubb: API-rute som oppretter kunde med samtykke og unik rabattkode"
```

---

### Task 4: Velkomst-e-post

**Files:**
- Create: `lib/klubb-epost.ts`
- Modify: `app/api/kundeklubb/route.ts` (koble på utsending)
- Modify: `package.json` (resend)

**Interfaces:**
- Consumes: ingenting fra tidligere oppgaver
- Produces: `sendVelkomstEpost(args: { til: string; fornavn?: string; kode: string }): Promise<boolean>` — returnerer `false` ved feil i stedet for å kaste

- [ ] **Step 1: Installer Resend**

```bash
npm install resend
```

- [ ] **Step 2: Skriv e-postmodulen**

Opprett `lib/klubb-epost.ts`:

```ts
import { Resend } from "resend";

const AVSENDER = "Hud by Helseblikk <klubb@hudbyhelseblikk.no>";

function mal(kode: string, fornavn?: string): string {
  const hilsen = fornavn ? `Hei ${fornavn}!` : "Hei!";
  return `<!doctype html>
<html lang="nb">
<body style="margin:0;padding:0;background:#faf9f7;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;margin:0 0 24px;">Hud by Helseblikk</p>

    <h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;line-height:1.2;margin:0 0 16px;">Velkommen i kundeklubben</h1>

    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">${hilsen} Så hyggelig at du ble medlem. Her er rabattkoden din på 10 % til ditt første produktkjøp:</p>

    <div style="background:#fff;border:1px solid #e8d5b0;border-radius:4px;padding:20px;text-align:center;margin:0 0 24px;">
      <p style="font-size:24px;letter-spacing:2px;font-weight:600;margin:0;color:#1a1a1a;">${kode}</p>
    </div>

    <p style="font-size:15px;line-height:1.6;margin:0 0 24px;">Koden gjelder produkter i nettbutikken og kan brukes én gang. Skriv den inn i kassen.</p>

    <p style="margin:0 0 32px;">
      <a href="https://hudbyhelseblikk.no/nettbutikk" style="display:inline-block;background:#c9a96e;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-size:15px;">Se utvalget</a>
    </p>

    <p style="font-size:15px;line-height:1.6;margin:0 0 32px;">Som medlem får du beskjed først om kampanjer og nyheter, og medlemspris på utvalgte produkter.</p>

    <hr style="border:0;border-top:1px solid #e8d5b0;margin:0 0 16px;">
    <p style="font-size:12px;line-height:1.6;color:#8a8a8a;margin:0;">
      Du får denne e-posten fordi du meldte deg inn i kundeklubben på hudbyhelseblikk.no.<br>
      <a href="https://hudbyhelseblikk.no/kundeklubb#avmelding" style="color:#8a8a8a;">Meld deg av</a> ·
      Helseblikk Hud AS · Odden 1D, 4876 Grimstad
    </p>
  </div>
</body>
</html>`;
}

export async function sendVelkomstEpost(args: {
  til: string;
  fornavn?: string;
  kode: string;
}): Promise<boolean> {
  const noekkel = process.env.RESEND_API_KEY;
  if (!noekkel) {
    console.error("Kundeklubb: RESEND_API_KEY mangler — e-post ikke sendt til", args.til);
    return false;
  }

  try {
    const resend = new Resend(noekkel);
    const { error } = await resend.emails.send({
      from: AVSENDER,
      to: args.til,
      subject: "Velkommen i kundeklubben — her er rabattkoden din",
      html: mal(args.kode, args.fornavn),
    });
    if (error) {
      console.error("Kundeklubb: Resend-feil for", args.til, error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Kundeklubb: e-postutsending kastet for", args.til, e);
    return false;
  }
}
```

- [ ] **Step 3: Koble på i ruten**

I `app/api/kundeklubb/route.ts`, legg til importen øverst:

```ts
import { sendVelkomstEpost } from "@/lib/klubb-epost";
```

Erstatt disse to linjene nær bunnen:

```ts
  // Task 4 kobler på e-postutsending her.
  console.log("Kundeklubb: opprettet medlem med kode", kode);

  return NextResponse.json({ ok: true });
```

med:

```ts
  const sendt = await sendVelkomstEpost({ til: epost, fornavn, kode });
  if (!sendt) {
    // Kunden og koden finnes — bare e-posten sviktet. Logg tydelig slik at
    // koden kan sendes for hånd.
    console.error("Kundeklubb: E-POST FEILET — send", kode, "manuelt til", epost);
  }

  return NextResponse.json({ ok: true });
```

- [ ] **Step 4: Bygg**

Run: `npm run build`
Expected: `✓ Compiled successfully`

- [ ] **Step 5: Test mot ekte innboks**

Bruk en adresse du faktisk kan lese:

```bash
curl -s -X POST localhost:3000/api/kundeklubb -H "Content-Type: application/json" \
  -d '{"fornavn":"Stian","epost":"DIN@EPOST.no","samtykkeEpost":true,"samtykkeSms":false}'
```

Kontroller i innboksen:
- E-posten kom fram, **ikke i søppelpost**
- Avsender viser «Hud by Helseblikk»
- Koden vises tydelig
- Avmeldingslenken er der
- Den ser riktig ut på mobil

- [ ] **Step 6: Rydd opp testdata i Shopify**

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json lib/klubb-epost.ts app/api/kundeklubb/route.ts
git commit -m "Kundeklubb: velkomst-e-post med rabattkode via Resend"
```

---

### Task 5: Skjemakomponenten

**Files:**
- Create: `components/KundeklubbSkjema.tsx`

**Interfaces:**
- Consumes: `POST /api/kundeklubb` fra Task 3
- Produces: `<KundeklubbSkjema variant="popup" | "side" onFerdig?={() => void} />`

- [ ] **Step 1: Skriv komponenten**

Opprett `components/KundeklubbSkjema.tsx`:

```tsx
"use client";

import { useState } from "react";

type Status = "klar" | "sender" | "ferdig" | "feil";

export default function KundeklubbSkjema({
  variant = "side",
  onFerdig,
}: {
  variant?: "popup" | "side";
  onFerdig?: () => void;
}) {
  const [fornavn, setFornavn] = useState("");
  const [epost, setEpost] = useState("");
  const [telefon, setTelefon] = useState("");
  const [samtykkeEpost, setSamtykkeEpost] = useState(false);
  const [samtykkeSms, setSamtykkeSms] = useState(false);
  const [felle, setFelle] = useState(""); // honningkrukke
  const [status, setStatus] = useState<Status>("klar");
  const [feilmelding, setFeilmelding] = useState("");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sender") return;
    setStatus("sender");
    setFeilmelding("");

    try {
      const res = await fetch("/api/kundeklubb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fornavn,
          epost,
          telefon,
          samtykkeEpost,
          samtykkeSms,
          felle,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeilmelding(data.feil ?? "Noe gikk galt. Prøv igjen.");
        setStatus("feil");
        return;
      }
      setStatus("ferdig");
      onFerdig?.();
    } catch {
      setFeilmelding("Får ikke kontakt. Sjekk nettforbindelsen og prøv igjen.");
      setStatus("feil");
    }
  }

  if (status === "ferdig") {
    return (
      <div className="text-center py-4">
        <p
          className="text-2xl mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Velkommen!
        </p>
        <p className="text-[#1a1a1a]/60 text-sm leading-relaxed">
          Rabattkoden ligger i innboksen din. Finner du den ikke, sjekk
          søppelposten.
        </p>
      </div>
    );
  }

  const kompakt = variant === "popup";

  return (
    <form onSubmit={send} className={kompakt ? "space-y-3" : "space-y-4"}>
      {/* Honningkrukke — skjult for mennesker, fylles ut av roboter */}
      <div className="absolute w-px h-px overflow-hidden -left-[9999px]" aria-hidden="true">
        <label htmlFor="kk-firma">Firma</label>
        <input
          id="kk-firma"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={felle}
          onChange={(e) => setFelle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="kk-fornavn" className="sr-only">Fornavn</label>
        <input
          id="kk-fornavn"
          type="text"
          autoComplete="given-name"
          placeholder="Fornavn (valgfritt)"
          value={fornavn}
          onChange={(e) => setFornavn(e.target.value)}
          className="w-full px-4 py-3 border border-[#e8d5b0] rounded-lg bg-white text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#c9a96e]"
        />
      </div>

      <div>
        <label htmlFor="kk-epost" className="sr-only">E-postadresse</label>
        <input
          id="kk-epost"
          type="email"
          required
          autoComplete="email"
          placeholder="E-postadresse"
          value={epost}
          onChange={(e) => setEpost(e.target.value)}
          className="w-full px-4 py-3 border border-[#e8d5b0] rounded-lg bg-white text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#c9a96e]"
        />
      </div>

      <div>
        <label htmlFor="kk-telefon" className="sr-only">Telefonnummer</label>
        <input
          id="kk-telefon"
          type="tel"
          autoComplete="tel"
          placeholder="Telefon (valgfritt)"
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
          className="w-full px-4 py-3 border border-[#e8d5b0] rounded-lg bg-white text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 focus:outline-none focus:border-[#c9a96e]"
        />
      </div>

      <label className="flex gap-3 items-start cursor-pointer">
        <input
          type="checkbox"
          checked={samtykkeEpost}
          onChange={(e) => setSamtykkeEpost(e.target.checked)}
          className="mt-1 accent-[#c9a96e]"
        />
        <span className="text-xs text-[#1a1a1a]/60 leading-relaxed">
          Ja, send meg tilbud og nyheter på e-post.
        </span>
      </label>

      <label className="flex gap-3 items-start cursor-pointer">
        <input
          type="checkbox"
          checked={samtykkeSms}
          onChange={(e) => setSamtykkeSms(e.target.checked)}
          className="mt-1 accent-[#c9a96e]"
        />
        <span className="text-xs text-[#1a1a1a]/60 leading-relaxed">
          Ja, send meg SMS om ledige timer og kampanjer.
        </span>
      </label>

      {feilmelding && (
        <p className="text-xs text-[#a33] leading-relaxed" role="alert">
          {feilmelding}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sender"}
        className="w-full px-6 py-3.5 bg-[#c9a96e] text-white text-sm tracking-wide rounded-full hover:bg-[#b8955a] transition-colors disabled:opacity-60"
      >
        {status === "sender" ? "Melder deg inn …" : "Bli medlem"}
      </button>

      <p className="text-[11px] text-[#1a1a1a]/40 leading-relaxed">
        Du kan melde deg av når som helst. Se{" "}
        <a href="/personvern" className="underline">personvernerklæringen</a>.
      </p>
    </form>
  );
}
```

- [ ] **Step 2: Bygg**

Run: `npm run build`
Expected: `✓ Compiled successfully`

- [ ] **Step 3: Commit**

```bash
git add components/KundeklubbSkjema.tsx
git commit -m "Kundeklubb: delt skjemakomponent med to adskilte samtykker"
```

---

### Task 6: Medlemssiden

Bygges før popupen, slik at popupen har et sted å lenke til.

**Files:**
- Create: `app/kundeklubb/page.tsx`
- Create: `app/kundeklubb/layout.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `KundeklubbSkjema` fra Task 5
- Produces: ruten `/kundeklubb`

- [ ] **Step 1: Se hvordan en eksisterende layout ser ut**

Run: `cat app/gavekort/page.tsx | head -40 && cat app/faq/layout.tsx`

Følg samme mønster for metadata.

- [ ] **Step 2: Skriv layouten**

Opprett `app/kundeklubb/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kundeklubb",
  description:
    "Bli medlem i kundeklubben til Hud by Helseblikk og få 10 % på ditt første produktkjøp, samt tilbud og nyheter først.",
  openGraph: {
    title: "Kundeklubb | Hud by Helseblikk",
    description:
      "Bli medlem og få 10 % på ditt første produktkjøp, tilbud og nyheter først.",
    siteName: "Hud by Helseblikk",
    url: `${SITE_URL}/kundeklubb`,
  },
  alternates: { canonical: `${SITE_URL}/kundeklubb` },
};

export default function KundeklubbLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

> Sjekk at `SITE_URL` faktisk eksporteres fra `lib/site.ts` med det navnet. Gjør den ikke det, bruk navnet som finnes der.

- [ ] **Step 3: Skriv siden**

Opprett `app/kundeklubb/page.tsx`:

```tsx
import AnimatedSection from "@/components/AnimatedSection";
import KundeklubbSkjema from "@/components/KundeklubbSkjema";
import { Sparkles, BellRing, Tag } from "lucide-react";

const fordeler = [
  {
    icon: Tag,
    tittel: "10 % på første kjøp",
    tekst: "Du får en personlig rabattkode med én gang du melder deg inn. Den gjelder produkter i nettbutikken.",
  },
  {
    icon: BellRing,
    tittel: "Beskjed om ledige timer",
    tekst: "Sier du ja til SMS, hører du fra oss når det blir en time ledig på kort varsel.",
  },
  {
    icon: Sparkles,
    tittel: "Nyheter først",
    tekst: "Du får vite om nye behandlinger, produkter og kampanjer før alle andre.",
  },
];

export default function KundeklubbPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
              For deg som vil ha mer ut av huden din
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Kundeklubben
            </h1>
            <p className="text-[#1a1a1a]/55 leading-relaxed">
              Bli medlem og få 10 % på ditt første produktkjøp — og beskjed
              først når det skjer noe hos oss.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {fordeler.map((f) => (
            <AnimatedSection key={f.tittel}>
              <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-4">
                <f.icon size={17} className="text-[#c9a96e]" />
              </div>
              <h2 className="text-lg font-normal mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                {f.tittel}
              </h2>
              <p className="text-sm text-[#1a1a1a]/55 leading-relaxed">{f.tekst}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-md mx-auto bg-[#faf9f7] border border-[#e8d5b0]/60 rounded-2xl p-8">
          <h2
            className="text-2xl font-normal mb-6 text-center"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Bli medlem
          </h2>
          <KundeklubbSkjema variant="side" />
        </div>
      </section>

      <section id="avmelding" className="pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-lg font-normal mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
            Vil du melde deg av?
          </h2>
          <p className="text-sm text-[#1a1a1a]/55 leading-relaxed">
            Alle e-poster fra oss har en avmeldingslenke nederst. Du kan også
            sende en e-post til{" "}
            <a href="mailto:hei@helseblikk.no" className="text-[#c9a96e] underline">
              hei@helseblikk.no
            </a>
            , så tar vi deg ut av listene med én gang.
          </p>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Legg siden i sitemap**

Åpne `app/sitemap.ts` og legg `/kundeklubb` inn i samme liste som de andre statiske sidene, med samme format som `/gavekort`.

- [ ] **Step 5: Bygg og se på siden**

```bash
npm run build && npm run dev
```

Åpne `localhost:3000/kundeklubb`. Kontroller på både bred skjerm og mobilbredde (390px):
- Overskriften bryter pent
- De tre fordelene stables på mobil
- Skjemaet er lesbart og knappen når kanten
- Sidetittelen i fanen viser «Kundeklubb | Hud by Helseblikk»

- [ ] **Step 6: Commit**

```bash
git add app/kundeklubb app/sitemap.ts
git commit -m "Kundeklubb: medlemsside med fordeler og påmelding"
```

---

### Task 7: Popupen

**Files:**
- Create: `components/KundeklubbPopup.tsx`
- Modify: `app/nettbutikk/page.tsx` (montere popupen)
- Modify: `app/nettbutikk/[sku]/page.tsx` (montere popupen)

**Interfaces:**
- Consumes: `KundeklubbSkjema` fra Task 5
- Produces: `<KundeklubbPopup />` — selvstyrt, tar ingen props

**Atferdskrav fra spec:**
- Utløses ved 25 sekunder ELLER 50 % scrolldybde, det som kommer først
- Lukket → skjult i 30 dager (`localStorage`)
- Innmeldt → skjult permanent
- Mobil: felt nederst, ikke modal over hele flaten
- `Esc` lukker, fokus fanges mens åpen, `prefers-reduced-motion` respekteres

- [ ] **Step 1: Skriv komponenten**

Opprett `components/KundeklubbPopup.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import KundeklubbSkjema from "@/components/KundeklubbSkjema";

const NOKKEL = "kundeklubb-popup";
const DAGER_SKJULT = 30;
const SEKUNDER_FOR_VISNING = 25;
const SCROLL_TERSKEL = 0.5;

function skalSkjules(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const lagret = window.localStorage.getItem(NOKKEL);
    if (!lagret) return false;
    if (lagret === "medlem") return true;
    const til = Number(lagret);
    return Number.isFinite(til) && til > Date.now();
  } catch {
    return true; // localStorage blokkert — la være å mase
  }
}

function husk(verdi: "medlem" | "lukket") {
  try {
    window.localStorage.setItem(
      NOKKEL,
      verdi === "medlem"
        ? "medlem"
        : String(Date.now() + DAGER_SKJULT * 24 * 60 * 60 * 1000)
    );
  } catch {
    /* ignorer */
  }
}

export default function KundeklubbPopup() {
  const [aapen, setAapen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduserBevegelse = useReducedMotion();

  useEffect(() => {
    if (skalSkjules()) return;

    let vist = false;
    const vis = () => {
      if (vist) return;
      vist = true;
      setAapen(true);
      window.removeEventListener("scroll", vedScroll);
      clearTimeout(timer);
    };

    const vedScroll = () => {
      const hoyde = document.documentElement.scrollHeight - window.innerHeight;
      if (hoyde <= 0) return;
      if (window.scrollY / hoyde >= SCROLL_TERSKEL) vis();
    };

    const timer = setTimeout(vis, SEKUNDER_FOR_VISNING * 1000);
    window.addEventListener("scroll", vedScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", vedScroll);
    };
  }, []);

  // Esc lukker, og fokus flyttes inn i panelet når det åpnes
  useEffect(() => {
    if (!aapen) return;
    const vedTast = (e: KeyboardEvent) => {
      if (e.key === "Escape") lukk();
    };
    window.addEventListener("keydown", vedTast);
    panelRef.current?.querySelector<HTMLElement>("input, button")?.focus();
    return () => window.removeEventListener("keydown", vedTast);
  }, [aapen]);

  function lukk() {
    husk("lukket");
    setAapen(false);
  }

  function bleMedlem() {
    husk("medlem");
    setTimeout(() => setAapen(false), 4000);
  }

  return (
    <AnimatePresence>
      {aapen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduserBevegelse ? 0 : 0.3 }}
            onClick={lukk}
            className="fixed inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm z-[70]"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="kk-tittel"
            initial={reduserBevegelse ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduserBevegelse ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: reduserBevegelse ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[80] bg-white shadow-xl
                       inset-x-0 bottom-0 rounded-t-2xl p-6 pb-8
                       md:inset-auto md:bottom-auto md:top-1/2 md:left-1/2
                       md:-translate-x-1/2 md:-translate-y-1/2
                       md:w-[26rem] md:rounded-2xl md:p-8"
          >
            <button
              onClick={lukk}
              aria-label="Lukk"
              className="absolute top-4 right-4 p-2 text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors"
            >
              <X size={18} />
            </button>

            <p className="text-[10px] tracking-[0.25em] uppercase text-[#c9a96e] mb-3">
              Kundeklubben
            </p>
            <h2
              id="kk-tittel"
              className="text-2xl leading-tight mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Få 10 % på ditt første kjøp
            </h2>
            <p className="text-sm text-[#1a1a1a]/55 leading-relaxed mb-6">
              Bli medlem, så sender vi rabattkoden på e-post — og du hører fra
              oss først når det skjer noe hos oss.
            </p>

            <KundeklubbSkjema variant="popup" onFerdig={bleMedlem} />

            <p className="text-[11px] text-[#1a1a1a]/40 text-center mt-4">
              <a href="/kundeklubb" className="underline">Les mer om klubben</a>
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Monter popupen i nettbutikken**

I `app/nettbutikk/page.tsx`, legg til importen:

```tsx
import KundeklubbPopup from "@/components/KundeklubbPopup";
```

og plasser `<KundeklubbPopup />` som siste element før den avsluttende fragmenten/`</>`.

Gjør det samme i `app/nettbutikk/[sku]/page.tsx`.

> Er `app/nettbutikk/[sku]/page.tsx` en serverkomponent, går det likevel fint — `KundeklubbPopup` har `"use client"` og kan monteres fra en serverkomponent.

- [ ] **Step 3: Bygg**

Run: `npm run build`
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Test terskelen**

```bash
npm run dev
```

Åpne `localhost:3000/nettbutikk` i et privat vindu.

- Popupen skal **ikke** vises med én gang
- Scroll halvveis ned → den skal komme
- Last på nytt uten å scrolle, vent 25 sekunder → den skal komme

- [ ] **Step 5: Test frekvensen**

- Lukk popupen, last siden på nytt, scroll ned → den skal **ikke** komme igjen
- I nettleserkonsollen: `localStorage.removeItem("kundeklubb-popup")` → den skal komme tilbake

- [ ] **Step 6: Test mobil og tastatur**

- Sett vindusbredden til 390px: panelet skal ligge nederst, ikke midt på
- Trykk `Esc`: panelet skal lukkes
- Naviger med Tab: fokus skal være synlig på feltene

- [ ] **Step 7: Commit**

```bash
git add components/KundeklubbPopup.tsx app/nettbutikk/page.tsx "app/nettbutikk/[sku]/page.tsx"
git commit -m "Kundeklubb: popup i nettbutikken med terskel og frekvensstyring"
```

---

### Task 8: Personvernerklæringen

Lovpålagt. Uten dette er samtykket ikke informert.

**Files:**
- Modify: `app/personvern/page.tsx`

**Interfaces:**
- Consumes: ingenting
- Produces: ingenting

- [ ] **Step 1: Les den eksisterende siden**

Run: `cat app/personvern/page.tsx`

Finn mønsteret som brukes for avsnitt og overskrifter.

- [ ] **Step 2: Legg til et avsnitt om kundeklubben**

Følg sidens eksisterende struktur, og dekk disse punktene:

- **Hva vi lagrer:** navn (valgfritt), e-postadresse, telefonnummer (valgfritt), og hva du har samtykket til
- **Hvorfor:** for å sende deg tilbud, nyheter og beskjed om ledige timer
- **Hvor:** i Shopify, som er databehandler for nettbutikken vår
- **Hvor lenge:** til du melder deg av
- **Din rett:** du kan når som helst trekke samtykket, be om innsyn eller be om sletting — kontakt hei@helseblikk.no
- **Grunnlaget:** samtykke

- [ ] **Step 3: Bygg**

Run: `npm run build`
Expected: `✓ Compiled successfully`

- [ ] **Step 4: Commit**

```bash
git add app/personvern/page.tsx
git commit -m "Personvern: avsnitt om kundeklubben"
```

---

### Task 9: Verifisering i produksjon

**Files:** ingen

- [ ] **Step 1: Deploy**

```bash
git push origin main
gh run list --repo stianlauritz-creator/hudbyhelseblikk --limit 1
```

Vent til statusen er `completed / success`.

- [ ] **Step 2: Meld deg inn på ekte**

Gå til hudbyhelseblikk.no/kundeklubb og meld deg inn med en adresse du kan lese.

- [ ] **Step 3: Kontroller hele kjeden**

- E-posten kom fram, ikke i søppelpost
- Kunden ligger i Shopify med taggen `kundeklubb` og riktig samtykke per kanal
- Rabattkoden finnes under Rabatter, 10 %, én gangs bruk

- [ ] **Step 4: Test koden i kassen — begge veier**

- Legg et **produkt** i kurven, bruk koden: skal gi 10 % avslag
- Tøm kurven, legg et **gavekort** i kurven, bruk koden: **skal avvises**

Dette er den viktigste enkelttesten i planen. Går gavekortet gjennom med rabatt, er samlingen fra forutsetning A satt opp feil.

- [ ] **Step 5: Test at koden er engangs**

Fullfør et kjøp med koden (eller marker den brukt), og prøv den på nytt: skal avvises.

- [ ] **Step 6: Rydd opp**

Slett testkunde, testkode og eventuell testordre i Shopify.

- [ ] **Step 7: Oppdater minnet**

Skriv til `~/.claude/projects/-Users-stianmini/memory/helseblikk-hud-nettbutikk.md` at kundeklubben er live, hvor medlemslista bor, og at Timma-broen er en kvartalsvis manuell CSV-jobb.
