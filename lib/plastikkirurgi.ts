// Innhold og priser for /plastikkirurgi — Ole Arvid F. Østerud, plastikkirurg.
//
// VIKTIG: Ole Arvid bruker IKKE Timma som resten av hudklinikken. Han ligger i
// PasientSky, og bookingen er den samme lenken som brukes på helseblikk.no.
// Derfor skal siden bruke en vanlig ekstern <a>-lenke, ikke <BookingButton />.
export const PASIENTSKY_BOOKING_URL =
  "https://psno-patient-platform-fe.svc.pasientsky.no/embedded/planner/booking?serviceProviderId=24a78dc0-9caf-11ed-a4d7-727736e10ded&timeslotType=485df178-5c05-11f1-a6ae-d285592abb5d&calendarId=89226a42-5c03-11f1-83c8-d285592abb5d";

// Medisinske og generelle inngrep hører hjemme hos Helseblikk — bevisst
// kryss-lenking mellom nettstedene, som har ulikt fokus.
export const HELSEBLIKK_PLASTIKKIRURGI_URL =
  "https://helseblikk.no/plastikkirurg-grimstad/";

export interface Inngrep {
  navn: string;
  beskrivelse: string;
  /** Ledepris ink. mva — formatert som resten av siden («27.500,-») */
  pris: string;
}

/** De estetiske/kosmetiske inngrepene — alt i lokalbedøvelse. */
export const INNGREP: Inngrep[] = [
  {
    navn: "Øyelokksoperasjon",
    beskrivelse:
      "Overskuddshud på øvre øyelokk kan tynge blikket og gjøre at du ser trøtt ut selv når du er uthvilt. Inngrepet fjerner den overflødige huden og gir et mer åpent, uthvilt uttrykk.",
    pris: "27.500,-",
  },
  {
    navn: "Øyebrynsløft",
    beskrivelse:
      "Løfter brynet og området over øyet. Aktuelt når brynet har sunket med årene og gir et tungt uttrykk, eller når øyelokkskirurgi alene ikke er nok.",
    pris: "43.750,-",
  },
  {
    navn: "Korreksjon av utstående ører",
    beskrivelse:
      "Ørene legges nærmere hodet. Kan gjøres på én eller begge sider, avhengig av hva som er ønskelig for deg. Et av de vanligste inngrepene hos både voksne og ungdom over 18 år.",
    pris: "31.250,-",
  },
  {
    navn: "Øreforminskning",
    beskrivelse:
      "Reduserer størrelsen på øret når det oppleves som for stort eller asymmetrisk. Utføres på begge sider samtidig for et harmonisk resultat.",
    pris: "43.750,-",
  },
  {
    navn: "Øreflipp",
    beskrivelse:
      "Korreksjon av splittet eller skadet øreflipp — for eksempel etter tunge øredobber eller et uhell — og forminskning av øreflipp som har blitt lang eller slakk med årene.",
    pris: "6.250,-",
  },
  {
    navn: "Arrkorreksjon",
    beskrivelse:
      "Et arr som er bredt, skjevt eller trekker i huden kan ofte gjøres penere. Små arr inntil 5 cm og større arr inntil 10 cm etter individuell vurdering.",
    pris: "12.500,-",
  },
  {
    navn: "Fettransplantasjon",
    beskrivelse:
      "Eget fett flyttes til volumdefekter i huden og til innsunkne arr. Gir mykere overganger og jevnere hudoverflate der det mangler volum.",
    pris: "56.250,-",
  },
  {
    navn: "Føflekkfjerning med penest mulig arr",
    beskrivelse:
      "Fjerning av føflekk der det estetiske resultatet er hovedpoenget — plassering av snitt, teknikk og lukking planlegges for å gi et så diskret arr som mulig.",
    pris: "12.500,-",
  },
  {
    navn: "Brystvorte",
    beskrivelse:
      "Korreksjon av inndratt brystvorte, rekonstruksjon og forminskning. En vanlig problemstilling få snakker høyt om — og som ofte kan løses med et lite inngrep.",
    pris: "12.500,-",
  },
];

export interface Prisrad {
  navn: string;
  /** Ink. mva (25 %) — gjelder rent kosmetiske inngrep */
  inkMva: string;
  /** Eks. mva — gjelder medisinsk begrunnede inngrep */
  eksMva: string;
  note?: string;
}

export const PRISER: Prisrad[] = [
  { navn: "Øyelokksoperasjon", inkMva: "27.500,-", eksMva: "22.000,-" },
  { navn: "Øyebrynsløft", inkMva: "43.750,-", eksMva: "35.000,-" },
  {
    navn: "Korreksjon av utstående ører, begge sider",
    inkMva: "43.750,-",
    eksMva: "35.000,-",
  },
  {
    navn: "Korreksjon av utstående ører, én side",
    inkMva: "31.250,-",
    eksMva: "25.000,-",
  },
  {
    navn: "Øreforminskning, begge sider",
    inkMva: "43.750,-",
    eksMva: "35.000,-",
  },
  {
    navn: "Forminskning av øreflipp",
    inkMva: "25.000,-",
    eksMva: "20.000,-",
    note: "En eller begge sider",
  },
  {
    navn: "Korreksjon av splittet eller skadet øreflipp, én side",
    inkMva: "6.250,-",
    eksMva: "5.000,-",
  },
  {
    navn: "Arrkorreksjon, små arr",
    inkMva: "12.500,-",
    eksMva: "10.000,-",
    note: "Inntil 5 cm",
  },
  {
    navn: "Arrkorreksjon, større arr",
    inkMva: "31.250,-",
    eksMva: "25.000,-",
    note: "Inntil 10 cm, etter individuell vurdering",
  },
  {
    navn: "Fettransplantasjon til volumdefekter i hud og til arr",
    inkMva: "56.250,-",
    eksMva: "45.000,-",
  },
  {
    navn: "Føflekkfjerning med penest mulig arr",
    inkMva: "12.500,-",
    eksMva: "10.000,-",
  },
  { navn: "Rekonstruksjon av brystvorte", inkMva: "43.750,-", eksMva: "35.000,-" },
  {
    navn: "Korreksjon av inndratt brystvorte",
    inkMva: "12.500,-",
    eksMva: "10.000,-",
  },
  {
    navn: "Konsultasjon",
    inkMva: "1.500,-",
    eksMva: "1.200,-",
    note: "Trekkes fra hvis du går videre med et inngrep",
  },
  {
    navn: "Second opinion med skriftlig tilbakemelding",
    inkMva: "18.750,-",
    eksMva: "15.000,-",
  },
];

/** Inngrep som hører hjemme hos Helseblikk — medisinske og generelle. */
export const HOS_HELSEBLIKK: string[] = [
  "Hudkreftkirurgi",
  "Fjerning av større hudlesjoner, som aterom og lipom",
  "Forhudsplastikk og omskjæring",
  "Operasjon for karpaltunnelsyndrom (CTS)",
  "Fjerning av ganglion",
  "Bascomplastikk ved pilonidalcyste",
  "Vasektomi",
];

export const ERFARING: string[] = [
  "Universitetssykehuset Nord-Norge",
  "Rikshospitalet / Oslo universitetssykehus",
  "Sykehuset Telemark",
  "Helgelandssykehuset, som fagansvarlig overlege",
];

export interface Forlopssteg {
  tittel: string;
  tekst: string;
}

export const FORLOP: Forlopssteg[] = [
  {
    tittel: "Konsultasjon",
    tekst:
      "Du trenger ingen henvisning — bestill time direkte. Ole Arvid vurderer problemstillingen grundig, forklarer hvilke inngrep som er aktuelle og hva du realistisk kan forvente. Du får tydelig pris, og beskjed om inngrepet regnes som medisinsk begrunnet eller kosmetisk, før noe avtales.",
  },
  {
    tittel: "Betenkningstid",
    tekst:
      "For kosmetiske inngrep får du alltid tid til å tenke deg om mellom konsultasjon og inngrep. Du bestemmer selv om og når du vil gå videre, og kan alltid ta kontakt med spørsmål underveis.",
  },
  {
    tittel: "Inngrepet",
    tekst:
      "Alle inngrep gjøres i lokalbedøvelse på klinikken i Grimstad. Du er våken hele veien, og du kan reise hjem samme dag. Ventetiden fra konsultasjon til inngrep er kort.",
  },
  {
    tittel: "Kontroll og oppfølging",
    tekst:
      "Du får skriftlige råd om sårstell og aktivitet med deg hjem. Sting fjernes vanligvis etter 1–2 uker, og kontroll er inkludert i prisen. Du kan alltid ta kontakt hvis du er usikker på noe.",
  },
];

export const FOR_INNGREPET: string[] = [
  "Unngå blodfortynnende midler, for eksempel Albyl eller annen acetylsalisylsyre, den siste uken — men avklar alltid med Ole Arvid eller fastlegen din først. Faste medisiner skal ikke stoppes på eget initiativ.",
  "Røykestopp anbefales i ukene før og etter større inngrep. Det gir bedre tilheling og finere arr.",
  "Unngå alkohol det siste døgnet før inngrepet.",
  "Planlegg litt ro og fri etterpå. Hvor mye avhenger av hvor stort inngrepet er — du får beskjed på konsultasjonen.",
];

export const ETTER_INNGREPET: string[] = [
  "Noe hevelse, ømhet og blåmerker er normalt de første dagene.",
  "Du får skriftlige råd om sårstell og aktivitet med deg hjem.",
  "Sting fjernes vanligvis etter 1–2 uker, men det varierer med inngrepet.",
  "Kontroll er inkludert, og du kan alltid ta kontakt ved spørsmål.",
  "Endelig resultat på arr modnes over flere måneder — vurder derfor ikke sluttresultatet for tidlig.",
];

export interface FaqPunkt {
  q: string;
  a: string;
}

export const FAQ: FaqPunkt[] = [
  {
    q: "Trenger jeg henvisning?",
    a: "Nei, du kan bestille time direkte.",
  },
  {
    q: "Bruker dere narkose?",
    a: "Nei — hos oss gjøres alt i lokalbedøvelse. Inngrep som krever narkose vurderes grundig og henvises til sykehus.",
  },
  {
    q: "Hva skjer på konsultasjonen?",
    a: "Ole Arvid vurderer problemstillingen grundig, forklarer aktuelle inngrep og forventet resultat, og du får tydelig pris før noe avtales. Konsultasjonen koster 1.200,- eks. mva / 1.500,- ink. mva og trekkes fra hvis du går videre med et inngrep.",
  },
  {
    q: "Hvorfor er noen priser med mva og andre uten?",
    a: "Fordi medisinsk begrunnede inngrep er mva-frie, mens rent kosmetiske inngrep er mva-pliktige med 25 % mva. Konsultasjonen avgjør hva som gjelder for deg, og du får tydelig beskjed om endelig pris før noe avtales.",
  },
  {
    q: "Kan jeg få en second opinion?",
    a: "Ja. Du kan bestille en second opinion med skriftlig tilbakemelding.",
  },
  {
    q: "Hvor lang tid tar det å bli bra?",
    a: "Det varierer med inngrepet. Du får grundig informasjon om forventet forløp, sykmelding og restitusjon før behandling, så du kan planlegge.",
  },
  {
    q: "Er det aldersgrense?",
    a: "Ja, kosmetiske inngrep utføres ikke på personer under 18 år.",
  },
];
