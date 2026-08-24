// Skriver ut e-posten som sendes av oppgrader-klubbkoder.mjs, med en
// eksempelkode, slik at teksten kan leses og godkjennes før utsending.
//   node scripts/forhandsvis-klubbmal.mjs [utfil.html]
import { writeFileSync } from "node:fs";
import { EMNE, html, tekst } from "./klubb-oppgradering-mal.mjs";

const kode = "KLUBB-7HQK4M";
const fornavn = "Kari";

console.log("Emne: " + EMNE + "\n");
console.log(tekst(kode, fornavn, null));

const ut = process.argv[2];
if (ut) {
  writeFileSync(ut, html(kode, fornavn, null));
  console.log("\nHTML-versjon skrevet til " + ut);
}
