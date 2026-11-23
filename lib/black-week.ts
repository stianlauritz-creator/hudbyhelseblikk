// Black Week 2026: 10 % på ZO Skin Health, 20 % på resten av nettbutikken.
// (Christina, 23.11.2026.)
//
// Selve prisene settes ned i SHOPIFY, ikke her: scripts/black-week.mjs legger
// ordinærprisen i «Førpris» og senker salgsprisen, og appen viser da
// overstrøket pris og avslagsmerke av seg selv (components/Pris.tsx).
//
// SLIK AVSLUTTER DU KAMPANJEN:
//   1. node --env-file=.env.probe scripts/black-week.mjs --tilbake
//   2. sett `aktiv: false` under — det tar bort banneret på forsiden og i
//      nettbutikken og kortet på /kampanjer
//   3. push til main (ny deploy)
export const BLACK_WEEK = {
  aktiv: true,
  zo: 10,
  resten: 20,
};
