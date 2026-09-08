import { describe, it, expect } from "vitest";
import { iSalg, UTGAATT, TILLEGG } from "../shopify";
import { PRODUCTS, type Product } from "../products";

function produkt(over: Partial<Product>): Product {
  return {
    sku: "TEST-001",
    brand: "zo",
    name: "Testprodukt",
    size: "50 ml",
    price: 100,
    desc: "",
    image: "",
    ...over,
  };
}

describe("iSalg", () => {
  it("slipper gjennom vanlige ZO- og Face Formula-produkter", () => {
    expect(iSalg(produkt({ sku: "ZO-001", brand: "zo" }))).toBe(true);
    expect(iSalg(produkt({ sku: "FF-001", brand: "face-formula" }))).toBe(true);
  });

  it("stopper Wrinkle + Texture Repair — utsolgt og utgått", () => {
    expect(iSalg(produkt({ sku: "ZO-011", brand: "zo" }))).toBe(false);
  });

  it("stopper alt som står i UTGAATT, uansett merke", () => {
    for (const sku of UTGAATT) {
      expect(iSalg(produkt({ sku, brand: "zo" }))).toBe(false);
    }
  });

  it("slipper gjennom ColoreScience vi faktisk fører", () => {
    expect(iSalg(produkt({ sku: "CS-005", brand: "colorescience" }))).toBe(true);
  });

  it("stopper ColoreScience som bare ligger igjen i Shopify", () => {
    expect(iSalg(produkt({ sku: "CS-001", brand: "colorescience" }))).toBe(false);
  });
});

describe("den statiske katalogen", () => {
  it("har ingen produkter som samtidig står oppført som utgått", () => {
    // Ligger et utgått produkt igjen i PRODUCTS, dukker det opp igjen så
    // snart Shopify-oppslaget feiler og vi faller tilbake på lista.
    const igjen = PRODUCTS.filter((p) => UTGAATT.has(p.sku));
    expect(igjen.map((p) => p.sku)).toEqual([]);
  });

  it("oppgir bare nyanser som faktisk er navngitt", () => {
    for (const p of PRODUCTS) {
      if (!p.farger) continue;
      expect(p.farger.length).toBeGreaterThan(0);
      for (const f of p.farger) expect(f.trim()).not.toBe("");
    }
  });
});

describe("TILLEGG — nyanser og merking for produkter som bare finnes i Shopify", () => {
  it("overlapper ikke med den statiske katalogen", () => {
    // To kilder til samme felt ville før eller siden sprike.
    const dobbelt = PRODUCTS.filter((p) => TILLEGG[p.sku]).map((p) => p.sku);
    expect(dobbelt).toEqual([]);
  });

  it("oppgir bare navngitte nyanser", () => {
    for (const [sku, t] of Object.entries(TILLEGG)) {
      if (!t.farger) continue;
      expect(t.farger.length, sku).toBeGreaterThan(0);
      for (const f of t.farger) expect(f.trim(), sku).not.toBe("");
    }
  });

  it("gir de to solkremene nyansene klinikken faktisk fører", () => {
    expect(TILLEGG["ZO-037"].farger).toEqual(["Fair-light", "Light-medium"]);
    expect(TILLEGG["ZO-038"].farger).toEqual([
      "Light",
      "Light medium",
      "Medium",
      "Tan",
    ]);
  });

  it("merker pakkene som inneholder retinol", () => {
    // Begge kitene inneholder Daily Power Defense. Uten flagget får kunden
    // ikke veiledningsboksen som alle andre retinolprodukter utløser.
    expect(TILLEGG["ZO-041"].retinol).toBe(true);
    expect(TILLEGG["ZO-042"].retinol).toBe(true);
  });

  it("merker ingenting som utgått og tilleggsført samtidig", () => {
    for (const sku of Object.keys(TILLEGG)) expect(UTGAATT.has(sku), sku).toBe(false);
  });
});
