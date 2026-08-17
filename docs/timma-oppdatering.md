# Timma — hva som må endres for å matche nettsiden

Oppdatert 17.08.2026, etter innspill fra Mabel og Christina.

Nettsiden er nå oppdatert. Timma må endres manuelt i admin
(<https://pro.timma.no> → Innstillinger), fordi Timma ikke har et API vi kan
skrive til. Denne lista er ment å kunne følges rett ovenfra og ned.

---

## 1. Rekkefølge på tjenestekategoriene

Kategoriene i timeboken skal stå i samme rekkefølge som på nettsiden:

1. **Konsultasjon**
2. **Vipper & Bryn**
3. **Hudbehandlinger**
4. **Injeksjonsbehandlinger**
   - Medisinsk rynkebehandling
   - Filler

_Timma → Innstillinger → Tjenester → dra kategoriene i ønsket rekkefølge._

---

## 2. Tjenester og priser — skal være identisk med nettsiden

### Konsultasjon

| Tjeneste | Pris |
| --- | --- |
| Hudkonsultasjon | 490,- |

Beskrivelse i Timma bør si: _«Beløpet trekkes fra ved gjennomført behandling
eller produktkjøp over 1.500,-.»_

### Vipper & Bryn

| Tjeneste | Pris |
| --- | --- |
| Farging/forming vipper og bryn inkl. voks | 690,- |
| Brynslaminering inkl. farge, forming og voks | 890,- |
| Farging og forming bryn inkl. voks | 590,- |
| Farging vipper | 290,- |

### Hudbehandlinger

| Tjeneste | Pris |
| --- | --- |
| Kjemisk peeling | 1.500,- – 2.000,- |
| Microneedling (Dermapen) | Fra 2.690,- |
| Mesoterapi | Fra 1.900,- |

Kjemisk peeling: legg inn som ett prisintervall, ikke én oppføring per
peelingtype — prisen settes etter hud og ønske.

### Injeksjonsbehandlinger → Medisinsk rynkebehandling

| Tjeneste | Pris |
| --- | --- |
| Lite område | 1.400,- |
| 1 område | 2.000,- |
| 2 områder | 3.400,- |
| 3 områder | 4.300,- |
| Anspent kjeve / tanngnissing | 3.600,- |
| Svettebehandling | 4.600,- |

### Injeksjonsbehandlinger → Filler

| Tjeneste | Pris |
| --- | --- |
| Leppebehandling | 2.400,- – 3.400,- |
| Volumbehandling | 3.600,- |
| Skinbooster 1 ml | 2.900,- |
| Skinbooster 2 ml | 5.200,- |
| Fjerning av filler | 1.500,- |

**Merk:** kategorien skal hete **Filler** — ikke «Restylane». Preparatnavn
skal ikke stå i tjenestenavnet.

---

## 3. Skal fjernes fra Timma

- **Alle laserbehandlinger** — aknebehandling (Nd:YAG), blodkarbehandling,
  hårfjerning, lipplaser/leppelaser, øyelokk-laser, rosacea-behandling.
  Utstyret er ikke i klinikken.
- **PRP-behandling** — tas ut inntil videre.

Tips: arkiver/deaktiver tjenestene i stedet for å slette dem, så beholdes
historikken på tidligere bookinger.

---

## 4. Utseende

- **Font:** Timma tilbyr et begrenset utvalg. Nettsiden bruker Playfair
  Display (overskrifter) og en nøytral grotesk (brødtekst). Velg den enkleste
  serif-/sans-serif-varianten Timma har, og **ikke fet skrift**.
  _Innstillinger → Nettbooking → Utseende._
- **Bilde av Christina og Mabel:** byttes ut. Bruk de samme portrettene som
  ligger på nettsiden — begge er nå i sort/hvitt:
  - `public/mabel.jpg` (portrett) / `public/mabel-avatar.jpg` (tett utsnitt)
  - `public/christina-portrett.jpg`

---

## 5. Behandlere

- **Mabel må gjøres tilgjengelig for booking.** Hun ligger inne i systemet
  (Timma-ID `6a6d006f6c90d51876177b74`) og nettsiden lenker allerede til
  `?behandler=mabel`, men hun kommer ikke opp som valgbar.
  _Innstillinger → Ansatte → Mabel → aktiver for nettbooking, og huk av
  hvilke tjenester hun skal kunne bookes på._
- **Mabel mangler tittel under navnet.** Skal stå:
  **Kosmetisk dermatologisk sykepleier**
  (Christina: **Kosmetisk sykepleier**)

---

## 6. Kontakt

E-postadressen er endret til **hei@hudbyhelseblikk.no** på hele nettsiden.
Den må endres tilsvarende i Timma (bekreftelses- og påminnelses-e-poster,
samt kontaktinfo i bookingvinduet).
