import type { ProductDetails } from "../product-details";

export const ZO_DETAILS: ProductDetails[] = [
  {
    sku: "ZO-001",
    intro:
      "Exfoliating Cleanser er en frisk gelrens som gjør mer enn å rense. Med salisylsyre og finmalte jojobakuler løsner den døde hudceller og overflødig talg, slik at porene holdes rene og huden føles klar og balansert.",
    longDesc: [
      "Denne rensen er utviklet for deg med normal til fet eller uren hud. Salisylsyren jobber seg ned i porene og løser opp talg og urenheter, mens de små eksfolierende kulene gir en mild mekanisk rens av hudoverflaten. Resultatet er en hud som kjennes ren og frisk – uten den stramme følelsen mange sterke renseprodukter gir.",
      "Brukt morgen og kveld legger den et godt grunnlag for resten av rutinen din, fordi serum og fuktighetskrem trenger bedre inn i ren, lett eksfoliert hud. Er du usikker på om denne eller en mildere rens passer deg best, hjelper Christina i klinikken deg gjerne med å velge.",
    ],
    benefits: [
      "Renser dypt uten å tørke ut huden",
      "Salisylsyre løser opp talg og urenheter i porene",
      "Milde jojobakuler eksfolierer hudoverflaten skånsomt",
      "Forebygger utbrudd og gjør porene mindre synlige",
      "Forbereder huden på serum og aktive produkter",
    ],
    usage: [
      "Fukt ansikt og hals med lunkent vann.",
      "Masser en liten mengde rens over huden i sirkelbevegelser, morgen og kveld.",
      "Skyll grundig og klapp huden tørr.",
      "Følg opp med toner eller serum mens huden fortsatt er frisk og ren.",
    ],
    ingredients: [
      { name: "Salisylsyre (BHA)", effect: "Oljeløselig syre som renser porene og motvirker urenheter" },
      { name: "Jojobaestere", effect: "Milde eksfolierende kuler som fjerner døde hudceller uten å ripe opp huden" },
      { name: "Glyserin", effect: "Trekker fukt til huden og hindrer uttørking under rensing" },
      { name: "Vitamin E og niacinamid", effect: "Antioksidant- og barrierestøtte som roer huden" },
    ],
    skinTypes: ["Normal hud", "Fet/uren hud", "Kombinert hud"],
    related: ["ZO-005", "ZO-007", "ZO-023"],
  },
  {
    sku: "ZO-002",
    intro:
      "Gentle Cleanser er den trygge hverdagsrensen som passer så godt som alle. Den milde gelformelen fjerner sminke, talg og urenheter effektivt, samtidig som huden beholder fukt og komfort.",
    longDesc: [
      "En god rens er fundamentet i enhver hudpleierutine, og Gentle Cleanser er nettopp det – et solid fundament. Formelen kombinerer milde rensestoffer med aminosyrer fra havre og en blanding av beroligende planteekstrakter, slik at huden renses grundig uten at barrieren svekkes.",
      "Den passer alle hudtyper og er et naturlig førstevalg hvis du er ny til ZO, bruker aktive produkter som retinol, eller rett og slett vil ha en rens som bare fungerer – dag etter dag.",
    ],
    benefits: [
      "Renser effektivt uten å tørke ut eller stramme",
      "Fjerner sminke, talg og urenheter",
      "Havre-aminosyrer støtter hudbarrieren",
      "Planteekstrakter gir antioksidantbeskyttelse",
      "Passer alle hudtyper – også ved bruk av retinol",
    ],
    usage: [
      "Fukt ansikt og hals med lunkent vann.",
      "Masser en liten mengde over huden i sirkelbevegelser, morgen og kveld.",
      "Skyll grundig og klapp huden tørr.",
      "Fortsett med toner, serum og fuktighetskrem.",
    ],
    ingredients: [
      { name: "Havre-aminosyrer (sodium lauroyl oat amino acids)", effect: "Renser mildt og støtter hudbarrieren" },
      { name: "Glyserin", effect: "Binder fukt og holder huden myk under rensing" },
      { name: "Botanisk ekstraktblanding (bl.a. grønn te og bygg)", effect: "Beroliger og beskytter mot ytre påkjenninger" },
    ],
    skinTypes: ["Alle hudtyper", "Normal hud", "Sensitiv hud"],
    related: ["ZO-004", "ZO-009", "ZO-022"],
  },
  {
    sku: "ZO-003",
    intro:
      "Hydrating Cleanser er en kremet, sulfatfri rens for deg med normal til tørr hud. Den fjerner urenheter og sminke samtidig som den tilfører fukt – så huden kjennes ren, myk og rolig etterpå.",
    longDesc: [
      "Tørr hud trenger en rens som gir mer enn den tar. Hydrating Cleanser er bygget rundt fuktbindende ingredienser som hyaluronsyre, glyserin og urea, kombinert med beroligende panthenol og allantoin. Den rike, kremete teksturen skylles rent av uten å etterlate film – og uten å etterlate huden stram og tørr.",
      "Dette er også et godt valg hvis huden din er sensibilisert etter behandlinger, i perioder med retinolbruk, eller om vinteren når kald luft og innetemperatur tærer på fuktbarrieren.",
    ],
    benefits: [
      "Renser skånsomt uten sulfater",
      "Tilfører fukt mens den renser",
      "Beroliger tørr og lett irritert hud",
      "Etterlater huden myk – aldri stram",
      "Fin i perioder med retinol eller etter klinikkbehandling",
    ],
    usage: [
      "Fukt ansikt og hals med lunkent vann.",
      "Masser en liten mengde over huden, morgen og kveld.",
      "Skyll grundig og klapp huden tørr.",
      "Følg opp med fuktgivende toner eller krem.",
    ],
    ingredients: [
      { name: "Hyaluronsyre (sodium hyaluronate)", effect: "Binder fukt og gir en glattere, mer fylt hudfølelse" },
      { name: "Panthenol (provitamin B5)", effect: "Beroliger og pleier huden, demper rødhet" },
      { name: "Glyserin og urea", effect: "Gjenoppretter og holder på hudens naturlige fukt" },
      { name: "Allantoin", effect: "Myker opp og støtter en jevn, smidig hudoverflate" },
    ],
    skinTypes: ["Tørr hud", "Normal hud", "Sensitiv hud"],
    related: ["ZO-004", "ZO-018", "ZO-023"],
  },
  {
    sku: "ZO-004",
    intro:
      "Calming Toner gjenoppretter hudens pH-balanse etter rens og gjør huden klar til å ta imot resten av rutinen. Lett fukt, mild eksfoliering og beroligende ingredienser – i ett forfriskende steg.",
    longDesc: [
      "Mange hopper over toner, men det er her huden nullstilles. Calming Toner fjerner de siste restene etter rensing, balanserer pH og tilfører lett fukt gjennom hyaluronsyre, sodium PCA og panthenol. Hamamelis virker sammentrekkende og forfriskende, mens en liten andel glykolsyre gir en helt mild fornyende effekt.",
      "Den passer spesielt godt for normal til tørr og sensitiv hud, og gjør at serum og krem trenger bedre inn i huden etterpå.",
    ],
    benefits: [
      "Balanserer hudens pH etter rens",
      "Fjerner rensingsrester og forbereder huden på serum",
      "Tilfører lett fukt og beroliger",
      "Hamamelis virker forfriskende og sammentrekkende",
      "Støtter hudbarrieren hos sensibilisert hud",
    ],
    usage: [
      "Rens huden som vanlig.",
      "Fukt en bomullspad med toner og stryk over ansikt og hals, morgen og kveld.",
      "Ikke skyll av – la huden trekke den til seg.",
      "Fortsett med serum og fuktighetskrem.",
    ],
    ingredients: [
      { name: "Hamamelis (witch hazel)", effect: "Virker sammentrekkende og forfriskende på huden" },
      { name: "Hyaluronsyre og sodium PCA", effect: "Fuktbindende duo som gir lett, umiddelbar hydrering" },
      { name: "Panthenol", effect: "Beroliger og pleier sensibilisert hud" },
      { name: "Allantoin", effect: "Demper irritasjon og myker opp hudoverflaten" },
    ],
    skinTypes: ["Normal hud", "Tørr hud", "Sensitiv hud"],
    related: ["ZO-002", "ZO-017", "ZO-018"],
  },
  {
    sku: "ZO-005",
    intro:
      "Exfoliating Polish er ZOs ikoniske skrubb – og en av grunnene til at merket har så trofaste fans. Ultrafine magnesiumkrystaller polerer bort døde hudceller og gir umiddelbart jevnere, mykere hud med synlig glød.",
    longDesc: [
      "Krystallene i Exfoliating Polish er runde og jevnstore, slik at de polerer hudoverflaten uten å lage mikroskader – en viktig forskjell fra billigere skrubber med skarpe partikler. Samtidig tilfører formelen antioksidantene vitamin A, C og E, som beskytter den friske huden som kommer frem.",
      "Regelmessig eksfoliering fjerner det matte laget av døde hudceller, stimulerer hudens fornyelse og gjør at serum og aktive produkter trenger bedre inn. Resultatet ser du med en gang: glattere hud med frisk glød.",
    ],
    benefits: [
      "Umiddelbart jevnere og mykere hudoverflate",
      "Gir synlig glød etter første gangs bruk",
      "Runde magnesiumkrystaller polerer uten å skade huden",
      "Vitamin A, C og E beskytter mot frie radikaler",
      "Øker effekten av serum og aktive produkter etterpå",
    ],
    usage: [
      "Rens huden først.",
      "Masser en liten mengde skånsomt over fuktig ansikt og hals.",
      "Start med 2–3 ganger i uken; huden kan gradvis venne seg til hyppigere bruk. Tørr og sensitiv hud klarer seg ofte med sjeldnere bruk.",
      "Skyll grundig og fortsett med toner eller serum.",
    ],
    ingredients: [
      { name: "Magnesiumkrystaller", effect: "Ultrafine, runde krystaller som fjerner døde hudceller skånsomt" },
      { name: "Vitamin A, C og E", effect: "Antioksidanter som beskytter og støtter hudens fornyelse" },
      { name: "Tea tree-olje", effect: "Renser og motvirker urenheter" },
    ],
    skinTypes: ["Alle hudtyper", "Normal hud", "Fet/uren hud"],
    related: ["ZO-001", "ZO-008", "ZO-009"],
  },
  {
    sku: "ZO-006",
    intro:
      "Complexion Renewal Pads er ferdig dosert eksfoliering i praktisk pad-form. Glykol- og salisylsyre renser porene, jevner ut hudoverflaten og gir klarere hud – på under et minutt, morgen og kveld.",
    longDesc: [
      "Padsene kombinerer to velkjente syrer: glykolsyre som løsner døde hudceller på overflaten, og salisylsyre som jobber ned i porene og løser opp talg. Sammen holder de porene rene, forebygger urenheter og gir en jevnere, mer glødende hudtone – uten å tørke ut huden.",
      "De er også svært praktiske på reise eller etter trening, når du vil friske opp huden raskt. Er du ny til syrer, kan du starte med én gang daglig og trappe opp.",
    ],
    benefits: [
      "Renser og forfiner porene",
      "Forebygger urenheter og småkviser",
      "Jevner ut hudtekstur og gir glød",
      "Ikke-uttørkende formulering med urea",
      "Praktisk ferdig dosert – perfekt på farten",
    ],
    usage: [
      "Rens huden først.",
      "Stryk en pad over ansiktet, unngå øyeområdet.",
      "Brukes morgen og/eller kveld – start gjerne med én gang daglig.",
      "Ikke skyll av. Følg opp med serum og fuktighetskrem, og bruk alltid solkrem på dagtid når du eksfolierer regelmessig.",
    ],
    ingredients: [
      { name: "Glykolsyre (AHA)", effect: "Løsner døde hudceller og gir jevnere, lysere hudoverflate" },
      { name: "Salisylsyre (BHA)", effect: "Renser porene og motvirker urenheter" },
      { name: "Urea", effect: "Binder fukt og motvirker uttørking" },
      { name: "Botanisk ekstraktblanding", effect: "Antioksidantbeskyttelse og beroligende effekt" },
    ],
    skinTypes: ["Normal hud", "Kombinert hud", "Fet/uren hud"],
    related: ["ZO-001", "ZO-009", "ZO-023"],
  },
  {
    sku: "ZO-007",
    intro:
      "Oil Control Pads er en målrettet behandling for fet og uren hud. Med 2 % salisylsyre regulerer de talgproduksjonen, renser porene i dybden og motvirker nye utbrudd.",
    longDesc: [
      "Dette er padsene for deg som sliter med blank hud, tette porer og tilbakevendende urenheter. Salisylsyren i full behandlingsstyrke (2 %) løser opp talg nede i porene, mens glykolsyre og mandelsyre jevner ut hudoverflaten. Hamamelis bidrar til å dempe glans utover dagen.",
      "Start rolig – én gang daglig – og trapp opp etter hvert som huden venner seg til. Blir huden tørr eller flasser, tar du et steg tilbake i frekvens. Christina i klinikken hjelper deg gjerne med å finne riktig nivå.",
    ],
    benefits: [
      "2 % salisylsyre renser porene i dybden",
      "Regulerer talg og demper glans",
      "Motvirker og forebygger urenheter",
      "Jevner ut hudoverflaten",
      "Ferdig dosert og enkel i bruk",
    ],
    usage: [
      "Rens huden grundig først.",
      "Stryk en pad over de aktuelle områdene i et tynt lag.",
      "Start med én gang daglig, og øk gradvis til to–tre ganger daglig ved behov.",
      "Ved tørrhet eller flassing: reduser til én gang daglig eller annenhver dag.",
      "Bruk alltid solkrem på dagtid.",
    ],
    ingredients: [
      { name: "Salisylsyre 2 %", effect: "Renser porene i dybden og behandler urenheter" },
      { name: "Glykolsyre og mandelsyre", effect: "Eksfolierer overflaten og jevner ut hudtonen" },
      { name: "Hamamelis", effect: "Virker sammentrekkende og demper glans" },
    ],
    skinTypes: ["Fet/uren hud", "Kombinert hud"],
    related: ["ZO-001", "ZO-005", "ZO-022"],
  },
  {
    sku: "ZO-008",
    intro:
      "Exfoliation Accelerator er en eksfolierende lotion som setter fart på hudens naturlige fornyelse. Glykol- og melkesyre løsner døde hudceller og gir jevnere tekstur og friskere glød – mens aloe, grønn te og kamille holder huden rolig.",
    longDesc: [
      "I motsetning til en skrubb jobber Exfoliation Accelerator kjemisk: syrene løser opp bindingene som holder døde hudceller fast, slik at de slipper taket og friskere hud kommer frem. Det gir gradvis jevnere hudtekstur, mindre synlige porer og bedre glød – og gjør at aktive produkter som retinol og vitamin C virker bedre.",
      "Den beroligende blandingen av aloe vera, grønn te og kamille gjør formelen mer komfortabel enn mange andre syreprodukter, men som med all eksfoliering gjelder: bygg opp gradvis, og vær nøye med solkrem på dagtid.",
    ],
    benefits: [
      "Jevner ut hudtekstur og gir glød",
      "Stimulerer hudens naturlige fornyelse",
      "Gjør porene mindre synlige over tid",
      "Aloe, grønn te og kamille minimerer irritasjon",
      "Øker effekten av serum og aktive produkter",
    ],
    usage: [
      "Påfør på ren, tørr hud – gjerne om kvelden.",
      "Start med noen få kvelder i uken og trapp opp etter hvert som huden tåler det.",
      "Unngå øyeområdet.",
      "Bruk alltid bredspektret solkrem på dagtid når du bruker syrer regelmessig.",
    ],
    ingredients: [
      { name: "Glykolsyre (AHA)", effect: "Løsner døde hudceller og stimulerer fornyelse av overhuden" },
      { name: "Melkesyre (AHA)", effect: "Mildere syre som eksfolierer og samtidig binder fukt" },
      { name: "Aloe vera, grønn te og kamille", effect: "Beroliger og demper irritasjon under eksfolieringen" },
      { name: "Vitamin A og E", effect: "Antioksidanter som beskytter den nye huden" },
    ],
    skinTypes: ["Normal hud", "Kombinert hud", "Moden hud"],
    related: ["ZO-002", "ZO-005", "ZO-023"],
  },
  {
    sku: "ZO-009",
    intro:
      "Daily Power Defense er selve hjørnesteinen i ZO-universet – et avansert serum som styrker hudens barriere, beskytter mot ytre påkjenninger og støtter hudens egen reparasjon. Mange vil si det er dette ene produktet du bør begynne med.",
    longDesc: [
      "Huden din utsettes daglig for UV-stråling, forurensning og stress som bryter den ned raskere enn den rekker å reparere seg. Daily Power Defense er bygget for å snu det regnestykket: spesialiserte enzymer støtter hudcellenes reparasjonsprosesser, mens ZOs eksklusive plantestamcellekompleks ZO-RRS2 nøytraliserer frie radikaler og roer synlig rødhet.",
      "Formelen inneholder også vitamin A og E som antioksidantbeskyttelse, og ZPOLY-komplekset som gir langvarig fukt og motvirker tidlige tegn på hudaldring. Brukt morgen og kveld gir den sterkere, jevnere og mer motstandsdyktig hud over tid – og fungerer like godt alene som sammen med mer målrettede behandlinger.",
    ],
    benefits: [
      "Styrker hudens barriere og motstandskraft",
      "Beskytter mot frie radikaler og miljøskader",
      "Støtter hudens egen reparasjon med spesialiserte enzymer",
      "Motvirker fine linjer og ujevn pigmentering",
      "Gir langvarig fukt gjennom ZPOLY-komplekset",
      "Passer alle hudtyper, morgen og kveld",
    ],
    usage: [
      "Rens huden og la den tørke.",
      "Masser en liten mengde over ansikt og hals, morgen og kveld. Unngå øyeområdet.",
      "La serumet trekke inn før du legger på fuktighetskrem eller sminke.",
      "Avslutt alltid morgenrutinen med bredspektret solkrem.",
    ],
    ingredients: [
      { name: "Vitamin A og E", effect: "Antioksidanter som beskytter mot miljørelatert hudaldring" },
      { name: "ZO-RRS2 (plantestamcellekompleks)", effect: "Nøytraliserer frie radikaler og roer synlig rødhet" },
      { name: "ZPOLY (plantebasert polysakkaridkompleks)", effect: "Gir langvarig fukt og demper tidlige aldringstegn" },
      { name: "Spesialiserte enzymer (bl.a. micrococcus lysate)", effect: "Støtter hudcellenes naturlige reparasjonsprosesser" },
    ],
    skinTypes: ["Alle hudtyper", "Normal hud", "Moden hud"],
    related: ["ZO-002", "ZO-010", "ZO-023"],
  },
  {
    sku: "ZO-010",
    intro:
      "Growth Factor Serum er en av ZOs store bestselgere – et lett gelserum med plantebaserte og enzymatisk fremstilte vekstfaktorer som er klinisk vist å forbedre hudens generelle utseende. Målrettet mot fine linjer, volumtap og trett hud.",
    longDesc: [
      "Med årene mister huden gradvis kollagen og elastin – det som gir den spenst og fylde. Growth Factor Serum jobber med hudens egne prosesser: vekstfaktorteknologien støtter hudens naturlige fornyelse, mens ZPRO-komplekset med hydrolysert sericin og plantestamceller fra sommerfuglbusk beskytter og styrker.",
      "I ZOs kliniske studie opplevde 93 % av deltakerne forbedring i fine linjer, fasthet og hudtekstur etter 12 ukers bruk. Serumet er lett, ikke-fett og enkelt å kombinere med resten av rutinen – bruk det morgen og kveld, og vær tålmodig: det er de jevne ukene som gir resultatet.",
    ],
    benefits: [
      "Reduserer synligheten av fine linjer og rynker",
      "Forbedrer fasthet og elastisitet",
      "Motvirker synlig volumtap i huden",
      "Klinisk dokumentert: 93 % opplevde forbedring etter 12 uker",
      "Lett tekstur som passer under krem og sminke",
    ],
    usage: [
      "Rens huden og la den tørke.",
      "Påfør serumet på ansikt og hals, morgen og kveld.",
      "La det trekke inn før neste steg i rutinen.",
      "Bruk alltid solkrem på dagtid for å beskytte resultatene.",
    ],
    ingredients: [
      { name: "Plantebaserte og enzymatiske vekstfaktorer", effect: "Støtter hudens naturlige fornyelse og fasthet" },
      { name: "ZPRO (hydrolysert sericin + plantestamceller)", effect: "Patentert antioksidantkompleks som styrker og beskytter" },
      { name: "Fermentert rød ginseng", effect: "Vitaliserende ekstrakt som støtter hudens spenst" },
      { name: "Betaglukan", effect: "Beroliger og gir fukt" },
    ],
    skinTypes: ["Alle hudtyper", "Normal hud", "Moden hud"],
    related: ["ZO-009", "ZO-021", "ZO-023"],
  },
  {
    sku: "ZO-011",
    intro:
      "Wrinkle + Texture Repair er en kraftig retinolbehandling med 0,5 % rent retinol mot rynker, ujevn tekstur og solskadet hud. Dette er produktet for deg som vil ha synlige resultater – og er villig til å gi huden litt tilvenningstid.",
    longDesc: [
      "Retinol er den best dokumenterte ingrediensen mot hudaldring, og her får du den i behandlingsstyrke: 0,5 % rent retinol i et mikroemulsjonssystem som frakter virkestoffet effektivt ned i huden. Der stimulerer det hudens fornyelse og kollagenproduksjon, slik at linjer glattes ut og teksturen blir jevnere over tid.",
      "Formelen støttes av ZCORE-komplekset (biomimetisk tetrapeptid og steinkløver) som styrker forbindelsen mellom hudlagene, og av vitamin C og E, brokkoliekstrakt og solsikkeolje som demper irritasjon. Litt tørrhet og flassing de første ukene er normalt – det er tegn på at retinolen virker. Trapp opp i eget tempo, og spør gjerne Christina om råd underveis.",
    ],
    benefits: [
      "0,5 % rent retinol i effektivt mikroemulsjonssystem",
      "Reduserer rynker og fine linjer",
      "Jevner ut grov og ujevn hudtekstur",
      "Stimulerer hudens fornyelse og kollagenproduksjon",
      "ZCORE-kompleks styrker hudens struktur",
      "Anti-irritanter gjør behandlingen mer komfortabel",
    ],
    usage: [
      "Påfør 1–2 pumper jevnt på ren, tørr hud om kvelden.",
      "Start med 2 kvelder i uken med hviledager imellom, og øk gradvis etter hvert som huden tåler det.",
      "Forventet reaksjon: lett tørrhet, rødhet og flassing kan komme etter 2–3 dager – det er normalt i starten.",
      "Trenger du en mildere start, kan produktet blandes med like deler fuktighetskrem (f.eks. Recovery Crème).",
      "Bruk alltid bredspektret solkrem på dagtid – retinol gjør huden mer følsom for sol.",
      "Anbefales ikke ved graviditet eller amming.",
    ],
    ingredients: [
      { name: "Retinol 0,5 %", effect: "Stimulerer cellefornyelse og kollagen, glatter ut linjer og tekstur" },
      { name: "ZCORE-kompleks", effect: "Biomimetisk tetrapeptid og steinkløver som styrker hudens struktur" },
      { name: "Vitamin C og E", effect: "Antioksidanter som lysner og beskytter" },
      { name: "Brokkoliekstrakt og solsikkeolje", effect: "Demper irritasjon og støtter hudbarrieren under behandlingen" },
    ],
    skinTypes: ["Normal hud", "Moden hud", "Solskadet hud"],
    related: ["ZO-002", "ZO-018", "ZO-023"],
  },
  {
    sku: "ZO-012",
    intro:
      "Radical Night Repair er ZOs kraftigste retinolbehandling: 1 % mikroinnkapslet retinol som jobber om natten for markant hudfornyelse, jevnere pigmentering og fastere hud. For deg som vil ta hudforbedringen helt ut.",
    longDesc: [
      "Dette er en intensiv nattbehandling for erfarne retinolbrukere eller deg som har trappet opp via mildere styrker. Den høye konsentrasjonen retinol er mikroinnkapslet for gradvis frigjøring gjennom natten, noe som gir kraftig effekt med bedre komfort. Resultatet over uker og måneder: jevnere hudtone, glattere tekstur, mindre synlige solskader og fastere hud.",
      "Formelen støtter huden underveis med antioksidantene vitamin A, C og E, plantestamceller fra edelweiss og oljer som pleier. Vi anbefaler å bruke den i perioder (kurer) og gjerne i samråd med Christina i klinikken, spesielt første gangen – da får du mest effekt med minst mulig irritasjon.",
    ],
    benefits: [
      "1 % mikroinnkapslet retinol – ZOs kraftigste hjemmebehandling",
      "Markant jevnere hudtone og pigmentering",
      "Glatter ut linjer og grov hudtekstur",
      "Reduserer synlige solskader over tid",
      "Antioksidanter og plantestamceller støtter huden underveis",
    ],
    usage: [
      "Påfør en liten mengde (ertestor) på ren, tørr hud om kvelden. Unngå øyeområdet.",
      "Start med 1–2 kvelder i uken og øk gradvis etter hvert som huden tåler det.",
      "Forvent tørrhet, rødhet og flassing i starten – det er en normal del av tilvenningen.",
      "Følg gjerne opp med en fuktighetskrem som Recovery Crème.",
      "Bruk alltid bredspektret solkrem (SPF 30+) på dagtid – retinol øker hudens solfølsomhet.",
      "Anbefales ikke ved graviditet eller amming. Usikker på om huden din er klar? Spør oss i klinikken.",
    ],
    ingredients: [
      { name: "Retinol 1 % (mikroinnkapslet)", effect: "Kraftig hudfornyelse med gradvis frigjøring gjennom natten" },
      { name: "Vitamin A, C og E", effect: "Antioksidantbeskyttelse som støtter den nye huden" },
      { name: "Plantestamceller fra edelweiss", effect: "Beskytter mot frie radikaler og støtter hudens motstandskraft" },
      { name: "Solsikkeolje og sacha inchi-olje", effect: "Pleier og demper tørrhet under behandlingen" },
    ],
    skinTypes: ["Normal hud", "Moden hud", "Solskadet hud"],
    related: ["ZO-009", "ZO-018", "ZO-023"],
  },
  {
    sku: "ZO-013",
    intro:
      "Retinol Skin Brightener 0,5 % kombinerer retinol med lysnende antioksidanter for jevnere hudtone og frisk glød. En favoritt for deg som vil jobbe med både pigmentering og hudfornyelse i ett produkt.",
    longDesc: [
      "Ujevn hudtone og pigmentflekker skyldes ofte at melanin fordeles ujevnt i huden. Retinol Skin Brightener angriper dette fra to kanter: retinolen øker celleutskiftningen slik at pigmentert hud fornyes raskere, mens vitamin C-derivatet ascorbylglukosid og antioksidanter som glutathion jevner ut hudtonen og gir glød.",
      "Styrken 0,5 % passer deg som har brukt retinol litt før, eller som vil ha merkbar effekt uten å gå rett på det kraftigste. Serien finnes også i 0,25 % for nybegynnere og 1 % for erfarne brukere – spør oss i klinikken, så finner vi riktig styrke for deg.",
    ],
    benefits: [
      "Jevner ut hudtone og demper pigmentflekker",
      "Gir frisk glød og klarere hud",
      "Retinol stimulerer fornyelse og kollagen",
      "Bakuchiol og antioksidanter støtter og beskytter",
      "Finnes i tre styrker – lett å trappe opp",
    ],
    usage: [
      "Påfør på ren, tørr hud om kvelden.",
      "Start med 2 kvelder i uken, øk til annenhver kveld og deretter daglig etter hvert som huden tåler det.",
      "Følg opp med fuktighetskrem ved behov.",
      "Bruk alltid bredspektret solkrem (SPF 30+) på dagtid – både fordi retinol øker solfølsomheten, og fordi sol forverrer pigmentering.",
      "Anbefales ikke ved graviditet eller amming.",
    ],
    ingredients: [
      { name: "Retinol 0,5 %", effect: "Øker celleutskiftningen slik at pigmentert hud fornyes raskere" },
      { name: "Ascorbylglukosid (vitamin C-derivat)", effect: "Lysner og jevner ut hudtonen" },
      { name: "Glutathion og soyaisoflavoner", effect: "Antioksidanter som motvirker ujevn pigmentering" },
      { name: "Bakuchiol", effect: "Plantebasert ingrediens som komplementerer retinolens effekt" },
    ],
    skinTypes: ["Normal hud", "Hud med pigmentflekker", "Moden hud"],
    related: ["ZO-014", "ZO-018", "ZO-023"],
  },
  {
    sku: "ZO-014",
    intro:
      "Brightalive er et avansert lysnende serum uten retinol og uten hydrokinon – klinisk vist å øke hudens lysstyrke, forbedre klarhet og dempe synligheten av mørke flekker. Snill nok for daglig bruk, morgen og kveld.",
    longDesc: [
      "Brightalive er løsningen for deg som vil jobbe målrettet med pigmentflekker og ujevn hudtone, men som ikke kan eller vil bruke retinol – for eksempel ved sensitiv hud. Formelen kombinerer flere veldokumenterte lysnende ingredienser: traneksamsyre og niacinamid som demper pigmentdannelse, acetylglukosamin som jevner ut hudtonen, og papaya-enzymet papain som gir en mild eksfolierende effekt.",
      "Et innkapslet peptid sørger for rask effekt og bidrar til at pigmenteringen ikke like lett kommer tilbake. Kombiner alltid med daglig solkrem – sol er den viktigste driveren bak pigmentflekker.",
    ],
    benefits: [
      "Demper synligheten av mørke flekker og ujevn hudtone",
      "Øker hudens lysstyrke og klarhet",
      "Uten retinol og hydrokinon – mild nok for sensitiv hud",
      "Kan brukes trygt morgen og kveld, året rundt",
      "Bidrar til å forebygge at pigmentering kommer tilbake",
    ],
    usage: [
      "Påfør på ren, tørr hud, morgen og kveld.",
      "La serumet trekke inn før fuktighetskrem.",
      "Bruk alltid bredspektret solkrem på dagtid – det er avgjørende for resultatet mot pigmentflekker.",
    ],
    ingredients: [
      { name: "Traneksamsyre", effect: "Demper pigmentdannelse og jevner ut hudtonen" },
      { name: "Niacinamid", effect: "Reduserer hyperpigmentering og styrker hudbarrieren" },
      { name: "Acetylglukosamin", effect: "Bidrar til jevnere hudtone og mykere hud" },
      { name: "Papain (papaya-enzym)", effect: "Mild enzymatisk eksfoliering som gir glød" },
      { name: "Betaglukan og lakrisderivat", effect: "Beroliger og demper irritasjon" },
    ],
    skinTypes: ["Alle hudtyper", "Sensitiv hud", "Hud med pigmentflekker"],
    related: ["ZO-006", "ZO-015", "ZO-023"],
  },
  {
    sku: "ZO-015",
    intro:
      "10% Vitamin C Self-Activating er et selvaktiverende vitamin C-serum som lysner huden, jevner ut hudtonen og beskytter mot frie radikaler. Den smarte formelen aktiveres først i møte med hudens fukt – slik holder virkestoffet seg potent helt frem til bruk.",
    longDesc: [
      "Vitamin C er en av hudpleiens mest veldokumenterte ingredienser, men også en av de mest ustabile. ZO har løst det med en vannfri, selvaktiverende formel: de 10 % ren askorbinsyre aktiveres først når serumet møter huden. I tillegg inneholder formelen tetrahexyldecyl ascorbate, en stabil, fettløselig vitamin C-form som jobber dypere i huden for å forebygge nye pigmentflekker.",
      "Resultatet over tid er lysere og jevnere hudtone, dempede pigmentflekker og bedre beskyttelse mot miljøpåkjenninger. Squalan i formelen gir samtidig lett fukt. Teksturen er en silkeaktig, lett kornete krem som jevnes ut ved påføring.",
    ],
    benefits: [
      "10 % ren vitamin C som aktiveres på huden",
      "Lysner og jevner ut hudtonen",
      "Demper pigmentflekker – og forebygger nye",
      "Kraftig antioksidantbeskyttelse mot frie radikaler",
      "Squalan gir lett fukt uten å fete",
    ],
    usage: [
      "Påfør en liten mengde på ren, tørr hud, morgen eller kveld.",
      "Brukes som siste steg i rutinen før solkrem eller sminke.",
      "En lett prikkende følelse ved påføring er normalt.",
      "Bruk sammen med daglig solkrem for best effekt mot pigmentering.",
    ],
    ingredients: [
      { name: "Askorbinsyre 10 % (ren vitamin C)", effect: "Lysner overflatepigmentering og gir jevnere, klarere hudtone" },
      { name: "Tetrahexyldecyl ascorbate", effect: "Stabil vitamin C-form som jobber dypere og forebygger nye flekker" },
      { name: "Vitamin E og Q10", effect: "Forsterker antioksidantbeskyttelsen" },
      { name: "Squalan", effect: "Hudidentisk fuktighetsgiver som pleier uten å fete" },
    ],
    skinTypes: ["Alle hudtyper", "Normal hud", "Hud med pigmentflekker"],
    related: ["ZO-002", "ZO-014", "ZO-022"],
  },
  {
    sku: "ZO-016",
    intro:
      "Firming Serum er ZOs mest avanserte oppstrammende serum. Den lette, milde formelen forbedrer synlig hudens fasthet og elastisitet, definerer konturene og motvirker slapp hud – og er skånsom nok selv for sensitive områder.",
    longDesc: [
      "Med alderen svekkes forbindelsen mellom hudlagene, og resultatet er hud som gradvis mister spenst og definisjon. Firming Serum jobber nettopp her: ZCORE-komplekset – et biomimetisk tetrapeptid kombinert med steinkløverekstrakt – støtter forankringsfibrillene som holder hudlagene sammen.",
      "Sammen med plantestamceller fra edelweiss og sodium DNA gir det gradvis fastere, glattere hud med bedre definerte konturer langs kjeve, hals og kinn. Serumet er lett og godt tolerert, og passer alle hudtyper – også som støtte etter oppstrammende behandlinger i klinikken.",
    ],
    benefits: [
      "Strammer synlig opp og forbedrer hudens fasthet",
      "Motvirker slapp hud og tap av elastisitet",
      "Bidrar til bedre definerte ansiktskonturer",
      "Mild, lett formel som passer alle hudtyper",
      "Fin støtte etter oppstrammende klinikkbehandlinger",
    ],
    usage: [
      "Påfør på ren, tørr hud, morgen og kveld.",
      "Masser inn over ansikt, kjevelinje og hals.",
      "La serumet trekke inn før fuktighetskrem.",
      "Bruk solkrem på dagtid for å beskytte kollagenet du bygger opp.",
    ],
    ingredients: [
      { name: "ZCORE-kompleks (tetrapeptid + steinkløver)", effect: "Støtter forankringen mellom hudlagene for fastere hud" },
      { name: "Plantestamceller fra edelweiss", effect: "Beskytter mot frie radikaler som bryter ned hudens spenst" },
      { name: "Sodium DNA", effect: "Støtter hudens fornyelse og fuktbalanse" },
      { name: "Vitamin E", effect: "Antioksidant som beskytter hudens strukturer" },
    ],
    skinTypes: ["Alle hudtyper", "Moden hud", "Normal hud"],
    related: ["ZO-009", "ZO-010", "ZO-023"],
  },
  {
    sku: "ZO-017",
    intro:
      "Rozatrol er et patentert serum utviklet spesielt for rød og rosacea-utsatt hud, klinisk vist å dempe synlig rødhet, flushing og ujevn tekstur. Endelig et aktivt produkt som jobber med – ikke mot – sensitiv hud.",
    longDesc: [
      "Rød og reaktiv hud trenger mer enn bare beroligelse – den trenger normalisering. Rozatrol kombinerer et rødhetsdempende kompleks av melkeprotein, laktose og brokkoliekstrakt med ZOs plantestamcellekompleks ZO-RRS2 og aminosyren palmitoyl glycine. Sammen demper de synlig rødhet, roer flushing og støtter hudbarrieren, samtidig som en svært mild eksfoliering forfiner hudteksturen.",
      "I en klinisk studie ga Rozatrol brukt morgen og kveld signifikant reduksjon i rødhet, flushing og ujevn tekstur i løpet av seks uker. Kombiner med mild rens og mineralsk solbeskyttelse for en komplett rutine for sensitiv, rødhetsutsatt hud – vi setter den gjerne opp for deg i klinikken.",
    ],
    benefits: [
      "Demper synlig rødhet og flushing",
      "Klinisk dokumentert effekt på rosacea-utsatt hud",
      "Styrker hudbarrieren over tid",
      "Mild eksfoliering forfiner hudteksturen",
      "Gir fukt og roer sensitiv hud",
    ],
    usage: [
      "Påfør 1–2 pumper på ren, tørr hud, morgen og kveld.",
      "Fordel jevnt over ansikt og hals, med fokus på områder med rødhet.",
      "Følg opp med fuktighetskrem ved behov.",
      "Bruk alltid solkrem på dagtid – sol og varme er vanlige triggere for rødhet.",
    ],
    ingredients: [
      { name: "Rødhetsdempende kompleks (melkeprotein, laktose, brokkoliekstrakt)", effect: "Demper synlig rødhet og roer sensitivitet" },
      { name: "ZO-RRS2 (plantestamcellekompleks)", effect: "Nøytraliserer frie radikaler og beroliger huden" },
      { name: "Palmitoyl glycine", effect: "Reduserer synlig rødhet og støtter hudens ro" },
      { name: "Glyserin og solsikkeolje", effect: "Fukter og styrker hudbarrieren" },
    ],
    skinTypes: ["Sensitiv hud", "Rosacea-utsatt hud", "Hud med rødhet"],
    related: ["ZO-002", "ZO-019", "CS-009"],
  },
  {
    sku: "ZO-018",
    intro:
      "Recovery Crème er en rik anti-age fuktighetskrem som gjenoppbygger hudens fuktbarriere og roer huden – perfekt etter klinikkbehandlinger, i retinolperioder eller når huden rett og slett trenger ekstra omsorg.",
    longDesc: [
      "Recovery Crème kombinerer det beste fra to verdener: dyp barrierereparasjon og aktiv anti-age. Ceramider, squalan og sheasmør bygger opp fuktbarrieren og hindrer fukttap, mens polyglutaminsyre – en kraftig fuktbinder – gir huden en fyldig, mett følelse. Samtidig jobber peptidene acetyl hexapeptide-8 og ZCORE-komplekset med å myke opp mimiske linjer og støtte hudens fasthet.",
      "En lav dose retinol og beroligende ekstrakter av geitrams gjør kremen til en klok følgesvenn i perioder med aktive behandlinger: den demper rødhet og irritasjon, og kan blandes med sterkere retinolprodukter for en mildere start. Formelen er fri for parfyme, parabener og sulfater.",
    ],
    benefits: [
      "Gjenoppbygger hudens fuktbarriere",
      "Roer rødhet og irritasjon – fin etter behandling",
      "Peptider myker opp mimiske linjer",
      "Ceramider, squalan og sheasmør hindrer fukttap",
      "Kan blandes med retinol for mildere opptrapping",
      "Uten parfyme, parabener og sulfater",
    ],
    usage: [
      "Påfør på ren, tørr hud om kvelden, eller ved behov.",
      "Masser inn over ansikt og hals med lette, sirkulære bevegelser.",
      "Brukes gjerne som siste steg etter serum eller retinol.",
      "Kan blandes med retinolprodukter (f.eks. Wrinkle + Texture Repair) for en mildere start.",
    ],
    ingredients: [
      { name: "Ceramider, squalan og sheasmør", effect: "Bygger opp fuktbarrieren og hindrer fukttap" },
      { name: "Polyglutaminsyre", effect: "Kraftig fuktbinder som gir fyldig, mett hudfølelse" },
      { name: "Acetyl hexapeptide-8", effect: "Peptid som myker opp mimiske linjer" },
      { name: "Geitramsekstrakt", effect: "Roer rødhet og irritasjon" },
      { name: "Retinol (lav dose)", effect: "Støtter hudens elastisitet og naturlige kollagen" },
    ],
    skinTypes: ["Tørr hud", "Normal hud", "Moden hud", "Sensitiv hud"],
    related: ["ZO-003", "ZO-012", "ZO-023"],
  },
  {
    sku: "ZO-019",
    intro:
      "Hydrating Crème er intensivkremen for hud som virkelig sliter: svært tørr, irritert eller stresset etter behandling. Kolloidal havre og rike fuktighetsgivere roer huden raskt og bygger opp barrieren igjen.",
    longDesc: [
      "Når huden er ute av balanse – etter kjemisk peel, laser, retinolkur eller bare en tøff vinter – trenger den ro og gjenoppbygging. Hydrating Crème er laget for akkurat det. Kolloidal havre demper kløe og irritasjon raskt, sheasmør og glyserin metter huden med fukt, og ekstrakt av Ophiopogon japonicus-rot hjelper barrieren tilbake til normal funksjon.",
      "Dette er ikke en hverdagskrem for normal hud, men et hjelpemiddel du tar frem når huden trenger det som mest. Mange bruker den som fast følgesvenn gjennom retinolopptrapping eller i etterkant av klinikkbehandlinger hos oss.",
    ],
    benefits: [
      "Roer irritert og behandlingsstresset hud raskt",
      "Kolloidal havre demper kløe og ubehag",
      "Gjenoppretter hudens barrierefunksjon",
      "Gir intensiv, langvarig fukt",
      "Ideell etter peel, laser og i retinolperioder",
    ],
    usage: [
      "Påfør på ren, tørr hud ved behov – gjerne morgen og kveld i perioder der huden er stresset.",
      "Masser en liten mengde inn over ansikt og hals til den er absorbert.",
      "Kan brukes som støttekrem gjennom retinolopptrapping eller etter klinikkbehandling.",
    ],
    ingredients: [
      { name: "Kolloidal havre", effect: "Beroliger raskt og demper kløe og irritasjon" },
      { name: "Ophiopogon japonicus-rotekstrakt", effect: "Gjenoppretter barrierefunksjon og hever fuktnivået" },
      { name: "Sheasmør og glyserin", effect: "Metter huden med fukt og beskytter mot fukttap" },
      { name: "ZOX12 (vitamin A, C og E)", effect: "Antioksidantbeskyttelse mens huden henter seg inn" },
    ],
    skinTypes: ["Svært tørr hud", "Sensitiv hud", "Behandlingsstresset hud"],
    related: ["ZO-003", "ZO-004", "ZO-023"],
  },
  {
    sku: "ZO-020",
    intro:
      "Intense Eye Crème er en kraftig øyekrem som kombinerer retinol og peptider mot linjer, poser og mørke ringer – med optiske mikropartikler som gir en umiddelbar, synlig oppfriskning mens de aktive ingrediensene jobber på sikt.",
    longDesc: [
      "Huden rundt øynene er tynn, mister spenst tidlig og avslører trøtthet først. Intense Eye Crème angriper problemet på to plan: retinol og peptidkomplekset Matrixyl 3000 stimulerer elastisitet og kollagenhelse over tid, mens lysreflekterende mica og titandioksid umiddelbart demper synligheten av linjer, mørke ringer og poser.",
      "MDI-komplekset gjenoppretter fukt i den tynne øyehuden, og lavendel og amla-ekstrakt roer og beskytter. Fordi kremen inneholder retinol, bør den introduseres gradvis – start forsiktig, så unngår du irritasjon i det følsomme området.",
    ],
    benefits: [
      "Reduserer linjer og smilerynker rundt øynene",
      "Demper synligheten av poser og mørke ringer",
      "Optiske partikler gir umiddelbar oppfriskning",
      "Retinol og peptider bygger elastisitet over tid",
      "Gjenoppretter fukt i den tynne øyehuden",
    ],
    usage: [
      "Påfør en liten mengde (riskorn er nok) rundt øyets benkant på ren, tørr hud.",
      "Start med annenhver kveld og øk gradvis – kremen inneholder retinol og bør introduseres forsiktig.",
      "Unngå å legge den helt inntil øyet.",
      "Bruk solkrem eller solbriller på dagtid – retinol øker solfølsomheten.",
    ],
    ingredients: [
      { name: "Retinol", effect: "Stimulerer elastisitet og kollagenhelse i den tynne øyehuden" },
      { name: "Matrixyl 3000 (peptider)", effect: "Peptidkompleks som jobber mot linjer og slapp hud" },
      { name: "Mica og titandioksid", effect: "Optiske partikler som umiddelbart demper mørke ringer og linjer" },
      { name: "MDI-kompleks", effect: "Gjenoppretter fukt og smidighet" },
      { name: "Lavendel og amla-ekstrakt", effect: "Beroliger og gir antioksidantbeskyttelse" },
    ],
    skinTypes: ["Alle hudtyper", "Moden hud"],
    related: ["ZO-009", "ZO-018", "ZO-023"],
  },
  {
    sku: "ZO-021",
    intro:
      "Growth Factor Eye Serum tar ZOs vekstfaktorteknologi til øyeområdet: et lett serum med kjølende applikator som styrker den tynne huden rundt øynene, fyller ut linjer og friskner opp et trett blikk.",
    longDesc: [
      "Området rundt øynene mister volum og tetthet tidligere enn resten av ansiktet – det gir linjer, fordypninger og et innsunket preg. Growth Factor Eye Serum kombinerer plantebaserte og enzymatisk fremstilte vekstfaktorer med et hurtigvirkende nevropeptid og acetylert hyaluronsyre som umiddelbart fyller og fukter.",
      "Den kjølige metallapplikatoren gjør påføringen behagelig og bidrar til å vekke et trett blikk. Serumet er mildt nok til bruk morgen og kveld, og fint å kombinere med Growth Factor Serum til resten av ansiktet.",
    ],
    benefits: [
      "Reduserer synligheten av linjer og fordypninger rundt øynene",
      "Styrker og fortetter den tynne øyehuden over tid",
      "Acetylert hyaluronsyre fyller og fukter umiddelbart",
      "Kjølende applikator friskner opp et trett blikk",
      "Mild formel uten retinol – passer også sensitive øyne",
    ],
    usage: [
      "Påfør en liten mengde rundt øyets benkant på ren, tørr hud.",
      "Bruk den kjølende applikatoren i små, lette sirkler, morgen og kveld.",
      "La serumet trekke inn før eventuell øyekrem eller sminke.",
    ],
    ingredients: [
      { name: "ZO vekstfaktorteknologi", effect: "Plantebaserte og enzymatiske vekstfaktorer som støtter hudens fornyelse" },
      { name: "Nevropeptid", effect: "Hurtigvirkende peptid som demper synligheten av linjer" },
      { name: "Acetylert hyaluronsyre", effect: "Fyller og fukter, jevner ut småfolder umiddelbart" },
      { name: "Beroligende planteekstrakter (bl.a. lakrisrot)", effect: "Roer det følsomme øyeområdet" },
    ],
    skinTypes: ["Alle hudtyper", "Moden hud", "Sensitiv hud"],
    related: ["ZO-002", "ZO-010", "ZO-023"],
  },
  {
    sku: "ZO-022",
    intro:
      "Sunscreen + Primer SPF 30 er solbeskyttelse og sminkeprimer i ett – en genial to-i-ett med 100 % mineralske filtre og silkematt finish. Den universelle fargetonen jevner ut huden og gir det perfekte underlaget for sminke.",
    longDesc: [
      "Dette er avslutteren mange ZO-brukere ikke klarer seg uten. De mineralske filtrene sinkoksid (20 %) og titandioksid gir bredspektret beskyttelse mot UVA og UVB, mens formelens lette fargepigmenter og silkeaktige tekstur fungerer som primer: porene sløres, hudtonen jevnes ut og sminken sitter bedre og lenger.",
      "Formelen inneholder også melanin, som bidrar til å beskytte mot skadelig lys, samt antioksidanter og beroligende centella. Fordi solbeskyttelse er det viktigste enkelttiltaket mot hudaldring og pigmentflekker, er dette et smart siste steg i morgenrutinen – hver dag, hele året.",
    ],
    benefits: [
      "Bredspektret mineralsk beskyttelse (SPF 30) med sinkoksid og titandioksid",
      "Fungerer som sminkeprimer med silkematt finish",
      "Universell fargetone jevner ut hudtonen",
      "Melanin og antioksidanter gir ekstra beskyttelse mot lysskader",
      "Beskytter resultatene av retinol- og pigmentbehandlinger",
    ],
    usage: [
      "Påfør rikelig som siste steg i morgenrutinen, 15 minutter før du går ut i solen.",
      "Fordel jevnt over ansikt og hals – fungerer utmerket under sminke.",
      "Etterfyll minst hver 2. time ved opphold i sol.",
      "Bruk vannfast solkrem hvis du bader eller svetter.",
    ],
    ingredients: [
      { name: "Sinkoksid 20 %", effect: "Mineralsk filter som reflekterer UVA- og UVB-stråler" },
      { name: "Titandioksid 1 %", effect: "Mineralsk filter som forsterker den bredspektrede beskyttelsen" },
      { name: "Melanin", effect: "Bidrar til å beskytte huden mot skadelig lys" },
      { name: "Centella asiatica og antioksidanter", effect: "Beroliger og beskytter mot frie radikaler" },
    ],
    skinTypes: ["Alle hudtyper", "Fet/uren hud", "Kombinert hud"],
    related: ["ZO-002", "ZO-009", "ZO-015"],
  },
  {
    sku: "ZO-023",
    intro:
      "Daily Sheer SPF 50 er en lett, transparent solkrem med høy bredspektret beskyttelse – laget for daglig bruk. Den tørker raskt inn uten fet hinne og fungerer like godt alene som under sminke.",
    longDesc: [
      "Den beste solkremen er den du faktisk bruker hver dag, og Daily Sheer er laget for nettopp det. Den lette, ikke-fete formelen med moderne UV-filtre gir høy beskyttelse mot både UVA og UVB, i tillegg til beskyttelse mot infrarød stråling (IR-A) og høyenergetisk synlig lys (HEV). ZOX12-komplekset tilfører antioksidanter som fanger opp frie radikaler.",
      "Formelen er vann- og svettebestandig i 40 minutter og tørker raskt inn med usynlig finish – ingen hvit hinne, ingen klissete følelse. Daglig SPF er den viktigste investeringen du gjør i hudens fremtid, og et must hvis du bruker retinol, syrer eller jobber med pigmentflekker.",
    ],
    benefits: [
      "Høy bredspektret beskyttelse (SPF 50) mot UVA og UVB",
      "Beskytter også mot IR-A-stråling og HEV-lys",
      "Transparent, lett finish uten fet hinne",
      "Vann- og svettebestandig i 40 minutter",
      "Antioksidantkomplekset ZOX12 motvirker frie radikaler",
      "Perfekt daglig avslutter ved bruk av retinol og syrer",
    ],
    usage: [
      "Påfør rikelig som siste steg i morgenrutinen, 15 minutter før soleksponering.",
      "Fordel jevnt over ansikt og hals.",
      "Etterfyll minst hver 2. time i sol, og etter 40 minutter i vann eller ved svetting.",
      "Brukes hver dag, hele året – også når det er overskyet.",
    ],
    ingredients: [
      { name: "Moderne UV-filtre (bl.a. avobenzon og octocrylene)", effect: "Bredspektret beskyttelse mot UVA- og UVB-stråler" },
      { name: "ZOX12-kompleks", effect: "Tolvtimers antioksidantbeskyttelse mot frie radikaler" },
      { name: "Fraksjonert melanin", effect: "Bidrar til beskyttelse mot høyenergetisk synlig lys (HEV)" },
    ],
    skinTypes: ["Alle hudtyper"],
    related: ["ZO-002", "ZO-009", "ZO-014"],
  },
];
