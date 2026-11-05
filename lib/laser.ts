// Innholdet på /laser — Candela GentleMAX Pro Plus, i drift i klinikken fra
// november 2026 (erstatter Fotona-laseren som gikk ut i august).
//
// KILDER (sjekket 07.10.2026): Candelas brosjyre PU07645EN Rev.102 (2024),
// FDA-klarering K201111 og American Academy of Dermatology. To feller i
// klinikkens egne kalkyler som IKKE skal inn her:
//  - Største spot er 26 mm, ikke «27 mm, størst i markedet».
//  - Akne er ikke en godkjent indikasjon. Ikke lov aknebehandling.
//  - Pigmentflekker står i Candelas brosjyre, men Christina og leverandøren
//    (Frode) bruker den kun til hårfjerning og vaskulært. Tatt ut 08.10.2026
//    etter beskjed fra Stian — ikke markedsfør pigment på laseren.
//
// PRISENE er hentet fra Timma 05.11.2026 (kategorien «Hårfjerning»), som er
// fasit. Endres de i Timma, må de rettes her, i app/behandlinger/page.tsx og
// app/prisliste/page.tsx. Blodkar har ingen priser i Timma ennå — siden sier
// «pris etter konsultasjon» til kategorien «Fjerning av synlige blodkar» får
// tjenester.
//
// KAMPANJEN (50 % på første behandling i november) er lagt inn i Timma av
// Christina. Avsluttes ved å sette `aktiv: false` under — den forsvinner da
// fra /laser, forsiden, /behandlinger, /prisliste og /kampanjer samtidig.

/** Satt til false 05.11.2026 — laseren er i drift og timene er åpne. */
export const LASER_KOMMER_SNART = false;

export const LASER_NAVN = "Candela GentleMAX Pro Plus";

/** Beholdes for historikk; brukes ikke når LASER_KOMMER_SNART er false. */
export const VENTELISTE_HREF =
  "mailto:hei@hudbyhelseblikk.no" +
  "?subject=" +
  encodeURIComponent("Venteliste laser") +
  "&body=" +
  encodeURIComponent(
    "Hei!\n\nJeg vil gjerne få beskjed når laseren er i drift.\n\nJeg er interessert i (f.eks. hårfjerning legger, blodkar i ansiktet):\n\nNavn:\nTelefon:\n"
  );

export const LASER_KAMPANJE = {
  aktiv: true,
  merkelapp: "Ut november",
  tittel: "50 % på første laserbehandling",
  kort: "Book i november og få halv pris på første hårfjerning med laser.",
  vilkar: [
    "Timen må bookes i november 2026",
    "Gjelder første laserbehandling med hårfjerning — ett område eller én pakke",
    "Behandlingen må gjennomføres i løpet av 2026",
    "Rabatten trekkes fra når du betaler i klinikken",
  ],
};

export const LASER_KONSULTASJON = {
  navn: "Konsultasjon laser",
  pris: "490,-",
  note: "Trekkes fra ved gjennomført laserbehandling",
};

export interface LaserPris {
  navn: string;
  pris: string;
  /** Flere områder til én pris — merkes «Pakkepris» */
  pakke?: boolean;
}

export interface LaserPrisgruppe {
  tittel: string;
  priser: LaserPris[];
}

/** Hårfjerning per behandling. Rekkefølge og navn som i Timma. */
export const LASER_PRISER: LaserPrisgruppe[] = [
  {
    tittel: "Ansikt og hals",
    priser: [
      { navn: "Overleppe", pris: "690,-" },
      { navn: "Hake", pris: "690,-" },
      { navn: "Overleppe og hake", pris: "990,-", pakke: true },
      { navn: "Kinn", pris: "990,-" },
      { navn: "Hele ansiktet", pris: "1.290,-" },
      { navn: "Hals eller nakke", pris: "990,-" },
      { navn: "Skjegglinje, hals og nakke", pris: "1.790,-", pakke: true },
    ],
  },
  {
    tittel: "Armer",
    priser: [
      { navn: "Armhuler", pris: "790,-" },
      { navn: "Over- eller underarmer", pris: "1.190,-" },
      { navn: "Hele armer", pris: "1.790,-" },
    ],
  },
  {
    tittel: "Overkropp og rygg",
    priser: [
      { navn: "Bryst", pris: "1.390,-" },
      { navn: "Mage", pris: "1.390,-" },
      { navn: "Bryst og mage", pris: "2.190,-", pakke: true },
      { navn: "Halv rygg", pris: "1.390,-" },
      { navn: "Hel rygg", pris: "2.290,-" },
    ],
  },
  {
    tittel: "Intim",
    priser: [
      { navn: "Bikinilinje", pris: "990,-" },
      { navn: "Brasiliansk", pris: "1.390,-" },
      { navn: "Manzilian", pris: "1.490,-" },
      { navn: "Rumpe", pris: "1.390,-" },
      { navn: "Armhuler og brasiliansk", pris: "1.790,-", pakke: true },
      { navn: "Armhuler, brasiliansk og legger", pris: "2.790,-", pakke: true },
    ],
  },
  {
    tittel: "Ben",
    priser: [
      { navn: "Legger", pris: "1.490,-" },
      { navn: "Lår", pris: "1.890,-" },
      { navn: "Legger og lår", pris: "2.790,-", pakke: true },
    ],
  },
];

/** Laveste pris på ett område — brukes i «Fra …»-tekster. */
export const LASER_FRA_PRIS = "690,-";

export const NOKKELTALL = [
  { verdi: "2", enhet: "bølgelengder", tekst: "755 nm alexandrit og 1064 nm Nd:YAG i samme maskin" },
  { verdi: "26", enhet: "mm", tekst: "Største behandlingsflate — store områder går raskt" },
  { verdi: "I–VI", enhet: "hudtyper", tekst: "Fra lys til mørk hud, med riktig bølgelengde" },
  { verdi: "DCD", enhet: "kjøling", tekst: "Kjølespray på huden før hvert eneste laserskudd" },
];

export const BEHANDLINGSOMRADER = [
  {
    id: "harfjerning",
    tittel: "Varig hårreduksjon",
    pris: `Fra ${LASER_FRA_PRIS}`,
    ingress:
      "Hovedgrunnen til at vi har valgt GentleMAX Pro Plus. Laserlyset tas opp av pigmentet i håret og ødelegger hårsekken. Mange hår slutter helt å vokse, og de som kommer tilbake, blir tynnere og lysere.",
    punkter: [
      "Ansikt og kropp",
      "Fra mørke og tykke hår til lysere og tynnere — eller ingen",
      "Slutt på barbering, voks og inngrodde hår",
      "Kur på flere behandlinger, deretter vedlikehold ved behov",
    ],
  },
  {
    id: "blodkar",
    tittel: "Blodkar og rødhet",
    pris: "Pris etter konsultasjon",
    ingress:
      "Maskinen behandler synlige blodkar presist, uten å skade huden rundt. Laserlyset tas opp av blodet i karet, som lukker seg og gradvis brytes ned av kroppen.",
    punkter: ["Sprengte blodkar i ansiktet", "Rødhet ved rosacea", "Edderkoppårer på bena", "Angiomer og små blodkarsvulster"],
  },
];

export const HVORFOR = [
  {
    tittel: "Riktig laser for din hud",
    tekst:
      "Alexandrit (755 nm) er svært effektiv på lys til middels hud. Nd:YAG (1064 nm) går dypere og er tryggere på mørk og solbrun hud. Vi velger bølgelengde etter huden din.",
  },
  {
    tittel: "Kjøling før hvert skudd",
    tekst:
      "Candelas DCD-system sender et kort kaldt sprut mot huden millisekunder før laserpulsen. Det beskytter overhuden og gjør behandlingen langt mer behagelig enn mange forventer.",
  },
  {
    tittel: "Raskt, også på store flater",
    tekst:
      "Med behandlingsflater på opptil 26 mm og opptil ti skudd i sekundet går store områder som ben og rygg mye raskere enn med eldre lasere. Kortere tid på benken, samme presisjon.",
  },
  {
    tittel: "Medisinsk ansvar",
    tekst:
      "Behandlingene skjer i en medisinsk klinikk med lege Débora Dias De Oliveira som medisinsk ansvarlig. Alle behandlinger starter med en konsultasjon, og er vi i tvil om noe i huden din, ser legen på det først.",
  },
];

// Før-rådene følger teksten Christina har lagt inn i Timma («Info før
// behandling»): selvbruning to uker, voks/napping fire uker, barbering 1–2
// dager før.
export const FORLOP = [
  {
    tittel: "Før",
    tekst:
      "Vi starter med en konsultasjon der vi ser på hud og hår og legger en plan. Ingen sol eller solarium på området, og ingen brun-uten-sol de siste to ukene. Ikke napp eller voks de siste fire ukene — barbering går fint, og du barberer deg én til to dager før.",
  },
  {
    tittel: "Under",
    tekst:
      "Du har på deg beskyttelsesbriller. De fleste beskriver hvert skudd som et lite knips fra en strikk, dempet av kjølesprayen. Et lite område som overleppen tar noen minutter, legger rundt en halvtime.",
  },
  {
    tittel: "Etter",
    tekst:
      "Litt rødhet og små hevelser rundt hårsekkene er normalt og går over i løpet av timer til et døgn. Du kan gå rett tilbake til hverdagen. Bruk solkrem med høy faktor, og hold behandlet hud unna sol mellom behandlingene.",
  },
];

export const PASSER_FOR = [
  "Deg med mørkt hår du er lei av å barbere, vokse eller nappe",
  "Deg som får inngrodde hår og barberingskviser",
  "Deg med synlige blodkar eller rødhet i ansiktet",
  "Deg med edderkoppårer på bena",
  "Alle hudtyper — også mørk hud, med riktig bølgelengde",
];

export const PASSER_IKKE_FOR = [
  "Lyst, hvitt, grått eller rødt hår — laseren trenger pigment i håret for å virke",
  "Deg som er gravid eller ammer",
  "Nylig solbrent eller solbrun hud — vi venter til fargen har lagt seg",
  "Deg som bruker eller nylig har brukt isotretinoin (f.eks. Roaccutan), tetrasykliner eller andre lysfølsomme medisiner",
  "Deg som er under kreftbehandling",
  "Aktiv infeksjon eller herpesutbrudd i området",
];

export const FAQ = [
  {
    q: "Hva koster laserhårfjerning?",
    a: `Prisen avhenger av området. Overleppe eller hake koster ${LASER_FRA_PRIS} per behandling, armhuler 790,-, legger 1.490,- og hele ansiktet 1.290,-. Flere områder sammen får pakkepris — for eksempel legger og lår 2.790,-. Hele prislisten står på denne siden.`,
  },
  {
    q: "Hvordan bestiller jeg?",
    a: "Du bestiller time direkte i timeboken vår — velg «Hårfjerning» og området du vil behandle. Er du usikker på om laser passer for deg, book en konsultasjon til 490,- først. Den trekkes fra når du gjennomfører behandling.",
  },
  {
    q: "Hva betyr 50 % på første behandling?",
    a: "Booker du time i november 2026, får du halv pris på den første laserbehandlingen med hårfjerning. Rabatten gjelder ett område eller én pakke, trekkes fra når du betaler i klinikken, og behandlingen må gjennomføres i løpet av 2026.",
  },
  {
    q: "Hvor mange behandlinger trenger jeg for hårfjerning?",
    a: "De fleste trenger rundt 6–8 behandlinger. I ansiktet tar vi dem gjerne med 4–6 ukers mellomrom, på kroppen 6–8 uker. Hår vokser i sykluser, og laseren treffer bare hårene som er i vekstfasen — derfor trengs flere runder. Noen trenger en oppfriskning etter et år eller to.",
  },
  {
    q: "Er det varig?",
    a: "Laserhårfjerning gir varig hårreduksjon: håret som kommer tilbake er færre, tynnere og lysere. Mange blir tilnærmet hårfrie i området, men ingen seriøs klinikk kan love at hvert eneste hårstrå forsvinner for alltid.",
  },
  {
    q: "Gjør det vondt?",
    a: "Det stikker litt, som et knips fra en strikk. Kjølesprayen som kommer rett før hvert skudd gjør stor forskjell, og de fleste synes det er overkommelig — også i ømme områder.",
  },
  {
    q: "Virker det på lyst eller grått hår?",
    a: "Nei, dessverre. Laseren treffer pigmentet i håret, og hvitt, grått, lyst og rødt hår har for lite av det. Det gjelder alle hårfjerningslasere, ikke bare denne. Er du usikker, ser vi på det i konsultasjonen.",
  },
  {
    q: "Kan jeg ta laser med mørk hud?",
    a: "Ja. Det er nettopp derfor vi har valgt en maskin med to bølgelengder. Nd:YAG-laseren (1064 nm) går forbi pigmentet i overhuden og er det trygge valget for mørk og solbrun hud.",
  },
  {
    q: "Hva koster behandling av blodkar?",
    a: "Blodkar og rødhet prises etter hva som skal behandles, så vi setter prisen i konsultasjonen. Book «Konsultasjon laser» til 490,-, så ser vi på området sammen og legger en plan. Konsultasjonen trekkes fra når du gjennomfører behandling.",
  },
  {
    q: "Kan dere ta pigmentflekker med laseren?",
    a: "Vi bruker laseren til hårfjerning og blodkar — det er det den er best på, og det vi har valgt den for. Solflekker og ujevn pigmentering hjelper vi deg med på andre måter: kjemisk peeling og medisinsk hudpleie fra ZO gir gode resultater. Book en hudkonsultasjon, så legger vi en plan.",
  },
  {
    q: "Kan jeg sole meg mellom behandlingene?",
    a: "Hold det behandlede området unna sol, og bruk solkrem med høy faktor. Solbrun hud gir høyere risiko for pigmentforandringer, og da må vi senke energien eller vente.",
  },
  {
    q: "Er det samme laser som dere hadde før?",
    a: "Nei. GentleMAX Pro Plus er en ny maskin fra Candela, bygd spesielt for hårfjerning og blodkar. Den har to bølgelengder, kjøling før hvert skudd og større behandlingsflater — altså raskere og mer skånsomme behandlinger.",
  },
].filter((f) => LASER_KAMPANJE.aktiv || !f.q.includes("50 %"));
