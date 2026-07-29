import type { Metadata } from "next";
import Link from "next/link";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kjøpsvilkår",
  description:
    "Salgsbetingelser for kjøp i nettbutikken til Hud By Helseblikk — levering, betaling, angrerett og reklamasjon.",
  alternates: { canonical: "/kjopsvilkar" },
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "1. Avtalen og partene",
    body: (
      <>
        <p>
          Disse vilkårene gjelder for kjøp av varer i nettbutikken til Hud By
          Helseblikk. Selger er {ORG.legalName}, org.nr. {ORG.orgNr},{" "}
          {ORG.address}, e-post {ORG.email}, telefon {ORG.phone} — heretter
          «vi» eller «oss». Kjøper er den forbrukeren som foretar bestillingen.
        </p>
        <p>
          Avtalen består av disse salgsbetingelsene, opplysninger gitt i
          bestillingsløsningen og eventuelt særskilt avtalte vilkår. Der det er
          motstrid går særskilt avtalte vilkår foran, så lenge de ikke strider
          mot ufravikelig lovgivning. Kjøpet reguleres for øvrig av
          forbrukerkjøpsloven, angrerettloven, markedsføringsloven og
          e-handelsloven.
        </p>
      </>
    ),
  },
  {
    title: "2. Priser og betaling",
    body: (
      <>
        <p>
          Alle priser er oppgitt i norske kroner og inkluderer merverdiavgift.
          Totalkostnaden, inkludert eventuell frakt, vises før du fullfører
          bestillingen. Betaling skjer med kort, Vipps eller andre
          betalingsmetoder som tilbys i kassen, og beløpet belastes ved
          bestilling. Betalingen håndteres av vår betalingsleverandør; vi
          lagrer aldri kortinformasjonen din selv.
        </p>
      </>
    ),
  },
  {
    title: "3. Levering og henting",
    body: (
      <>
        <p>
          Vi sender til adresser i Norge med standard frakt 79,- (gratis ved
          kjøp over 1.000,-), eller du kan hente bestillingen gratis i
          klinikken i {ORG.address}. Bestillinger sendes normalt innen 1–3
          virkedager. Ved henting gir vi beskjed når varene er klare.
        </p>
        <p>
          Gavekort leveres som PDF på e-post innen én virkedag, eller kan
          hentes som fysisk kort i klinikken.
        </p>
      </>
    ),
  },
  {
    title: "4. Angrerett",
    body: (
      <>
        <p>
          Du har 14 dagers angrerett etter angrerettloven, regnet fra dagen du
          mottar varen. For å bruke angreretten må du gi oss utvetydig beskjed
          innen fristen — send en e-post til {ORG.email} eller bruk
          angrerettskjemaet som følger ordrebekreftelsen. Varen returneres til
          oss uten unødig opphold og senest 14 dager etter at du ga beskjed. Du
          dekker returkostnadene.
        </p>
        <p>
          Vi refunderer kjøpesummen inkludert opprinnelig frakt innen 14 dager
          etter at vi har mottatt varen i retur eller dokumentasjon på at den er
          sendt. Merk at angreretten ikke gjelder forseglede hudpleieprodukter
          der forseglingen er brutt, når det av hensyn til helsevern eller
          hygiene ikke er egnet for retur (angrerettloven § 22 g). Produkter du
          vil returnere må derfor være uåpnede og i original forsegling.
        </p>
        <p>Gavekort kan angres innen 14 dager dersom det ikke er benyttet.</p>
      </>
    ),
  },
  {
    title: "5. Reklamasjon",
    body: (
      <>
        <p>
          Hvis det er en mangel ved varen, kan du etter forbrukerkjøpsloven
          klage innen rimelig tid og senest innen to år. Ta kontakt på{" "}
          {ORG.email}, så finner vi en løsning — retting, omlevering, prisavslag
          eller heving av kjøpet, avhengig av situasjonen.
        </p>
      </>
    ),
  },
  {
    title: "6. Tvisteløsning",
    body: (
      <>
        <p>
          Vi ønsker å løse eventuelle uenigheter i minnelighet. Kommer vi ikke
          til enighet, kan du klage til Forbrukertilsynet
          (forbrukertilsynet.no) eller bruke EU-kommisjonens klageportal
          (ec.europa.eu/odr). Tvister løses etter norsk rett.
        </p>
      </>
    ),
  },
];

export default function KjopsvilkarPage() {
  return (
    <section className="pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
          Nettbutikken
        </p>
        <h1
          className="text-4xl md:text-5xl font-normal mb-10"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Kjøpsvilkår
        </h1>
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2
                className="text-xl mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.title}
              </h2>
              <div className="space-y-3 text-sm text-[#1a1a1a]/65 leading-relaxed">
                {s.body}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-12 text-sm text-[#1a1a1a]/50">
          Se også vår{" "}
          <Link
            href="/personvern"
            className="text-[#c9a96e] border-b border-[#c9a96e]/40 hover:border-[#c9a96e]"
          >
            personvernerklæring
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
