import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  validerPaamelding,
  normaliserTelefon,
  lagRabattkode,
} from "../kundeklubb";

describe("normaliserTelefon", () => {
  it("gjør åttesifret norsk nummer om til E.164", () => {
    expect(normaliserTelefon("40012345")).toBe("+4740012345");
  });

  it("tåler mellomrom og bindestrek", () => {
    expect(normaliserTelefon("400 12 345")).toBe("+4740012345");
    expect(normaliserTelefon("400-12-345")).toBe("+4740012345");
  });

  it("beholder nummer som allerede har landkode", () => {
    expect(normaliserTelefon("+4740012345")).toBe("+4740012345");
    expect(normaliserTelefon("004740012345")).toBe("+4740012345");
  });

  it("avviser nummer med feil lengde", () => {
    expect(normaliserTelefon("123")).toBeNull();
    expect(normaliserTelefon("400123456789")).toBeNull();
  });

  it("avviser tomt og søppel", () => {
    expect(normaliserTelefon("")).toBeNull();
    expect(normaliserTelefon("ikke et nummer")).toBeNull();
  });
});

describe("validerPaamelding", () => {
  const gyldig = {
    epost: "ida@example.com",
    samtykkeEpost: true,
    samtykkeSms: false,
  };

  it("godtar minste gyldige innmelding", () => {
    const r = validerPaamelding(gyldig);
    expect(r.ok).toBe(true);
  });

  it("avviser uten e-postsamtykke", () => {
    const r = validerPaamelding({ ...gyldig, samtykkeEpost: false });
    expect(r).toEqual({
      ok: false,
      feil: "Du må godta å motta e-post for å bli medlem.",
    });
  });

  it("avviser ugyldig e-post", () => {
    const r = validerPaamelding({ ...gyldig, epost: "ikke-en-epost" });
    expect(r.ok).toBe(false);
  });

  it("avviser SMS-samtykke uten telefonnummer", () => {
    const r = validerPaamelding({ ...gyldig, samtykkeSms: true });
    expect(r).toEqual({
      ok: false,
      feil: "Skriv inn telefonnummeret ditt for å få SMS.",
    });
  });

  it("normaliserer telefonnummeret i returverdien", () => {
    const r = validerPaamelding({
      ...gyldig,
      telefon: "400 12 345",
      samtykkeSms: true,
    });
    expect(r.ok && r.verdi.telefon).toBe("+4740012345");
  });

  it("trimmer og småskriver e-post", () => {
    const r = validerPaamelding({ ...gyldig, epost: "  Ida@Example.COM " });
    expect(r.ok && r.verdi.epost).toBe("ida@example.com");
  });

  it("avviser ugyldig telefonnummer selv uten SMS-samtykke", () => {
    const r = validerPaamelding({ ...gyldig, telefon: "12" });
    expect(r.ok).toBe(false);
  });

  it("avviser noe som ikke er et objekt", () => {
    expect(validerPaamelding(null).ok).toBe(false);
    expect(validerPaamelding("hei").ok).toBe(false);
  });
});

describe("lagRabattkode", () => {
  it("har formatet KLUBB- pluss seks tegn", () => {
    expect(lagRabattkode()).toMatch(/^KLUBB-[0-9A-Z]{6}$/);
  });

  it("utelater tegn som forveksles: I, O, 0, 1", () => {
    for (let i = 0; i < 200; i++) {
      expect(lagRabattkode()).not.toMatch(/[IO01]/);
    }
  });

  it("gir forskjellige koder", () => {
    const sett = new Set(Array.from({ length: 100 }, () => lagRabattkode()));
    expect(sett.size).toBeGreaterThan(90);
  });
});

describe("avmeldingstoken", () => {
  beforeEach(() => {
    process.env.KLUBB_HEMMELIGHET = "test-hemmelighet";
    vi.resetModules();
  });

  it("godtar sitt eget token", async () => {
    const { lagAvmeldingstoken, sjekkAvmeldingstoken } = await import(
      "../avmelding"
    );
    const t = lagAvmeldingstoken("kari@example.no")!;
    expect(sjekkAvmeldingstoken("kari@example.no", t)).toBe(true);
  });

  it("bryr seg ikke om store bokstaver og mellomrom", async () => {
    const { lagAvmeldingstoken, sjekkAvmeldingstoken } = await import(
      "../avmelding"
    );
    const t = lagAvmeldingstoken("kari@example.no")!;
    expect(sjekkAvmeldingstoken("  Kari@Example.NO ", t)).toBe(true);
  });

  it("avviser token som hoerer til en annen adresse", async () => {
    const { lagAvmeldingstoken, sjekkAvmeldingstoken } = await import(
      "../avmelding"
    );
    const t = lagAvmeldingstoken("kari@example.no")!;
    expect(sjekkAvmeldingstoken("ola@example.no", t)).toBe(false);
  });

  it("avviser tomt og forkortet token", async () => {
    const { lagAvmeldingstoken, sjekkAvmeldingstoken } = await import(
      "../avmelding"
    );
    const t = lagAvmeldingstoken("kari@example.no")!;
    expect(sjekkAvmeldingstoken("kari@example.no", "")).toBe(false);
    expect(sjekkAvmeldingstoken("kari@example.no", t.slice(0, 31))).toBe(false);
  });

  it("gir ingen lenke naar hemmeligheten mangler", async () => {
    delete process.env.KLUBB_HEMMELIGHET;
    vi.resetModules();
    const { avmeldingsUrl, sjekkAvmeldingstoken } = await import(
      "../avmelding"
    );
    expect(avmeldingsUrl("kari@example.no")).toBeNull();
    // ...og da skal ingenting kunne valideres heller
    expect(sjekkAvmeldingstoken("kari@example.no", "a".repeat(32))).toBe(false);
  });
});
