// Dybdeinnhold for behandlingssidene /behandlinger/[slug].
// Tone: pasientvendt (du/deg), nøktern og ærlig — ingen overdrevne løfter.
// Injeksjoner omtales uten legemiddelnavn (reklameregler for reseptbelagte
// legemidler); «muskelavslappende behandling» er etablert praksis på siden.

export interface BehandlingFaq {
  q: string;
  a: string;
}

export interface BehandlingDetalj {
  slug: string;
  navn: string;
  /** Kort navn til kort/lenker der fullt navn blir langt */
  kortNavn?: string;
  kategori: "konsultasjon" | "vipper-bryn" | "hudbehandlinger" | "injeksjon";
  kategoriNavn: string;
  /** Én setning til meta description og kort-intro (maks ~155 tegn) */
  kort: string;
  pris: string;
  /**
   * Pågående tilbudspris. Når denne er satt, er `pris` kampanjeprisen, og
   * `forPris` vises overstrøket ved siden av. Fjern hele blokken når
   * kampanjen er over — se lib/kampanjer.ts.
   */
  kampanje?: { merkelapp: string; forPris: string; vilkar: string };
  /** Prisdetaljer når behandlingen har flere varianter/områder */
  prisliste?: { navn: string; pris: string }[];
  varighet: string;
  antall?: string;
  holdbarhet?: string;
  hvaEr: string[];
  passerFor: string[];
  passerIkkeFor?: string[];
  forlop: { tittel: string; tekst: string }[];
  resultat: string;
  faq: BehandlingFaq[];
  relaterte: string[];
}

export const BEHANDLINGER: BehandlingDetalj[] = [
  {
    slug: "hudkonsultasjon",
    navn: "Hudkonsultasjon",
    kategori: "konsultasjon",
    kategoriNavn: "Hudkonsultasjon",
    kort: "Hudkonsultasjon hos kosmetisk sykepleier i Grimstad, 490 kr. Beløpet trekkes fra ved behandling eller produktkjøp over 1 500 kr.",
    pris: "490,-",
    varighet: "Ca. 30–45 minutter",
    hvaEr: [
      "En hudkonsultasjon er startpunktet for all behandling hos oss. Vi går systematisk gjennom hudens tilstand, historikk og det du ønsker å oppnå — enten det gjelder akne, pigmentering, rødhet, hudkvalitet eller aldringstegn.",
      "Du får en ærlig vurdering av hva som faktisk vil hjelpe for din hud, en konkret behandlingsplan med prisoverslag, og anbefalinger om hjemmepleie. Noen ganger er svaret at du ikke trenger behandling — det sier vi også.",
    ],
    passerFor: [
      "Deg som er usikker på hvilken behandling som passer",
      "Deg med en konkret hudutfordring (akne, pigmentflekker, rødhet, arr)",
      "Deg som vurderer injeksjons- eller hudbehandling og vil ha en faglig vurdering først",
      "Deg som vil ha en hudpleierutine som faktisk virker",
    ],
    forlop: [
      { tittel: "Kartlegging", tekst: "Vi går gjennom hudhistorikk, tidligere behandlinger, medisiner og hva du ønsker å oppnå." },
      { tittel: "Hudanalyse", tekst: "Huden undersøkes i godt lys, og vi vurderer hudtype, tilstand og hva den trenger." },
      { tittel: "Plan", tekst: "Du får en konkret anbefaling: behandlinger, rekkefølge, forventet resultat og pris. Du er ikke bundet til å bestille noe." },
    ],
    resultat: "Du går ut døren med en tydelig plan for huden din — hva som anbefales, hvorfor, i hvilken rekkefølge og hva det koster.",
    faq: [
      { q: "Må jeg ha konsultasjon før behandling?", a: "For injeksjons- og hudbehandlinger gjør vi alltid en vurdering først — den kan ofte tas samme dag som behandlingen. For enklere behandlinger som vipper og bryn trenger du ikke konsultasjon." },
      { q: "Hva koster konsultasjonen?", a: "Konsultasjonen koster 490 kr. Beløpet trekkes fra igjen hvis du gjennomfører en behandling hos oss, eller handler produkter for over 1 500 kr — så i praksis blir den gratis når du går videre. Du er aldri bundet til å bestille noe." },
      { q: "Kan jeg få konsultasjon uten å binde meg til noe?", a: "Ja. Konsultasjonen er uforpliktende, og du bestemmer selv om og når du vil gå videre." },
      { q: "Hva bør jeg tenke på før konsultasjonen?", a: "Kom gjerne uten sminke hvis mulig, og noter ned produkter du bruker i dag og eventuelle medisiner. Det gjør vurderingen mer presis." },
    ],
    relaterte: ["dermapen", "kjemisk-peeling", "muskelavslappende-behandling"],
  },
  {
    slug: "farging-forming-vipper-bryn",
    navn: "Farging og forming av vipper og bryn",
    kortNavn: "Vipper & bryn komplett",
    kategori: "vipper-bryn",
    kategoriNavn: "Vipper & Bryn",
    kort: "Komplett pakke i Grimstad: farging av vipper og bryn, forming og voks. Definerer blikket naturlig — perfekt før ferie eller anledninger.",
    pris: "690,-",
    varighet: "Ca. 45 minutter",
    holdbarhet: "3–6 uker",
    hvaEr: [
      "Dette er vår komplette pakke for blikket: Vippene farges for mer synlighet uten maskara, brynene farges og formes med voks slik at de rammer inn ansiktet på en naturlig måte.",
      "Vi tilpasser alltid farge og form til din hårfarge, hudtone og ansiktsform — målet er et velstelt, naturlig resultat, ikke en «malt» look.",
    ],
    passerFor: [
      "Deg med lyse vipper og bryn som ønsker mer definisjon",
      "Deg som vil slippe maskara og brynspenn i hverdagen",
      "Deg som skal på ferie, bryllup eller annen anledning",
      "Deg som vil ha ryddige bryn uten å nappe selv",
    ],
    passerIkkeFor: [
      "Deg med pågående øyeinfeksjon eller eksem i området — vent til det er leget",
      "Deg som tidligere har reagert allergisk på fargeprodukter (vi kan ta en lappetest først)",
    ],
    forlop: [
      { tittel: "Før", tekst: "Kom gjerne usminket i øyeområdet. Har du sensitiv hud eller har reagert på farge før, si fra — vi kan ta en test 48 timer i forveien." },
      { tittel: "Under", tekst: "Fargen virker i noen minutter mens du ligger med lukkede øyne. Deretter formes brynene med voks og pinsett." },
      { tittel: "Etter", tekst: "Unngå å gni øynene og dropp oljebaserte rensere første døgnet — da holder fargen lenger." },
    ],
    resultat: "Definerte vipper og velformede bryn som holder seg i 3–6 uker, avhengig av hudtype og hvor ofte du renser området.",
    faq: [
      { q: "Hvor lenge varer fargen?", a: "Vippefarge holder som regel 3–4 uker, brynsfarge 3–6 uker. Fargen blekner gradvis med rens og sollys." },
      { q: "Gjør voksing vondt?", a: "Det kan svi litt i sekundet hårene fjernes, men området rundt brynene tåler det godt. Huden kan være lett rød en time etterpå." },
      { q: "Kan jeg bruke sminke etterpå?", a: "Vent gjerne til dagen etter med sminke i øyeområdet, så setter fargen seg best." },
      { q: "Jeg har reagert på hårfarge før — kan jeg ta dette?", a: "Si fra ved bestilling, så tar vi en lappetest minst 48 timer før behandlingen for å være trygge." },
    ],
    relaterte: ["koreansk-vippeloft", "brynslaminering", "farging-vipper"],
  },
  {
    // KAMPANJE: introduksjonspris 790,- ut september 2026. SLIK AVSLUTTER DU
    // DEN: bytt `pris` til "1.190,-", fjern kampanjeavsnittet i `hvaEr` og
    // kampanje-spørsmålet i `faq` — og husk å endre tjenestenavnet i Timma.
    slug: "koreansk-vippeloft",
    navn: "Koreansk vippeløft",
    kortNavn: "Vippeløft",
    kategori: "vipper-bryn",
    kategoriNavn: "Vipper & Bryn",
    kort: "Koreansk vippeløft i Grimstad — vippene løftes fra roten for et våkent, definert blikk i 4–6 uker. Introduksjonspris 790,- i september.",
    pris: "790,-",
    kampanje: {
      merkelapp: "Nyhet · Kampanje ut september",
      forPris: "1.190,-",
      vilkar:
        "Introduksjonspris ut september 2026. Gjelder timer som både bookes og gjennomføres i september, og rabatten trekkes fra når du betaler i klinikken.",
    },
    varighet: "Ca. 75 minutter",
    holdbarhet: "4–6 uker",
    hvaEr: [
      "Et vippeløft bøyer dine egne vipper oppover fra roten, slik at de peker ut og opp i stedet for rett fram eller nedover. Blikket åpner seg og øyet ser større ut — uten at det legges til et eneste hår.",
      "Den koreanske teknikken skiller seg fra et klassisk vippeløft ved at vippene festes enkeltvis på en silikonform og løftes helt fra rotpartiet. Kurven blir jevnere og mykere, og resultatet ser mindre «permanentet» ut enn den skarpe knekken et tradisjonelt vippeløft kan gi. Behandlingen er skånsom, men det er fortsatt en kjemisk prosess — derfor anbefaler vi pauser mellom hver gang.",
      "Vi kan farge vippene i samme seanse. Det er som regel verdt det: løftet gjør vippene synlige, og fargen gjør dem mørke, så du slipper maskara helt.",
      "Introduksjonstilbud: behandlingen koster 790,- i september 2026, mot ordinært 1.190,-. Tilbudet gjelder timer som både bookes og gjennomføres i september, og rabatten trekkes fra når du betaler i klinikken.",
    ],
    passerFor: [
      "Deg med rette vipper som peker nedover og skjuler øyet",
      "Deg som vil ha et våkent blikk uten vippeextensions",
      "Deg som bruker vippespiral hver morgen og vil slippe det",
      "Deg som har prøvd extensions og vil ha noe mer lavterskel",
      "Deg som skal på ferie, i bryllup eller i basseng og vil slippe maskara",
    ],
    passerIkkeFor: [
      "Deg med vippeextensions på — de må være helt av før behandling",
      "Deg med svært korte eller sparsomme vipper, da det er lite å løfte",
      "Deg med pågående øyeinfeksjon, sti eller irritasjon — vent til det er leget",
      "Deg som nylig har operert øynene — vent til legen din sier det er greit",
      "Deg som er gravid eller ammer (produktene er ikke godt nok dokumentert) — vi tilpasser eller venter",
    ],
    forlop: [
      { tittel: "Før", tekst: "Kom usminket i øyeområdet og ta ut linser før du kommer. Har du vippeextensions, må de fjernes i forkant. Vi går gjennom hva du ønsker, og ved kjent allergi tar vi en lappetest først." },
      { tittel: "Under", tekst: "Du ligger med lukkede øyne hele tiden. Vippene legges på en silikonform tilpasset lengden din, og festes hår for hår. Deretter virker løftemiddelet, før vippene fikseres og næres. Ønsker du farge, legges den til slutt." },
      { tittel: "Etter", tekst: "Hold vippene tørre i 24 timer — ingen vann, damp, badstue, trening eller sminke i øyeområdet. Etterpå lever du som vanlig. Ikke bruk vippespiral det første døgnet, og unngå å sove med ansiktet ned i puten de første nettene." },
    ],
    resultat: "Løftede, oppadvendte vipper som åpner blikket i 4–6 uker. Effekten avtar gradvis etter hvert som vippene byttes ut naturlig — du får ingen brå overgang.",
    faq: [
      { q: "Hva er forskjellen på koreansk vippeløft og vippeextensions?", a: "Et vippeløft former dine egne vipper. Extensions limer på nye hår. Løftet gir et mer naturlig uttrykk, krever ikke påfyll hver tredje uke, og sliter mindre på egne vipper — men det gjør ikke vippene lengre eller tettere. Vil du ha vesentlig mer volum, er extensions riktig valg." },
      { q: "Hvor lenge varer et vippeløft?", a: "4–6 uker for de fleste. Vippene har en naturlig vekstsyklus, og løftet forsvinner med hårene etter hvert som de skiftes ut. Har du rask vippevekst, varer det litt kortere." },
      { q: "Skader det vippene mine?", a: "Gjort riktig og med pause mellom hver gang tåler vippene det godt. Men det er en kjemisk behandling, og tar du det for tett kan vippene bli tørre og sprø. Vi anbefaler minst 6–8 uker mellom hver behandling, og at du bruker en vippeserum eller -olje i mellomtiden." },
      { q: "Gjør det vondt?", a: "Nei. Du ligger med lukkede øyne, og de fleste synes det er behagelig — noen sovner. Kjenner du svie underveis, sier du fra, så skyller vi umiddelbart." },
      { q: "Kan jeg bruke maskara etterpå?", a: "Ja, etter det første døgnet. Men mange dropper den — kombinerer du løftet med vippefarge, er vippene både løftede og mørke, og da trenger du sjelden mer." },
      { q: "Hvor mye koster det?", a: "Ordinær pris er 1.190,-. I september 2026 koster behandlingen 790,- som introduksjonstilbud, for timer som både bookes og gjennomføres i september." },
      { q: "Hvor lang tid tar timen?", a: "Sett av rundt 75 minutter. Vil du ha farge i tillegg, gjøres det innenfor samme time." },
      { q: "Hvem utfører behandlingen?", a: "Både Christina og Mabel utfører koreansk vippeløft hos oss i Grimstad. Du velger selv behandler når du booker." },
    ],
    relaterte: ["farging-vipper", "brynslaminering", "farging-forming-vipper-bryn"],
  },
  {
    slug: "brynslaminering",
    navn: "Brynslaminering",
    kategori: "vipper-bryn",
    kategoriNavn: "Vipper & Bryn",
    kort: "Brynslaminering i Grimstad gir fyldige, velformede bryn i 4–8 uker. Inkluderer farge, forming og voks.",
    pris: "890,-",
    varighet: "Ca. 60 minutter",
    holdbarhet: "4–8 uker",
    hvaEr: [
      "Brynslaminering omformer brynshårene kjemisk slik at de legger seg i ønsket retning — oppover og utover for en fyldigere, «børstet» look. Behandlingen inkluderer farging og forming med voks, så du får et komplett resultat i én seanse.",
      "Lamineringen gir mest effekt for deg som har nok brynshår å jobbe med, men hvor hårene er ustyrlige, flate eller vokser i ulik retning. Tynne eller hullete bryn kan også løftes betydelig fordi hårene utnyttes bedre.",
    ],
    passerFor: [
      "Deg med ustyrlige bryn som vokser i alle retninger",
      "Deg som ønsker fyldigere uttrykk uten permanent makeup",
      "Deg som bruker tid på brynsgel og børsting hver morgen",
      "Deg med flate bryn som ønsker mer løft og form",
    ],
    passerIkkeFor: [
      "Deg med svært få brynshår — da gir farging/forming eller PMU bedre resultat",
      "Deg med eksem, psoriasis eller sår hud i brynsområdet",
      "Deg som er gravid eller ammer (fargestoffene er ikke tilstrekkelig dokumentert) — vi tilpasser eller venter",
    ],
    forlop: [
      { tittel: "Før", tekst: "Kom usminket i brynsområdet. Unngå å nappe eller vokse brynene selv de siste ukene — jo mer hår, jo bedre resultat." },
      { tittel: "Under", tekst: "Hårene mykes opp med et lamineringsmiddel, formes i ønsket retning og fikseres. Deretter farges og formes brynene. Du ligger behagelig hele tiden." },
      { tittel: "Etter", tekst: "Hold brynene tørre i 24 timer — ingen vann, damp, trening eller sminke i området. Etterpå børster du dem enkelt på plass, gjerne med litt brynsolje." },
    ],
    resultat: "Fyldige, definerte bryn som ligger på plass i 4–8 uker. De fleste trenger bare et lett børst om morgenen.",
    faq: [
      { q: "Skader laminering brynshårene?", a: "Ikke når det gjøres riktig og ikke for ofte. Vi anbefaler minst 6–8 uker mellom hver behandling og pleie med brynsolje mellom." },
      { q: "Hvor ofte kan jeg ta brynslaminering?", a: "Hver 6.–8. uke. Hårene trenger tid til å hente seg inn mellom behandlingene." },
      { q: "Kan jeg kombinere med farging?", a: "Ja — farge, forming og voks er inkludert i prisen hos oss." },
      { q: "Hva om jeg har veldig tynne bryn?", a: "Da er det ikke sikkert laminering gir nok. Book en konsultasjon, så vurderer vi ærlig om laminering, farging eller noe annet passer best." },
    ],
    relaterte: ["koreansk-vippeloft", "farging-forming-vipper-bryn", "farging-forming-bryn"],
  },
  {
    slug: "farging-forming-bryn",
    navn: "Farging og forming av bryn",
    kategori: "vipper-bryn",
    kategoriNavn: "Vipper & Bryn",
    kort: "Farging og forming av bryn med voks i Grimstad. Definerte, ryddige bryn tilpasset ditt ansikt.",
    pris: "590,-",
    varighet: "Ca. 30 minutter",
    holdbarhet: "3–6 uker",
    hvaEr: [
      "Brynene farges i en nyanse tilpasset din hårfarge og hudtone, og formes deretter med voks og pinsett. Resultatet er ryddige, definerte bryn som rammer inn ansiktet.",
      "Farging får også de fine, lyse hårene til å synes — derfor oppleves brynene ofte som fyldigere etter behandling, selv om ingen hår er lagt til.",
    ],
    passerFor: [
      "Deg med lyse eller grå brynshår",
      "Deg som vil ha en definert form uten å nappe selv",
      "Deg som vil redusere tiden foran speilet om morgenen",
    ],
    passerIkkeFor: [
      "Deg med hudirritasjon eller sår i brynsområdet",
      "Deg som har reagert på fargeprodukter tidligere (vi tar lappetest først)",
    ],
    forlop: [
      { tittel: "Før", tekst: "Kom gjerne usminket i brynsområdet, og la brynene gro litt i forkant hvis du ønsker formendring." },
      { tittel: "Under", tekst: "Vi blir enige om form og farge, fargen virker i noen minutter, og brynene formes med voks og pinsett." },
      { tittel: "Etter", tekst: "Unngå oljebaserte produkter i brynene første døgnet. Lett rødhet etter voks er normalt og gir seg raskt." },
    ],
    resultat: "Definerte og ryddige bryn med farge som holder 3–6 uker.",
    faq: [
      { q: "Hvordan velger dere farge?", a: "Vi tilpasser nyansen til hårfarge og hudtone — som regel ett hakk mørkere enn brynshårene for et naturlig resultat." },
      { q: "Hvor ofte bør jeg ta det?", a: "De fleste tar farging og forming hver 4.–6. uke." },
      { q: "Blir det for mørkt?", a: "Fargen er mest intens de første par dagene og blekner deretter til en naturlig nyanse. Vi legger oss heller litt lyst enn for mørkt." },
    ],
    relaterte: ["brynslaminering", "farging-forming-vipper-bryn", "farging-vipper"],
  },
  {
    slug: "farging-vipper",
    navn: "Farging av vipper",
    kategori: "vipper-bryn",
    kategoriNavn: "Vipper & Bryn",
    kort: "Vippefarging i Grimstad — mørkere, mer synlige vipper uten maskara i 3–4 uker.",
    pris: "290,-",
    varighet: "Ca. 20 minutter",
    holdbarhet: "3–4 uker",
    hvaEr: [
      "Vippene farges med en skånsom farge beregnet for øyeområdet. Også de lyse, fine vippene ytterst blir synlige — det gir et mer åpent blikk helt uten maskara.",
      "Behandlingen er rask og passer fint å kombinere med brynsfarging eller andre behandlinger samme dag.",
    ],
    passerFor: [
      "Deg med lyse vipper",
      "Deg som vil slippe maskara i hverdagen, på trening eller på ferie",
      "Deg som bruker linser og vil unngå maskarasøl",
    ],
    passerIkkeFor: [
      "Deg med pågående øyeinfeksjon eller irritasjon — vent til det er leget",
      "Deg som har reagert på fargeprodukter tidligere (vi tar lappetest først)",
    ],
    forlop: [
      { tittel: "Før", tekst: "Kom usminket i øyeområdet, eller så renser vi bort maskara først. Ta ut linser før behandling." },
      { tittel: "Under", tekst: "Du ligger med lukkede øyne mens fargen virker i 5–10 minutter. Huden beskyttes rundt øynene." },
      { tittel: "Etter", tekst: "Unngå å gni øynene og dropp oljebasert rens første døgnet." },
    ],
    resultat: "Mørkere, mer synlige vipper i 3–4 uker — et våkent blikk uten maskara.",
    faq: [
      { q: "Er det trygt for øynene?", a: "Ja, vi bruker farger utviklet for øyeområdet, og huden beskyttes under behandlingen. Ved kjent allergi tar vi en lappetest først." },
      { q: "Hvor lenge varer det?", a: "Rundt 3–4 uker. Fargen forsvinner gradvis etter hvert som vippene naturlig byttes ut." },
      { q: "Kan jeg bruke maskara i tillegg?", a: "Ja, det går fint — mange trenger det bare til fest etter vippefarging." },
    ],
    relaterte: ["koreansk-vippeloft", "farging-forming-vipper-bryn", "brynslaminering"],
  },
  {
    slug: "kjemisk-peeling",
    navn: "Kjemisk peeling",
    kategori: "hudbehandlinger",
    kategoriNavn: "Hudbehandlinger",
    kort: "Kjemisk peeling i Grimstad — vi har flere typer og tilpasser peelingen til huden din og ønsket ditt. Fra 1 500 kr.",
    pris: "Fra 1.500,-",
    prisliste: [
      { navn: "Kjemisk peeling — pris etter type og styrke", pris: "1.500,- – 2.000,-" },
      { navn: "Kjemisk peel som tillegg til microneedling", pris: "800,-" },
    ],
    varighet: "Ca. 30–45 minutter",
    antall: "1–6 behandlinger avhengig av mål",
    hvaEr: [
      "Kjemisk peeling bruker syrer (som regel frukt-, melke- eller salisylsyre i ulik styrke) til å løsne døde hudceller og sette fart på hudens egen fornyelse. Resultatet er jevnere hudtone, finere hudstruktur og friskere glød.",
      "Vi har flere ulike peelinger, og velger syretype og styrke ut fra huden din og målet ditt — uren hud, pigmentering, fine linjer eller generell hudkvalitet. Derfor ligger prisen mellom 1 500 og 2 000 kr; du får vite nøyaktig pris før vi starter. En medisinsk peeling er noe helt annet enn en «spa-peeling», og skal gjøres av behandlere med riktig kompetanse.",
    ],
    passerFor: [
      "Deg med uren hud, tette porer eller tendens til akne",
      "Deg med ujevn hudtone eller solskadet hud",
      "Deg med fine linjer og «trett» hud som mangler glød",
      "Deg som vil forsterke effekten av hjemmepleie som ZO Skin Health",
    ],
    passerIkkeFor: [
      "Deg som er gravid eller ammer (avhengig av syretype — vi vurderer alltid individuelt)",
      "Deg med aktiv eksem, sår eller infeksjon i området",
      "Deg som nylig har brukt Roaccutan/isotretinoin — si fra, så legger vi en trygg plan",
      "Nylig soling eller solariumsbruk — vent 1–2 uker",
    ],
    forlop: [
      { tittel: "Før", tekst: "Unngå sterk soling og sterke aktive ingredienser (retinol, syrer) noen dager før. Ved førstegangsbehandling vurderer vi huden og velger riktig peeling." },
      { tittel: "Under", tekst: "Huden renses grundig, peelingen påføres og virker i noen minutter. Det er normalt at det prikker og svir lett. Behandlingen avsluttes med beroligende pleie og SPF." },
      { tittel: "Etter", tekst: "Huden kan være rød som etter en solrik dag, og flasse lett i 2–5 dager avhengig av styrke. Bruk SPF 30–50 daglig og unngå direkte sol — dette er ikke valgfritt etter peeling." },
    ],
    resultat: "Friskere, jevnere og glattere hud etter få dager. Ved uren hud eller pigmentering anbefales en kur på 3–6 behandlinger med noen ukers mellomrom.",
    faq: [
      { q: "Kommer jeg til å flasse mye?", a: "Det avhenger av styrken. Lette peelinger gir lite eller ingen synlig flassing, sterkere gir flassing i 3–5 dager. Vi sier alltid fra hva du kan forvente før vi starter." },
      { q: "Hvor mange behandlinger trenger jeg?", a: "For glød og friskere hud kan én behandling holde. For akne, arr eller pigmentering anbefaler vi en kur på 3–6 behandlinger med 2–4 ukers mellomrom." },
      { q: "Kan jeg ta peeling om sommeren?", a: "Lette peelinger går fint hele året så lenge du er nøye med solbeskyttelse. Sterkere peelinger legger vi helst til høst/vinter." },
      { q: "Kan peeling kombineres med andre behandlinger?", a: "Ja, peeling inngår ofte i en behandlingsplan sammen med microneedling — men ikke samme dag. Vi setter opp riktig rekkefølge for deg." },
      { q: "Hvorfor er prisen et intervall?", a: "Vi har flere ulike peelinger, og prisen følger hvilken type og styrke huden din trenger. Du får alltid vite prisen før behandlingen settes i gang." },
    ],
    relaterte: ["zo-stimulation-peel", "dermapen", "hudkonsultasjon"],
  },
  {
    slug: "zo-stimulation-peel",
    navn: "ZO Stimulation Peel",
    kategori: "hudbehandlinger",
    kategoriNavn: "Hudbehandlinger",
    kort: "ZO Stimulation Peel i Grimstad — medisinsk peeling fra ZO Skin Health med syrer og retinol. Jevnere hudtone, finere struktur og glød. 2 100 kr.",
    pris: "2.100,-",
    varighet: "Ca. 45–60 minutter",
    antall: "Kan tas enkeltvis — kur på 3–5 gir mest",
    hvaEr: [
      "ZO Stimulation Peel er en medisinsk peeling utviklet av dermatologen Zein Obagi. Den kombinerer melkesyre, mandelsyre og sitronsyre med retinol i virksom konsentrasjon — syrene løsner døde hudceller på overflaten, mens retinolen gir huden et signal om å fornye seg raskere i dagene etterpå.",
      "Dette er en overflatisk peeling. Den går ikke dypt, og gir derfor sjelden mer enn lett flassing — men den er merkbart sterkere enn en vanlig ansiktsbehandling, og du kjenner at det jobber i huden.",
      "Peelingen spiller godt sammen med hjemmepleie fra ZO Skin Health, som vi fører i klinikken. Vi vurderer alltid huden din først, og sier fra hvis en annen peeling eller behandling passer bedre for deg.",
    ],
    passerFor: [
      "Deg med ujevn hudtone, pigmentflekker eller solskadet hud",
      "Deg med fine linjer og hud som mangler glød",
      "Deg med uren hud eller synlige porer",
      "Deg som allerede bruker ZO hjemme og vil forsterke effekten",
    ],
    passerIkkeFor: [
      "Deg som er gravid eller ammer — retinol brukes ikke da",
      "Deg med aktiv eksem, rosacea i utbrudd, sår eller infeksjon i området",
      "Deg som nylig har brukt Roaccutan/isotretinoin — si fra, så legger vi en trygg plan",
      "Deg som nettopp har solt deg eller vært i solarium — vent 1–2 uker",
    ],
    forlop: [
      { tittel: "Før", tekst: "Legg bort retinol og sterke syrer noen dager før, og unngå soling. Er det første gang, vurderer vi huden og tilpasser styrken." },
      { tittel: "Under", tekst: "Huden renses grundig, peelingen legges på og får virke. Det prikker og svir lett i noen minutter. Vi avslutter med beroligende pleie og solkrem." },
      { tittel: "Etter", tekst: "Huden kan være rød og kjennes stram første døgnet, og mange får lett flassing fra dag 2 til 4. Bruk SPF 30–50 daglig, og la flassingen løsne av seg selv — ikke pirk." },
    ],
    resultat: "Jevnere hudtone og tydelig mer glød når flassingen har gitt seg, som regel etter 3–7 dager. Pigmentering og hudkvalitet bedrer seg gradvis over flere behandlinger.",
    faq: [
      { q: "Hva er forskjellen på denne og en vanlig kjemisk peeling?", a: "ZO Stimulation Peel er en ferdig sammensatt medisinsk peeling med retinol i tillegg til syrene. Våre øvrige peelinger setter vi sammen etter huden din, og de starter på 1 500 kr." },
      { q: "Hvor mye kommer jeg til å flasse?", a: "De fleste får lett flassing rundt nese og munn fra dag 2 til 4. Noen flasser knapt. Du er som regel presentabel hele veien." },
      { q: "Kan jeg ta den om sommeren?", a: "Ja, men du må være nøye med solkrem i ukene etterpå. Skal du på sydentur eller være mye i sterk sol, venter vi heller til etterpå." },
      { q: "Kan jeg sminke meg etterpå?", a: "Vent til dagen etter. Da går det fint, men vær forsiktig med skrubb og sterke produkter de første dagene." },
      { q: "Hvor mange behandlinger trenger jeg?", a: "Én behandling gir glød. For pigmentering og hudkvalitet anbefaler vi en kur på 3–5 behandlinger med 3–4 ukers mellomrom." },
    ],
    relaterte: ["kjemisk-peeling", "dermapen", "hudkonsultasjon"],
  },
  {
    slug: "face-formula-signaturbehandling",
    navn: "Face Formula signaturbehandling",
    kortNavn: "Face Formula signatur",
    kategori: "hudbehandlinger",
    kategoriNavn: "Hudbehandlinger",
    kort: "Face Formula signaturbehandling i Grimstad — peeling, microneedling, eksosomer og maske med microcurrent i samme time. 1 900 kr.",
    pris: "1.900,-",
    varighet: "Ca. 60 minutter",
    antall: "Fin som enkeltbehandling — kur på 3–4 ved pigmentering og hudkvalitet",
    hvaEr: [
      "Face Formula er et norsk hudpleiemerke, tidligere kjent som Elixir Cosmeceuticals. Signaturbehandlingen er merkets egen protokoll, der fire steg gjøres i samme time: kjemisk peeling, mikronåling med 0,5 mm, eksosomer og en arkmaske med microcurrent.",
      "Rekkefølgen er poenget. Peelingen løsner døde hudceller, mikronålingen åpner mikroskopiske kanaler slik at virkestoffene kommer lenger ned, eksosomene gir huden reparasjonssignaler, og masken med svak strøm avslutter med fukt og fasthet.",
      "Behandlingen finnes i to varianter. Longevity Peel+ bruker glykolsyre og retter seg mot fine linjer, hudstruktur og fasthet. Balancing Peel+ bruker mandelsyre, er mildere, og passer deg med uren hud, ujevn tone eller mye glans. Vi velger variant sammen med deg i timen.",
    ],
    passerFor: [
      "Deg som vil ha synlig effekt på hudkvaliteten uten lang nedetid",
      "Deg med fine linjer, ujevn hudtone eller slappere hudstruktur (Longevity Peel+)",
      "Deg med uren hud, synlige porer eller glansete hud (Balancing Peel+)",
      "Deg som har noe på gang om en ukes tid og vil se uthvilt ut",
    ],
    passerIkkeFor: [
      "Deg med aktiv hudinfeksjon, sår, eksem eller akne med mye betennelse i området",
      "Deg som er gravid — vi gjør en individuell vurdering og tilpasser",
      "Deg som bruker isotretinoin eller blodfortynnende — si fra på forhånd",
      "Deg som nylig har solt deg eller vært i solarium — vent 1–2 uker",
    ],
    forlop: [
      { tittel: "Før", tekst: "Unngå soling, retinol og sterke syrer 3–5 dager før. Kom gjerne usminket. Vi går gjennom huden din og velger variant før vi starter." },
      { tittel: "Under", tekst: "Huden renses, peelingen legges på og nøytraliseres. Deretter mikronåling med 0,5 mm, eksosomer, og til slutt arkmaske med microcurrent mens du ligger stille. Det kjennes som prikking og lett varme." },
      { tittel: "Etter", tekst: "Huden er rosa og varm noen timer, hos enkelte til dagen etter. Dropp sminke første kvelden, hold deg unna trening og badstue i ett døgn, og bruk SPF 30–50 daglig i to uker." },
    ],
    resultat: "Huden kjennes fastere og ser mer uthvilt ut allerede dagen etter. Effekten på hudtone og struktur bygger seg opp over ukene som følger, og blir tydeligere for hver behandling i en kur.",
    faq: [
      { q: "Hva er forskjellen på denne og vanlig microneedling?", a: "Mikronålingen her er grunn (0,5 mm) og ett av fire steg — behandlingen handler like mye om peelingen, eksosomene og masken. Microneedling med Dermapen går dypere, tar sikte på arr og kollagenoppbygging, og har noe mer nedetid." },
      { q: "Hvilken variant passer for meg?", a: "Longevity Peel+ hvis du er ute etter fasthet, fine linjer og hudstruktur. Balancing Peel+ hvis huden er uren, glansete eller ujevn i tonen. Vi vurderer huden i timen og velger sammen med deg." },
      { q: "Hvor lang er nedetiden?", a: "Kort. Regn med rosa og varm hud noen timer, hos enkelte til dagen etter. De fleste går rett tilbake i vanlige gjøremål." },
      { q: "Hva er eksosomer?", a: "Eksosomer er små budbringere som bærer signaler mellom celler. Påført rett etter mikronåling brukes de for å støtte hudens egen reparasjon. Feltet er nytt, og forskningen er fortsatt i utvikling — vi lover ikke mer enn det." },
      { q: "Kan jeg ta den før et bryllup eller en fest?", a: "Ja, men legg den 5–7 dager før, ikke dagen før. Da har huden roet seg helt og du får gløden på riktig dag." },
    ],
    relaterte: ["dermapen", "kjemisk-peeling", "hudkonsultasjon"],
  },
  {
    slug: "dermapen",
    navn: "Microneedling med Dermapen",
    kortNavn: "Dermapen",
    kategori: "hudbehandlinger",
    kategoriNavn: "Hudbehandlinger",
    kort: "Microneedling med Dermapen i Grimstad — stimulerer kollagen og forbedrer arr, porer, linjer og hudstruktur. Fra 2 690 kr.",
    pris: "Fra 2.690,-",
    prisliste: [
      { navn: "Microneedling (Dermapen)", pris: "2.690,-" },
      { navn: "Microneedling (Dermapen) med mesoterapi", pris: "3.690,-" },
      { navn: "Microneedling (Dermapen) med eksosomer", pris: "3.890,-" },
      { navn: "Tillegg: kjemisk peel i samme behandling", pris: "800,-" },
      { navn: "Tillegg: ekstra område (hals eller bryst)", pris: "800,-" },
      { navn: "Tillegg: LED-lys", pris: "300,-" },
    ],
    varighet: "Ca. 60 minutter",
    antall: "3–6 behandlinger for best resultat",
    hvaEr: [
      "Microneedling lager tusenvis av mikroskopiske kanaler i huden med sterile nåler. Det høres dramatisk ut, men er en kontrollert stimulering som setter i gang hudens egen reparasjon — produksjonen av kollagen og elastin øker, og huden bygger seg gradvis fastere og jevnere.",
      "Vi bruker Dermapen, som gir presis nåledybde tilpasset område og problemstilling. Behandlingen er godt dokumentert for aknearr, store porer, fine linjer og generell hudkvalitet.",
      "Behandlingen kan bygges ut etter behov: med mesoterapi (vitaminer og hyaluronsyre i huden), med eksosomer, med en kjemisk peel i samme time, med LED-lys til slutt, eller ved å ta med hals og bryst. Vi anbefaler kombinasjonen ut fra huden din og målet ditt — prisene finner du i oversikten over.",
    ],
    passerFor: [
      "Deg med aknearr eller andre overflatiske arr",
      "Deg med store porer og ujevn hudstruktur",
      "Deg med fine linjer og begynnende slapphet i huden",
      "Deg med strekkmerker (flere behandlinger kreves)",
      "Deg som ønsker generelt bedre hudkvalitet med naturlig metode",
    ],
    passerIkkeFor: [
      "Deg med aktiv akne med betennelse i området — behandles først",
      "Deg med aktiv hudinfeksjon, eksem eller psoriasis i området",
      "Deg som er gravid",
      "Deg som bruker blodfortynnende eller isotretinoin — si fra, så vurderer vi",
    ],
    forlop: [
      { tittel: "Før", tekst: "Unngå soling, retinol og sterke syrer 3–5 dager før. Vi legger bedøvelseskrem før behandlingen, så det meste kjennes som lett prikking." },
      { tittel: "Under", tekst: "Huden renses, bedøvelseskrem virker i ca. 20 minutter, deretter behandles området systematisk med Dermapen. Selve needlingen tar 20–30 minutter." },
      { tittel: "Etter", tekst: "Huden er rød og varm som etter soling i 1–2 dager, og kan flasse lett. Unngå sminke første døgnet, trening og badstue i 2 dager, og bruk SPF 50 daglig i minst 2 uker." },
    ],
    resultat: "Friskere glød etter få dager. Selve kollagenoppbyggingen tar tid — synlig forbedring av arr og struktur kommer gradvis over 4–12 uker, og best resultat får du med en kur på 3–6 behandlinger med 4–6 ukers mellomrom.",
    faq: [
      { q: "Gjør det vondt?", a: "Med bedøvelseskrem beskriver de fleste det som lett prikking eller vibrering. Enkelte områder, som pannen, kjennes mer enn andre." },
      { q: "Hvor lang er nedetiden?", a: "Regn med rød og varm hud i 1–2 dager. De fleste er «presentable» dagen etter og kan bruke sminke fra dag 2." },
      { q: "Hvor mange behandlinger trenger jeg for aknearr?", a: "Vanligvis 3–6 behandlinger med 4–6 ukers mellomrom. Arr forbedres gradvis for hver runde — vi evaluerer underveis." },
      { q: "Hva er forskjellen på Dermapen hos klinikk og ruller hjemme?", a: "Hjemmerullere har korte nåler som kun påvirker det ytterste hudlaget, og medfører infeksjonsrisiko ved gjenbruk. Klinikkbehandling går dypere, er steril og gir dokumentert kollagenstimulering." },
      { q: "Kan microneedling kombineres med mesoterapi?", a: "Ja, det er en vanlig og god kombinasjon — kanalene fra needlingen gjør at virkestoffene i mesoterapi trenger bedre ned i huden." },
    ],
    relaterte: ["mesoterapi", "kjemisk-peeling", "hudkonsultasjon"],
  },
  {
    slug: "mesoterapi",
    navn: "Mesoterapi",
    kategori: "hudbehandlinger",
    kategoriNavn: "Hudbehandlinger",
    kort: "Mesoterapi i Grimstad — vitaminer og hyaluronsyre tilføres direkte i huden for dyp fukt og glød. Fra 1 900 kr.",
    pris: "Fra 1.900,-",
    varighet: "Ca. 45–60 minutter",
    antall: "Kur på 3–4 behandlinger anbefales",
    hvaEr: [
      "Mesoterapi tilfører en skreddersydd cocktail av hyaluronsyre, vitaminer og næringsstoffer direkte i hudens mellomlag — der kremer ikke når ned. Resultatet er dypere fukt, mer spenst og synlig glød.",
      "Behandlingen egner seg spesielt godt for tørr, stresset eller «grå» hud, og som glød-boost før anledninger. Den kombineres ofte med microneedling for enda bedre opptak.",
    ],
    passerFor: [
      "Deg med tørr og dehydrert hud som ikke svarer på kremer",
      "Deg med sliten, glansløs hud som trenger revitalisering",
      "Deg som ønsker glød før bryllup, ferie eller andre anledninger",
      "Deg som vil forebygge tidlige aldringstegn på en skånsom måte",
    ],
    passerIkkeFor: [
      "Deg som er gravid eller ammer",
      "Deg med aktiv hudinfeksjon eller betennelse i området",
      "Deg med kjent allergi mot innholdsstoffene — vi går alltid gjennom innholdet først",
    ],
    forlop: [
      { tittel: "Før", tekst: "Ingen spesielle forberedelser, men unngå blodfortynnende (inkl. Ibux) et par dager før hvis mulig — det reduserer risikoen for småblåmerker." },
      { tittel: "Under", tekst: "Huden renses og eventuelt bedøves med krem. Virkestoffene settes med svært tynne nåler i mange små punkter over området." },
      { tittel: "Etter", tekst: "Små stikkmerker og lett rødhet kan synes noen timer til et døgn. Unngå sminke resten av dagen og trening/badstue første døgnet." },
    ],
    resultat: "Fuktet, spenstigere hud med synlig glød etter få dager. Effekten bygges opp gjennom kuren og vedlikeholdes med 1–2 behandlinger i halvåret.",
    faq: [
      { q: "Er mesoterapi det samme som filler?", a: "Nei. Filler gir volum ett bestemt sted, mens mesoterapi fordeler små mengder næring og fukt utover hele hudområdet for bedre hudkvalitet — ikke volum." },
      { q: "Gjør det vondt?", a: "Nålene er svært tynne, og vi kan bruke bedøvelseskrem. De fleste synes det er helt overkommelig." },
      { q: "Når ser jeg resultat?", a: "Mange ser friskere hud allerede etter noen dager. Full effekt kommer etter en kur på 3–4 behandlinger med 2–4 ukers mellomrom." },
    ],
    relaterte: ["dermapen", "kjemisk-peeling", "hudkonsultasjon"],
  },
  {
    slug: "filler",
    navn: "Filler (hyaluronsyre)",
    kortNavn: "Filler",
    kategori: "injeksjon",
    kategoriNavn: "Filler",
    kort: "Filler med hyaluronsyre i Grimstad — naturlig volum og konturering utført av kosmetisk sykepleier med lege som medisinsk ansvarlig. Lepper fra 2 400 kr.",
    pris: "Lepper fra 2.400,- · volum 3.600,-",
    prisliste: [
      { navn: "Leppebehandling", pris: "2.400,- – 3.400,-" },
      { navn: "Volumbehandling", pris: "3.600,-" },
      { navn: "Skinbooster 1 ml", pris: "2.900,-" },
      { navn: "Skinbooster 2 ml", pris: "5.200,-" },
      { navn: "Fjerning av filler", pris: "1.500,-" },
    ],
    varighet: "Ca. 45–60 minutter inkl. vurdering",
    holdbarhet: "6–18 måneder avhengig av område og produkt",
    hvaEr: [
      "Filler er en gel basert på hyaluronsyre — et stoff som finnes naturlig i huden — som brukes til å gjenopprette volum, jevne ut furer eller framheve konturer som lepper, kinnben og kjevelinje. Vi bruker anerkjente, veldokumenterte produkter.",
      "Vår tilnærming er nøktern: naturlige resultater som ser ut som deg, bare litt friskere. Hos oss utføres behandlingen av kosmetisk sykepleier, med lege som medisinsk ansvarlig, og vi starter alltid med en grundig vurdering av ansiktet som helhet — noen ganger er anbefalingen mindre enn du kom inn for, eller en annen behandling.",
    ],
    passerFor: [
      "Deg som ønsker mer fylde i leppene med naturlig resultat",
      "Deg med volumtap i kinn eller dype nasolabialfurer",
      "Deg som vil definere kjevelinje eller hake",
      "Deg over 18 år — vi behandler ikke yngre, og gjør alltid en selvstendig vurdering",
    ],
    passerIkkeFor: [
      "Deg som er gravid eller ammer",
      "Deg med aktiv infeksjon eller herpesutbrudd i området",
      "Deg med autoimmun sykdom i aktiv fase — vurderes med ansvarlig lege",
      "Deg under 18 år",
    ],
    forlop: [
      { tittel: "Før", tekst: "Vi går gjennom ønsker, helse og medisiner, og gjør en ærlig faglig vurdering. Unngå blodfortynnende håndkjøpspreparater (som Ibux) et par dager før hvis mulig — det reduserer blåmerker." },
      { tittel: "Under", tekst: "Området renses og bedøves (krem, og de fleste fillere inneholder også lokalbedøvelse). Selve injeksjonene tar 15–30 minutter, og vi jobber gradvis med speil underveis." },
      { tittel: "Etter", tekst: "Lett hevelse og ømhet er normalt i 1–3 dager, og små blåmerker kan forekomme. Unngå trening, alkohol og sterk varme første døgnet, og ikke masser området." },
    ],
    resultat: "Resultatet ses umiddelbart, og det endelige uttrykket kommer når hevelsen har lagt seg etter noen dager. Holdbarheten er typisk 6–12 måneder i lepper og 12–18 måneder i kinn/kjeve — hyaluronsyren brytes gradvis og naturlig ned.",
    faq: [
      { q: "Blir det synlig at jeg har tatt filler?", a: "Ikke slik vi jobber. Vi bruker moderate mengder og bygger heller gradvis over flere besøk enn å legge for mye på én gang. Målet er at folk sier «du ser opplagt ut», ikke «hva har du gjort?»." },
      { q: "Er filler trygt?", a: "Hyaluronsyrefiller er veldokumentert og kan i tillegg løses opp med enzym om nødvendig. Trygghet handler mest om hvem som behandler: hos oss settes filler av kosmetisk sykepleier med lege som medisinsk ansvarlig, med beredskap for komplikasjoner." },
      { q: "Gjør det vondt?", a: "Med bedøvelseskrem og lokalbedøvelse i selve produktet er ubehaget moderat. Lepper er mest sensitivt; kinn og kjeve kjennes lite." },
      { q: "Hvor mye trenger jeg?", a: "Det vurderer vi sammen. Til lepper starter mange med 0,5 ml for et naturlig resultat. Det er alltid lettere å legge til enn å ta bort." },
      { q: "Kan filler fjernes?", a: "Ja — hyaluronsyrefiller kan løses opp med hyaluronidase, en behandling vi også tilbyr." },
    ],
    relaterte: ["fjerning-av-filler", "muskelavslappende-behandling", "hudkonsultasjon"],
  },
  {
    slug: "fjerning-av-filler",
    navn: "Fjerning av filler",
    kategori: "injeksjon",
    kategoriNavn: "Filler",
    kort: "Trygg oppløsning av hyaluronsyrefiller med hyaluronidase i Grimstad — også filler satt andre steder. 1 500 kr.",
    pris: "1.500,-",
    varighet: "Ca. 30–45 minutter",
    hvaEr: [
      "Hyaluronsyrefiller kan løses opp med hyaluronidase — et enzym som bryter ned fillergelen i løpet av timer til dager. Behandlingen brukes når filler er uønsket, feilplassert, har vandret, eller når du rett og slett angrer.",
      "Vi behandler også filler som er satt ved andre klinikker. Etter oppløsning kan området vurderes på nytt, og eventuelt ny filler legges tidligst etter et par uker.",
    ],
    passerFor: [
      "Deg som er misfornøyd med filler — uansett hvor den ble satt",
      "Deg med klumper, ujevnheter eller filler som har vandret",
      "Deg med gammel filler som har hopet seg opp over tid",
    ],
    passerIkkeFor: [
      "Filler som ikke er hyaluronsyrebasert — enzymet virker kun på hyaluronsyre",
      "Deg med kjent allergi mot bier/veps bør si fra — det gir noe økt risiko for reaksjon på enzymet, og vi tar forholdsregler",
      "Deg som er gravid eller ammer",
    ],
    forlop: [
      { tittel: "Før", tekst: "Vi kartlegger hvilken filler som er satt, hvor og når. Ved behov gjør vi en liten allergitest i huden før full behandling." },
      { tittel: "Under", tekst: "Enzymet injiseres i området der filleren ligger, og masseres lett inn. Det kan svi litt mer enn vanlig filler-injeksjon, men går raskt over." },
      { tittel: "Etter", tekst: "Området kan hovne midlertidig og bli ømt et par dager. Filleren brytes ned i løpet av 1–3 døgn; noen ganger trengs en runde til for full oppløsning." },
    ],
    resultat: "Filleren er som regel merkbart redusert allerede dagen etter, og full effekt ses etter få dager. Ønsker du ny filler, venter vi minst 2 uker så vevet får roet seg.",
    faq: [
      { q: "Løser enzymet opp mitt eget naturlige hyaluron også?", a: "Enzymet bryter ned hyaluronsyre der det settes, inkludert noe av kroppens egen — men den gjendannes naturlig i løpet av kort tid. Området normaliseres." },
      { q: "Fjerner dere filler satt andre steder?", a: "Ja, det er faktisk en vanlig grunn til at folk kommer til oss. Vi gjør alltid en selvstendig vurdering først." },
      { q: "Kan jeg sette ny filler etterpå?", a: "Ja, tidligst etter ca. 2 uker. Da har enzymet gjort seg ferdig og vevet er klart for et nytt, riktig resultat." },
    ],
    relaterte: ["filler", "hudkonsultasjon", "muskelavslappende-behandling"],
  },
  {
    slug: "muskelavslappende-behandling",
    navn: "Medisinsk rynkebehandling",
    kortNavn: "Rynkebehandling",
    kategori: "injeksjon",
    kategoriNavn: "Medisinsk rynkebehandling",
    kort: "Medisinsk rynkebehandling i Grimstad — muskelavslappende injeksjoner mot dynamiske rynker. Fra 1 400 kr, utført av helsepersonell med lege som medisinsk ansvarlig.",
    pris: "1 område 2.000,- · lite område 1.400,-",
    prisliste: [
      { navn: "Lite område", pris: "1.400,-" },
      { navn: "1 område", pris: "2.000,-" },
      { navn: "2 områder", pris: "3.400,-" },
      { navn: "3 områder", pris: "4.300,-" },
      { navn: "Anspent kjeve / tanngnissing", pris: "3.600,-" },
      { navn: "Svettebehandling", pris: "4.600,-" },
    ],
    varighet: "Ca. 30 minutter inkl. konsultasjon",
    holdbarhet: "3–4 måneder",
    hvaEr: [
      "Dynamiske rynker — sinnarynken, pannerynker og smilerynker rundt øynene — dannes av gjentatte muskelbevegelser. Muskelavslappende behandling demper aktiviteten i de aktuelle musklene, slik at huden over får hvile og linjene glattes ut.",
      "Behandlingen krever konsultasjon med vurdering av helsepersonell først, og hos oss utføres den under ansvar av lege. Vi doserer for et naturlig resultat der du fortsatt har mimikk — du skal se uthvilt ut, ikke «frossen».",
      "Det samme virkestoffet brukes også mot plager som ikke handler om rynker: kraftig svette i armhulene, og anspent kjeve med tanngnissing. Begge deler behandler vi hos oss, og de prises for seg.",
    ],
    passerFor: [
      "Deg med markert sinnarynke, pannerynker eller smilerynker",
      "Deg som synes du ser sint eller sliten ut uten å være det",
      "Deg som ønsker å forebygge at dynamiske linjer setter seg som varige furer",
      "Deg som er plaget av kraftig svette i armhulene",
      "Deg med anspent kjeve, tanngnissing eller press-smerter i kjevemuskulaturen",
    ],
    passerIkkeFor: [
      "Deg som er gravid eller ammer",
      "Deg med nevromuskulær sykdom (f.eks. myasthenia gravis)",
      "Deg med infeksjon i behandlingsområdet",
      "Deg under 18 år",
    ],
    forlop: [
      { tittel: "Før", tekst: "Alltid konsultasjon først: vi kartlegger mimikken din, helse og medisiner, og vurderer om behandlingen egner seg for deg. Unngå blodfortynnende håndkjøpspreparater et par dager før om mulig." },
      { tittel: "Under", tekst: "Selve injeksjonene tar under 10 minutter og settes med svært tynn nål på nøye utvalgte punkter. De fleste beskriver det som små stikk." },
      { tittel: "Etter", tekst: "Du kan gå rett tilbake til hverdagen, men unngå trening, alkohol og å ligge flatt de første 4 timene, og ikke gni området første døgnet." },
    ],
    resultat: "Effekten kommer gradvis i løpet av 3–14 dager og varer typisk 3–4 måneder. Vi tilbyr alltid en kontroll etter ca. 2 uker med mulighet for justering.",
    faq: [
      { q: "Blir jeg stiv i ansiktet?", a: "Ikke med riktig dosering. Vi doserer bevisst for et naturlig resultat med bevart mimikk — heller litt for lite første gang, med justering på kontrollen, enn for mye." },
      { q: "Når ser jeg effekt?", a: "De første tegnene kommer etter 3–5 dager, og full effekt etter ca. 2 uker. Derfor legger vi kontrollen dit." },
      { q: "Hvor ofte kan jeg ta behandlingen?", a: "Effekten varer 3–4 måneder, og det er også et fornuftig intervall. Hyppigere behandling anbefales ikke." },
      { q: "Hvorfor står det ikke produktnavn her?", a: "Preparatene som brukes er reseptbelagte legemidler, og norsk regelverk tillater ikke markedsføring av dem. På konsultasjonen får du selvsagt full informasjon om hva som brukes." },
      { q: "Hva regnes som ett område?", a: "Ett område er for eksempel sinnarynken, pannen eller smilerynkene rundt øynene. «Lite område» brukes om mindre partier, som nesen eller haken. Vi går gjennom hva du trenger på konsultasjonen." },
      { q: "Hjelper det mot svette og tanngnissing?", a: "Ja. Ved kraftig svette i armhulene demper behandlingen svetteproduksjonen i 4–6 måneder. Ved anspent kjeve og tanngnissing slappes tyggemusklene av, som ofte gir mindre smerter og hodepine. Begge deler krever konsultasjon først." },
      { q: "Gjelder studentrabatten her?", a: "Nei, injeksjonsbehandlinger er unntatt studentrabatten." },
    ],
    relaterte: ["filler", "hudkonsultasjon", "dermapen"],
  },
];

export function getBehandling(slug: string): BehandlingDetalj | undefined {
  return BEHANDLINGER.find((b) => b.slug === slug);
}
