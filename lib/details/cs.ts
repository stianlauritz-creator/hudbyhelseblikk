import type { ProductDetails } from "../product-details";

export const CS_DETAILS: ProductDetails[] = [
  {
    sku: "CS-001",
    intro:
      "Face Shield SPF 50 er ColoreSciences signatur-solkrem — en lett, tonet og 100 % mineralsk formel som har gjort merket til favoritt hos hudklinikker verden over. Den beskytter huden mot langt mer enn sol, og kjennes som en silkemyk primer på huden.",
    longDesc: [
      "Med EnviroScreen-teknologien kombinerer Face Shield mineralske solfiltre med antioksidanter som sammen beskytter huden mot UVA/UVB-stråler, blått lys fra skjermer, forurensning og infrarød stråling. Det gjør den til en komplett daglig beskyttelse — ikke bare en solkrem for stranden.",
      "Den lette, universelle tonen fra jernoksider jevner ut hudtonen uten å legge seg som sminke, og formelen passer like godt alene som under foundation. Face Shield er også et trygt valg etter klinikkbehandlinger som peel og laser — spør gjerne Christina om hva som passer din hud.",
    ],
    benefits: [
      "100 % mineralsk bredspektret SPF 50 med 12 % sinkoksid",
      "Beskytter mot UVA/UVB, blått lys, forurensning og infrarød stråling",
      "Lett universaltone som jevner ut hudtonen",
      "Silkemyk finish — fungerer utmerket under sminke",
      "Skånsom nok for sensitiv hud og etter behandling",
    ],
    usage: [
      "Rist flasken godt før bruk.",
      "Påfør rikelig og jevnt på ansikt, hals og bryst som siste steg i morgenrutinen — vær raus med mengden for full beskyttelse.",
      "Påfør 15 minutter før du går ut i solen.",
      "Reappliser minst hver 2. time ved soleksponering, og etter bading eller svetting.",
    ],
    ingredients: [
      { name: "Sinkoksid 12 %", effect: "Mineralsk bredspektret filter som beskytter mot UVA- og UVB-stråler" },
      { name: "Jernoksider", effect: "Gir en lett, hudtilpasset tone og bidrar til beskyttelse mot synlig lys" },
      { name: "EnviroScreen-teknologi", effect: "Antioksidantkompleks som motvirker frie radikaler fra forurensning, blått lys og infrarød stråling" },
    ],
    skinTypes: ["Alle hudtyper", "Sensitiv hud"],
    related: ["ZO-002", "ZO-009", "CS-012"],
  },
  {
    sku: "CS-002",
    intro:
      "Face Shield Glow gir deg samme komplette mineralbeskyttelse som klassiske Face Shield — men med subtile lysreflekterende partikler som gir huden en frisk, sunn glød. Perfekt for deg som synes huden fort ser flat eller trett ut.",
    longDesc: [
      "Formelen er 100 % mineralsk med SPF 50 og EnviroScreen-teknologi som beskytter mot UVA/UVB, blått lys, forurensning og infrarød stråling. Glødeffekten kommer fra fint lysreflekterende mineralpigment — ikke glitter — så resultatet blir en naturlig, opplyst hud som ser uthvilt ut.",
      "Bruk den alene for en «no makeup»-glød, eller som en lysende base under foundation. Den fungerer på alle hudtoner og er skånsom nok for sensitiv hud.",
    ],
    benefits: [
      "100 % mineralsk bredspektret SPF 50",
      "Lysreflekterende partikler gir en naturlig, sunn glød",
      "Beskytter mot UVA/UVB, blått lys, forurensning og infrarød stråling",
      "Lett tone som jevner ut og friskner opp hudtonen",
      "Fin alene eller som lysende base under sminke",
    ],
    usage: [
      "Rist flasken godt før bruk.",
      "Påfør rikelig og jevnt på ansikt og hals som siste steg om morgenen.",
      "Påfør 15 minutter før soleksponering.",
      "Reappliser minst hver 2. time i sol, og etter bading eller svetting.",
    ],
    ingredients: [
      { name: "Sinkoksid", effect: "Mineralsk filter som gir bredspektret beskyttelse mot UVA og UVB" },
      { name: "Mica og lysreflekterende mineraler", effect: "Reflekterer lyset og gir huden en frisk, naturlig glød" },
      { name: "EnviroScreen-teknologi", effect: "Beskytter mot frie radikaler fra blått lys, forurensning og infrarød stråling" },
    ],
    skinTypes: ["Alle hudtyper", "Tørr hud", "Glansløs hud"],
    related: ["FF-001", "FF-009", "CS-007"],
  },
  {
    sku: "CS-003",
    intro:
      "Face Shield Matte er laget for deg som elsker mineralbeskyttelsen fra Face Shield, men vil ha en helt matt finish. Den demper glans gjennom dagen og gir en jevn, silkematt overflate — ideell for blandet og fet hud.",
    longDesc: [
      "Formelen kombinerer 100 % mineralsk SPF 50 med talgabsorberende ingredienser som holder T-sonen matt uten å tørke ut huden. EnviroScreen-teknologien beskytter samtidig mot UVA/UVB, blått lys, forurensning og infrarød stråling.",
      "Den lette tonen jevner ut hudtonen og fungerer nydelig som primer under sminke — foundationen sitter lenger og glansen holder seg unna. Et naturlig valg også for hud som er utsatt for urenheter.",
    ],
    benefits: [
      "100 % mineralsk bredspektret SPF 50",
      "Matt finish som demper glans gjennom dagen",
      "Jevner ut hudtonen med en lett universaltone",
      "Fungerer som mattierende primer under sminke",
      "Beskytter mot UVA/UVB, blått lys, forurensning og infrarød stråling",
    ],
    usage: [
      "Rist flasken godt før bruk.",
      "Påfør rikelig og jevnt på renset og fuktet hud som siste steg om morgenen.",
      "Påfør 15 minutter før soleksponering.",
      "Reappliser minst hver 2. time i sol — Brush-On Shield er en enkel måte å fylle på over sminke.",
    ],
    ingredients: [
      { name: "Sinkoksid", effect: "Mineralsk filter med bredspektret UVA/UVB-beskyttelse" },
      { name: "Silikapartikler", effect: "Absorberer overflødig talg og gir en jevn, matt finish" },
      { name: "EnviroScreen-teknologi", effect: "Antioksidantbeskyttelse mot blått lys, forurensning og infrarød stråling" },
    ],
    skinTypes: ["Kombinert hud", "Fet hud", "Uren hud"],
    related: ["ZO-001", "ZO-007", "FF-021"],
  },
  {
    sku: "CS-004",
    intro:
      "Face Shield Bronze gir deg en varm, solkysset glød — helt uten sol. Samtidig får huden full mineralsk SPF 50-beskyttelse, så du kan se brun og opplagt ut med god samvittighet.",
    longDesc: [
      "Den varme bronzetonen smelter inn i huden og gir en naturlig, gyllen varme som passer de fleste hudtoner — alene, blandet med din vanlige Face Shield, eller som flytende bronzer over annen solkrem. EnviroScreen-teknologien beskytter mot UVA/UVB, blått lys, forurensning og infrarød stråling.",
      "Dette er favoritten om sommeren og for deg som vil droppe selvbruning, men fortsatt ha litt farge. Husk: fargen er kosmetisk — beskyttelsen er ekte.",
    ],
    benefits: [
      "100 % mineralsk bredspektret SPF 50",
      "Varm bronzetone gir umiddelbar solkysset glød",
      "Kan brukes alene eller som flytende bronzer over annen SPF",
      "Beskytter mot UVA/UVB, blått lys, forurensning og infrarød stråling",
      "Lett, behagelig tekstur som ikke kjennes som sminke",
    ],
    usage: [
      "Rist flasken godt før bruk.",
      "Påfør rikelig og jevnt på ansikt og hals — eller bland noen dråper med din vanlige Face Shield for en mildere varme.",
      "Påfør 15 minutter før soleksponering.",
      "Reappliser minst hver 2. time i sol, og etter bading eller svetting.",
    ],
    ingredients: [
      { name: "Sinkoksid", effect: "Mineralsk filter med bredspektret UVA/UVB-beskyttelse" },
      { name: "Jernoksider", effect: "Gir den varme bronzetonen og bidrar til beskyttelse mot synlig lys" },
      { name: "EnviroScreen-teknologi", effect: "Motvirker frie radikaler fra blått lys, forurensning og infrarød stråling" },
    ],
    skinTypes: ["Alle hudtyper"],
    related: ["CS-006", "CS-011", "FF-020"],
  },
  {
    sku: "CS-005",
    intro:
      "Face Shield Flex er solkrem og lett foundation i ett. Innkapslede pigmenter aktiveres i fingertuppene og tilpasser seg hudtonen din — resultatet er en jevn, matt hud med naturlig dekkevne og full SPF 50-beskyttelse.",
    longDesc: [
      "Flex bruker en smart pigmentteknologi der jernoksid-pigmentene «blomstrer» når du varmer produktet mellom fingrene, og legger seg tonetilpasset på huden. Dekkevnen er lett til medium og kan bygges der du trenger mer — uten at det ser tykt eller masket ut.",
      "Under fargen ligger en 100 % mineralsk SPF 50 med 12 % sinkoksid og EnviroScreen-teknologi som beskytter mot UVA/UVB, blått lys og forurensning. For mange erstatter Flex både solkrem og foundation i hverdagen. Den finnes i flere nyanser — spør oss i klinikken om hvilken som passer deg.",
    ],
    benefits: [
      "Tonet solkrem og lett foundation i ett — SPF 50",
      "Tonetilpassende pigmenter gir naturlig, byggbar dekkevne",
      "100 % mineralsk med 12 % sinkoksid",
      "Matt, jevn finish som varer gjennom dagen",
      "Beskytter mot UVA/UVB, blått lys og forurensning",
      "Finnes i flere nyanser for ulike hudtoner",
    ],
    usage: [
      "Rist flasken godt før bruk.",
      "Dispenser en liten mengde i fingertuppene og varm produktet lett — pigmentene aktiveres da.",
      "Påfør rikelig og jevnt over hele ansiktet; bygg mer dekkevne der du ønsker.",
      "Påfør 15 minutter før soleksponering, og reappliser minst hver 2. time i sol.",
    ],
    ingredients: [
      { name: "Sinkoksid 12 %", effect: "Mineralsk bredspektret filter mot UVA- og UVB-stråler" },
      { name: "Innkapslede jernoksid-pigmenter", effect: "Aktiveres ved påføring og tilpasser seg din hudtone" },
      { name: "EnviroScreen-teknologi", effect: "Antioksidantbeskyttelse mot blått lys og forurensning" },
    ],
    skinTypes: ["Alle hudtyper", "Sensitiv hud"],
    related: ["ZO-002", "CS-007", "CS-011"],
  },
  {
    sku: "CS-006",
    intro:
      "Brush-On Shield er ColoreSciences geniale solpudder med innebygd kost — den enkleste måten å fylle på solbeskyttelsen gjennom dagen, også over sminke. Alltid i vesken, alltid klar.",
    longDesc: [
      "Det største problemet med solkrem er ikke at vi glemmer å smøre oss om morgenen — det er at vi aldri fyller på. Brush-On Shield løser akkurat det: et 100 % mineralsk pudder med SPF 30 som børstes rett på huden, over sminke, uten å ødelegge noe. Puddret gir samtidig en lett, matterende finish.",
      "Kosten er selvdoserende og hygienisk, og formatet er perfekt for veske, bil og tursekk. Den finnes i flere nyanser som passer ulike hudtoner. Bruk den som påfyll over din Face Shield — ikke som eneste beskyttelse på badedager.",
    ],
    benefits: [
      "100 % mineralsk solpudder med SPF 30",
      "Perfekt for påfyll gjennom dagen — også over sminke",
      "Matterer hud som blir blank utover dagen",
      "Selvdoserende kost — enkel og hygienisk i bruk",
      "Praktisk format for veske og reise",
    ],
    usage: [
      "Vri opp hylsen til det kommer pudder ut i kosten.",
      "Børst puddret på i sirkulære bevegelser over hele ansiktet — bruk god tid og flere strøk for full dekning.",
      "Reappliser minst hver 2. time ved soleksponering.",
      "Lukk hylsen etter bruk for å holde kosten ren.",
    ],
    ingredients: [
      { name: "Sinkoksid", effect: "Mineralsk filter med bredspektret UVA/UVB-beskyttelse" },
      { name: "Titandioksid", effect: "Mineralsk filter som forsterker beskyttelsen mot UV-stråler" },
      { name: "Jernoksider", effect: "Gir puddret en hudnær tone som jevner ut huden" },
    ],
    skinTypes: ["Alle hudtyper", "Sensitiv hud"],
    related: ["CS-001", "ZO-023", "CS-014"],
  },
  {
    sku: "CS-007",
    intro:
      "Total Eye 3-in-1 er øyekrem, lett concealer og mineralsk SPF 35 i ett — et av ColoreSciences mest prisbelønte produkter. Den lysner, glatter og beskytter det sarte området rundt øynene i ett eneste steg.",
    longDesc: [
      "Huden rundt øynene er tynnere enn ellers i ansiktet og viser tidlig tegn på både alder og sol. Total Eye kombinerer et pleiende peptid- og fuktkompleks med mineralsk solbeskyttelse og en lett, lysnende tone som umiddelbart demper mørke ringer og gjør blikket friskere.",
      "Den kjølende applikatoren masserer området rundt øynene og bidrar til å redusere poser mens du påfører. Med daglig bruk pleies fine linjer og hudens fuktnivå over tid — samtidig som SPF 35 beskytter mot ny solskade. Finnes i flere nyanser.",
    ],
    benefits: [
      "3-i-1: øyekrem, lysnende concealer og mineralsk SPF 35",
      "Demper synlige mørke ringer og poser umiddelbart",
      "Peptider og fuktgivere pleier fine linjer over tid",
      "Kjølende applikator gir en behagelig, oppstrammende påføring",
      "Skånsom mineralformel til det sensitive øyeområdet",
    ],
    usage: [
      "Dispenser en halv pumpe på applikatortuppen.",
      "Prikk produktet forsiktig rundt begge øyne.",
      "Glatt ut med den kjølende tuppen over hele området — fra under øyet og opp mot brynet, gjerne også øyelokket.",
      "Bruk morgen (og eventuelt som touch-up på dagen). Reappliser ved lengre soleksponering.",
    ],
    ingredients: [
      { name: "Sinkoksid og titandioksid", effect: "Mineralske filtre som gir bredspektret SPF 35" },
      { name: "Peptider", effect: "Støtter hudens fasthet og demper synlige linjer rundt øynene" },
      { name: "Hyaluronsyre", effect: "Binder fukt og gir en glattere, mer fylt hud" },
      { name: "Panthenol", effect: "Beroliger og pleier den tynne huden rundt øynene" },
    ],
    skinTypes: ["Alle hudtyper", "Moden hud"],
    related: ["ZO-021", "CS-002", "CS-005"],
  },
  {
    sku: "CS-008",
    intro:
      "Even Up er en klinisk pigmentkorrigerer som jobber på tre fronter samtidig: den kamuflerer pigmentflekker umiddelbart, behandler ujevn hudtone over tid, og beskytter mot ny pigmentering med mineralsk SPF 50.",
    longDesc: [
      "Pigmentflekker og melasme trenger både behandling og beskyttelse — uten daglig SPF kommer flekkene raskt tilbake. Even Up kombinerer det patenterte Lumira-komplekset, som jevner ut hudtonen over tid, med bredspektret mineralsk SPF 50 og en universell, lett dekkende tone som visker ut misfarging fra dag én.",
      "Den brukes gjerne sammen med lysnende serum i en pigmentrutine, og er et naturlig valg etter pigmentbehandlinger i klinikk. Christina hjelper deg gjerne å sette sammen en helhetlig rutine mot pigmentering.",
    ],
    benefits: [
      "3-i-1: kamuflerer, behandler og beskytter mot pigmentflekker",
      "Lumira-kompleks jevner ut hudtonen over tid",
      "100 % mineralsk bredspektret SPF 50 forebygger ny pigmentering",
      "Universaltone som demper synlig misfarging umiddelbart",
      "Ideell del av rutinen ved melasme og solskadet hud",
    ],
    usage: [
      "Rist produktet godt før bruk.",
      "Påfør jevnt over hele ansiktet som siste steg i morgenrutinen — vær raus med mengden for full SPF-effekt.",
      "Bygg gjerne et ekstra lag over områder med mer pigmentering.",
      "Reappliser minst hver 2. time ved soleksponering — for eksempel med Brush-On Shield over.",
    ],
    ingredients: [
      { name: "Sinkoksid og titandioksid", effect: "Mineralske filtre med bredspektret SPF 50 som forebygger ny pigmentering" },
      { name: "Lumira-kompleks", effect: "Lysnende ingredienskompleks som jevner ut hudtonen over tid" },
      { name: "Jernoksider", effect: "Gir umiddelbar, lett dekkende utjevning av misfarging" },
    ],
    skinTypes: ["Alle hudtyper", "Pigmentert hud", "Solskadet hud"],
    related: ["ZO-014", "ZO-015", "CS-006"],
  },
  {
    sku: "CS-009",
    intro:
      "All Calm er utviklet for deg med rødhet, sensitiv hud eller rosacea-tendens. Grønne fargekorrigerende pigmenter nøytraliserer rødhet umiddelbart, mens beroligende ingredienser og mineralsk SPF 50 roer og beskytter huden over tid.",
    longDesc: [
      "Rød og reaktiv hud trenger tre ting: umiddelbar kamuflasje, beroligende pleie og konsekvent solbeskyttelse — sol er en av de vanligste triggerne for rødhet og rosacea. All Calm samler alt i ett produkt. Den grønnbaserte undertonen visker ut rødhet uten å se grå eller masket ut, og tørker inn til en naturlig, hudnær finish.",
      "BioSolace-komplekset med blant annet ingefærekstrakt, bisabolol og niacinamid demper irritasjon og støtter hudens barriere, mens den 100 % mineralske SPF 50-beskyttelsen er skånsom nok for selv svært sensitiv hud.",
    ],
    benefits: [
      "Nøytraliserer synlig rødhet umiddelbart med grønne fargepigmenter",
      "BioSolace-kompleks beroliger og demper irritasjon over tid",
      "100 % mineralsk bredspektret SPF 50 — skånsom mot sensitiv hud",
      "Beskytter mot sol, en av de vanligste rosacea-triggerne",
      "Naturlig finish uten grå eller masket effekt",
    ],
    usage: [
      "Rist produktet godt før bruk.",
      "Påfør en jevn, raus mengde over hele ansiktet som siste steg om morgenen.",
      "Klapp forsiktig inn ekstra produkt over spesielt røde områder.",
      "Reappliser minst hver 2. time ved soleksponering.",
    ],
    ingredients: [
      { name: "Sinkoksid og titandioksid", effect: "Skånsomme mineralske filtre med bredspektret SPF 50" },
      { name: "Niacinamid", effect: "Styrker hudbarrieren og demper rødhet" },
      { name: "Bisabolol", effect: "Beroligende ingrediens fra kamille som roer irritert hud" },
      { name: "Ingefærekstrakt", effect: "Antioksidant som bidrar til å dempe irritasjon" },
    ],
    skinTypes: ["Sensitiv hud", "Rosacea-utsatt hud", "Rød og reaktiv hud"],
    related: ["FF-005", "ZO-017", "FF-016"],
  },
  {
    sku: "CS-010",
    intro:
      "Color Balm er en flerbruks fargestift med SPF 50 — én stift som gir farge og solbeskyttelse til kinn, lepper og øyelokk. Vann- og svettebestandig, og liten nok til å være med overalt.",
    longDesc: [
      "Tenk på Color Balm som en multitasker for aktive dager: en kremet, pleiende stift med 12,5 % sinkoksid som gir byggbar farge der du vil ha den — rouge på kinnene, farge på leppene eller en varm tone på øyelokkene — samtidig som området får bredspektret SPF 50.",
      "Formelen er beriket med squalan og jojobaestere som pleier huden, og EnviroScreen-teknologien beskytter mot mer enn bare UV. Finnes i flere farger — perfekt til skidager, båtliv og sommerferie.",
    ],
    benefits: [
      "Farge og bredspektret SPF 50 i én stift",
      "Flerbruk: kinn, lepper og øyelokk",
      "12,5 % sinkoksid — 100 % mineralsk beskyttelse",
      "Vann- og svettebestandig — ideell for aktive dager",
      "Squalan og jojobaestere pleier huden samtidig",
    ],
    usage: [
      "Stryk stiften direkte på kinn, lepper eller øyelokk.",
      "Bygg fargen gradvis — blend ut med fingertuppene for en myk overgang.",
      "Påfør 15 minutter før soleksponering.",
      "Reappliser minst hver 2. time i sol, og etter bading, svetting eller måltider (på leppene).",
    ],
    ingredients: [
      { name: "Sinkoksid 12,5 %", effect: "Mineralsk bredspektret filter mot UVA og UVB" },
      { name: "Squalan", effect: "Mykgjørende lipid som pleier og bevarer fukt" },
      { name: "Jojobaestere", effect: "Gir en smidig, pleiende tekstur som ikke tørker ut" },
    ],
    skinTypes: ["Alle hudtyper"],
    related: ["CS-015", "CS-006", "CS-011"],
  },
  {
    sku: "CS-011",
    intro:
      "Peptide Lip Shine gir leppene glans, farge, dyp fukt og mineralsk SPF 30 — alt i én. Peptidene støtter leppenes fylde over tid, mens hyaluronsyren gir umiddelbar mykhet.",
    longDesc: [
      "Leppene har tynn hud uten egen talgproduksjon, og glemmes ofte når vi smører oss — selv om de er spesielt utsatt for solskade. Peptide Lip Shine kombinerer en pleiende gloss-tekstur med mineralsk SPF 30, slik at leppene beskyttes hver gang du frisker opp fargen.",
      "Peptidkomplekset støtter leppenes naturlige kollagen og elastin for en glattere, fyldigere følelse, og hyaluronsyre trekker fukt til leppene gjennom dagen. Finnes i flere fine nyanser — fra nøytral til mer farge.",
    ],
    benefits: [
      "Leppeglans med 100 % mineralsk SPF 30",
      "Peptider støtter fylde og glattere lepper over tid",
      "Hyaluronsyre gir dyp og langvarig fukt",
      "Subtil farge og glans i flere nyanser",
      "Beskytter et område som ofte glemmes i solen",
    ],
    usage: [
      "Påfør et jevnt lag over hele leppene med applikatoren.",
      "Bruk alene eller over leppepenn/leppestift for glans og beskyttelse.",
      "Reappliser ofte — minst hver 2. time i sol, og etter mat og drikke.",
    ],
    ingredients: [
      { name: "Sinkoksid og titandioksid", effect: "Mineralske filtre som gir SPF 30 til den sarte leppehuden" },
      { name: "Peptider", effect: "Støtter kollagen og elastin for fyldigere, glattere lepper" },
      { name: "Hyaluronsyre", effect: "Binder fukt og gir myke, smidige lepper" },
      { name: "Vitamin E", effect: "Antioksidant som beskytter og pleier" },
    ],
    skinTypes: ["Alle hudtyper", "Tørre lepper"],
    related: ["FF-028", "CS-002", "CS-007"],
  },
  {
    sku: "CS-012",
    intro:
      "Barrier Pro Essential Moisturizer er en lett, men dypt nærende fuktighetskrem som bygger opp igjen hudens naturlige barriere. Perfekt for hud som er tørr, stresset eller nylig behandlet i klinikk.",
    longDesc: [
      "En sterk hudbarriere er grunnlaget for all god hudpleie — den holder fukten inne og irritanter ute. Barrier Pro kombinerer hyaluronsyre i flere molekylstørrelser, som gir fukt i flere hudlag, med squalan og snøsopp-ekstrakt som forsegler fukten og beroliger huden.",
      "Teksturen er lett og trekker raskt inn, men gir en langvarig komfort som gjør den like god under sminke og SPF om morgenen som alene om kvelden. Den passer også fint i perioder med aktive ingredienser som retinol, når huden trenger ekstra barrierestøtte.",
    ],
    benefits: [
      "Styrker og reparerer hudens naturlige barriere",
      "Hyaluronsyre i flere molekylstørrelser gir fukt i dybden",
      "Squalan og snøsopp forsegler fukten uten å tette porene",
      "Lett tekstur — fin under sminke og SPF",
      "God støtte i perioder med retinol eller etter klinikkbehandling",
    ],
    usage: [
      "Påfør morgen og kveld på renset hud, etter eventuelle serum.",
      "Masser inn med lette, oppadgående bevegelser over ansikt og hals.",
      "Om morgenen: avslutt alltid med SPF, for eksempel Face Shield.",
    ],
    ingredients: [
      { name: "Hyaluronsyre (flere molekylstørrelser)", effect: "Trekker og binder fukt i flere lag av huden" },
      { name: "Squalan", effect: "Hudidentisk lipid som forsegler fukt og styrker barrieren" },
      { name: "Snøsopp-ekstrakt", effect: "Naturlig fuktbinder som gir langvarig, beroligende fukt" },
    ],
    skinTypes: ["Alle hudtyper", "Tørr hud", "Sensitiv hud"],
    related: ["ZO-003", "CS-013", "CS-001"],
  },
  {
    sku: "CS-013",
    intro:
      "Pep Up er et avansert serum med 10 ulike peptider som sammen stimulerer hudens egen produksjon av kollagen og elastin. Resultatet er fastere, glattere hud på både ansikt og hals — området vi ofte glemmer.",
    longDesc: [
      "Fra 30-årene mister huden gradvis kollagen, og det synes først som finere linjer og mindre spenst — særlig på halsen, der huden er tynn. Pep Up kombinerer 10 peptider som jobber på ulike måter i huden for å støtte fasthet, elastisitet og jevn tekstur.",
      "Serumet har en lett tekstur som absorberes raskt og fungerer godt under både fuktighetskrem og sminke. Brukt morgen og kveld er dette et naturlig neste steg for deg som vil jobbe forebyggende med hudens fasthet, eller som vil forsterke effekten av klinikkbehandlinger.",
    ],
    benefits: [
      "10 peptider stimulerer hudens egen kollagen- og elastinproduksjon",
      "Fastere og glattere hud på både ansikt og hals",
      "Demper synligheten av fine linjer over tid",
      "Lett tekstur som fungerer under krem og sminke",
      "Fint supplement til oppstrammende klinikkbehandlinger",
    ],
    usage: [
      "Bruk morgen og kveld på ren, lett fuktig hud — som første steg etter rens.",
      "Dispenser 1–2 pumper og fordel i små prikker på ansikt og hals; bruk gjerne en ekstra pumpe til brystet.",
      "Masser inn med lette, oppadgående strøk og klapp forsiktig til serumet er absorbert.",
      "Følg opp med fuktighetskrem, og SPF om morgenen.",
    ],
    ingredients: [
      { name: "Peptidkompleks (10 peptider)", effect: "Signalstoffer som stimulerer hudens produksjon av kollagen og elastin" },
    ],
    skinTypes: ["Alle hudtyper", "Moden hud"],
    related: ["ZO-002", "CS-012", "CS-001"],
  },
  {
    sku: "CS-014",
    intro:
      "Sport Stick er den praktiske solstiften for deg som er aktiv ute — 100 % mineralsk SPF 50 i et format som får plass i lomma. Vann- og svettebestandig i 80 minutter, perfekt til trening, ski og båtliv.",
    longDesc: [
      "Nese, kinnben, ører og lepper er områdene som brenner først — og som er vanskeligst å holde beskyttet gjennom en aktiv dag. Sport Stick med 13 % sinkoksid glir enkelt på uten søl, fester godt selv på svett hud, og kan påføres uten speil.",
      "Formelen er beriket med squalan og pleier huden samtidig som den beskytter. Ha én i treningsbagen, én i skijakka og én i båten — dette er solbeskyttelsen du faktisk får brukt.",
    ],
    benefits: [
      "100 % mineralsk SPF 50 med 13 % sinkoksid",
      "Vann- og svettebestandig i 80 minutter",
      "Perfekt for utsatte områder: nese, kinnben, ører og lepper",
      "Sølfritt stiftformat — enkel påføring uten speil",
      "Squalan pleier huden samtidig som den beskytter",
    ],
    usage: [
      "Stryk stiften direkte på huden i flere strøk til området er godt dekket.",
      "Vær ekstra nøye på nese, kinnben, ører og lepper.",
      "Påfør 15 minutter før soleksponering.",
      "Reappliser minst hver 2. time — og etter 80 minutter i vann eller ved kraftig svetting.",
    ],
    ingredients: [
      { name: "Sinkoksid 13 %", effect: "Mineralsk bredspektret filter mot UVA og UVB" },
      { name: "Squalan", effect: "Pleier og mykgjør huden under aktivitet" },
      { name: "Vitamin E", effect: "Antioksidant som beskytter huden mot frie radikaler" },
    ],
    skinTypes: ["Alle hudtyper", "Sensitiv hud"],
    related: ["CS-015", "CS-006", "CS-011"],
  },
  {
    sku: "CS-015",
    intro:
      "No-Show er markedets tynneste helmineralske solkrem — en gjennomsiktig SPF 50 med ikke-nano sinkoksid som forsvinner helt i huden. Endelig en mineralsk solkrem uten hvit hinne, uansett hudtone.",
    longDesc: [
      "Den vanligste innvendingen mot mineralsk solkrem er den hvite hinnen. No-Show løser det med en ultratynn, lett formel som glir ut som en serumaktig krem og tørker helt usynlig inn — på alle hudtoner. Beskyttelsen er bredspektret SPF 50 med ikke-nano sinkoksid.",
      "Formelen inneholder i tillegg beroligende ingredienser som bisabolol og allantoin, og passer derfor også sensitiv hud. Med 78 ml er den romslig nok til daglig bruk på både ansikt, hals og kropp — et naturlig førstevalg for hele familien i solsesongen.",
    ],
    benefits: [
      "Markedets tynneste 100 % mineralske solkrem",
      "Usynlig finish uten hvit hinne — på alle hudtoner",
      "Bredspektret SPF 50 med ikke-nano sinkoksid",
      "Beroligende bisabolol og allantoin — snill mot sensitiv hud",
      "Stor størrelse — praktisk til ansikt, hals og kropp",
    ],
    usage: [
      "Påfør rikelig og jevnt på ansikt, hals og andre eksponerte områder — vær raus med mengden for full SPF-effekt.",
      "Påfør 15 minutter før soleksponering.",
      "Reappliser minst hver 2. time i sol, og etter bading, svetting eller håndkletørking.",
    ],
    ingredients: [
      { name: "Ikke-nano sinkoksid", effect: "Mineralsk bredspektret filter mot UVA og UVB — usynlig i denne formelen" },
      { name: "Bisabolol", effect: "Beroligende ingrediens som roer huden" },
      { name: "Allantoin", effect: "Mykgjør og demper irritasjon" },
      { name: "Snøsopp-ekstrakt", effect: "Naturlig fuktbinder som gir lett fukt" },
    ],
    skinTypes: ["Alle hudtyper", "Sensitiv hud"],
    related: ["CS-002", "CS-005", "FF-033"],
  },
];
