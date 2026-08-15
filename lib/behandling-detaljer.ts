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
  kategori: "konsultasjon" | "vipper-bryn" | "hudbehandlinger" | "laser" | "injeksjon";
  kategoriNavn: string;
  /** Én setning til meta description og kort-intro (maks ~155 tegn) */
  kort: string;
  pris: string;
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
    kort: "Gratis hudanalyse hos kosmetisk sykepleier i Grimstad. Du får en individuell behandlingsplan — uforpliktende.",
    pris: "Gratis",
    varighet: "Ca. 30–45 minutter",
    hvaEr: [
      "En hudkonsultasjon er startpunktet for all behandling hos oss. Vi går systematisk gjennom hudens tilstand, historikk og det du ønsker å oppnå — enten det gjelder akne, pigmentering, rødhet, hudkvalitet eller aldringstegn.",
      "Du får en ærlig vurdering av hva som faktisk vil hjelpe for din hud, en konkret behandlingsplan med prisoverslag, og anbefalinger om hjemmepleie. Noen ganger er svaret at du ikke trenger behandling — det sier vi også.",
    ],
    passerFor: [
      "Deg som er usikker på hvilken behandling som passer",
      "Deg med en konkret hudutfordring (akne, pigmentflekker, rødhet, arr)",
      "Deg som vurderer laser- eller injeksjonsbehandling og vil ha en faglig vurdering først",
      "Deg som vil ha en hudpleierutine som faktisk virker",
    ],
    forlop: [
      { tittel: "Kartlegging", tekst: "Vi går gjennom hudhistorikk, tidligere behandlinger, medisiner og hva du ønsker å oppnå." },
      { tittel: "Hudanalyse", tekst: "Huden undersøkes i godt lys, og vi vurderer hudtype, tilstand og hva den trenger." },
      { tittel: "Plan", tekst: "Du får en konkret anbefaling: behandlinger, rekkefølge, forventet resultat og pris. Konsultasjonen er gratis, og du er ikke bundet til å bestille noe." },
    ],
    resultat: "Du går ut døren med en tydelig plan for huden din — hva som anbefales, hvorfor, i hvilken rekkefølge og hva det koster.",
    faq: [
      { q: "Må jeg ha konsultasjon før behandling?", a: "For laser- og injeksjonsbehandlinger gjør vi alltid en vurdering først — den kan ofte tas samme dag som behandlingen. For enklere behandlinger som vipper og bryn trenger du ikke konsultasjon." },
      { q: "Hva koster konsultasjonen?", a: "Ingenting. Hudkonsultasjonen er gratis og uforpliktende — du får en ærlig vurdering og en plan, og bestemmer selv om du vil bestille behandling etterpå." },
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
    pris: "590,-",
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
    relaterte: ["brynslaminering", "farging-vipper", "farging-forming-bryn"],
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
    relaterte: ["farging-forming-vipper-bryn", "farging-forming-bryn", "hudkonsultasjon"],
  },
  {
    slug: "farging-forming-bryn",
    navn: "Farging og forming av bryn",
    kategori: "vipper-bryn",
    kategoriNavn: "Vipper & Bryn",
    kort: "Farging og forming av bryn med voks i Grimstad. Definerte, ryddige bryn tilpasset ditt ansikt.",
    pris: "490,-",
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
    relaterte: ["farging-forming-vipper-bryn", "brynslaminering", "farging-forming-bryn"],
  },
  {
    slug: "kjemisk-peeling",
    navn: "Kjemisk peeling",
    kategori: "hudbehandlinger",
    kategoriNavn: "Hudbehandlinger",
    kort: "Kjemisk peeling i Grimstad tilpasset din hudtype — jevnere hudtone, mindre uren hud og friskere glød. Fra 1 500 kr.",
    pris: "Fra 1.500,-",
    varighet: "Ca. 30–45 minutter",
    antall: "1–6 behandlinger avhengig av mål",
    hvaEr: [
      "Kjemisk peeling bruker syrer (som regel frukt-, melke- eller salisylsyre i ulik styrke) til å løsne døde hudceller og sette fart på hudens egen fornyelse. Resultatet er jevnere hudtone, finere hudstruktur og friskere glød.",
      "Hos oss velges syretype og styrke ut fra huden din og målet ditt — uren hud, pigmentering, fine linjer eller generell hudkvalitet. En medisinsk peeling er noe helt annet enn en «spa-peeling», og skal derfor gjøres av behandlere med riktig kompetanse.",
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
      { q: "Kan peeling kombineres med andre behandlinger?", a: "Ja, peeling inngår ofte i en behandlingsplan sammen med microneedling eller laser — men ikke samme dag. Vi setter opp riktig rekkefølge for deg." },
    ],
    relaterte: ["dermapen", "hudkonsultasjon", "mesoterapi"],
  },
  {
    slug: "dermapen",
    navn: "Microneedling med Dermapen",
    kortNavn: "Dermapen",
    kategori: "hudbehandlinger",
    kategoriNavn: "Hudbehandlinger",
    kort: "Microneedling med Dermapen i Grimstad — stimulerer kollagen og forbedrer arr, porer, linjer og hudstruktur. Fra 2 690 kr.",
    pris: "Fra 2.690,-",
    varighet: "Ca. 60 minutter",
    antall: "3–6 behandlinger for best resultat",
    hvaEr: [
      "Microneedling lager tusenvis av mikroskopiske kanaler i huden med sterile nåler. Det høres dramatisk ut, men er en kontrollert stimulering som setter i gang hudens egen reparasjon — produksjonen av kollagen og elastin øker, og huden bygger seg gradvis fastere og jevnere.",
      "Vi bruker Dermapen, som gir presis nåledybde tilpasset område og problemstilling. Behandlingen er godt dokumentert for aknearr, store porer, fine linjer og generell hudkvalitet.",
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
    relaterte: ["mesoterapi", "kjemisk-peeling", "prp-behandling"],
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
    slug: "aknebehandling-laser",
    navn: "Aknebehandling med laser",
    kortNavn: "Aknebehandling",
    kategori: "laser",
    kategoriNavn: "Laserbehandlinger",
    kort: "Laserbehandling mot akne i Grimstad (Nd:YAG) — reduserer betennelse og forebygger nye utbrudd. Fra 1 800 kr.",
    pris: "Fra 1.800,-",
    varighet: "Ca. 30–45 minutter",
    antall: "4–6 behandlinger, hver 2.–4. uke",
    hvaEr: [
      "Nd:YAG-laseren sender varmeenergi ned i huden som demper betennelsen i aktive aknelesjoner, reduserer bakterienivået og roer ned overaktive talgkjertler. Behandlingen fungerer godt både på ansikt og kropp (rygg/bryst).",
      "Laser er et godt alternativ eller supplement for deg som ikke ønsker, eller ikke har hatt effekt av, kremer og tabletter — og den kan trygt kombineres med medisinsk hudpleie hjemme.",
    ],
    passerFor: [
      "Deg med inflammatorisk akne (røde, ømme kviser)",
      "Deg som ikke ønsker eller tåler aknemedisiner",
      "Deg med akne på rygg eller bryst",
      "Deg som vil redusere risikoen for nye arr ved å få kontroll på betennelsen",
    ],
    passerIkkeFor: [
      "Deg som er gravid",
      "Deg som bruker isotretinoin (Roaccutan) — det bør gå tid etter avsluttet kur; vi vurderer individuelt",
      "Nylig solbrun hud — vent 1–2 uker etter kraftig soling",
    ],
    forlop: [
      { tittel: "Før", tekst: "Unngå sterk soling i 1–2 uker før behandling. Kom med ren hud uten sminke om mulig." },
      { tittel: "Under", tekst: "Laserpulsene kjennes som varme knips mot huden. Et ansikt tar rundt 20–30 minutter." },
      { tittel: "Etter", tekst: "Huden kan være rød og varm noen timer. Du kan i praksis gå rett tilbake til hverdagen, men bruk SPF daglig og unngå soling mellom behandlingene." },
    ],
    resultat: "De fleste ser roligere hud med færre aktive utbrudd i løpet av kuren på 4–6 behandlinger. Vedlikeholdsbehandlinger kan være aktuelt ved kronisk tendens.",
    faq: [
      { q: "Hjelper laser mot aknearr også?", a: "Denne behandlingen retter seg mot aktiv akne. For arr etter akne er microneedling med Dermapen ofte førstevalget — mange kombinerer: først kontroll på aknen, så arrbehandling." },
      { q: "Gjør det vondt?", a: "Det kjennes som varme, raske knips. De fleste tåler det fint uten bedøvelse." },
      { q: "Kan jeg kombinere med hudpleieprodukter mot akne?", a: "Ja, riktig hjemmepleie forsterker resultatet. Vi setter opp en enkel rutine som ikke irriterer huden mellom behandlingene." },
      { q: "Hvor raskt ser jeg effekt?", a: "Noen merker roligere hud etter første behandling, men regn med 2–3 behandlinger før tydelig forbedring. Full evaluering gjør vi etter kuren." },
    ],
    relaterte: ["dermapen", "kjemisk-peeling", "hudkonsultasjon"],
  },
  {
    slug: "blodkarbehandling-laser",
    navn: "Blodkarbehandling med laser",
    kortNavn: "Blodkarbehandling",
    kategori: "laser",
    kategoriNavn: "Laserbehandlinger",
    kort: "Laserbehandling av sprengte blodkar og rødhet i ansiktet — rask og effektiv behandling i Grimstad. Fra 1 500 kr.",
    pris: "Fra 1.500,-",
    varighet: "Ca. 15–30 minutter",
    antall: "1–3 behandlinger",
    hvaEr: [
      "Synlige blodkar på nese, kinn eller hake er ufarlige, men mange plages kosmetisk av dem. Laseren sender lysenergi som absorberes av blodet i karet — karet varmes opp, lukkes og brytes gradvis ned av kroppen selv.",
      "Behandlingen er rask og presis: enkeltkar kan ofte fjernes på én til to behandlinger, mens diffus rødhet over større områder kan kreve flere.",
    ],
    passerFor: [
      "Deg med synlige, sprengte blodkar på nese eller kinn",
      "Deg med diffus rødhet i ansiktet",
      "Deg med små «blodprikker» (kirsebærangiomer) på kroppen",
    ],
    passerIkkeFor: [
      "Deg som er gravid",
      "Nylig solbrun hud — vent 1–2 uker",
      "Deg som bruker blodfortynnende — si fra, så vurderer vi sammen",
    ],
    forlop: [
      { tittel: "Før", tekst: "Unngå kraftig soling 1–2 uker før. Ingen andre forberedelser trengs." },
      { tittel: "Under", tekst: "Laserpulsene rettes presist mot karene. Det kjennes som små varme stikk, og enkeltkar tar bare minutter å behandle." },
      { tittel: "Etter", tekst: "Området kan være rødt og lett hovent i noen timer til et par dager. Karet kan se mørkere ut før det gradvis blekner over 2–4 uker." },
    ],
    resultat: "Enkeltkar forsvinner ofte etter 1–2 behandlinger. Diffus rødhet reduseres gradvis over 2–3 behandlinger med noen ukers mellomrom.",
    faq: [
      { q: "Kommer blodkarene tilbake?", a: "Kar som er behandlet ferdig, er borte. Huden din kan imidlertid danne nye kar over tid, spesielt ved rosacea eller mye solpåvirkning — derfor er solbeskyttelse viktig." },
      { q: "Gjør det vondt?", a: "Det kjennes som korte, varme stikk. Behandlingen er så rask at de fleste synes det er uproblematisk." },
      { q: "Kan jeg gå på jobb etterpå?", a: "Ja. Lett rødhet kan synes noen timer, men de fleste går rett tilbake til hverdagen." },
    ],
    relaterte: ["rosacea-behandling-laser", "hudkonsultasjon", "kjemisk-peeling"],
  },
  {
    slug: "harfjerning-laser",
    navn: "Hårfjerning med laser",
    kortNavn: "Hårfjerning",
    kategori: "laser",
    kategoriNavn: "Laserbehandlinger",
    kort: "Permanent hårreduksjon med medisinsk laser i Grimstad — tilpasset hudtype og hårfarge. Fra 650 kr per område.",
    pris: "Fra 650,- pr. område",
    varighet: "15–60 minutter avhengig av område",
    antall: "6–8 behandlinger, hver 4.–8. uke",
    hvaEr: [
      "Laserlyset absorberes av pigmentet i hårsekken, som varmes opp og settes ut av spill. Hår som er i vekstfase ved behandlingen, slutter å vokse — og fordi bare en andel av hårene er i vekstfase til enhver tid, trengs det flere behandlinger for et varig resultat.",
      "Vi bruker medisinsk laser og tilpasser innstillingene til din hudtype og hårfarge. Best effekt får mørke hår; helt lyse, grå eller røde hår mangler pigmentet laseren trenger, og da er ikke laser riktig løsning — det sier vi ærlig fra om på forhånd.",
    ],
    passerFor: [
      "Deg som er lei av barbering, voksing og inngrodde hår",
      "Deg med mørke hår på lys eller medium hud (best effekt)",
      "Deg med inngrodde hår og «barberingskviser» — laser hjelper ofte raskt",
      "Både kvinner og menn — vanlige områder er ansikt, armhuler, bikinilinje, legger og rygg",
    ],
    passerIkkeFor: [
      "Helt lyse, grå eller røde hår — laseren har ikke pigment å jobbe med",
      "Deg som er gravid",
      "Nylig solbrun hud i området — vent 2–4 uker",
      "Områder med tatovering behandles ikke over tatoveringen",
    ],
    forlop: [
      { tittel: "Før", tekst: "Barber området 1–2 dager før (ikke voks/napp — hårsekken må være intakt). Unngå soling og selvbruning i 2–4 uker før behandling." },
      { tittel: "Under", tekst: "Laserpulsene kjennes som raske, varme knips. Overleppe tar 10 minutter, legger opp mot en time." },
      { tittel: "Etter", tekst: "Huden kan være lett rød som etter soling i noen timer. Behandlede hår «vokser ut» og faller av i løpet av 1–3 uker. Bruk SPF på behandlede områder som utsettes for sol." },
    ],
    resultat: "Merkbart mindre hårvekst allerede etter 2–3 behandlinger. Etter fullført kur på 6–8 behandlinger har de fleste en varig hårreduksjon på størstedelen av hårene; en årlig vedlikeholdsbehandling kan være aktuelt.",
    faq: [
      { q: "Er det permanent?", a: "Behandlingen gir permanent hårreduksjon — de fleste blir kvitt størstedelen av hårene varig. Hormonelle endringer kan aktivere nye hårsekker senere, derfor snakker vi om reduksjon og ikke 100 % fjerning." },
      { q: "Hvorfor trengs så mange behandlinger?", a: "Laseren virker bare på hår i aktiv vekstfase, og kun en andel av hårene er i den fasen til enhver tid. Derfor behandler vi med 4–8 ukers mellomrom til alle hårsekkene er tatt." },
      { q: "Kan jeg ta laser om sommeren?", a: "Ja, men området som behandles må ikke være solbrunt, og du må være nøye med SPF. Mange velger å starte kuren på høsten." },
      { q: "Fungerer det på alle hudtyper?", a: "Vår laser kan tilpasses ulike hudtyper, også mørkere hud. Kom til en uforpliktende vurdering, så tester vi og setter riktige innstillinger." },
    ],
    relaterte: ["hudkonsultasjon", "aknebehandling-laser", "blodkarbehandling-laser"],
  },
  {
    slug: "leppelaser",
    navn: "Leppelaser (LipLase)",
    kortNavn: "Leppelaser",
    kategori: "laser",
    kategoriNavn: "Laserbehandlinger",
    kort: "Leppelaser i Grimstad — fyldigere lepper via naturlig kollagenstimulering, uten injeksjoner. Fra 1 900 kr.",
    pris: "Fra 1.900,-",
    varighet: "Ca. 30 minutter",
    antall: "3–4 behandlinger, hver 2.–3. uke",
    hvaEr: [
      "Leppelaser er alternativet for deg som ønsker fyldigere og mer markerte lepper uten filler. Laseren varmer opp vevet i og rundt leppene kontrollert, noe som stimulerer kroppens egen kollagenproduksjon — leppene bygger seg gradvis fyldigere, fastere og jevnere.",
      "Resultatet er subtilt og naturlig: bedre definisjon, mer fukt og volum som kommer fra ditt eget vev. Behandlingen glatter også fine linjer rundt munnen.",
    ],
    passerFor: [
      "Deg som ønsker naturlig fyldigere lepper uten injeksjoner",
      "Deg med tørre lepper og fine linjer rundt munnen",
      "Deg som synes filler blir for mye, men ønsker litt ekstra",
    ],
    passerIkkeFor: [
      "Deg som ønsker markant volumøkning — da gir filler mer synlig resultat",
      "Deg med aktivt herpesutbrudd (forkjølelsessår) — vent til det er leget, og si fra hvis du er utsatt",
      "Deg som er gravid eller ammer",
    ],
    forlop: [
      { tittel: "Før", tekst: "Ingen spesielle forberedelser. Er du utsatt for forkjølelsessår, si fra — laserbehandling kan trigge utbrudd, og vi kan legge en plan." },
      { tittel: "Under", tekst: "Laseren føres over leppene i flere passeringer, både utenpå og på innsiden. Det kjennes varmt, men er godt tolerert uten bedøvelse." },
      { tittel: "Etter", tekst: "Leppene er lett hovne og røde noen timer — mange liker den umiddelbare «plump»-effekten. Bruk leppepomade med SPF og unngå sterk sol de første dagene." },
    ],
    resultat: "Umiddelbar fukt- og fyldeeffekt, mens den varige kollagenoppbyggingen kommer gradvis gjennom kuren på 3–4 behandlinger. Resultatet er naturlig og vedlikeholdes med enkeltbehandlinger 1–2 ganger i året.",
    faq: [
      { q: "Blir effekten som med filler?", a: "Nei — leppelaser gir en subtil, naturlig økning i fylde og definisjon fra ditt eget kollagen. Ønsker du tydelig volumøkning, er filler riktigere verktøy. Mange kombinerer også: laser for kvalitet, filler for volum." },
      { q: "Gjør det vondt?", a: "Det kjennes som varme og prikking, men de aller fleste gjennomfører uten bedøvelse." },
      { q: "Hvor lenge varer resultatet?", a: "Kollagenet du bygger opp er ditt eget og brytes ned langsomt. Med vedlikehold 1–2 ganger i året holder resultatet seg godt." },
    ],
    relaterte: ["filler", "dermapen", "oyelokk-laser"],
  },
  {
    slug: "oyelokk-laser",
    navn: "Øyelokksløft med laser",
    kortNavn: "Øyelokk-laser",
    kategori: "laser",
    kategoriNavn: "Laserbehandlinger",
    kort: "Ikke-kirurgisk øyelokksløft med laser i Grimstad — strammere hud og færre rynker rundt øynene. Fra 2 900 kr.",
    pris: "Fra 2.900,-",
    varighet: "Ca. 45 minutter",
    antall: "2–4 behandlinger, med 3–4 ukers mellomrom",
    hvaEr: [
      "Huden rundt øynene er tynn og viser aldringstegn tidlig — slappe øvre øyelokk og rynker gjør blikket «tyngre». Laserbehandlingen varmer opp huden kontrollert (ablativ teknikk) slik at den trekker seg sammen og stimuleres til å bygge nytt kollagen.",
      "Dette er et ikke-kirurgisk alternativ for deg som opplever begynnende slapphet, men som ikke ønsker eller ennå ikke trenger operasjon. Ved uttalt overskuddshud er kirurgi riktigere — det får du ærlig beskjed om i vurderingen.",
    ],
    passerFor: [
      "Deg med lett til moderat slapphet i øvre øyelokk",
      "Deg med rynker og «smilerynker» rundt øynene",
      "Deg som vil stramme opp blikket uten kirurgi og lang rekonvalesens",
    ],
    passerIkkeFor: [
      "Deg med uttalt overskuddshud som hviler på vippekanten — da bør kirurgi vurderes",
      "Deg som er gravid",
      "Deg med øyesykdom under utredning — avklar med lege først",
    ],
    forlop: [
      { tittel: "Før", tekst: "Unngå soling i området i 2 uker før. Kom usminket i øyeområdet. Vi vurderer alltid om laser er riktig for din grad av slapphet før vi starter." },
      { tittel: "Under", tekst: "Øynene beskyttes, og laseren jobber i korte pulser over øyelokk og rundt øynene. Det kjennes som varme prikk; bedøvelseskrem kan brukes." },
      { tittel: "Etter", tekst: "Huden er rød og kan være lett hoven i 2–4 dager, med fin flassing etter hvert. Unngå sminke til huden er leget, og bruk SPF og solbriller ute i flere uker." },
    ],
    resultat: "Strammere hud rundt øynene og et «lettere» blikk som utvikler seg gradvis over ukene etter behandling, med best resultat etter fullført kur på 2–4 behandlinger.",
    faq: [
      { q: "Kan dette erstatte et kirurgisk øyelokksløft?", a: "Ved lett til moderat slapphet gir laser god oppstramming uten kirurgi. Ved mye overskuddshud er operasjon eneste som virkelig monner — vi sier ærlig fra hvis det er tilfellet for deg." },
      { q: "Hvor lang er nedetiden?", a: "Regn med rødhet og lett hevelse i 2–4 dager og noe flassing etter det. De fleste tar behandlingen mot slutten av uken og er fine til mandag." },
      { q: "Hvor lenge varer resultatet?", a: "Kollagenet som bygges er ditt eget, og resultatet holder seg typisk 1–2 år eller mer. Aldringen fortsetter naturlig, og vedlikeholdsbehandling kan tas ved behov." },
    ],
    relaterte: ["leppelaser", "muskelavslappende-behandling", "dermapen"],
  },
  {
    slug: "rosacea-behandling-laser",
    navn: "Rosacea-behandling med laser",
    kortNavn: "Rosacea-behandling",
    kategori: "laser",
    kategoriNavn: "Laserbehandlinger",
    kort: "Laserbehandling av rosacea i Grimstad — reduserer vedvarende rødhet og synlige blodkar. Fra 1 900 kr.",
    pris: "Fra 1.900,-",
    varighet: "Ca. 30–45 minutter",
    antall: "2–4 behandlinger, med 3–4 ukers mellomrom",
    hvaEr: [
      "Rosacea er en kronisk hudtilstand som gir rødhet, synlige blodkar og i perioder små betente knopper, oftest på kinn, nese og hake. Laseren behandler de utvidede blodkarene som gir rødheten — karene varmes opp, lukkes og brytes ned av kroppen.",
      "Laser fjerner ikke selve tendensen til rosacea, men er blant de mest effektive måtene å redusere det synlige uttrykket på. Kombinert med riktig hudpleie og kunnskap om egne triggere får de fleste god og varig kontroll.",
    ],
    passerFor: [
      "Deg med vedvarende rødhet i kinn, nese eller hake",
      "Deg med synlige blodkar knyttet til rosacea",
      "Deg som blusser lett og er plaget av det i sosiale sammenhenger",
      "Deg som har prøvd kremer uten tilstrekkelig effekt på rødheten",
    ],
    passerIkkeFor: [
      "Deg med aktiv utbruddsfase med mye betente knopper — dette roes ofte medisinsk først; vi samarbeider med ansvarlig lege",
      "Deg som er gravid",
      "Nylig solbrun hud — vent 1–2 uker",
    ],
    forlop: [
      { tittel: "Før", tekst: "Unngå kraftig soling 1–2 uker før, og kom gjerne uten sminke. Ved førstegangsbesøk kartlegger vi rosaceaen og legger en samlet plan med hudpleie." },
      { tittel: "Under", tekst: "Laserpulsene kjennes som varme knips over de røde områdene. En behandling tar 20–40 minutter avhengig av utbredelse." },
      { tittel: "Etter", tekst: "Rødheten kan øke i noen timer til et par dager før den roer seg. Bruk mild hudpleie og daglig SPF — sol er en av de vanligste rosacea-triggerne." },
    ],
    resultat: "Gradvis mindre rødhet og færre synlige kar gjennom kuren på 2–4 behandlinger. Mange holder resultatet godt med en vedlikeholdsbehandling årlig og riktig hudpleie.",
    faq: [
      { q: "Blir jeg kvitt rosacea for godt?", a: "Rosacea er en kronisk tilstand som ikke kan «kureres», men det synlige uttrykket — rødhet og kar — kan reduseres betydelig og holdes nede med vedlikehold og riktig pleie." },
      { q: "Hvilken hudpleie bør jeg bruke ved rosacea?", a: "Mild rens, fuktighet som styrker hudbarrieren og daglig SPF. Vi setter opp en enkel rutine — blant annet fra ZO Skin Health — som ikke trigger huden." },
      { q: "Hva trigger rosacea?", a: "Vanlige triggere er sol, alkohol, sterk mat, temperatursvingninger og stress. Det varierer fra person til person, og vi hjelper deg å identifisere dine." },
    ],
    relaterte: ["blodkarbehandling-laser", "hudkonsultasjon", "mesoterapi"],
  },
  {
    slug: "filler",
    navn: "Filler (hyaluronsyre)",
    kortNavn: "Filler",
    kategori: "injeksjon",
    kategoriNavn: "Injeksjonsbehandlinger",
    kort: "Filler med hyaluronsyre i Grimstad — naturlig volum og konturering utført av kosmetisk sykepleier med lege som medisinsk ansvarlig. Fra 2 400 kr.",
    pris: "Fra 2.400,- (0,5 ml)",
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
    relaterte: ["fjerning-av-filler", "muskelavslappende-behandling", "leppelaser"],
  },
  {
    slug: "fjerning-av-filler",
    navn: "Fjerning av filler",
    kategori: "injeksjon",
    kategoriNavn: "Injeksjonsbehandlinger",
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
    navn: "Muskelavslappende behandling",
    kategori: "injeksjon",
    kategoriNavn: "Injeksjonsbehandlinger",
    kort: "Muskelavslappende injeksjoner mot dynamiske rynker i Grimstad — naturlig resultat, utført av helsepersonell med lege som medisinsk ansvarlig.",
    pris: "Fra 2.200,- (1 område)",
    varighet: "Ca. 30 minutter inkl. konsultasjon",
    holdbarhet: "3–4 måneder",
    hvaEr: [
      "Dynamiske rynker — sinnarynken, pannerynker og smilerynker rundt øynene — dannes av gjentatte muskelbevegelser. Muskelavslappende behandling demper aktiviteten i de aktuelle musklene, slik at huden over får hvile og linjene glattes ut.",
      "Behandlingen krever konsultasjon med vurdering av helsepersonell først, og hos oss utføres den under ansvar av lege. Vi doserer for et naturlig resultat der du fortsatt har mimikk — du skal se uthvilt ut, ikke «frossen».",
    ],
    passerFor: [
      "Deg med markert sinnarynke, pannerynker eller smilerynker",
      "Deg som synes du ser sint eller sliten ut uten å være det",
      "Deg som ønsker å forebygge at dynamiske linjer setter seg som varige furer",
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
      { q: "Gjelder studentrabatten her?", a: "Nei, injeksjonsbehandlinger er unntatt studentrabatten." },
    ],
    relaterte: ["filler", "hudkonsultasjon", "oyelokk-laser"],
  },
  {
    slug: "prp-behandling",
    navn: "PRP-behandling",
    kategori: "injeksjon",
    kategoriNavn: "Injeksjonsbehandlinger",
    kort: "PRP i Grimstad — kroppens egne vekstfaktorer fra ditt blod stimulerer hudfornyelse og kollagen. Fra 3 900 kr.",
    pris: "Fra 3.900,-",
    varighet: "Ca. 60–75 minutter",
    antall: "Kur på 3 behandlinger anbefales",
    hvaEr: [
      "PRP (Platelet Rich Plasma) bruker ditt eget blod: en liten mengde tappes, sentrifugeres slik at det blodplaterike plasmaet skilles ut, og dette injiseres tilbake i huden. Blodplatene frigjør vekstfaktorer som stimulerer reparasjon, kollagenproduksjon og cellefornyelse.",
      "Fordi alt som settes tilbake kommer fra deg selv, er PRP et naturlig alternativ uten fremmede stoffer. Behandlingen brukes for hudkvalitet og glød i ansiktet, mørke ringer/tynn hud under øynene, og kan kombineres med microneedling.",
    ],
    passerFor: [
      "Deg som ønsker bedre hudkvalitet med kroppens egne ressurser",
      "Deg med tynn hud og mørke ringer under øynene",
      "Deg med begynnende aldringstegn som vil bygge huden naturlig",
      "Deg som ikke ønsker fremmede stoffer i huden",
    ],
    passerIkkeFor: [
      "Deg med blodsykdom eller lavt blodplatetall",
      "Deg som er gravid eller ammer",
      "Deg med aktiv infeksjon eller hudsykdom i området",
    ],
    forlop: [
      { tittel: "Før", tekst: "Drikk godt med vann dagen før og samme dag — det gjør blodtappingen enklere. Unngå blodfortynnende håndkjøpspreparater et par dager før om mulig." },
      { tittel: "Under", tekst: "Vi tapper en liten mengde blod (som en vanlig blodprøve), sentrifugerer det i ca. 10 minutter, og injiserer plasmaet i behandlingsområdet med tynne nåler. Bedøvelseskrem brukes ved behov." },
      { tittel: "Etter", tekst: "Lett rødhet, hevelse og småblåmerker kan ses i 1–3 dager. Unngå sminke resten av dagen, og trening/badstue første døgnet." },
    ],
    resultat: "Gradvis friskere, fastere hud over 3–6 uker etter hver behandling. Best og mest varig resultat får du med en kur på 3 behandlinger med ca. 4 ukers mellomrom, deretter vedlikehold 1–2 ganger i året.",
    faq: [
      { q: "Er PRP trygt?", a: "PRP bruker utelukkende ditt eget blod, uten tilsetninger — risikoen for allergiske reaksjoner er derfor tilnærmet null. Behandlingen utføres sterilt av helsepersonell." },
      { q: "Når ser jeg resultat?", a: "PRP jobber med hudens egne prosesser, så effekten kommer gradvis over uker. Regn med synlig forbedring 3–6 uker etter behandling, og økende effekt gjennom kuren." },
      { q: "Kan PRP kombineres med andre behandlinger?", a: "Ja — PRP kombineres ofte med microneedling («vampyrbehandling») for forsterket effekt på hudstruktur og arr." },
      { q: "Gjør det vondt?", a: "Blodtappingen kjennes som en vanlig blodprøve, og injeksjonene er godt tolerert med bedøvelseskrem. Området under øynene er mest sensitivt." },
    ],
    relaterte: ["dermapen", "mesoterapi", "filler"],
  },
];

export function getBehandling(slug: string): BehandlingDetalj | undefined {
  return BEHANDLINGER.find((b) => b.slug === slug);
}
