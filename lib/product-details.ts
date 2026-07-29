// Utvidet produktinfo for produktsidene — fylles per merke i lib/details/
import { ZO_DETAILS } from "./details/zo";
import { FF_DETAILS } from "./details/ff";
import { CS_DETAILS } from "./details/cs";

export interface KeyIngredient {
  name: string;
  effect: string; // kort forklaring på hva ingrediensen gjør
}

export interface ProductDetails {
  sku: string;
  intro: string; // 2–3 setninger som utvider kortbeskrivelsen
  longDesc: string[]; // 1–3 avsnitt brødtekst
  benefits: string[]; // 4–6 kulepunkter
  usage: string[]; // bruksanvisning, trinn for trinn
  ingredients: KeyIngredient[]; // 2–5 nøkkelingredienser
  skinTypes: string[]; // f.eks. ["Tørr hud", "Sensitiv hud"]
  related: string[]; // 3 SKU-er: «passer godt sammen med»
}

export const PRODUCT_DETAILS: Record<string, ProductDetails> = Object.fromEntries(
  [...ZO_DETAILS, ...FF_DETAILS, ...CS_DETAILS].map((d) => [d.sku, d])
);
