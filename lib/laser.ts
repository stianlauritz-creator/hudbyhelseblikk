// Innholdet på /laser — Candela GentleMAX Pro Plus, som kommer til klinikken
// høsten 2026 (erstatter Fotona-laseren som gikk ut i august).
//
// KILDER (sjekket 07.10.2026): Candelas brosjyre PU07645EN Rev.102 (2024),
// FDA-klarering K201111 og American Academy of Dermatology. To feller i
// klinikkens egne kalkyler som IKKE skal inn her:
//  - Største spot er 26 mm, ikke «27 mm, størst i markedet».
//  - Akne er ikke en godkjent indikasjon. Ikke lov aknebehandling.
// Priser er ikke satt ennå — siden sier bevisst «kommer når vi åpner».
//
// NÅR LASEREN ER I DRIFT: sett LASER_KOMMER_SNART = false, legg inn priser og
// bytt ventelisteknappen til booking. Teaserne på forsiden og /behandlinger
// forsvinner da av seg selv.

export const LASER_KOMMER_SNART = true;

export const LASER_NAVN = "Candela GentleMAX Pro Plus";

export const VENTELISTE_HREF =
  "mailto:hei@hudbyhelseblikk.no" +
  "?subject=" +
  encodeURIComponent("Venteliste laser") +
  "&body=" +
  encodeURIComponent(
    "Hei!\n\nJeg vil gjerne få beskjed når laseren er i drift.\n\nJeg er interessert i (f.eks. hårfjerning legger, blodkar i ansiktet):\n\nNavn:\nTelefon:\n"
  );

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
    ingress:
      "Hovedgrunnen til at vi har valgt GentleMAX Pro Plus. Laserlyset tas opp av pigmentet i hårsekken og svekker den, slik at håret vokser tilbake tynnere og glissere — og etter en kur, langt på vei ikke i det hele tatt.",
    punkter: ["Ansikt og overleppe", "Armhuler og bikinilinje", "Legger og hele ben", "Rygg, bryst og skjegglinje"],
  },
  {
    id: "blodkar",
    tittel: "Blodkar og rødhet",
    ingress:
      "Med det vaskulære håndstykket kan vi behandle synlige blodkar presist, uten å skade huden rundt. Den lange bølgelengden når også dypere kar enn mange andre lasere.",
    punkter: ["Sprengte blodkar i ansiktet", "Rødhet ved rosacea", "Edderkoppårer på bena", "Angiomer og små blodkarsvulster"],
  },
  {
    id: "pigment",
    tittel: "Pigmentflekker",
    ingress:
      "Godartede pigmentflekker kan lysne betydelig, ofte på få behandlinger. Alle flekker vurderes først — er vi i tvil, ser legen på den før vi gjør noe.",
    punkter: ["Solflekker", "Aldersflekker", "Ujevn pigmentering etter sol"],
  },
];

export const HVORFOR = [
  {
    tittel: "Riktig laser for din hud",
    tekst:
      "Alexandrit (755 nm) er svært effektiv på lys til middels hud. Nd:YAG (1064 nm) går dypere og er tryggere på mørk og solbrun hud. Vi velger bølgelengde etter deg — ikke etter hva maskinen tilfeldigvis kan.",
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
      "Behandlingene skjer i en medisinsk klinikk med lege Débora Dias De Oliveira som medisinsk ansvarlig. Pigmentflekker vi er usikre på, behandles ikke før de er vurdert.",
  },
];

export const FORLOP = [
  {
    tittel: "Før",
    tekst:
      "Vi starter med en konsultasjon der vi ser på hud og hår og legger en plan. Ingen sol, solarium eller brun-uten-sol de siste fire ukene. Ikke napp eller vokse — barbering går fint, og du barberer deg dagen før.",
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
  "Deg med solflekker og aldersflekker",
  "Alle hudtyper — også mørk hud, med riktig bølgelengde",
];

export const PASSER_IKKE_FOR = [
  "Lyst, hvitt, grått eller rødt hår — laseren trenger pigment i håret for å virke",
  "Deg som er gravid",
  "Nylig solbrent eller solbrun hud — vi venter til fargen har lagt seg",
  "Deg som bruker eller nylig har brukt isotretinoin (f.eks. Roaccutan) eller andre lysfølsomme medisiner",
  "Aktiv infeksjon eller herpesutbrudd i området",
];

export const FAQ = [
  {
    q: "Når kommer laseren?",
    a: "GentleMAX Pro Plus kommer til klinikken i Odden 1D i løpet av høsten. Står du på ventelisten, får du beskjed med en gang vi åpner for timer.",
  },
  {
    q: "Hva kommer det til å koste?",
    a: "Prisene publiserer vi når vi åpner. Hårfjerning prises per område, og de fleste trenger en kur på flere behandlinger. Står du på ventelisten, får du prisene før alle andre.",
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
    q: "Kan jeg sole meg mellom behandlingene?",
    a: "Hold det behandlede området unna sol, og bruk solkrem med høy faktor. Solbrun hud gir høyere risiko for pigmentforandringer, og da må vi senke energien eller vente.",
  },
  {
    q: "Er det samme laser som dere hadde før?",
    a: "Nei. GentleMAX Pro Plus er en ny maskin fra Candela, bygd spesielt for hårfjerning, blodkar og pigment. Den har to bølgelengder, kjøling før hvert skudd og større behandlingsflater — altså raskere og mer skånsomme behandlinger.",
  },
];
