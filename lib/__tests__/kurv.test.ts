import { describe, it, expect } from "vitest";
import {
  MAKS_ANTALL,
  linjeNokkel,
  leggTil,
  fjern,
  settAntall,
  rensLinjer,
  type Kurvlinje,
} from "../kurv";

// Minimal produktform — kurven trenger bare SKU og nyanselista.
const katalog = [
  { sku: "CS-005", farger: ["Fair", "Light", "Medium", "Tan"] },
  { sku: "CS-007", farger: ["Fair", "Medium"] },
  { sku: "ZO-001" },
];

describe("linjeNokkel", () => {
  it("bruker SKU alene når linja ikke har nyanse", () => {
    expect(linjeNokkel({ sku: "ZO-001" })).toBe("ZO-001");
  });

  it("skiller nyanser av samme produkt", () => {
    expect(linjeNokkel({ sku: "CS-005", farge: "Fair" })).not.toBe(
      linjeNokkel({ sku: "CS-005", farge: "Tan" })
    );
  });

  it("gir samme nøkkel for samme sku og nyanse", () => {
    expect(linjeNokkel({ sku: "CS-005", farge: "Fair" })).toBe(
      linjeNokkel({ sku: "CS-005", farge: "Fair" })
    );
  });
});

describe("leggTil", () => {
  it("legger til en ny linje med antall 1", () => {
    expect(leggTil([], "ZO-001")).toEqual([{ sku: "ZO-001", qty: 1 }]);
  });

  it("teller opp når samme sku og nyanse legges til igjen", () => {
    const en = leggTil([], "CS-005", "Fair");
    expect(leggTil(en, "CS-005", "Fair")).toEqual([
      { sku: "CS-005", farge: "Fair", qty: 2 },
    ]);
  });

  it("holder to nyanser av samme produkt som hver sin linje", () => {
    const kurv = leggTil(leggTil([], "CS-005", "Fair"), "CS-005", "Tan");
    expect(kurv).toHaveLength(2);
    expect(kurv.map((l) => l.farge)).toEqual(["Fair", "Tan"]);
  });

  it("stopper på maks antall", () => {
    let kurv: Kurvlinje[] = [];
    for (let i = 0; i < MAKS_ANTALL + 5; i++) kurv = leggTil(kurv, "ZO-001");
    expect(kurv[0].qty).toBe(MAKS_ANTALL);
  });

  it("lar den opprinnelige lista være urørt", () => {
    const foer: Kurvlinje[] = [{ sku: "ZO-001", qty: 1 }];
    leggTil(foer, "ZO-001");
    expect(foer[0].qty).toBe(1);
  });
});

describe("fjern", () => {
  it("fjerner bare den nyansen som ble valgt", () => {
    const kurv = leggTil(leggTil([], "CS-005", "Fair"), "CS-005", "Tan");
    const igjen = fjern(kurv, linjeNokkel({ sku: "CS-005", farge: "Fair" }));
    expect(igjen).toEqual([{ sku: "CS-005", farge: "Tan", qty: 1 }]);
  });
});

describe("settAntall", () => {
  it("setter antallet på riktig linje", () => {
    const kurv = leggTil([], "ZO-001");
    expect(settAntall(kurv, "ZO-001", 4)).toEqual([{ sku: "ZO-001", qty: 4 }]);
  });

  it("fjerner linja når antallet går til null", () => {
    const kurv = leggTil([], "ZO-001");
    expect(settAntall(kurv, "ZO-001", 0)).toEqual([]);
  });

  it("fjerner linja på negativt antall også", () => {
    const kurv = leggTil([], "ZO-001");
    expect(settAntall(kurv, "ZO-001", -3)).toEqual([]);
  });

  it("klipper mot maks antall", () => {
    const kurv = leggTil([], "ZO-001");
    expect(settAntall(kurv, "ZO-001", 99)[0].qty).toBe(MAKS_ANTALL);
  });
});

describe("rensLinjer", () => {
  it("kaster linjer for produkter som ikke finnes i katalogen lenger", () => {
    const lagret: Kurvlinje[] = [
      { sku: "ZO-001", qty: 1 },
      { sku: "FINNES-IKKE", qty: 1 },
    ];
    expect(rensLinjer(lagret, katalog)).toEqual([{ sku: "ZO-001", qty: 1 }]);
  });

  it("kaster linjer der nyansen er tatt ut av sortimentet", () => {
    const lagret: Kurvlinje[] = [{ sku: "CS-005", farge: "Savanna", qty: 1 }];
    expect(rensLinjer(lagret, katalog)).toEqual([]);
  });

  it("kaster gamle linjer som mangler nyanse på et produkt som nå krever det", () => {
    // Kurver lagret før fargevalget fantes: kunden må velge nyanse på nytt.
    const lagret: Kurvlinje[] = [{ sku: "CS-005", qty: 2 }];
    expect(rensLinjer(lagret, katalog)).toEqual([]);
  });

  it("beholder linjer uten nyanse på produkter som ikke har nyanser", () => {
    const lagret: Kurvlinje[] = [{ sku: "ZO-001", qty: 2 }];
    expect(rensLinjer(lagret, katalog)).toEqual([{ sku: "ZO-001", qty: 2 }]);
  });

  it("tåler søppel fra localStorage uten å kaste", () => {
    const soppel = [
      null,
      "ZO-001",
      { qty: 1 },
      { sku: "ZO-001" },
      { sku: "ZO-001", qty: 0 },
      { sku: "ZO-001", qty: 2 },
    ] as unknown as Kurvlinje[];
    expect(rensLinjer(soppel, katalog)).toEqual([{ sku: "ZO-001", qty: 2 }]);
  });
});
