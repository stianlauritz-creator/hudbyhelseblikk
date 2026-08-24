import type { ProductDetails } from "../product-details";

export const FF_DETAILS: ProductDetails[] = [
  {
    sku: "FF-001",
    intro:
      "Daily Gel Cleanser er en mild og forfriskende rensegel laget for daglig bruk, morgen og kveld. Den renser effektivt uten å stresse huden, og tilfører samtidig fukt som styrker hudbarrieren.",
    longDesc: [
      "Dette er en av Face Formulas bestselgere, og det er lett å forstå hvorfor: gelen renser bort urenheter og rester av sminke og solkrem, samtidig som den etterlater huden myk og balansert i stedet for stram og tørr. Flere former for hyaluronsyre binder fukt i huden mens du renser.",
      "Formelen inneholder også niacinamid og en skånsom dose melkesyre som gir en veldig mild eksfoliering — nok til å friske opp gløden og forfine porene, men snill nok til at huden tåler den hver dag. Rosevann bidrar til å roe og balansere.",
      "En trygg base i enhver rutine, uansett hvilke serum og kremer du bygger på med etterpå.",
    ],
    benefits: [
      "Renser effektivt uten å tørke ut huden",
      "Tilfører fukt med flere former for hyaluronsyre",
      "Mild eksfoliering som gir jevnere tekstur og glød",
      "Demper rødhet og roer huden",
      "Bidrar til å rense og forfine porene",
      "Passer til daglig bruk, morgen og kveld",
    ],
    usage: [
      "Fukt huden med lunkent vann.",
      "Masser en liten mengde rensegel over ansiktet i sirkulære bevegelser.",
      "Skyll grundig og klapp huden tørr.",
      "Fortsett med serum og fuktighetskrem.",
    ],
    ingredients: [
      { name: "Hyaluronsyre (flere former)", effect: "Binder fukt i flere hudlag og motvirker tørrhetsfølelse etter rens" },
      { name: "Niacinamid", effect: "Styrker hudbarrieren og jevner ut hudtonen" },
      { name: "Melkesyre", effect: "Svært mild eksfoliering som gir glød og jevnere overflate" },
      { name: "Rosevann", effect: "Roer og forfrisker huden" },
    ],
    skinTypes: ["Alle hudtyper", "Dehydrert hud", "Sensitiv hud"],
    related: ["FF-015", "FF-020", "FF-032"],
  },
  {
    sku: "FF-002",
    intro:
      "Face Foam Cleanser er et mildt renseskum som forvandles til et rikt, kremet skum på huden. Det renser grundig uten å strippe huden for naturlig fukt, og etterlater den myk, glatt og balansert.",
    longDesc: [
      "Et godt renseskum skal gjøre jobben uten å etterlate huden stram — og det er akkurat det denne gjør. Skummet løser opp urenheter og talg samtidig som niacinamid og hyaluronsyre støtter hudens eget forsvar og fuktbalanse.",
      "Formelen er utviklet for å bevare hudens naturlige mikrobiom, slik at hudbarrieren står sterkere over tid. Resultatet er en frisk, ren hudfølelse som passer alle hudtyper — også deg med tørr hud eller begynnende barrieresvekkelse.",
    ],
    benefits: [
      "Rikt, kremet skum som renser uten å strippe huden",
      "Bevarer hudens naturlige fukt og mikrobiom",
      "Styrker hudbarrieren med niacinamid",
      "Gir jevnere hudtone og mer klarhet",
      "Motvirker glåmete og tørr hud",
    ],
    usage: [
      "Fukt huden med lunkent vann.",
      "Masser en liten mengde skum over ansiktet.",
      "Skyll grundig og klapp huden tørr.",
      "Fortsett med serum og fuktighetskrem.",
    ],
    ingredients: [
      { name: "Niacinamid", effect: "Styrker hudens naturlige forsvar og jevner ut hudtonen" },
      { name: "Natriumhyaluronat", effect: "Bevarer fukt og støtter hudens fuktbalanse under rens" },
    ],
    skinTypes: ["Alle hudtyper", "Tørr hud", "Glåmete hud"],
    related: ["FF-008", "FF-020", "FF-033"],
  },
  {
    sku: "FF-003",
    intro:
      "Purifying Cleanser er en dyptvirkende rensegel som eksfolierer skånsomt, fjerner sminke og løser opp urenheter i én operasjon. Huden kjennes frisk, klar og revitalisert etter bruk.",
    longDesc: [
      "Denne rensen kombinerer glykolsyre og salisylsyre for å forfine hudteksturen, åpne tilstoppede porer og motvirke talgopphopning — uten å forstyrre hudbarrieren. Et vitamin C-derivat bidrar samtidig til å lysne og gi glød.",
      "Botaniske aminosyrer og ringblomstekstrakt sørger for at huden får fukt og ro underveis, slik at rensingen kjennes behagelig selv om den jobber aktivt. Et smart valg for deg med kombinert eller fet hud som vil ha mer ut av rensetrinnet.",
    ],
    benefits: [
      "Eksfolierer skånsomt og renser i dybden",
      "Åpner tilstoppede porer og fjerner urenheter",
      "Forfiner hudteksturen og fremmer naturlig fornyelse",
      "Lysner og gir gløden tilbake",
      "Roer og balanserer huden underveis",
      "Fjerner også sminke",
    ],
    usage: [
      "Fukt huden med lunkent vann.",
      "Masser en liten mengde over ansiktet i sirkulære bevegelser.",
      "Skyll grundig og klapp huden tørr.",
      "Bruk syrebaserte rensinger med litt varsomhet i starten om huden din er sensitiv, og husk SPF på dagtid.",
    ],
    ingredients: [
      { name: "Glykolsyre", effect: "Kjemisk eksfoliering som løsner døde hudceller og jevner ut teksturen" },
      { name: "Salisylsyre", effect: "Går ned i porene, løser opp talg og motvirker tilstoppinger" },
      { name: "Natriumaskorbylfosfat (vitamin C)", effect: "Lysner og gir klarere hudtone" },
      { name: "Ringblomstekstrakt", effect: "Roer og mykgjør huden" },
    ],
    skinTypes: ["Kombinert hud", "Fet hud", "Uren hud"],
    related: ["FF-017", "FF-021", "FF-032"],
  },
  {
    sku: "FF-004",
    intro:
      "SOS Cleanser er en klargjørende rens for deg med fet og uren hud. Den regulerer overflødig talg, motvirker tilstoppede porer og hjelper huden tilbake i balanse — og kan brukes både i ansiktet og på kroppen.",
    longDesc: [
      "Hovedingrediensen er svovel (5 %), en klassiker innen behandling av uren og talgrik hud, her kombinert med skånsom mekanisk eksfoliering fra fruktkjernepulver. Sammen renser de i dybden, regulerer talgproduksjonen og reduserer opphopninger som fører til utbrudd.",
      "Til tross for den aktive profilen er formelen laget for å bevare fukt og komfort, med glyserin og glykolipider som støtter barrieren. Rensen egner seg også ved talgrelaterte tilstander som seboreisk eksem — spør gjerne Christina i klinikken om hvordan du bruker den best på din hud.",
    ],
    benefits: [
      "Regulerer overflødig talgproduksjon",
      "Reduserer tilstoppede porer og urenheter",
      "Skånsom mekanisk eksfoliering forfiner teksturen",
      "Bevarer fukt og hudkomfort",
      "Kan brukes i ansiktet, på kroppen eller som punktrens",
    ],
    usage: [
      "Påfør 1–2 pump på fuktig hud og masser inn på fete eller urene områder.",
      "La rensen virke i 2–4 minutter.",
      "Skyll grundig med lunkent vann og klapp huden tørr.",
      "Kan brukes på ansikt og kropp, eller kun på problemområder.",
    ],
    ingredients: [
      { name: "Svovel (5 %)", effect: "Regulerer talg og motvirker urenheter og inflammasjon" },
      { name: "Fruktkjernepulver (aprikos)", effect: "Skånsom mekanisk eksfoliering som forfiner overflaten" },
      { name: "Glyserin og glykolipider", effect: "Bevarer fukt og støtter hudbarrieren" },
    ],
    skinTypes: ["Fet hud", "Uren hud", "Hud med tendens til utbrudd"],
    related: ["FF-019", "FF-018", "FF-021"],
  },
  {
    sku: "FF-005",
    intro:
      "2 in 1 Refining Cleansing Milk er en fuktgivende rensemelk som renser, beroliger og pleier i samme trinn. Den er utviklet med pro-ageing-ingredienser og passer spesielt godt for tørr, sensibel og hormonell hud.",
    longDesc: [
      "Rensemelken fjerner smuss og urenheter samtidig som den strammer opp porene og demper irritasjon. Allantoin og panthenol mykgjør og støtter hudbarrieren, mens Seboclear bidrar til å holde talg og urenheter i sjakk — en fin kombinasjon for hud som både er tørr og får utbrudd.",
      "Påføres på tørr hud og emulgeres med våte hender, og kan gjerne få virke noen minutter for en mild enzymatisk effekt før du skyller av. Et skånsomt førstevalg for deg som synes vanlige rensegeler blir for tøffe.",
    ],
    benefits: [
      "Renser skånsomt uten å tørke ut",
      "Beroliger sensibel og irritert hud",
      "Styrker og mykgjør hudbarrieren",
      "Bidrar til å stramme opp porene",
      "Passer også hormonell hud med urenheter",
    ],
    usage: [
      "Påfør rensemelken direkte på tørr hud.",
      "Emulger med våte hender og masser inn.",
      "La gjerne produktet virke i noen minutter for en mild enzymatisk effekt.",
      "Skyll av med lunkent vann og klapp huden tørr.",
    ],
    ingredients: [
      { name: "Allantoin", effect: "Beroliger og mykgjør irritert hud" },
      { name: "Panthenol (provitamin B5)", effect: "Gir fukt og støtter hudbarrieren" },
      { name: "Seboclear", effect: "Motvirker talgopphopning og urenheter" },
      { name: "Aloe vera", effect: "Fukter og roer huden" },
    ],
    skinTypes: ["Tørr hud", "Sensitiv hud", "Hormonell hud"],
    related: ["FF-015", "FF-020", "FF-035"],
  },
  {
    sku: "FF-006",
    intro:
      "Probiotic Cleansing Mousse er en skånsom, probiotisk rensemousse for både ansikt og kropp. Den renser grundig uten å strippe huden, og støtter samtidig hudens mikrobiom og barriere.",
    longDesc: [
      "Denne moussen er laget for hud som lett blir irritert av vanlig rens. Milde vaskestoffer fjerner urenheter uten å røre hudens naturlige fettlag, mens plommekjerneolje og panthenol tilfører næring og ro underveis.",
      "Ved å støtte mikrobiomets balanse hjelper den huden å holde seg rolig og motstandsdyktig over tid — og forebygger den tørre, stramme følelsen mange kjenner etter rensing. Et trygt valg for sensitiv, dehydrert eller barrieresvekket hud.",
    ],
    benefits: [
      "Renser skånsomt uten å strippe huden",
      "Støtter hudens mikrobiom og naturlige balanse",
      "Tilfører fukt og næring under rensingen",
      "Roer irritasjon og forebygger reaktivitet",
      "Kan brukes på både ansikt og kropp",
    ],
    usage: [
      "Fukt huden med lunkent vann.",
      "Masser en liten mengde mousse over ansiktet (eller kroppen).",
      "Skyll grundig og klapp huden tørr.",
      "Fortsett med serum og fuktighetskrem.",
    ],
    ingredients: [
      { name: "Plommekjerneolje", effect: "Nærer huden og bevarer mykhet under rens" },
      { name: "Panthenol (provitamin B5)", effect: "Fukter og beroliger huden" },
      { name: "Milde vaskestoffer", effect: "Renser effektivt uten å forstyrre hudbarrieren" },
    ],
    skinTypes: ["Sensitiv hud", "Dehydrert hud", "Barrieresvekket hud"],
    related: ["FF-016", "FF-023", "FF-035"],
  },
  {
    sku: "FF-007",
    intro:
      "Essential Formula er Face Formulas signaturprodukt — en lett, multitaskende emulsjon som gir fukt, roer huden og forbedrer hudkvaliteten over tid. Ett produkt som løser mange behov, og et naturlig sted å starte med merket.",
    longDesc: [
      "Formelen bygger på 6 % niacinamid, som jevner ut hudtonen, minimerer porene og styrker barrieren, kombinert med 1 % ravsyre som bidrar til klarere hud og 3 % squalan som gir mykhet og fukt uten å tette porene.",
      "Resultatet er en lett, ikke-komedogen emulsjon som passer alle hudtyper og adresserer alt fra dehydrering og rødhet til store porer og ujevn hudtone. Bruk den alene som en enkel hverdagsrutine, eller som base under fuktighetskrem.",
    ],
    benefits: [
      "Jevner ut hudtonen og gir glød",
      "Minimerer synlige porer",
      "Demper rødhet og roer reaktiv hud",
      "Gir lett fukt uten å tette porene",
      "Motvirker tegn på hudaldring og urenheter",
      "Én formel som passer alle hudtyper",
    ],
    usage: [
      "Påfør på ren hud, morgen og/eller kveld.",
      "Fordel en liten mengde jevnt over ansikt og hals.",
      "La produktet trekke inn før du eventuelt legger fuktighetskrem over.",
      "Avslutt alltid med SPF på dagtid.",
    ],
    ingredients: [
      { name: "Niacinamid (6 %)", effect: "Jevner hudtonen, minimerer porer og styrker barrieren" },
      { name: "Ravsyre (1 %)", effect: "Bidrar til klarere hud og motvirker urenheter" },
      { name: "Squalan (3 %)", effect: "Mykgjør og gir fukt uten å tette porene" },
    ],
    skinTypes: ["Alle hudtyper", "Kombinert hud", "Dehydrert hud"],
    related: ["FF-001", "FF-009", "FF-033"],
  },
  {
    sku: "FF-008",
    intro:
      "Niactil er en ikonisk gelkrem med 4 % niacinamid som gir frisk, balansert hud med glød. Lett nok til å brukes alene, allsidig nok til å legges under andre kremer — også rundt øynene.",
    longDesc: [
      "Niacinamid er en av hudpleiens mest veldokumenterte ingredienser, og i Niactil får du den i en behagelig gelkrem som booster fukt, jevner ut hudtonen og minimerer synlige porer. Squalan og glyserin bidrar med mykhet og fukt, mens et lite innslag av salisylsyre holder porene rene.",
      "Dette er et av de produktene som passer nesten alle: tenåringshud, uren hud, kombinert hud og hud med svekket barriere. Enkelt, effektivt og lett å like.",
    ],
    benefits: [
      "Booster fukt og gir frisk glød",
      "Jevner ut hudtonen og glatter fine linjer",
      "Minimerer synlige porer",
      "Roer rødhet og balanserer talgproduksjonen",
      "Lett gelkrem som kan brukes alene eller under annen krem",
    ],
    usage: [
      "Påfør på ren hud, morgen og/eller kveld.",
      "Fordel en liten mengde jevnt over ansikt og hals — kan også brukes forsiktig rundt øynene.",
      "Legg eventuelt en rikere fuktighetskrem over ved behov.",
      "Avslutt med SPF på dagtid.",
    ],
    ingredients: [
      { name: "Niacinamid (4 %)", effect: "Jevner hudtonen, styrker barrieren og balanserer talg" },
      { name: "Squalan", effect: "Mykgjør og gir fukt uten å tette porene" },
      { name: "Salisylsyre", effect: "Holder porene rene og motvirker urenheter" },
    ],
    skinTypes: ["Alle hudtyper", "Uren hud", "Kombinert hud"],
    related: ["FF-001", "FF-020", "FF-032"],
  },
  {
    sku: "FF-009",
    intro:
      "Vitamin C Booster er et konsentrert serum med 15 % ren askorbinsyre — og nesten ingenting annet. En målrettet formel for deg som vil ha glød, jevnere hudtone og forsvar mot solskadet hud.",
    longDesc: [
      "Serumet består av kun tre ingredienser: 15 % askorbinsyre (ren vitamin C), propandiol og vann. Denne enkle oppbygningen gjør at den aktive ingrediensen får jobbe uforstyrret med å lysne pigmentflekker, redusere fine linjer og styrke hudens elastisitet.",
      "Vitamin C er også en kraftig antioksidant som beskytter huden mot frie radikaler fra sol og forurensning — derfor er serumet en spesielt god makker til solkremen din om morgenen. Lett og raskt absorberende.",
    ],
    benefits: [
      "Reduserer fine linjer og rynker",
      "Lysner solskader og jevner ut pigmentering",
      "Bedrer hudens elastisitet og spenst",
      "Gir synlig glød og friskere hudtone",
      "Antioksidantbeskyttelse mot frie radikaler",
    ],
    usage: [
      "Påfør på ren, tørr hud om morgenen.",
      "Dryss noen dråper i håndflaten eller rett på huden med pipetten, og klapp jevnt utover ansikt og hals.",
      "La serumet trekke inn før du legger på fuktighetskrem.",
      "15 % vitamin C kan prikke litt i starten — begynn gjerne annenhver dag om huden din er sensitiv.",
      "Avslutt alltid med SPF — vitamin C og solkrem er et sterkt lag på dagtid.",
    ],
    ingredients: [
      { name: "Askorbinsyre (15 %)", effect: "Ren vitamin C som lysner, jevner hudtonen og beskytter mot frie radikaler" },
      { name: "Propandiol", effect: "Mild fuktgiver som bedrer opptaket av vitamin C" },
    ],
    skinTypes: ["Alle hudtyper", "Solskadet hud", "Moden hud"],
    related: ["FF-001", "FF-020", "FF-033"],
  },
  {
    sku: "FF-010",
    intro:
      "Advanced Vitamin A Serum er et høyeffektivt vitamin A-serum for målrettet aldringsforebygging og langsiktig hudforbedring. Moderne leveringsteknologi gir resultater med mindre irritasjon enn tradisjonelle A-vitaminprodukter.",
    longDesc: [
      "Serumet bygger på 0,5 % hydroxypinacolone retinoate — en avansert, skånsom form for vitamin A som jobber med hudens fornyelse uten den klassiske retinol-irritasjonen. Peptider støtter kollagenproduksjonen, mens ceramider, nypefrøolje og panthenol pleier barrieren underveis.",
      "Over tid gir det fastere hud, jevnere tekstur og mer vitalitet. Fine linjer dempes og huden får tilbake spenst. Serumet hører til merkets Pro Age-linje og kombineres fint med Pro Ageing-kremene.",
      "Er du usikker på om vitamin A passer for deg, hjelper Christina i klinikken deg gjerne med å finne riktig startpunkt.",
    ],
    benefits: [
      "Reduserer synligheten av fine linjer",
      "Støtter hudens kollagenproduksjon",
      "Jevnere tekstur og hudtone",
      "Pleier og støtter hudbarrieren samtidig",
      "Skånsommere enn tradisjonell retinol",
    ],
    usage: [
      "Brukes om kvelden på ren, tørr hud.",
      "Påfør 2–3 dråper og fordel jevnt — unngå øyeområdet.",
      "Start med 2–3 kvelder i uken og trapp gradvis opp etter hvert som huden venner seg til det.",
      "Følg opp med en beroligende, barrierestøttende fuktighetskrem.",
      "Bruk alltid SPF på dagtid når du bruker vitamin A.",
      "Skal ikke brukes ved graviditet eller amming.",
    ],
    ingredients: [
      { name: "Hydroxypinacolone retinoate (0,5 %)", effect: "Avansert vitamin A-form som fornyer huden med minimal irritasjon" },
      { name: "Peptider", effect: "Støtter kollagen og fasthet" },
      { name: "Ceramid NP", effect: "Bygger opp og beskytter hudbarrieren" },
      { name: "Nypefrøolje", effect: "Nærer og støtter hudens regenerering" },
    ],
    skinTypes: ["Moden hud", "Normal hud", "Hud med tegn på aldring"],
    related: ["FF-022", "FF-026", "FF-033"],
  },
  {
    sku: "FF-011",
    intro:
      "Clarifying Vitamin A Serum er en målrettet vitamin A-behandling for uren og utbruddsutsatt hud. Den forfiner porene, glatter ujevnheter og gir klarere hud — samtidig som hudbarrieren respekteres.",
    longDesc: [
      "I likhet med storesøsteren Advanced bygger serumet på 0,5 % hydroxypinacolone retinoate, en moderne vitamin A-form som gir effektiv hudfornyelse med vesentlig mindre irritasjon enn tradisjonell retinol. Her er den kombinert med peptider og beroligende ingredienser rettet mot uren, fet og tett hud.",
      "Over tid blir porene mindre synlige, huden jevnere og utbruddene færre — uten den tørre, flassende fasen mange forbinder med A-vitaminkurer. Perfekt for deg som vil jobbe seriøst med uren hud på en skånsom måte.",
    ],
    benefits: [
      "Motvirker urenheter og utbrudd",
      "Forfiner porene og glatter ujevnheter",
      "Jevnere hudtone og tekstur over tid",
      "Skånsom mot hudbarrieren",
      "Mindre irritasjon enn tradisjonell retinol",
    ],
    usage: [
      "Brukes om kvelden på ren, tørr hud.",
      "Påfør 2–3 dråper og fordel jevnt over ansiktet — unngå øyeområdet.",
      "Start med 2–3 kvelder i uken og trapp gradvis opp etter hvert som huden tåler det.",
      "Følg opp med fuktighetskrem.",
      "Bruk alltid SPF på dagtid når du bruker vitamin A.",
      "Skal ikke brukes ved graviditet eller amming.",
    ],
    ingredients: [
      { name: "Hydroxypinacolone retinoate (0,5 %)", effect: "Skånsom vitamin A-form som fornyer huden og motvirker urenheter" },
      { name: "Oligopeptid-32", effect: "Støtter målrettet behandling av uren hud" },
      { name: "Panthenol (provitamin B5)", effect: "Fukter og roer huden underveis" },
    ],
    skinTypes: ["Uren hud", "Fet hud", "Kombinert hud"],
    related: ["FF-004", "FF-021", "FF-033"],
  },
  {
    sku: "FF-012",
    intro:
      "Recovery Boost er en nattolje med 0,3 % retinol som nærer, fornyer og roer huden mens du sover. Ideell for tynn, rynkeutsatt hud som trenger både aktiv fornyelse og god pleie.",
    longDesc: [
      "Oljeserumet kombinerer retinol med antioksidantrike oljer som squalan, soyaolje og engkarseolje, samt beroligende bisabolol. Retinolen jobber med hudens fornyelse og kollagenstøtte om natten, mens oljene demper irritasjonen som ofte følger med.",
      "Resultatet er fyldigere, fastere hud, jevnere pigmentering og synlig glattere linjer over tid. Er huden din sensitiv, kan du blande dråpene med nattkremen din for en mildere start.",
    ],
    benefits: [
      "Glatter synlig fine linjer og aldringstegn",
      "Lysner pigmentflekker og jevner hudtonen",
      "Gir fyldigere og fastere hudfølelse",
      "Støtter kollagen og hudens fornyelse om natten",
      "Nærende oljer demper retinol-irritasjon",
    ],
    usage: [
      "Brukes om kvelden etter rens.",
      "Start med 2–3 kvelder i uken; etter et par uker kan du øke til hver kveld dersom huden tåler det.",
      "Har du sensitiv hud, bland 2–3 dråper med fuktighetskremen din.",
      "Bruk alltid solkrem på dagtid når du bruker retinol.",
      "Skal ikke brukes ved graviditet eller amming.",
    ],
    ingredients: [
      { name: "Retinol (0,3 %)", effect: "Stimulerer hudens fornyelse og motvirker linjer og pigmentflekker" },
      { name: "Squalan", effect: "Fuktgivende olje som mykgjør uten å tette porene" },
      { name: "Bisabolol", effect: "Beroliger huden og demper irritasjon" },
      { name: "Engkarseolje (meadowfoam)", effect: "Nærer og stabiliserer hudens fettbalanse" },
    ],
    skinTypes: ["Moden hud", "Tørr hud", "Hud med tegn på aldring"],
    related: ["FF-001", "FF-023", "FF-033"],
  },
  {
    sku: "FF-013",
    intro:
      "Overnight Smoothing Serum er et eksfolierende nattserum for trett, ujevn eller glåmete hud. Det kombinerer syreeksfoliering, lysning og fukt — så du våkner opp til klarere og mer fornyet hud.",
    longDesc: [
      "Serumet bygger på 10 % glykolsyre som løsner døde hudceller og glatter teksturen mens du sover, kombinert med 1 % tranexamsyre som demper mørke flekker og regulerer melaninaktiviteten, og 0,5 % glutation som gir antioksidantbeskyttelse.",
      "Denne trioen gjør serumet spesielt effektivt mot ujevn pigmentering, matt hudtone og ru tekstur. Fordi det er et aktivt syreprodukt, bør du trappe forsiktig opp og ikke kombinere det med retinol eller andre sterke eksfolianter samme kveld.",
    ],
    benefits: [
      "Reduserer mørke flekker og ujevn pigmentering",
      "Eksfolierer og fremmer hudens fornyelse",
      "Glattere hudoverflate og jevnere tekstur",
      "Gir gløden tilbake til glåmete hud",
      "Binder og bevarer fukt gjennom natten",
    ],
    usage: [
      "Påfør 2–3 dråper på ren, tørr hud om kvelden.",
      "Er huden din sensitiv, eller er du ny til syrer: start med 2–3 kvelder i uken og øk gradvis.",
      "Ikke kombiner med retinol eller andre sterke eksfolianter samme kveld.",
      "Avslutt med en fuktgivende nattkrem.",
      "Bruk alltid SPF på dagtid når du bruker eksfolierende syrer.",
    ],
    ingredients: [
      { name: "Glykolsyre (10 %)", effect: "Eksfolierer døde hudceller og glatter teksturen" },
      { name: "Tranexamsyre (1 %)", effect: "Demper mørke flekker og regulerer melaninaktivitet" },
      { name: "Glutation (0,5 %)", effect: "Antioksidant som støtter en klar og frisk hudtone" },
    ],
    skinTypes: ["Alle hudtyper", "Glåmete hud", "Hud med pigmentflekker"],
    related: ["FF-001", "FF-020", "FF-033"],
  },
  {
    sku: "FF-014",
    intro:
      "Blue Serum er et innovativt serum som balanserer fukt, fornyelse og beskyttelse i én formel. Med kobberpeptider og snøsopp gir det trett og moden hud ny energi, jevnere tekstur og bedre spenst.",
    longDesc: [
      "Hjertet i serumet er 0,5 % kobberpeptider — kjent for å støtte hudens reparasjon og fasthet — kombinert med snøsopp, en botanisk fuktmagnet, og malakittekstrakt som bidrar med antioksidantbeskyttelse.",
      "I en 28-dagers klinisk studie på sensitiv hud opplevde samtlige deltakere bedre fukt i huden, med målbare forbedringer i glatthet og rynker. Serumet passer særlig godt for sliten, moden hud med begynnende tap av fasthet og fine linjer.",
    ],
    benefits: [
      "Glatter og forfiner hudteksturen",
      "Støtter hudens fasthet og elastisitet",
      "Revitaliserer trett og sliten hud",
      "Mykner synlige fine linjer",
      "Dyp fukt med dokumentert effekt i klinisk studie",
    ],
    usage: [
      "Påfør på ren, tørr hud, morgen og/eller kveld.",
      "Dryss noen dråper med pipetten og klapp jevnt utover ansikt og hals.",
      "La serumet trekke inn før du legger på fuktighetskrem.",
      "Avslutt med SPF på dagtid.",
    ],
    ingredients: [
      { name: "Kobberpeptider (0,5 %)", effect: "Støtter hudens reparasjon, fasthet og elastisitet" },
      { name: "Snøsopp", effect: "Botanisk fuktbinder som gir dyp og langvarig fukt" },
      { name: "Malakittekstrakt", effect: "Antioksidant som beskytter mot miljøstress" },
    ],
    skinTypes: ["Moden hud", "Trett hud", "Alle hudtyper"],
    related: ["FF-002", "FF-022", "FF-032"],
  },
  {
    sku: "FF-015",
    intro:
      "Pink Serum er et dyptvirkende fuktserum som styrker hudbarrieren og gir huden den duggfriske gløden tilbake. Fargen kommer naturlig fra vitamin B12 — ingen tilsatt farge, bare aktive ingredienser.",
    longDesc: [
      "Serumet kombinerer 5 % niacinamid, som roer irritasjon og bygger opp barrieren, med 0,2 % vitamin B12 og hyaluronsyre i flere molekylvekter som legger fukt i flere hudlag og holder på den gjennom dagen.",
      "Dette er et serum for deg med tørr, stresset eller glåmete hud — eller rett og slett for deg som vil ha et solid fukttrinn i bunnen av rutinen. Det spiller godt sammen med både aktive produkter og rike kremer.",
    ],
    benefits: [
      "Gir dyp fukt og låser den inne",
      "Styrker og gjenoppbygger hudbarrieren",
      "Roer irritert og stresset hud",
      "Booster hudens naturlige glød",
      "Jevner og lysner hudtonen",
    ],
    usage: [
      "Påfør på ren, tørr hud, morgen og/eller kveld.",
      "Dryss noen dråper med pipetten og klapp jevnt utover ansikt og hals.",
      "La serumet trekke inn før du legger på fuktighetskrem.",
      "Avslutt med SPF på dagtid.",
    ],
    ingredients: [
      { name: "Niacinamid (5 %)", effect: "Roer irritasjon og styrker hudbarrieren" },
      { name: "Vitamin B12 (0,2 %)", effect: "Gir serumet den rosa fargen og støtter hudens balanse" },
      { name: "Hyaluronsyre (flere molekylvekter)", effect: "Binder fukt i flere hudlag for langvarig hydrering" },
    ],
    skinTypes: ["Tørr hud", "Dehydrert hud", "Stresset hud"],
    related: ["FF-005", "FF-020", "FF-032"],
  },
  {
    sku: "FF-016",
    intro:
      "Redness Control Serum er utviklet for sensitiv og irritert hud med vedvarende rødhet. Det demper inflammasjon, styrker hudbarrieren og gir dyp fukt — lett nok til daglig bruk, selv på svært sensitiv hud.",
    longDesc: [
      "Serumet kombinerer 3 % kalium-azeloyl-diglycinat (azeloglycine), et skånsomt azelainsyrederivat som demper rødhet og jevner hudtonen, med 1 % ectoin — et beskyttende molekyl som roer stresset hud og styrker barrieren. Niacinamid, havreekstrakt og aloe vera forsterker den beroligende effekten.",
      "For deg med rosacea-utsatt eller reaktiv hud kan dette bli et fast holdepunkt i rutinen: mindre synlig rødhet, roligere hud og bedre toleranse over tid. Konsistensen er lett og trekker raskt inn uten å fete.",
    ],
    benefits: [
      "Demper synlig rødhet og irritasjon",
      "Roer rosacea-utsatt og reaktiv hud",
      "Styrker hudbarrieren",
      "Gir dyp fukt uten å fete",
      "Jevner ut hudtonen over tid",
    ],
    usage: [
      "Påfør på ren, tørr hud, morgen og/eller kveld.",
      "Dryss noen dråper med pipetten og klapp forsiktig utover ansikt og hals.",
      "La serumet trekke inn før du legger på fuktighetskrem.",
      "Avslutt med SPF på dagtid — sol er en vanlig trigger for rødhet.",
    ],
    ingredients: [
      { name: "Kalium-azeloyl-diglycinat (3 %)", effect: "Azelainsyrederivat som demper rødhet og jevner hudtonen" },
      { name: "Ectoin (1 %)", effect: "Beskytter og roer stresset hud, styrker barrieren" },
      { name: "Niacinamid", effect: "Beroliger og støtter hudens forsvar" },
      { name: "Havreekstrakt", effect: "Lindrer irritert og kløende hud" },
    ],
    skinTypes: ["Sensitiv hud", "Rosacea-utsatt hud", "Irritert hud"],
    related: ["FF-006", "FF-023", "FF-035"],
  },
  {
    sku: "FF-017",
    intro:
      "Oil Control Serum er et aktivt serum for fet og uren hud. Det renser porene, regulerer talg og roer irritasjon — samtidig som huden beholder fukten og får en frisk, sunn glød.",
    longDesc: [
      "Med 2 % salisylsyre går serumet ned i porene og løser opp talg og urenheter, mens niacinamid balanserer talgproduksjonen og styrker barrieren. Formelen er laget for å jobbe aktivt uten å tørke ut — et vanlig problem med produkter for fet hud.",
      "Brukt jevnlig gir det forfinet tekstur, mindre synlige porer og færre utbrudd. En fin daglig makker til rens og lett fuktighetskrem for deg med fet eller kombinert hud.",
    ],
    benefits: [
      "Regulerer overflødig talg",
      "Renser porene og forebygger utbrudd",
      "Minimerer synlige porer",
      "Forfiner hudteksturen",
      "Gir lett fukt og roer huden",
    ],
    usage: [
      "Påfør en liten mengde på ren hud, morgen og/eller kveld.",
      "Fordel jevnt over ansiktet, eller kun på fete områder.",
      "Start gjerne med én gang daglig og øk ved behov — salisylsyre kan tørke ut i starten.",
      "Følg opp med lett fuktighetskrem, og bruk SPF på dagtid.",
    ],
    ingredients: [
      { name: "Salisylsyre (2 %)", effect: "Løser opp talg i porene og motvirker urenheter" },
      { name: "Niacinamid", effect: "Balanserer talgproduksjonen og styrker barrieren" },
      { name: "Glukonolakton", effect: "Mild eksfoliering med fuktbevarende effekt" },
    ],
    skinTypes: ["Fet hud", "Uren hud", "Kombinert hud"],
    related: ["FF-003", "FF-021", "FF-032"],
  },
  {
    sku: "FF-018",
    intro:
      "Acticlear Gel-Cream er en lett behandlingsgel med azeloglycine som reduserer urenheter, balanserer talgproduksjonen og jevner ut hudtone og tekstur. Aktiv nok for utbrudd, mild nok for rosacea-utsatt hud.",
    longDesc: [
      "Azeloglycine (kalium-azeloyl-diglycinat) er et derivat av azelainsyre som kombinerer det beste fra to verdener: den motvirker urenheter og tilstoppede porer, samtidig som den demper rødhet og balanserer pigmentproduksjonen. Squalan og glyserin gir formelen en behagelig, fuktgivende gelkrem-tekstur.",
      "Dette gjør Acticlear til et allsidig valg for fet og utbruddsutsatt hud, kombinert hud — og faktisk også moden hud med ru tekstur eller rosacea-tendens. Kan brukes som lett fuktighetskrem alene eller under annen krem.",
    ],
    benefits: [
      "Reduserer utbrudd og tilstoppede porer",
      "Balanserer talgproduksjonen",
      "Demper rødhet og roer inflammasjon",
      "Jevner ut hudtone og pigmentering",
      "Mild eksfoliering for glattere hud",
    ],
    usage: [
      "Påfør en liten mengde på ren hud, morgen og/eller kveld.",
      "Fordel jevnt over ansikt og hals.",
      "Kan brukes alene som lett fuktighetskrem eller under en rikere krem.",
      "Avslutt med SPF på dagtid.",
    ],
    ingredients: [
      { name: "Azeloglycine (kalium-azeloyl-diglycinat)", effect: "Motvirker urenheter, demper rødhet og jevner pigmentering" },
      { name: "Squalan", effect: "Mykgjør og gir fukt uten å tette porene" },
      { name: "Glyserin", effect: "Trekker fukt til huden og holder den smidig" },
    ],
    skinTypes: ["Fet hud", "Uren hud", "Rosacea-utsatt hud", "Kombinert hud"],
    related: ["FF-004", "FF-011", "FF-033"],
  },
  {
    sku: "FF-018E",
    intro:
      "Utgående emballasje — nå 20 % avslag. Dette er Acticlear i den forrige tuben fra Elixir Cosmeceuticals, merket som i dag heter Face Formula. Samme 60 ml gelkrem med azeloglycine, som reduserer urenheter, balanserer talgproduksjonen og jevner ut hudtone og tekstur. Vi har tre igjen på hylla, og prisen er satt ned fordi tuben er den gamle.",
    longDesc: [
      "Azeloglycine (kalium-azeloyl-diglycinat) er et derivat av azelainsyre som kombinerer det beste fra to verdener: den motvirker urenheter og tilstoppede porer, samtidig som den demper rødhet og balanserer pigmentproduksjonen. Squalan og glyserin gir formelen en behagelig, fuktgivende gelkrem-tekstur.",
      "Dette gjør Acticlear til et allsidig valg for fet og utbruddsutsatt hud, kombinert hud — og faktisk også moden hud med ru tekstur eller rosacea-tendens. Kan brukes som lett fuktighetskrem alene eller under annen krem.",
    ],
    benefits: [
      "Reduserer utbrudd og tilstoppede porer",
      "Balanserer talgproduksjonen",
      "Demper rødhet og roer inflammasjon",
      "Jevner ut hudtone og pigmentering",
      "Mild eksfoliering for glattere hud",
    ],
    usage: [
      "Påfør en liten mengde på ren hud, morgen og/eller kveld.",
      "Fordel jevnt over ansikt og hals.",
      "Kan brukes alene som lett fuktighetskrem eller under en rikere krem.",
      "Avslutt med SPF på dagtid.",
    ],
    ingredients: [
      { name: "Azeloglycine (kalium-azeloyl-diglycinat)", effect: "Motvirker urenheter, demper rødhet og jevner pigmentering" },
      { name: "Squalan", effect: "Mykgjør og gir fukt uten å tette porene" },
      { name: "Glyserin", effect: "Trekker fukt til huden og holder den smidig" },
    ],
    skinTypes: ["Fet hud", "Uren hud", "Rosacea-utsatt hud", "Kombinert hud"],
    related: ["FF-018", "FF-004", "FF-011"],
  },
  {
    sku: "FF-019",
    intro:
      "SOS Paste er en målrettet punktbehandling med 10 % svovel som roer betennelse og reduserer utbrudd, rødhet og irritasjon. En liten tube som gjør stor forskjell når huden slår seg vrang.",
    longDesc: [
      "Svovel har antibakterielle og betennelsesdempende egenskaper, og i denne pastaen er den kombinert med sheasmør og jojobaestere som hindrer at behandlingen tørker ut huden rundt. Formelen er utviklet for akne, men brukes også ved rosacea, perioral dermatitt og seboreisk eksem.",
      "I brukerstudier rapporterte 95 % mindre fet og blank hud, og 80 % opplevde at pastaen forebygde nye utbrudd. Bruk den på enkeltkviser om kvelden, eller tynt på større områder i aktive perioder.",
    ],
    benefits: [
      "Roer betennelse og synlig rødhet",
      "Reduserer aktive utbrudd raskt",
      "Forebygger nye utbrudd ved jevnlig bruk",
      "Regulerer overflødig talg",
      "Skånsom nok for rosacea og perioral dermatitt",
    ],
    usage: [
      "Påfør et tynt lag direkte på utbrudd eller berørte områder.",
      "Brukes om kvelden — eller morgen og kveld i aktive perioder.",
      "Når huden har roet seg: bruk 2–3 kvelder i uken for å forebygge nye utbrudd.",
      "Følg opp med en passende fuktighetskrem.",
    ],
    ingredients: [
      { name: "Svovel (10 %)", effect: "Antibakteriell og betennelsesdempende — roer utbrudd og regulerer talg" },
      { name: "Sheasmør", effect: "Beskytter og mykgjør huden rundt behandlingsområdet" },
      { name: "Jojobaestere", effect: "Nærer og hindrer uttørking" },
    ],
    skinTypes: ["Uren hud", "Fet hud", "Rosacea-utsatt hud"],
    related: ["FF-004", "FF-018", "FF-021"],
  },
  {
    sku: "FF-020",
    intro:
      "Super Hydration Cream er en rik fuktighetskrem som gjenoppretter fuktbalansen, styrker hudbarrieren og beskytter mot ytre miljøpåkjenninger. Formelen gir fukt som varer — opptil 72 timer.",
    longDesc: [
      "Kremen kombinerer ceramider og hyaluronsyre — hudens egne fuktbyggesteiner — med 0,5 % ectoin som beskytter cellene mot stress, og sakkaridisomerat som binder seg til huden og gir langvarig fukt. Sheasmør og panthenol pakker det hele inn i en behagelig, pleiende tekstur.",
      "Dette er kremen for deg med tørr, stram eller ru hud, men den fungerer også som en solid hverdagskrem for de fleste hudtyper — og som rolig motvekt når du bruker aktive produkter som syrer eller vitamin A.",
    ],
    benefits: [
      "Langvarig fukt — opptil 72 timer",
      "Styrker og reparerer hudbarrieren",
      "Forebygger fukttap gjennom dagen",
      "Roer sensitiv og stresset hud",
      "Mykner tørrhetslinjer og bedrer teksturen",
    ],
    usage: [
      "Påfør på ren hud etter serum, morgen og/eller kveld.",
      "Masser en liten mengde jevnt utover ansikt og hals og la den trekke helt inn.",
      "Avslutt med SPF på dagtid.",
    ],
    ingredients: [
      { name: "Ectoin (0,5 %)", effect: "Beskytter hudcellene mot stress og uttørking" },
      { name: "Ceramid NP", effect: "Gjenoppbygger hudbarrieren og hindrer fukttap" },
      { name: "Hyaluronsyre", effect: "Binder fukt og gir spenst" },
      { name: "Sakkaridisomerat", effect: "Fuktbinder som fester seg til huden og gir langtidsvirkende hydrering" },
      { name: "Sheasmør", effect: "Nærer og mykgjør tørr hud" },
    ],
    skinTypes: ["Tørr hud", "Sensitiv hud", "Alle hudtyper"],
    related: ["FF-001", "FF-015", "FF-032"],
  },
  {
    sku: "FF-021",
    intro:
      "Balancing Hydration Cream er en lett, raskt absorberende fuktighetskrem laget for kombinert og fet hud med urenheter og store porer. Den gir fukt der huden trenger det — uten å tilføre mer fett.",
    longDesc: [
      "Kremen balanserer to behov som ofte står i konflikt: fukt og talgkontroll. Miniporyl (2 %) jobber med poresynligheten, silika (2 %) matter ned glans, mens Pentavitin og niacinamid gir langvarig fukt og styrker barrieren.",
      "Resultatet er en hud som kjennes komfortabel og hydrert, men ser matt og balansert ut — uten tette porer. En ideell avslutning på rutinen for deg som bruker talgregulerende serum eller rens.",
    ],
    benefits: [
      "Lett tekstur som trekker raskt inn",
      "Regulerer talg og demper glans",
      "Gir fukt uten å tette porene",
      "Minimerer synlige porer",
      "Styrker hudbarrieren og roer irritasjon",
    ],
    usage: [
      "Påfør på ren hud etter serum, morgen og/eller kveld.",
      "Masser en liten mengde jevnt utover og la den trekke helt inn.",
      "Avslutt med SPF på dagtid.",
    ],
    ingredients: [
      { name: "Miniporyl (2 %)", effect: "Reduserer synligheten av forstørrede porer" },
      { name: "Silika (2 %)", effect: "Matterer og demper glans gjennom dagen" },
      { name: "Pentavitin", effect: "Binder seg til huden og gir langvarig fukt" },
      { name: "Niacinamid", effect: "Regulerer talg og styrker hudbarrieren" },
    ],
    skinTypes: ["Fet hud", "Kombinert hud", "Uren hud"],
    related: ["FF-003", "FF-017", "FF-032"],
  },
  {
    sku: "FF-022",
    intro:
      "Pro Ageing Firming Cream er en oppstrammende krem med Longevity Complex som jobber med hudens langsiktige helse. Rik, men lett — den smelter inn i huden og gir spenst, fukt og en friskere, sunnere hudfølelse.",
    longDesc: [
      "Kremen kombinerer nikotinamid-mononukleotid (en NAD+-booster) og resveratrol — ingredienser knyttet til hudens cellulære energi og aldringsprosesser — med ceramider, hyaluronsyre og fyldige planteoljer og -smør som murumuru og shea.",
      "I en fireukers studie opplevde deltakerne markant bedre fukt i huden, samt målbar reduksjon i fine linjer og rynkevolum. For deg med tørr, moden hud som har mistet litt spenst, er dette en krem som pleier her og nå og investerer i huden fremover.",
    ],
    benefits: [
      "Booster fukt og gir spenst",
      "Reduserer synlige rynker og fine linjer",
      "Bedrer hudens tekstur og fasthet",
      "Støtter hudens langsiktige helse med NAD+-booster og resveratrol",
      "Rik, men lett tekstur som smelter inn i huden",
    ],
    usage: [
      "Påfør på ren hud etter serum, morgen og/eller kveld.",
      "Masser en liten mengde jevnt utover ansikt og hals og la den trekke helt inn.",
      "Avslutt med SPF på dagtid.",
    ],
    ingredients: [
      { name: "Nikotinamid-mononukleotid (NAD+-booster)", effect: "Støtter hudcellenes energi og motstandskraft mot aldring" },
      { name: "Resveratrol", effect: "Kraftig antioksidant som beskytter mot miljøstress" },
      { name: "Ceramider", effect: "Gjenoppbygger barrieren og hindrer fukttap" },
      { name: "Murumurusmør og sheasmør", effect: "Nærer dypt og mykgjør tørr hud" },
    ],
    skinTypes: ["Moden hud", "Tørr hud", "Hud med redusert elastisitet"],
    related: ["FF-010", "FF-026", "FF-033"],
  },
  {
    sku: "FF-023",
    intro:
      "Restore Balm er «hudredderen» — en dypt fuktgivende balm som reparerer, beskytter og bygger opp igjen stresset og svekket hud. Førstevalget når huden er tørr, flassete eller nettopp har vært gjennom en behandling.",
    longDesc: [
      "Balmen kombinerer tre typer ceramider med squalan og bivoks som sammen gjenoppbygger hudbarrieren og låser fukten inne. Centella asiatica og drakeblod-ekstrakt roer irritasjon og støtter hudens naturlige reparasjon, mens solbærfrøolje og hyaluronsyre nærer og fukter.",
      "Bruk den som siste trinn i rutinen for å forsegle alt under, som intensiv nattmaske i tørre perioder, eller som pleie etter klinikkbehandlinger. En liten mengde rekker langt.",
    ],
    benefits: [
      "Gjenoppbygger og styrker hudbarrieren",
      "Gir dyp fukt og hindrer fukttap",
      "Roer sensitiv, reaktiv og irritert hud",
      "Ideell etter behandlinger i klinikk",
      "Mykner tørrhetslinjer og gir spenst",
    ],
    usage: [
      "Varm en ertestor mengde mellom fingertuppene.",
      "Press eller stryk balmen forsiktig utover ansikt og hals som siste trinn i rutinen.",
      "Ved svært tørr hud: påfør på lett fuktig hud, eller bruk et tykkere lag som nattmaske.",
      "Ved bruk om morgenen: avslutt alltid med bredspektret SPF 30+.",
    ],
    ingredients: [
      { name: "Ceramider (NP, AP, EOP)", effect: "Gjenoppbygger hudbarrieren og holder fukten inne" },
      { name: "Centella asiatica", effect: "Roer irritasjon og støtter hudens naturlige reparasjon" },
      { name: "Squalan", effect: "Mykgjør og låser inn fukt" },
      { name: "Solbærfrøolje", effect: "Nærer huden med essensielle fettsyrer" },
    ],
    skinTypes: ["Tørr hud", "Sensitiv hud", "Behandlingsstresset hud"],
    related: ["FF-006", "FF-015", "FF-035"],
  },
  {
    sku: "FF-024",
    intro:
      "Exfoliating Mask er en kremet leirmaske som dyprenser, eksfolierer og gir fukt i samme behandling. Perfekt ukentlig boost for glåmete hud, urenheter og ujevn hudtone.",
    longDesc: [
      "Masken kombinerer to leirtyper (kaolin og bentonitt) som trekker ut urenheter fra porene, med 6 % AHA-syrer og 2 % salisylsyre som løsner døde hudceller og forfiner teksturen. Aloe vera, agurkekstrakt og jojobaolje sørger for at huden ikke tørkes ut underveis.",
      "Etter 3–10 minutter skyller du av og møter en jevnere, klarere og mer glødende hud. Brukes 1–2 ganger i uken — gjerne kvelden før du vil se ekstra frisk ut.",
    ],
    benefits: [
      "Dyprenser porene og trekker ut urenheter",
      "Eksfolierer og forfiner hudteksturen",
      "Lysner og jevner ut hudtonen",
      "Gir umiddelbar glød og klarhet",
      "Fukter samtidig som den renser",
    ],
    usage: [
      "Påfør et tynt, jevnt lag på ren, tørr hud — unngå øyeområdet.",
      "La masken virke i 3–10 minutter.",
      "Skyll grundig av med lunkent vann.",
      "Følg opp med fuktighetskrem, og bruk SPF dagen etter — masken inneholder eksfolierende syrer.",
      "Brukes 1–2 ganger i uken.",
    ],
    ingredients: [
      { name: "AHA-syrer (6 %)", effect: "Eksfolierer og gir jevnere, mer glødende hud" },
      { name: "Salisylsyre (2 %)", effect: "Renser porene i dybden" },
      { name: "Kaolin og bentonitt", effect: "Leire som trekker ut urenheter og overflødig talg" },
      { name: "Aloe vera og agurkekstrakt", effect: "Roer og fukter huden under behandlingen" },
    ],
    skinTypes: ["Kombinert hud", "Fet hud", "Glåmete hud"],
    related: ["FF-001", "FF-020", "FF-032"],
  },
  {
    sku: "FF-025",
    intro:
      "Easy Peel Powder er en enzympeeling i pulverform som aktiveres med vann. Den løser opp døde hudceller, renser porene og balanserer huden — dyptvirkende, men skånsom nok selv for sensibilisert hud.",
    longDesc: [
      "Pulverformatet gjør at de aktive ingrediensene holder seg ferske til du blander dem med vann i hånden. Kaolin renser og detoksifiserer, salisylsyre åpner porene, mens allantoin og fermenterte ekstrakter roer og støtter hudbarrieren.",
      "Du styrer selv intensiteten: en rask massasje gir mild hverdagseksfoliering, mens 2–3 minutters virketid gir en dypere peel. Et fleksibelt verktøy for jevnere tekstur og klarere hud.",
    ],
    benefits: [
      "Løser opp døde hudceller og forfiner teksturen",
      "Renser og åpner tilstoppede porer",
      "Balanserer hudens fuktnivå",
      "Roer og styrker hudbarrieren",
      "Justerbar intensitet — fra mild til dypere peeling",
    ],
    usage: [
      "Rist boksen godt før bruk.",
      "Bland en liten mengde pulver med lunkent vann i håndflaten til en myk pasta.",
      "Masser på fuktig hud i sirkulære bevegelser.",
      "La eventuelt virke i 2–3 minutter for dypere effekt, og skyll grundig av.",
      "Følg opp med fuktighetskrem, og husk SPF på dagtid ved jevnlig eksfoliering.",
    ],
    ingredients: [
      { name: "Kaolin", effect: "Renser og detoksifiserer huden" },
      { name: "Salisylsyre", effect: "Åpner porene og motvirker urenheter" },
      { name: "Allantoin", effect: "Roer og fukter huden under peelingen" },
      { name: "Fermenterte ekstrakter (granateple, reddikrot)", effect: "Støtter hudens balanse og mikrobiom" },
    ],
    skinTypes: ["Alle hudtyper", "Uren hud", "Sensibilisert hud"],
    related: ["FF-002", "FF-015", "FF-020"],
  },
  {
    sku: "FF-026",
    intro:
      "Pro Ageing Eye Cream er en oppstrammende og fuktgivende øyekrem som tar tak i det meste rundt øynene: tørrhetslinjer, rynker, poser og mørke ringer. Utviklet med samme Longevity Complex som resten av Pro Ageing-serien.",
    longDesc: [
      "Kremen kombinerer nikotinamid-mononukleotid (NAD+-booster) med CycloRetin mot rynker og Centella Reversa som roer og styrker den tynne huden rundt øynene. Koffein bidrar til å dempe poser, mens nypefrøolje, kakaosmør og squalan gir fukt og pleie.",
      "Med jevnlig bruk blir området rundt øynene glattere, fastere og friskere å se på — uten tunge, fete teksturer som får sminken til å skli.",
    ],
    benefits: [
      "Reduserer synligheten av mørke ringer",
      "Demper poser og hevelse",
      "Glatter fine linjer og rynker",
      "Strammer opp og gir en mer våken look",
      "Fukter den tynne huden rundt øynene",
    ],
    usage: [
      "Start med ren hud rundt øynene.",
      "Klapp forsiktig inn en liten mengde under og rundt øyet med ringfingeren.",
      "La kremen trekke inn før du fortsetter med serum og fuktighetskrem.",
      "Brukes morgen og/eller kveld.",
    ],
    ingredients: [
      { name: "Nikotinamid-mononukleotid (NAD+-booster)", effect: "Støtter hudcellenes energi og motvirker aldringstegn" },
      { name: "CycloRetin", effect: "Målrettet virkning mot rynker og fine linjer" },
      { name: "Centella Reversa", effect: "Roer og styrker den tynne øyehuden" },
      { name: "Koffein", effect: "Demper poser og hevelse" },
    ],
    skinTypes: ["Moden hud", "Alle hudtyper"],
    related: ["FF-027", "FF-022", "FF-010"],
  },
  {
    sku: "FF-027",
    intro:
      "Depuff Eye Stick er en kjølende øyestift som gir trette øyne en umiddelbar oppstrammer. Koffein, peptider og hyaluronsyre reduserer poser og gir friskhet — perfekt om morgenen eller midt på dagen.",
    longDesc: [
      "Stiften kombinerer en behagelig kjøleeffekt med aktive ingredienser: koffein og hestekastanjeekstrakt jobber mot poser og hevelse, peptider støtter hudens fasthet, mens hyaluronsyre i flere former fukter og gir spenst til den tynne huden under øynene.",
      "Formatet gjør den genial å ha i vesken — den kan brukes utenpå sminke og trenger ingen fingre. Fem strøk, litt lett klapping, og øynene ser mer våkne ut.",
    ],
    benefits: [
      "Umiddelbar kjølende og oppfriskende effekt",
      "Reduserer poser og hevelse",
      "Fukter og gir spenst under øynene",
      "Praktisk stiftformat — perfekt på farten",
      "Kan brukes utenpå sminke",
    ],
    usage: [
      "Før stiften forsiktig i 5 strøk fra indre til ytre øyekrok.",
      "Klapp eller masser lett til produktet er absorbert.",
      "Brukes ved behov gjennom dagen — gjerne rett fra kjøleskapet for ekstra kjøleeffekt.",
    ],
    ingredients: [
      { name: "Koffein", effect: "Demper poser og gir et mer våkent blikk" },
      { name: "Hestekastanjeekstrakt", effect: "Motvirker hevelse og poser under øynene" },
      { name: "Hyaluronsyre (flere former)", effect: "Fukter og gir spenst" },
      { name: "Peptider", effect: "Støtter hudens fasthet" },
      { name: "Aloe vera", effect: "Roer og forfrisker" },
    ],
    skinTypes: ["Alle hudtyper"],
    related: ["FF-026", "FF-015", "FF-020"],
  },
  {
    sku: "FF-028",
    intro:
      "Lip Balm er en peptidberiket leppebehandling som gir dyp fukt, glatter fine linjer og gir leppene naturlig mer fylde. Pleiende smør og oljer reparerer tørre og sprukne lepper.",
    longDesc: [
      "Peptidkomplekset i balmen jobber aktivt med leppenes fylde og fine linjer, mens sheasmør, cupuaçusmør og søtmandelolje gir dyp næring og låser inn fukten. Hyaluronsyre og Myramaze-ekstrakt sørger for hydrering som varer.",
      "Bruk den daglig som siste trinn i rutinen, og legg gjerne på et rausere lag før leggetid — så våkner du med myke, smidige lepper.",
    ],
    benefits: [
      "Gir dyp og langvarig fukt",
      "Naturlig fyldigere lepper med peptider",
      "Glatter fine linjer rundt munnen",
      "Reparerer tørre, sprukne og flassete lepper",
      "Pleiende smør som låser inn fukten",
    ],
    usage: [
      "Påfør som siste trinn i rutinen, morgen og/eller kveld.",
      "Gjenta gjennom dagen ved behov.",
      "Legg på et raust lag før leggetid for intensiv nattpleie.",
    ],
    ingredients: [
      { name: "Peptidkompleks", effect: "Booster leppenes fylde og reduserer fine linjer" },
      { name: "Sheasmør og cupuaçusmør", effect: "Dyp næring som låser inn fukt" },
      { name: "Natriumhyaluronat", effect: "Binder fukt og gir spenst" },
      { name: "Søtmandelolje", effect: "Mykgjør og pleier tørre lepper" },
    ],
    skinTypes: ["Alle hudtyper", "Tørre lepper"],
    related: ["FF-029", "FF-026", "FF-027"],
  },
  {
    sku: "FF-029",
    intro:
      "Lip Balm SPF 25 kombinerer dyp pleie med solbeskyttelse. Rike smør, peptider og antioksidanter reparerer og gir fylde, mens UV-filtre beskytter de sarte leppene mot solskader.",
    longDesc: [
      "Leppene har lite egen pigmentbeskyttelse og er blant de mest solutsatte områdene vi har — likevel glemmer de fleste dem når solkremen påføres. Denne balmen løser det: SPF 25 mot UVA og UVB, pakket inn i samme pleiende formel med sheasmør, peptider og hyaluronsyre som den klassiske leppebalmen.",
      "Perfekt til skiturer, sommerdager og hverdager — alle dager, egentlig. Reappliser jevnlig, spesielt etter mat og drikke.",
    ],
    benefits: [
      "SPF 25-beskyttelse mot UVA og UVB",
      "Dyp fukt og næring for tørre lepper",
      "Peptider som glatter og gir fylde",
      "Reparerer sprukne og irriterte lepper",
      "Beskytter mot vær, vind og miljøstress",
    ],
    usage: [
      "Påfør som siste trinn i morgenrutinen.",
      "Bruk et raust lag når leppene utsettes for sol.",
      "Reappliser gjennom dagen — spesielt etter mat og drikke.",
    ],
    ingredients: [
      { name: "UV-filtre (SPF 25)", effect: "Beskytter leppene mot UVA- og UVB-stråling" },
      { name: "Peptidkompleks", effect: "Glatter og gir naturlig fylde" },
      { name: "Sheasmør og søtmandelolje", effect: "Nærer og reparerer tørre lepper" },
      { name: "Natriumhyaluronat", effect: "Binder fukt gjennom dagen" },
    ],
    skinTypes: ["Alle hudtyper", "Solutsatte lepper"],
    related: ["FF-028", "FF-027", "FF-033"],
  },
  {
    sku: "FF-030",
    intro:
      "Smoothing Body Lotion er en eksfolierende kroppslotion med 10 % glykolsyre som glatter ru og ujevn hud. Effektiv mot små nupper (keratosis pilaris), tørre albuer og inngrodde hår.",
    longDesc: [
      "AHA-syrene — med glykolsyre i spissen — løsner døde hudceller og jevner ut hudoverflaten, mens søtmandelolje og sheasmør gir fukt og hindrer uttørking. Frukt- og sukkerekstrakter bidrar med mild lysning og antioksidantbeskyttelse.",
      "Lotionen er spesielt god mot keratosis pilaris («kyllinghud») på overarmer og lår, ru knær og albuer, og som forebygging mot inngrodde hår etter barbering eller voksing. Brukt jevnlig får du merkbart glattere og jevnere kroppshud.",
    ],
    benefits: [
      "Eksfolierer med 10 % glykolsyre",
      "Glatter nupper og ru tekstur (keratosis pilaris)",
      "Forebygger inngrodde hår etter barbering og voksing",
      "Fukter samtidig som den eksfolierer",
      "Jevnere og mer glødende kroppshud",
    ],
    usage: [
      "Påfør et tynt, jevnt lag på tørr hud — fokuser på ru eller ujevne områder.",
      "La lotionen trekke helt inn før du kler på deg.",
      "Start med noen ganger i uken og øk ved behov.",
      "Følg gjerne opp med en fet kroppskrem for ekstra fukt.",
      "Bruk solkrem på behandlede områder som utsettes for sol — syrer gjør huden mer solfølsom.",
    ],
    ingredients: [
      { name: "Glykolsyre (10 %)", effect: "Eksfolierer døde hudceller og glatter hudoverflaten" },
      { name: "Melkesyre og fruktsyrer", effect: "Forsterker eksfolieringen og gir jevnere hudtone" },
      { name: "Søtmandelolje", effect: "Fukter og mykgjør" },
      { name: "Sheasmør", effect: "Nærer og beskytter mot uttørking" },
    ],
    skinTypes: ["Alle hudtyper", "Ru og ujevn kroppshud", "Tørr hud"],
    related: ["FF-031", "FF-006", "FF-035"],
  },
  {
    sku: "FF-031",
    intro:
      "Firming Body Cream er en luksuriøs, oppstrammende kroppskrem — laget som en ansiktskrem for kroppen. Den bedrer elastisiteten, glatter huden og motvirker synlige aldringstegn på kroppen.",
    longDesc: [
      "Kremen henter aktive ingredienser fra ansiktspleien: bakuchiol (et plantebasert alternativ til retinol) støtter hudens elastisitet og kollagenstruktur, niacinamid styrker barrieren, og hyaluronsyre gir fukt og spenst. Søtmandelolje, sheasmør og aminosyrer nærer i dybden.",
      "Til tross for den rike profilen trekker kremen raskt inn. Bruk den daglig på tørre eller slappe områder — og kombiner gjerne med Smoothing Body Lotion for både eksfoliering og oppstramming.",
    ],
    benefits: [
      "Bedrer hudens elastisitet og fasthet",
      "Glatter ujevn tekstur og fine linjer",
      "Dyp næring med raskt absorberende tekstur",
      "Styrker hudbarrieren med niacinamid",
      "Aktive ingredienser i ansiktskvalitet — for kroppen",
    ],
    usage: [
      "Start med ren, tørr hud.",
      "Masser en raus mengde inn på tørre eller ru områder.",
      "La kremen trekke inn før du kler på deg.",
      "Kombiner gjerne med Smoothing Body Lotion for enda glattere resultat.",
    ],
    ingredients: [
      { name: "Bakuchiol", effect: "Plantebasert retinol-alternativ som støtter elastisitet og kollagen" },
      { name: "Niacinamid", effect: "Styrker hudbarrieren og bedrer motstandskraften" },
      { name: "Hyaluronsyre", effect: "Fukter og gir spenst" },
      { name: "Sheasmør og søtmandelolje", effect: "Nærer dypt og mykgjør tørr kroppshud" },
    ],
    skinTypes: ["Tørr hud", "Moden hud", "Alle hudtyper"],
    related: ["FF-030", "FF-006", "FF-035"],
  },
  {
    sku: "FF-032",
    intro:
      "Nova Cream SPF 30+ er en lett, beskyttende dagkrem med bredspektret filter mot UVA, UVB, infrarød stråling og blått lys. Matt finish som sitter godt — selv på varme dager.",
    longDesc: [
      "Solkremen kombinerer moderne, fotostabile UV-filtre med 1 % ectoin som beskytter hudcellene mot stress, og hyaluronsyre som gir fukt. Formelen er vannfast, korallvennlig og fri for silikoner og mikroplast.",
      "Den matte, behagelige finishen gjør den spesielt god for fet og uren hud som ellers sliter med blanke, fete solkremer — men den passer alle hudtyper og fungerer utmerket som daglig siste trinn, alene eller over dagkrem.",
    ],
    benefits: [
      "Bredspektret beskyttelse: UVA, UVB, infrarød og blått lys",
      "Forebygger solskader og tidlig hudaldring",
      "Matt finish uten fet hinne — fin for uren hud",
      "Vannfast og god til aktivitet ute",
      "Korallvennlig, uten silikoner og mikroplast",
    ],
    usage: [
      "Påfør som siste trinn i morgenrutinen, over serum eller dagkrem.",
      "Smør et jevnt og raust lag over hele ansiktet.",
      "Reappliser ved lengre soleksponering.",
      "Kan blandes med 3–4 dråper Nova Drops SPF 50+ for forsterket beskyttelse.",
    ],
    ingredients: [
      { name: "Bredspektrede UV-filtre", effect: "Beskytter mot UVA, UVB, infrarød stråling og blått lys" },
      { name: "Ectoin (1 %)", effect: "Beskytter hudcellene mot stress og demper inflammasjon" },
      { name: "Hyaluronsyre", effect: "Gir fukt under solbeskyttelsen" },
    ],
    skinTypes: ["Alle hudtyper", "Fet hud", "Sensitiv hud"],
    related: ["FF-009", "FF-020", "FF-033"],
  },
  {
    sku: "FF-033",
    intro:
      "Nova Drops SPF 50+ er ultralette, transparente soldråper med høy bredspektret beskyttelse. Bruk dem alene, eller bland dem rett i dagkremen eller foundationen — solbeskyttelse har aldri vært enklere.",
    longDesc: [
      "Dråpene gir SPF 50+ i en tekstur som trekker inn på sekunder uten hvit hinne eller fet følelse. Antioksidanter, peptider og aloe vera pleier huden samtidig som filtrene beskytter mot UVA og UVB.",
      "Formatet er genialt fleksibelt: 3–4 dråper rett på huden som siste trinn, eller blandet med fuktighetskrem, serum eller sminke. Fordi de ikke tetter porene, er de spesielt gode for uren og sensitiv hud som ellers reagerer på solkrem.",
    ],
    benefits: [
      "Høy beskyttelse SPF 50+ mot UVA og UVB",
      "Ultralett og transparent — ingen hvit hinne",
      "Kan blandes med krem, serum eller sminke",
      "Tetter ikke porene — fin for uren hud",
      "Antioksidanter forebygger lysaldring",
    ],
    usage: [
      "Påfør som siste trinn i morgenrutinen.",
      "Bruk 3–4 dråper rett på huden, eller bland med dagkremen din.",
      "Fordel jevnt over ansikt og hals.",
      "Reappliser ved lengre soleksponering.",
    ],
    ingredients: [
      { name: "Bredspektrede UV-filtre (SPF 50+)", effect: "Høy beskyttelse mot UVA- og UVB-stråling" },
      { name: "Antioksidant-fytokompleks", effect: "Beskytter mot frie radikaler og lysaldring" },
      { name: "Peptider", effect: "Støtter hudens fasthet og fornyelse" },
      { name: "Aloe vera", effect: "Roer og fukter huden" },
    ],
    skinTypes: ["Alle hudtyper", "Uren hud", "Sensitiv hud"],
    related: ["FF-009", "FF-032", "FF-034"],
  },
  {
    sku: "FF-034",
    intro:
      "Nova BB Cream SPF 25 er en tonet BB-krem som jevner ut hudtonen, gir fukt og beskytter mot sol og forurensning — alt i ett trinn. Finnes i to nyanser som tilpasser seg hudens undertone.",
    longDesc: [
      "Kremen gir en naturlig, lett dekkevne som demper rødhet og ujevn pigmentering, mens hyaluronsyre og fuktkomplekser holder huden smidig gjennom dagen. Rødalgeekstrakt støtter elastisiteten, og UVA/UVB-filtre gir daglig beskyttelse.",
      "Velg Colour 1 om du har kjølig eller rødlig undertone, Colour 2 om undertonen er varm og gyllen — pigmentene tilpasser seg huden din for et sømløst resultat. Christina i klinikken hjelper deg gjerne med nyansevalget.",
    ],
    benefits: [
      "Jevner ut hudtonen med naturlig dekkevne",
      "SPF 25-beskyttelse mot UVA og UVB",
      "Booster fukt gjennom hele dagen",
      "Demper rødhet og ujevn pigmentering",
      "Gir sunn glød og mykner fine linjer",
    ],
    usage: [
      "Påfør som siste trinn i morgenrutinen, over serum eller dagkrem.",
      "Smør et jevnt lag over ansiktet — pigmentene tilpasser seg hudens undertone.",
      "Kan blandes med 3–4 dråper Nova Drops SPF 50+ for høyere beskyttelse.",
    ],
    ingredients: [
      { name: "UVA/UVB-filtre (SPF 25)", effect: "Daglig beskyttelse mot solskader" },
      { name: "Hyaluronsyre", effect: "Holder på fukten gjennom dagen" },
      { name: "Rødalgeekstrakt", effect: "Støtter hudens elastisitet" },
      { name: "Acacia Collagen", effect: "Glatter hudoverflaten for jevnere finish" },
    ],
    skinTypes: ["Alle hudtyper", "Ujevn hudtone"],
    related: ["FF-015", "FF-020", "FF-033"],
  },
  {
    sku: "FF-035",
    intro:
      "Mom & Me SPF 50 er en mineralsk solkrem med høy beskyttelse for hele familien — fra baby til voksen. Fysiske filtre gjør den trygg og skånsom, også for sensitiv og reaktiv hud.",
    longDesc: [
      "Solkremen bruker fysiske mineralfiltre (sinkoksid og titandioksid) som legger seg som et beskyttende skjold på hudens overflate, i stedet for å absorberes. Det gjør den ideell for barnehud, sensitiv hud og hud som reagerer på kjemiske filtre.",
      "Aloe vera, hyaluronsyre og squalan roer og fukter samtidig som huden beskyttes, og formelen er fri for syntetiske konserveringsmidler, med 100 % naturlig duft. Én tube som dekker hele familiens behov i solen.",
    ],
    benefits: [
      "Høy mineralsk beskyttelse SPF 50 mot UVA og UVB",
      "Trygg for hele familien — fra baby til voksen",
      "Skånsom mot sensitiv og reaktiv hud",
      "Roer rødhet og gir fukt samtidig",
      "Uten syntetiske konserveringsmidler, 100 % naturlig duft",
    ],
    usage: [
      "Påfør et jevnt og raust lag som siste trinn om morgenen.",
      "Sørg for full dekning av alle soleksponerte områder.",
      "Reappliser hver andre time ved opphold i solen — og alltid etter bading og håndkletørking.",
    ],
    ingredients: [
      { name: "Sinkoksid og titandioksid", effect: "Fysiske mineralfiltre som beskytter mot UVA- og UVB-stråler" },
      { name: "Hyaluronsyre", effect: "Fukter huden under solbeskyttelsen" },
      { name: "Aloe vera", effect: "Roer og lindrer solutsatt hud" },
      { name: "Squalan", effect: "Mykgjør og støtter hudbarrieren" },
    ],
    skinTypes: ["Alle hudtyper", "Sensitiv hud", "Barnehud"],
    related: ["FF-016", "FF-023", "FF-006"],
  },
];
