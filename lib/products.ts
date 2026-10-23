// Produktkatalog Hud by Helseblikk — priser matchet mot Klinikk Arendal / Skinsation (Grimstad) / Studio 5, juli 2026

export type Brand = "zo" | "face-formula" | "colorescience" | "gavekort" | "annet";

export interface Product {
  sku: string;
  brand: Brand;
  name: string;      // uten merkenavn-prefiks
  size: string;
  price: number;     // NOK inkl. mva
  desc: string;
  image: string;
  foerPris?: number;        // ordinærpris når varen er nedsatt — vises overstrøket
  retinol?: boolean;        // inneholder retinol — utløser veiledningsboks på produktsiden
  retinolStyrke?: string;   // konsentrasjon der produsenten oppgir den, f.eks. "0,5 %"
  farger?: string[];        // nyanser vi faktisk har inne, f.eks. ["Fair", "Light"]
  utsolgt?: boolean;        // midlertidig tomt — vises, men kan ikke legges i kurv
}

export const BRAND_INFO: Record<Brand, { label: string; tagline: string }> = {
  zo: {
    label: "ZO Skin Health",
    tagline: "Medisinsk hudpleie utviklet av dermatolog Dr. Zein Obagi — kraftfulle formuleringer for hudfornyelse, pigmentering, rosacea og solbeskyttelse.",
  },
  "face-formula": {
    label: "Face Formula",
    tagline: "Norskutviklet kosmesøytisk hudpleie (tidligere Elixir Cosmeceuticals) med dokumenterte aktive ingredienser — utviklet for nordisk hud.",
  },
  colorescience: {
    label: "ColoreScience",
    tagline: "100 % mineralsk solbeskyttelse og korrigerende hudpleie — SPF-produkter som beskytter, behandler og perfeksjonerer i ett.",
  },
  gavekort: {
    label: "Gavekort",
    tagline: "Gi bort god hudhelse — gavekortet gjelder både behandlinger og produkter hos Hud by Helseblikk, og er gyldig i 12 måneder.",
  },
  annet: {
    label: "Annet",
    tagline: "Utvalgte produkter fra klinikken.",
  },
};

export const PRODUCTS: Product[] = [
  { sku: "ZO-001", brand: "zo", name: "Exfoliating Cleanser", size: "200 ml", price: 645, desc: "Eksfolierende rens med salisylsyre for normal til fet og uren hud. Fjerner overflødig talg og urenheter.", image: "/produkter/ZO-001.jpg" },
  { sku: "ZO-002", brand: "zo", name: "Gentle Cleanser", size: "200 ml", price: 645, desc: "Mild gelrens for alle hudtyper. Renser effektivt uten å tørke ut huden.", image: "/produkter/ZO-002.jpg" },
  { sku: "ZO-003", brand: "zo", name: "Hydrating Cleanser", size: "200 ml", price: 645, desc: "Fuktbevarende kremrens for normal til tørr hud.", image: "/produkter/ZO-003.jpg" },
  { sku: "ZO-004", brand: "zo", name: "Calming Toner", size: "180 ml", price: 655, desc: "pH-balanserende og beroligende toner som fjerner rensingsrester og roer huden.", image: "/produkter/ZO-004.jpg" },
  { sku: "ZO-005", brand: "zo", name: "Exfoliating Polish", size: "65 g", price: 895, desc: "Ikonisk skrubb med magnesiumkrystaller som gir jevn, glødende hud. En av ZOs mest solgte.", image: "/produkter/ZO-005.jpg" },
  { sku: "ZO-006", brand: "zo", name: "Complexion Renewal Pads", size: "60 stk", price: 755, desc: "Eksfolierende pads med glykol- og salisylsyre som renser porene og forebygger urenheter.", image: "/produkter/ZO-006.jpg" },
  { sku: "ZO-007", brand: "zo", name: "Oil Control Pads", size: "60 stk", price: 935, desc: "Pads med 2 % salisylsyre som regulerer talg og motvirker uren hud.", image: "/produkter/ZO-007.jpg" },
  { sku: "ZO-008", brand: "zo", name: "Exfoliation Accelerator", size: "100 ml", price: 1075, desc: "Eksfolierende lotion med glykol- og melkesyre som jevner ut hudteksturen og gir glød.", image: "/produkter/ZO-008.jpg" },
  { sku: "ZO-009", brand: "zo", name: "Daily Power Defense", size: "50 ml", price: 2175, desc: "ZOs signaturserum med retinol, peptider, enzymer og antioksidanter som styrker hudens barriere og reparasjon.", image: "/produkter/ZO-009.jpg", retinol: true },
  { sku: "ZO-010", brand: "zo", name: "Growth Factor Serum", size: "30 ml", price: 2125, desc: "Vekstfaktor- og peptidserum mot fine linjer og volumtap. Storselger for hudfornyelse.", image: "/produkter/ZO-010.jpg" },
  { sku: "ZO-012", brand: "zo", name: "Radical Night Repair", size: "60 ml", price: 2485, desc: "Intensiv nattbehandling med 1 % retinol for markant hudfornyelse og jevnere pigmentering.", image: "/produkter/ZO-012.jpg", retinol: true, retinolStyrke: "1 %" },
  { sku: "ZO-013", brand: "zo", name: "Retinol Skin Brightener 0,5 %", size: "50 ml", price: 1615, desc: "Retinolkrem som jevner ut hudtonen og gir glød. Mellomstyrken – finnes også i 0,25 % og 1 %.", image: "/produkter/ZO-013.jpg", retinol: true, retinolStyrke: "0,5 %" },
  { sku: "ZO-014", brand: "zo", name: "Brightalive Skin Brightener", size: "50 ml", price: 1735, desc: "Lysnende serum mot pigmentflekker – uten retinol og hydrokinon.", image: "/produkter/ZO-014.jpg" },
  { sku: "ZO-015", brand: "zo", name: "10% Vitamin C Self-Activating", size: "50 ml", price: 1450, desc: "Selvaktiverende 10 % vitamin C som lysner, beskytter mot frie radikaler og jevner hudtonen.", image: "/produkter/ZO-015.jpg" },
  { sku: "ZO-016", brand: "zo", name: "Firming Serum", size: "47 ml", price: 2850, desc: "Oppstrammende peptidserum som bedrer hudens fasthet og definisjon.", image: "/produkter/ZO-016.jpg" },
  { sku: "ZO-017", brand: "zo", name: "Rozatrol", size: "50 ml", price: 1415, desc: "Normaliserende serum for rød og rosacea-utsatt hud. Roer huden og styrker barrieren.", image: "/produkter/ZO-017.jpg" },
  { sku: "ZO-018", brand: "zo", name: "Recovery Crème", size: "50 ml", price: 1595, desc: "Rik anti-age fuktighetskrem som gjenoppbygger fuktbarrieren, gjerne etter behandling.", image: "/produkter/ZO-018.jpg" },
  { sku: "ZO-019", brand: "zo", name: "Hydrating Crème", size: "113 g", price: 1295, desc: "Intensiv krem for svært tørr, irritert eller behandlingsstresset hud.", image: "/produkter/ZO-019.jpg" },
  { sku: "ZO-020", brand: "zo", name: "Intense Eye Crème", size: "15 ml", price: 1585, desc: "Kraftig øyekrem med retinol og peptider mot linjer, poser og mørke ringer.", image: "/produkter/ZO-020.jpg", retinol: true },
  { sku: "ZO-021", brand: "zo", name: "Growth Factor Eye Serum", size: "15 ml", price: 1525, desc: "Vekstfaktor-øyeserum som styrker den tynne huden rundt øynene og reduserer linjer.", image: "/produkter/ZO-021.jpg" },
  { sku: "ZO-022", brand: "zo", name: "Sunscreen + Primer SPF 30", size: "30 ml", price: 895, desc: "Solbeskyttelse og primer i ett med silkematt finish – populær daglig avslutter.", image: "/produkter/ZO-022.jpg" },
  { sku: "ZO-023", brand: "zo", name: "Daily Sheer SPF 50", size: "45 ml", price: 895, desc: "Transparent, lett bredspektret solkrem for daglig bruk.", image: "/produkter/ZO-023.jpg" },
  { sku: "ZO-024", brand: "zo", name: "Balancing Cleansing Emulsion", size: "200 ml", price: 675, desc: "Mild gel-til-melk-rens som løser sminke og solkrem uten å stresse hudbarrieren. Trygg for sensitiv hud.", image: "/produkter/ZO-024.jpg" },
  { sku: "ZO-025", brand: "zo", name: "Dual Action Scrub", size: "116 g", price: 995, desc: "Skrubb med både fysisk og kjemisk eksfoliering (melke- og salisylsyre) for uren, fet hud med tette porer.", image: "/produkter/ZO-025.jpg" },
  { sku: "ZO-026", brand: "zo", name: "Soothing Hydro Mist", size: "100 ml", price: 895, desc: "Alkoholfri ansiktsmist med hyaluronsyre som gir fukt og roer rødhet – kan brukes over sminke.", image: "/produkter/ZO-026.jpg" },
  { sku: "ZO-027", brand: "zo", name: "Complexion Clearing Masque", size: "85 g", price: 675, desc: "Leire- og svovelmaske som renser porene og suger opp overflødig talg. For fet og uren hud.", image: "/produkter/ZO-027.jpg" },
  { sku: "ZO-028", brand: "zo", name: "Illuminating AOX Serum", size: "50 ml", price: 2200, desc: "Antioksidantserum for dagtid som beskytter mot forurensning og gir huden en myk, lysende finish.", image: "/produkter/ZO-028.jpg" },
  { sku: "ZO-029", brand: "zo", name: "Peptide Facial Refining Concentrate", size: "30 ml", price: 3100, desc: "Peptidserum med fire peptidteknologier som mykner linjer, gir fyldigere hud og mer definert ansiktskontur.", image: "/produkter/ZO-029.jpg" },
  { sku: "ZO-030", brand: "zo", name: "Enzymatic Peel", size: "50 ml", price: 1195, desc: "Hjemmepeel med papain, bromelain og glykolsyre som fjerner døde hudceller og gir glattere, mer glødende hud.", image: "/produkter/ZO-030.jpg" },
  { sku: "ZO-031", brand: "zo", name: "Eye Brightening Crème", size: "15 g", price: 1695, desc: "Rik øyekrem med retinol, koffein og kojic-dipalmitat mot mørke ringer, poser og fine linjer.", image: "/produkter/ZO-031.jpg", retinol: true },
  { sku: "ZO-032", brand: "zo", name: "Complexion Clarifying Serum", size: "50 ml", price: 1495, desc: "Lett vanngelserum med salisylsyre som reduserer talg, glans og tette porer. For fet og uren hud.", image: "/produkter/ZO-032.jpg" },
  { sku: "ZO-033", brand: "zo", name: "Instant Pore Refiner", size: "29 g", price: 895, desc: "Lett serum som gjør porene mindre synlige og gir umiddelbar matt finish. Fin under sminke.", image: "/produkter/ZO-033.jpg" },
  { sku: "ZO-034", brand: "zo", name: "Neck Complex", size: "50 ml", price: 1650, desc: "Oppstrammende og lysnende serum for hals og bryst. Mot slapp, kreppet hud og horisontale halslinjer.", image: "/produkter/ZO-034.jpg" },
  { sku: "ZO-035", brand: "zo", name: "Renewal Crème", size: "50 ml", price: 1495, desc: "Lett, raskt absorberende fuktighetskrem som roer lett tørr og rød hud – også før og etter behandling.", image: "/produkter/ZO-035.jpg", retinol: true },
  { sku: "ZO-036", brand: "zo", name: "Smart Tone SPF 50", size: "45 ml", price: 695, desc: "Lett solkrem med selvjusterende fargetone som tilpasser seg huden din – høy beskyttelse med jevn, frisk finish.", image: "/produkter/ZO-036.jpg" },
  { sku: "ZO-037", brand: "zo", name: "Sheer Fluid Tint SPF 30", size: "50 ml", price: 695, desc: "ZOs letteste solkrem: tonet mineralfluid med sinkoksid og usynlig «second skin»-finish. Velg nyanse.", image: "/produkter/ZO-037.jpg", farger: ["Fair-light", "Light-medium"] },
  { sku: "ZO-038", brand: "zo", name: "Daily Mineral Sunshade SPF 30", size: "45 ml", price: 695, desc: "Helmineralsk, tonet solkrem med sinkoksid og titandioksid. Lett dekk som kan bygges opp i lag. Velg nyanse.", image: "/produkter/ZO-038.jpg", farger: ["Light", "Light medium", "Medium", "Tan"] },
  { sku: "ZO-039", brand: "zo", name: "Gel Sunscreen SPF 30", size: "96 g", price: 775, desc: "Transparent, vannbestandig gelsolkrem for ansikt og kropp – tørker raskt inn uten glans eller hvit hinne.", image: "/produkter/ZO-039.jpg" },
  { sku: "ZO-040", brand: "zo", name: "Skin Brightening Sheet Masque", size: "3 stk", price: 495, desc: "Fuktgivende sheet-maske som gir umiddelbar glød og friskere, jevnere hud på et kvarter. 3 stk.", image: "/produkter/ZO-040.jpg" },
  { sku: "ZO-041", brand: "zo", name: "Anti-Aging Program", size: "pakke", price: 3525, desc: "Komplett program mot tidlige og tydelige aldringstegn – rens, eksfoliering, Daily Power Defense og Growth Factor Serum.", image: "/produkter/ZO-041.jpg", retinol: true },
  { sku: "ZO-042", brand: "zo", name: "Redness Relief + Barrier Defense Program", size: "pakke", price: 2765, desc: "Program for rød og sensitiv hud: mild rens, Calming Toner, Daily Power Defense, Rozatrol og Soothing Hydro Mist.", image: "/produkter/ZO-042.jpg", retinol: true },
  { sku: "ZO-043", brand: "zo", name: "Retinol Skin Brightener 0,25 %", size: "50 ml", price: 1495, desc: "Nybegynnerstyrken av ZOs lysnende retinolkrem. Jevnere hudtone og glød – en skånsom start på retinol.", image: "/produkter/ZO-043.jpg", retinol: true, retinolStyrke: "0,25 %" },
  { sku: "ZO-044", brand: "zo", name: "Retinol Skin Brightener 1 %", size: "50 ml", price: 1735, desc: "Den kraftigste styrken av ZOs lysnende retinolkrem – for deg som allerede bruker retinol jevnlig.", image: "/produkter/ZO-044.jpg", retinol: true, retinolStyrke: "1 %" },
  { sku: "ZO-045", brand: "zo", name: "Soothing Ointment", size: "50 ml", price: 995, desc: "Beroligende, lipidrik salve som gjenoppbygger hudbarrieren etter behandling eller i perioder med sår og irritert hud.", image: "/produkter/ZO-045.jpg" },
  { sku: "ZO-046", brand: "zo", name: "Body Emulsion", size: "240 ml", price: 995, desc: "Kroppskrem med retinol og enzymer som glatter grov hudtekstur, gir dyp fukt og jevnere hudtone.", image: "/produkter/ZO-046.jpg", retinol: true },
  { sku: "ZO-047", brand: "zo", name: "Daily Skincare Program", size: "pakke", price: 1225, desc: "ZOs grunnrutine i reisestørrelse: rens, polish, pads og Daily Power Defense. Perfekt start – eller reisesett.", image: "/produkter/ZO-047.jpg", retinol: true },
  { sku: "ZO-048", brand: "zo", name: "Complexion Clearing Program", size: "pakke", price: 2970, desc: "Komplett rutine for fet og uren hud: rens, polish, pads og leiremaske som renser porene og regulerer talg.", image: "/produkter/ZO-048.jpg" },
  { sku: "FF-001", brand: "face-formula", name: "Daily Gel Cleanser", size: "200 ml", price: 399, desc: "Mild, forfriskende rensegel for daglig bruk som styrker hudbarrieren. Alle hudtyper.", image: "/produkter/FF-001.jpg" },
  { sku: "FF-002", brand: "face-formula", name: "Face Foam Cleanser", size: "150 ml", price: 449, desc: "Mild renseskum som gir rikt skum uten å tørke ut huden. Alle hudtyper.", image: "/produkter/FF-002.jpg" },
  { sku: "FF-003", brand: "face-formula", name: "Purifying Cleanser", size: "200 ml", price: 579, desc: "Dyptvirkende rensegel med mild eksfoliering. Huden kjennes frisk og revitalisert.", image: "/produkter/FF-003.jpg" },
  { sku: "FF-004", brand: "face-formula", name: "SOS Cleanser", size: "100 ml", price: 590, desc: "Klargjørende rens som regulerer talg og motvirker tilstoppede porer. For uren hud.", image: "/produkter/FF-004.jpg" },
  { sku: "FF-005", brand: "face-formula", name: "2 in 1 Refining Cleansing Milk", size: "100 ml", price: 595, desc: "Rensemelk som renser, beroliger og styrker hudbarrieren. For tørr og sensibel hud.", image: "/produkter/FF-005.jpg" },
  { sku: "FF-006", brand: "face-formula", name: "Probiotic Cleansing Mousse", size: "200 ml", price: 699, desc: "Skånsom, probiotisk rensemousse for ansikt og kropp som ikke stripper huden.", image: "/produkter/FF-006.jpg" },
  { sku: "FF-007", brand: "face-formula", name: "Essential Formula", size: "100 ml", price: 1080, desc: "Merkets signaturprodukt: potent blanding av aktive ingredienser (6 %) som gir fukt, roer huden og forbedrer hudkvaliteten.", image: "/produkter/FF-007.jpg" },
  { sku: "FF-008", brand: "face-formula", name: "Niactil", size: "100 ml", price: 980, desc: "Fuktgivende og utjevnende krem med 4 % niacinamid som balanserer huden og gir glød.", image: "/produkter/FF-008.jpg" },
  { sku: "FF-009", brand: "face-formula", name: "Vitamin C Booster", size: "30 ml", price: 1070, desc: "15 % vitamin C-kompleks som reduserer fine linjer og bedrer elastisitet og glød.", image: "/produkter/FF-009.jpg" },
  { sku: "FF-010", brand: "face-formula", name: "Advanced Vitamin A Serum", size: "30 ml", price: 1490, desc: "Høyeffektivt vitamin A-serum mot tegn på hudaldring. Jevnere tekstur og mer vitalitet.", image: "/produkter/FF-010.jpg" },
  { sku: "FF-011", brand: "face-formula", name: "Clarifying Vitamin A Serum", size: "30 ml", price: 1290, desc: "Målrettet vitamin A-behandling mot urenheter for klarere og mer balansert hud.", image: "/produkter/FF-011.jpg" },
  { sku: "FF-012", brand: "face-formula", name: "Recovery Boost", size: "30 ml", price: 1190, desc: "Nattolje med 0,3 % retinol som gir fyldigere hud og motvirker fine linjer og pigmentflekker.", image: "/produkter/FF-012.jpg", retinol: true, retinolStyrke: "0,3 %" },
  { sku: "FF-013", brand: "face-formula", name: "Overnight Smoothing Serum", size: "30 ml", price: 890, desc: "Eksfolierende nattserum – våkn opp til klarere og fornyet hud.", image: "/produkter/FF-013.jpg" },
  { sku: "FF-014", brand: "face-formula", name: "Blue Serum", size: "30 ml", price: 1390, desc: "Innovativt serum som balanserer fukt, fornyelse og beskyttelse i ett.", image: "/produkter/FF-014.jpg" },
  { sku: "FF-015", brand: "face-formula", name: "Pink Serum", size: "30 ml", price: 699, desc: "Dyptvirkende fuktserum som styrker hudbarrieren. For tørr og stresset hud.", image: "/produkter/FF-015.jpg" },
  { sku: "FF-016", brand: "face-formula", name: "Redness Control Serum", size: "30 ml", price: 1290, desc: "Beroligende serum som demper rødhet og irritasjon og jevner ut hudtonen.", image: "/produkter/FF-016.jpg" },
  { sku: "FF-017", brand: "face-formula", name: "Oil Control Serum", size: "30 ml", price: 599, desc: "Serum mot uren og fet hud. Forfiner teksturen og minimerer porene.", image: "/produkter/FF-017.jpg" },
  { sku: "FF-018", brand: "face-formula", name: "Acticlear Gel-Cream", size: "60 ml", price: 845, desc: "Avansert gelkrem som balanserer talg, roer inflammasjon og gir klarere hud.", image: "/produkter/FF-018.jpg" },
  { sku: "FF-018E", brand: "face-formula", name: "Acticlear Gel-Cream (utgående emballasje)", size: "60 ml", price: 676, foerPris: 845, desc: "Utgående emballasje — nå 20 % avslag. Acticlear i den forrige tuben fra Elixir Cosmeceuticals, merket som i dag heter Face Formula. Vi har tre igjen.", image: "/produkter/FF-018E-elixir.jpg" },
  { sku: "FF-019", brand: "face-formula", name: "SOS Paste", size: "30 ml", price: 790, desc: "Punktbehandling (svovelpasta) som roer betennelse og reduserer utbrudd og rødhet.", image: "/produkter/FF-019.jpg" },
  { sku: "FF-020", brand: "face-formula", name: "Super Hydration Cream", size: "100 ml", price: 890, desc: "Rik fuktighetskrem som gir langvarig fukt og styrker hudbarrieren.", image: "/produkter/FF-020.jpg" },
  { sku: "FF-021", brand: "face-formula", name: "Balancing Hydration Cream", size: "60 ml", price: 699, desc: "Lett, raskt absorberende fuktighetskrem som regulerer talg. For fet og kombinert hud.", image: "/produkter/FF-021.jpg" },
  { sku: "FF-022", brand: "face-formula", name: "Pro Ageing Firming Cream", size: "50 ml", price: 1390, desc: "Oppstrammende krem som booster kollagen og NAD+ for hudens langsiktige helse.", image: "/produkter/FF-022.jpg" },
  { sku: "FF-023", brand: "face-formula", name: "Restore Balm", size: "60 ml", price: 749, desc: "«Hudredderen»: dypt fuktgivende balm som reparerer og styrker stresset hud.", image: "/produkter/FF-023.jpg" },
  { sku: "FF-024", brand: "face-formula", name: "Exfoliating Mask", size: "60 ml", price: 549, desc: "Kremet leirmaske som dyprenser og eksfolierer effektivt.", image: "/produkter/FF-024.jpg" },
  { sku: "FF-025", brand: "face-formula", name: "Easy Peel Powder", size: "60 g", price: 649, desc: "Enzympeeling i pulverform som løser opp døde hudceller og renser porene.", image: "/produkter/FF-025.jpg" },
  { sku: "FF-026", brand: "face-formula", name: "Pro Ageing Eye Cream", size: "15 ml", price: 1190, desc: "Oppstrammende og fuktgivende øyekrem mot linjer og slapp hud rundt øynene.", image: "/produkter/FF-026.jpg" },
  { sku: "FF-027", brand: "face-formula", name: "Depuff Eye Stick", size: "5 ml", price: 449, desc: "Kjølende øyestift som reduserer poser og gir umiddelbar friskhet.", image: "/produkter/FF-027.jpg" },
  { sku: "FF-028", brand: "face-formula", name: "Lip Balm", size: "10 ml", price: 249, desc: "Leppebehandling med peptidcocktail som gir fukt og fyldigere lepper.", image: "/produkter/FF-028.jpg" },
  { sku: "FF-029", brand: "face-formula", name: "Lip Balm SPF 25", size: "10 ml", price: 249, desc: "Pleiende leppebalm med solbeskyttelse SPF 25.", image: "/produkter/FF-029.jpg" },
  { sku: "FF-030", brand: "face-formula", name: "Smoothing Body Lotion", size: "200 ml", price: 699, desc: "Eksfolierende kroppslotion med 10 % glykolsyre for jevnere hud.", image: "/produkter/FF-030.jpg" },
  { sku: "FF-031", brand: "face-formula", name: "Firming Body Cream", size: "200 ml", price: 990, desc: "Oppstrammende kroppskrem som bedrer elastisitet og glatter huden.", image: "/produkter/FF-031.jpg" },
  { sku: "FF-032", brand: "face-formula", name: "Nova Cream SPF 30+", size: "50 ml", price: 790, desc: "Lett, beskyttende dagkrem med bredspektret UVA/UVB-filter.", image: "/produkter/FF-032.jpg" },
  { sku: "FF-033", brand: "face-formula", name: "Nova Drops SPF 50+", size: "30 ml", price: 940, desc: "Ultralette, transparente soldråper med bredspektret høy beskyttelse.", image: "/produkter/FF-033.jpg" },
  { sku: "FF-034", brand: "face-formula", name: "Nova BB Cream SPF 25", size: "30 ml", price: 590, desc: "Tonet BB-krem som jevner ut hudtonen, gir fukt og solbeskyttelse.", image: "/produkter/FF-034.jpg" },
  { sku: "FF-035", brand: "face-formula", name: "Mom & Me SPF 50", size: "100 ml", price: 980, desc: "Mineralsk solkrem med høy beskyttelse for hele familien.", image: "/produkter/FF-035.jpg", utsolgt: true },
  { sku: "FF-036", brand: "face-formula", name: "Rescue Formula", size: "150 ml", price: 790, desc: "Reparerende centella-krem for stresset, irritert og overbehandlet hud — til ansikt og kropp.", image: "/produkter/FF-036.jpg" },
  { sku: "FF-037", brand: "face-formula", name: "Rescue Formula", size: "30 ml", price: 320, desc: "Reparerende centella-krem i reisestørrelse — for stresset, irritert og overbehandlet hud.", image: "/produkter/FF-037.jpg" },
  // ColoreScience-utvalget er trimmet til det klinikken faktisk har inne
  // (Mabel, 17.08.2026). De øvrige SKU-ene er tatt ut av katalogen — ikke
  // slettet fra lib/details/cs.ts, så de kan settes inn igjen ved bestilling.
  { sku: "CS-002", brand: "colorescience", name: "Face Shield Glow SPF 50", size: "55 ml", price: 775, desc: "Mineralsk SPF 50 med subtile lysreflekterende partikler som gir huden en sunn glød.", image: "/produkter/CS-002.jpg" },
  { sku: "CS-005", brand: "colorescience", name: "Face Shield Flex SPF 50", size: "55 ml", price: 775, desc: "Tonet solkrem og foundation i ett med SPF 50 — tilpasser seg hudtonen og gir naturlig dekkevne.", image: "/produkter/CS-005.jpg", farger: ["Fair", "Light", "Medium", "Tan"] },
  { sku: "CS-007", brand: "colorescience", name: "Total Eye 3-in-1 Renewal Therapy SPF 35", size: "7 ml", price: 1095, desc: "Øyekrem, concealer og SPF 35 i ett. Reduserer synlige tegn på mørke ringer, poser og fine linjer.", image: "/produkter/CS-007.jpg", farger: ["Fair", "Medium"] },
  { sku: "CS-011", brand: "colorescience", name: "Peptide Lip Shine SPF 30", size: "4 ml", price: 495, desc: "Nærende leppeglans med peptider og SPF 30 som gir fyldigere, mykere lepper med dyp fukt.", image: "/produkter/CS-011.jpg", farger: ["Pink"] },
  { sku: "CS-015", brand: "colorescience", name: "Total Protection No-Show Mineral Sunscreen SPF 50", size: "78 ml", price: 895, desc: "Markedets tynneste helmineralske solkrem — usynlig på huden, med ikke-nano sinkoksid.", image: "/produkter/CS-015.jpg", utsolgt: true },
  { sku: "GK-0500", brand: "gavekort", name: "Gavekort 500,-", size: "PDF eller fysisk kort", price: 500, desc: "Gavekort på 500 kroner til behandlinger og produkter hos Hud by Helseblikk. Sendes som PDF på e-post innen én virkedag, eller hentes i klinikken. Gyldig i 12 måneder.", image: "/produkter/GK-0500.jpg" },
  { sku: "GK-1000", brand: "gavekort", name: "Gavekort 1.000,-", size: "PDF eller fysisk kort", price: 1000, desc: "Gavekort på 1.000 kroner til behandlinger og produkter hos Hud by Helseblikk. Sendes som PDF på e-post innen én virkedag, eller hentes i klinikken. Gyldig i 12 måneder.", image: "/produkter/GK-1000.jpg" },
  { sku: "GK-2000", brand: "gavekort", name: "Gavekort 2.000,-", size: "PDF eller fysisk kort", price: 2000, desc: "Gavekort på 2.000 kroner til behandlinger og produkter hos Hud by Helseblikk. Sendes som PDF på e-post innen én virkedag, eller hentes i klinikken. Gyldig i 12 måneder.", image: "/produkter/GK-2000.jpg" },
];

export const formatPrice = (n: number) =>
  n.toLocaleString("nb-NO") + ",-";
