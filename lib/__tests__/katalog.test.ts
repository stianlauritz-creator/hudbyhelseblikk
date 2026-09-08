import { describe, it, expect } from "vitest";
import { iSalg, UTGAATT } from "../shopify";
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
