import { describe, it, expect } from "vitest";
import { BEHANDLINGER, getBehandling } from "../behandling-detaljer";

describe("behandlingskatalogen", () => {
  it("har unike slugs", () => {
    const sett = new Set(BEHANDLINGER.map((b) => b.slug));
    expect(sett.size).toBe(BEHANDLINGER.length);
  });

  it("lenker bare til behandlinger som finnes", () => {
    // `relaterte` blir til lenker nederst på hver side. Peker en av dem på en
    // slug vi har fjernet eller stavet feil, får kunden en 404.
    for (const b of BEHANDLINGER) {
      for (const slug of b.relaterte) {
        expect(getBehandling(slug), `${b.slug} → ${slug}`).toBeDefined();
      }
    }
  });

  it("lenker ikke til seg selv", () => {
    for (const b of BEHANDLINGER) {
      expect(b.relaterte, b.slug).not.toContain(b.slug);
    }
  });

  it("holder `kort` innenfor lengden Google viser i søk", () => {
    // Feltet brukes som meta description. Over ~160 tegn blir den kuttet.
    for (const b of BEHANDLINGER) {
      expect(b.kort.length, b.slug).toBeLessThanOrEqual(160);
    }
  });
});

describe("biostimulerende behandlinger", () => {
  // Prisene skal stemme med timeboken i Timma — spriker de, bestiller kunden
  // til én pris og betaler en annen i klinikken.
  const fasit = [
    { slug: "profhilo", navn: "Profhilo", pris: "4.000,-" },
    { slug: "profhilo-structura", navn: "Profhilo Structura", pris: "5.000,-" },
    {
      slug: "viscoderm-hydrobooster",
      navn: "Viscoderm Hydrobooster",
      pris: "3.000,-",
    },
  ];

  for (const f of fasit) {
    it(`${f.navn} ligger ute med riktig pris`, () => {
      const b = getBehandling(f.slug);
      expect(b, f.slug).toBeDefined();
      expect(b!.navn).toBe(f.navn);
      expect(b!.pris).toBe(f.pris);
      expect(b!.kategori).toBe("biostimulering");
    });
  }

  it("oppgir pakkeprisene klinikken faktisk tilbyr", () => {
    const profhilo = getBehandling("profhilo")!;
    expect(profhilo.prisliste).toContainEqual({
      navn: "Pakkepris — 2 områder/behandlinger",
      pris: "7.200,-",
    });

    const structura = getBehandling("profhilo-structura")!;
    expect(structura.prisliste).toContainEqual({
      navn: "Pakkepris — 2 behandlinger",
      pris: "9.000,-",
    });
  });
});
