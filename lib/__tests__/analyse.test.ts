import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  tilVare,
  verdi,
  spor,
  sporHandel,
  sporListe,
  sporKontakt,
  hentGl,
  medGl,
} from "../analyse";
import type { Product } from "../products";

function produkt(over: Partial<Product> = {}): Product {
  return {
    sku: "ZO-001",
    brand: "zo",
    name: "Testkrem",
    size: "50 ml",
    price: 645,
    desc: "",
    image: "",
    ...over,
  };
}

const kall: unknown[][] = [];

beforeEach(() => {
  kall.length = 0;
  // @ts-expect-error — vi setter opp et vindu i node
  globalThis.window = { gtag: (...a: unknown[]) => void kall.push(a) };
});

afterEach(() => {
  // @ts-expect-error — rydder opp etter oss
  delete globalThis.window;
});

describe("tilVare", () => {
  it("oversetter til GA4s feltnavn", () => {
    expect(tilVare(produkt(), 2, "Light")).toEqual({
      item_id: "ZO-001",
      item_name: "Testkrem",
      item_brand: "zo",
      item_variant: "Light",
      price: 645,
      quantity: 2,
    });
  });

  it("lar variant være udefinert når produktet ikke har nyanser", () => {
    expect(tilVare(produkt()).item_variant).toBeUndefined();
  });
});

describe("verdi", () => {
  it("ganger pris med antall", () => {
    expect(verdi([tilVare(produkt(), 3)])).toBe(1935);
  });

  it("runder bort øreavvik fra flyttallsregning", () => {
    expect(verdi([tilVare(produkt({ price: 0.1 }), 3)])).toBe(0.3);
  });

  it("er null for tom kurv", () => {
    expect(verdi([])).toBe(0);
  });
});

describe("spor", () => {
  it("sender hendelsen til gtag", () => {
    spor("testhendelse", { a: 1 });
    expect(kall).toEqual([["event", "testhendelse", { a: 1 }]]);
  });

  it("kaster ikke når gtag mangler", () => {
    // @ts-expect-error — blokkeringsverktøy kan ha spist stubben
    globalThis.window = {};
    expect(() => spor("testhendelse")).not.toThrow();
  });

  it("kaster ikke under serverrendring", () => {
    // @ts-expect-error — ingen window på serveren
    delete globalThis.window;
    expect(() => spor("testhendelse")).not.toThrow();
  });
});

describe("sporHandel", () => {
  it("fyller ut valuta og verdi", () => {
    sporHandel("add_to_cart", [tilVare(produkt(), 2)]);
    expect(kall[0][1]).toBe("add_to_cart");
    expect(kall[0][2]).toMatchObject({ currency: "NOK", value: 1290 });
  });

  it("sender ingenting for tom vareliste", () => {
    // En tom kurv er ikke en hendelse — det ville bare støyet i rapportene.
    sporHandel("begin_checkout", []);
    expect(kall).toHaveLength(0);
  });

  it("lar ekstra felter følge med", () => {
    sporHandel("begin_checkout", [tilVare(produkt())], { coupon: "STUDENT" });
    expect(kall[0][2]).toMatchObject({ coupon: "STUDENT" });
  });
});

describe("sporListe", () => {
  it("navngir lista", () => {
    sporListe("Nettbutikk", [tilVare(produkt())]);
    expect(kall[0][2]).toMatchObject({ item_list_name: "Nettbutikk" });
  });

  it("sender ingenting for tom liste", () => {
    sporListe("Nettbutikk", []);
    expect(kall).toHaveLength(0);
  });
});

describe("sporKontakt", () => {
  it("sender kontaktpunktet som hendelsesnavn", () => {
    sporKontakt("telefonklikk", { kilde: "footer" });
    expect(kall).toEqual([["event", "telefonklikk", { kilde: "footer" }]]);
  });
});

describe("kryssdomene mot Shopify-kassen", () => {
  const dekorert =
    "https://hud-by-helseblikk.myshopify.com/cart?_gl=1*abc123*_ga*MTk4*_ga_X*czE3";

  it("plukker _gl fra en dekorert lenke", () => {
    expect(hentGl(dekorert)).toBe("1*abc123*_ga*MTk4*_ga_X*czE3");
  });

  it("gir null når lenka ikke er dekorert", () => {
    // Skjer når kunden har sagt nei til analyse — da finnes ingen klient-ID
    // å sende videre, og det er riktig.
    expect(hentGl("https://hud-by-helseblikk.myshopify.com/cart")).toBeNull();
    expect(hentGl(null)).toBeNull();
    expect(hentGl(undefined)).toBeNull();
  });

  it("stopper ved & og # slik at ikke halve URL-en blir med", () => {
    expect(hentGl("https://x.no/?_gl=abc&foo=1")).toBe("abc");
    expect(hentGl("https://x.no/?_gl=abc#seksjon")).toBe("abc");
  });

  it("henger _gl på en URL som allerede har spørrestreng", () => {
    expect(medGl("https://x.no/cart/c/TOK?key=1", "abc")).toBe(
      "https://x.no/cart/c/TOK?key=1&_gl=abc"
    );
  });

  it("henger _gl på en URL uten spørrestreng", () => {
    expect(medGl("https://x.no/cart/c/TOK", "abc")).toBe(
      "https://x.no/cart/c/TOK?_gl=abc"
    );
  });

  it("lar URL-en være i fred uten _gl", () => {
    const u = "https://x.no/cart/c/TOK";
    expect(medGl(u, null)).toBe(u);
  });

  it("dobler ikke _gl hvis den alt ligger der", () => {
    const u = "https://x.no/cart?_gl=finnes";
    expect(medGl(u, "ny")).toBe(u);
  });
});
