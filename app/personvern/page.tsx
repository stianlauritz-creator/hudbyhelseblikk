import type { Metadata } from "next";
import Link from "next/link";
import { ORG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Personvernerklæring",
  description:
    "Hvordan Hud by Helseblikk behandler personopplysninger på nettsiden og i nettbutikken.",
  alternates: { canonical: "/personvern" },
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Behandlingsansvarlig",
    body: (
      <p>
        {ORG.legalName}, org.nr. {ORG.orgNr}, {ORG.address}, er
        behandlingsansvarlig for personopplysninger som samles inn via denne
        nettsiden. Spørsmål om personvern kan rettes til {ORG.email}.
      </p>
    ),
  },
  {
    title: "Hvilke opplysninger vi behandler, og hvorfor",
    body: (
      <>
        <p>
          <strong>Kjøp i nettbutikken:</strong> Når du handler hos oss, behandler
          betalingsleverandøren vår navn, e-postadresse,
          leveringsadresse og betalingsinformasjon for å gjennomføre kjøpet.
          Vi mottar ordreopplysningene (ikke kortinformasjon) og bruker dem til
          å levere bestillingen, sende ordrebekreftelse og oppfylle
          bokføringsplikten. Behandlingsgrunnlaget er avtale (GDPR art. 6-1 b)
          og rettslig forpliktelse (art. 6-1 c).
        </p>
        <p>
          <strong>Henvendelser:</strong> Kontakter du oss på e-post eller
          telefon, behandler vi opplysningene du oppgir for å følge opp
          henvendelsen. Grunnlaget er berettiget interesse (art. 6-1 f).
        </p>
        <p>
          <strong>Handlekurv:</strong> Innholdet i handlekurven lagres kun
          lokalt i din egen nettleser (localStorage) og sendes ikke til oss før
          du eventuelt fullfører et kjøp.
        </p>
        <p>
          Nettsiden bruker ikke analyse- eller markedsføringscookies.
        </p>
      </>
    ),
  },
  {
    title: "Helseopplysninger",
    body: (
      <p>
        Nettsiden og nettbutikken samler ikke inn helseopplysninger.
        Opplysninger knyttet til konsultasjoner og behandlinger i klinikken
        journalføres i klinikkens pasientjournalsystem etter helselovgivningen,
        og omfattes ikke av denne erklæringen.
      </p>
    ),
  },
  {
    title: "Deling og lagringstid",
    body: (
      <>
        <p>
          Vi deler kun opplysninger med databehandlere som er nødvendige for
          driften: betalingsleverandøren vår, Vercel (drift av nettsiden) og
          fraktleverandør ved forsendelse. Vi selger aldri personopplysninger
          videre.
        </p>
        <p>
          Ordreopplysninger oppbevares i fem år i henhold til
          bokføringsloven. Øvrige henvendelser slettes når de ikke lenger er
          nødvendige.
        </p>
      </>
    ),
  },
  {
    title: "Dine rettigheter",
    body: (
      <p>
        Du har rett til innsyn, retting og sletting av opplysningene vi har om
        deg, samt rett til å protestere mot og kreve begrensning av
        behandlingen. Kontakt oss på {ORG.email} for å bruke rettighetene dine.
        Du kan også klage til Datatilsynet (datatilsynet.no) hvis du mener
        behandlingen er i strid med regelverket.
      </p>
    ),
  },
];

export default function PersonvernPage() {
  return (
    <section className="pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
          Personvern
        </p>
        <h1
          className="text-4xl md:text-5xl font-normal mb-10"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Personvernerklæring
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
          Se også våre{" "}
          <Link
            href="/kjopsvilkar"
            className="text-[#c9a96e] border-b border-[#c9a96e]/40 hover:border-[#c9a96e]"
          >
            kjøpsvilkår
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
