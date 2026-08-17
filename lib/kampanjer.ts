// Pågående kampanjer. Redigeres her — de vises automatisk på /kampanjer,
// øverst i nettbutikken og i kampanjestripen på forsiden.
//
// SLIK AVSLUTTER DU EN KAMPANJE: sett `aktiv: false` (eller slett blokken).
// Er ingen kampanjer aktive, forsvinner kampanjeseksjonene av seg selv.
//
// Kilde: Mabel, 17.08.2026.

import type { Brand } from "./products";

export interface Kampanje {
  id: string;
  /** Merket kampanjen gjelder — styrer stempelet og lenken til nettbutikken */
  merke: string;
  merkeFilter?: Brand;
  tittel: string;
  ingress: string;
  /** Produktet kunden får med — bildet hentes fra SKU-en */
  gave: { navn: string; verdi: number; sku: string };
  /**
   * Merkets eget kampanjebanner. Teksten er brent inn i bildet, så den er
   * pynt — all informasjon står også i tittel/ingress/vilkår, og bannerne
   * er derfor trygge å utelate på små skjermer.
   */
  banner?: { src: string; alt: string; bredde: number; hoyde: number };
  vilkar: string[];
  /** Kort merkelapp for begrensning, f.eks. «Kun de 20 første» */
  merkelapp?: string;
  aktiv: boolean;
}

export const KAMPANJER: Kampanje[] = [
  {
    id: "lansering-nettbutikk",
    merke: "Nettbutikken",
    tittel: "Gave til de 20 første som handler",
    ingress:
      "Vi lanserer nettbutikken, og de 20 første bestillingene får med vår bestselgende krem fra Face Formula.",
    gave: {
      navn: "Face Formula Essential Formula 30 ml",
      verdi: 399,
      sku: "FF-007",
    },
    vilkar: [
      "Gjelder alle merker i nettbutikken",
      "Gaven legges automatisk ved de 20 første bestillingene",
      "Så langt beholdningen rekker — kan ikke byttes i penger",
    ],
    merkelapp: "Kun de 20 første",
    aktiv: true,
  },
  {
    id: "face-formula-gave",
    merke: "Face Formula",
    merkeFilter: "face-formula",
    tittel: "Daily Gel Cleanser på kjøpet",
    ingress:
      "Handler du Face Formula for over 1 500 kroner, får du med merkets milde rensegel — den de fleste rutinene starter med.",
    gave: {
      navn: "Face Formula Daily Gel Cleanser 200 ml",
      verdi: 399,
      sku: "FF-001",
    },
    banner: {
      src: "/kampanjer/face-formula-rutiner.jpg",
      alt: "Face Formula-kampanje: Tilbake til rutiner. Tilbake til gode hudvaner. Få Daily Gel Cleanser i gave ved kjøp over 1500 kr.",
      bredde: 1800,
      hoyde: 537,
    },
    vilkar: [
      "Kjøpesummen må være over 1 500,- på produkter fra Face Formula",
      "Gjelder både i klinikken og i nettbutikken",
      "Så langt beholdningen rekker",
    ],
    aktiv: true,
  },
  {
    id: "zo-firming-serum",
    merke: "ZO Skin Health",
    merkeFilter: "zo",
    tittel: "Rebuild & Protect — Firming Serum i gave",
    ingress:
      "Kjøper du Growth Factor Serum, Peptide Facial Refining Concentrate, Firming Serum eller en valgfri øyekrem, får du Firming Serum i reisestørrelse med på kjøpet — en verdi på 1 700 kroner.",
    gave: {
      navn: "ZO Skin Health Firming Serum Travel Size 28 ml",
      verdi: 1700,
      sku: "ZO-016",
    },
    banner: {
      src: "/kampanjer/zo-rebuild-protect.jpg",
      alt: "ZO Skin Health-kampanje Rebuild & Protect: kjøp Growth Factor Serum, Peptide Facial Refining Concentrate, Firming Serum eller valgfri øyekrem og motta Firming Serum Travel Size 28 ml til en verdi av 1700 kroner.",
      bredde: 1800,
      hoyde: 538,
    },
    vilkar: [
      "Gjelder ved kjøp av Growth Factor Serum, Peptide Facial Refining Concentrate, Firming Serum eller valgfri øyekrem",
      "Gjelder både i klinikken og i nettbutikken",
      "Så langt beholdningen rekker",
    ],
    aktiv: true,
  },
];

export const AKTIVE_KAMPANJER = KAMPANJER.filter((k) => k.aktiv);
