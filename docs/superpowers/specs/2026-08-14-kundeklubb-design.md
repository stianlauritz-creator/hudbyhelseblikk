# Kundeklubb for Hud By Helseblikk — design

**Dato:** 2026-08-14
**Status:** Til godkjenning

## Formål

Fange opp interesserte som ennå ikke har bestilt time — nettbutikk-kunder og
nettsidebesøkende — i en medlemsliste klinikken kan markedsføre mot. Lokkemiddel:
10 % rabatt på første produktkjøp.

To formål ble prioritert av klinikken: fylle ledige timer på kort varsel, og gi
medlemsfordeler.

## Beslutning: hvor klubben bor

**Shopify er fasit for medlemslista. Timma beholder timeboka og last-minute-SMS.**

Begrunnelse: Timma har allerede et fullverdig kampanjeverktøy (SMS + e-post,
segmentering på behandling og dato, samtykke per kunde), men **kan ikke ta imot
påmeldinger automatisk** — kunderegisteret har kun regnearkimport som behandles
manuelt av Timmas supportteam, og det finnes ikke noe åpent API. Shopify har
Admin API og kan ta imot en påmelding i det øyeblikket den skjer.

Arbeidsdelingen følger hvem folk er:

| | Register | Kanal | Verktøy | Bygges? |
|---|---|---|---|---|
| Har vært hos oss | Timma | SMS, last-minute | Timmas kampanjeverktøy | Nei — finnes |
| Har ikke booket ennå | Shopify | E-post, medlemsrabatt | Shopify + denne appen | Ja |

**Bro mellom systemene:** kvartalsvis CSV-eksport fra Shopify, importeres i Timma.
Timmas eksport/import bærer feltet «markedsføringstillatelser», så samtykket følger
kunden. Manuelt arbeid, ca. 10 min × 4 i året.

**Klaviyo utsettes.** Ville betydd å betale for kampanjeverktøy to steder siden
Timmas er inkludert. Fordi medlemsdataene ligger i Shopify, er overgangen til
Klaviyo senere smertefri — Klaviyo leser Shopify-kunder direkte.

## Omfang

Det som bygges er **ett påmeldingsskjema med tilhørende rabattmekanikk**. Alt
kampanjeutsendelse skjer i eksisterende verktøy (Shopify Email, Timma).

### Inngår
- Popup i nettbutikken (`/nettbutikk` og produktsider)
- API-endepunkt som oppretter Shopify-kunde med samtykke og unik rabattkode
- Velkomst-e-post med koden
- Medlemsside (`/kundeklubb`) som forklarer fordelene
- Oppdatert personvernerklæring

### Inngår ikke
- Utsending av kampanjer (gjøres i Shopify Email / Timma)
- SMS-utsending (gjøres i Timma)
- Automatisk synk Shopify ↔ Timma (manuell CSV, se over)
- Medlemsrabatt på behandlinger (se juridisk forbehold)

## Komponenter

### 1. Popup (`components/KundeklubbPopup.tsx`)

Klientkomponent, vises kun i nettbutikken.

**Utløser:** 25 sekunder på siden ELLER 50 % scrolldybde — det som inntreffer
først. Aldri før dette. Begrunnelse: popup før besøkende har sett innhold er både
en konverteringsdreper og noe Google straffer på mobil.

**Frekvens:** lukket → skjult i 30 dager. Meldt inn → skjult permanent. Lagres i
`localStorage` (funksjonell lagring, krever ikke samtykke).

**Mobil:** legger seg som et felt nederst på skjermen, ikke modal over hele flaten.
Må kunne lukkes med både X og swipe.

**Tilgjengelighet:** fokusfelle mens åpen, `Esc` lukker, `aria-modal`,
`prefers-reduced-motion` respekteres.

### 2. Skjemafelter

| Felt | Påkrevd | Merknad |
|---|---|---|
| Fornavn | Nei | Brukes til personlig tiltale i e-post |
| E-post | Ja | Nøkkelen; koden sendes hit |
| Telefon | Nei | Påkrevd telefon halverer typisk påmeldinger |
| Samtykke e-post | Ja for innmelding | Egen boks, tom fra start |
| Samtykke SMS | Nei | Egen boks, tom fra start |

To adskilte samtykker er ikke pynt: markedsføringsloven § 15 krever forhåndssamtykke
for e-post og SMS, og at klinikken kan dokumentere hva hver enkelt sa ja til.
Forhåndsavkryssede bokser er ugyldig samtykke.

### 3. API (`app/api/kundeklubb/route.ts`)

`POST` med `{ fornavn?, epost, telefon?, samtykkeEpost, samtykkeSms }`.

Sekvens:
1. Valider input; avvis uten `samtykkeEpost`
2. Honeypot-felt + enkel ratebegrensning per IP (skjemaet skriver til Shopify)
3. `customerCreate` i Shopify Admin API med `emailMarketingConsent` og
   `smsMarketingConsent` satt hver for seg, tag `kundeklubb`
4. Finnes kunden alt: ikke lag ny kode — send e-post om at hun allerede er medlem
5. `discountCodeBasicCreate`: unik kode, 10 %, én gangs bruk, kun produkter,
   **gavekort ekskludert**
6. Send velkomst-e-post med koden
7. Returner suksess uten å lekke om kunden fantes fra før

Feilhåndtering: enhver feil mot Shopify eller e-post logges og gir brukeren en
nøytral feilmelding med oppfordring om å prøve igjen. Påmeldingen skal aldri
«forsvinne i stillhet» — er kunden opprettet men koden feiler, skal det logges
tydelig slik at koden kan sendes manuelt.

### 4. Rabattkoden

Unik per medlem, valgt av klinikken. Egenskaper:
- 10 % avslag
- Gyldig én gang, én kunde
- Gjelder **kun produkter** — gavekort ekskludert eksplisitt
- Ingen utløpsdato
- Kodeformat: `KLUBB-XXXXXX` (seks tegn, ikke gjettbart)

Gavekort-sperren er kritisk: uten den kan et gavekort på 5 000 kjøpes med 10 %
avslag, altså penger solgt med rabatt.

### 5. Velkomst-e-post

Sendes fra egen avsenderadresse på `hudbyhelseblikk.no`. Innhold: koden, hva
klubben gir, lenke til nettbutikken, og **avmeldingslenke** (lovpålagt i enhver
markedsføringshenvendelse).

**Avhengighet:** e-posttjeneste med verifisert avsenderdomene. Valgt løsning er
**Resend** — enkelt API, gratis opp til ca. 3 000 e-poster i måneden, som er godt
over behovet. Krever tre DNS-oppføringer hos one.com (SPF, DKIM, retur-sti) for
avsenderdomenet. Dette er en forutsetning som må på plass før funksjonen kan gå
live; uten verifisert domene havner velkomst-e-posten i søppelpost.

### 6. Medlemsside (`/kundeklubb`)

Kort side: hva klubben er, hvilke fordeler den gir, påmeldingsskjema (samme
felter som popupen), lenke til personvern. Popupen lenker hit, og siden kan
deles fra Instagram.

### 7. Personvern

`/personvern` må utvides med: hvilke opplysninger som samles, formålet, at
lagringen skjer i Shopify, hvor lenge de lagres, og retten til å trekke samtykket.

## Juridisk forbehold — må avklares av klinikken

Markedsføring av kosmetiske inngrep er strengere regulert enn vanlig varehandel,
og reglene rammer markedsføring som spiller på kroppspress.

- **Trygg grunn:** medlemsfordeler på hudpleieprodukter og hudbehandlinger.
- **Må avklares først:** rabatt- eller kampanjetilbud på injeksjonsbehandlinger
  (filler, muskelavslappende). Klinikken må selv sjekke forskrift om markedsføring
  av kosmetiske inngrep før slike tilbud sendes.

Designet legger derfor rabatten på **produkter**, ikke behandlinger.

## Forutsetninger før bygging

1. **Shopify Admin API-nøkkel** (custom app) med rettighetene `write_customers`,
   `write_discounts`, `read_products`. Dagens Storefront-nøkkel kan kun lese
   produkter.
2. **E-postavsender** med verifisert domene (DNS hos one.com).
3. Klinikken bekrefter rabattens omfang: 10 %, kun produkter, gavekort unntatt.

## Testing

- API-ruten testes mot Shopify med testkunde: opprettes kunden, settes begge
  samtykker riktig, blir koden unik og engangs?
- Dobbel innmelding med samme e-post skal ikke gi to koder
- Koden skal avvises på gavekort i kassen — verifiseres i faktisk kasse
- Popup: utløser ikke før terskel, husker avvisning, vises ikke etter innmelding
- Mobil og tastaturnavigasjon

## Åpne spørsmål

Ingen. Alle valg er tatt.
