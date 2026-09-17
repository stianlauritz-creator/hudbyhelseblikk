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
          <strong>Analyse og markedsføring:</strong> Nettsiden kan måle bruk og
          annonseeffekt, men bare hvis du sier ja. Se avsnittet om
          informasjonskapsler og samtykke nedenfor.
        </p>
      </>
    ),
  },
  {
    title: "Informasjonskapsler og samtykke",
    body: (
      <>
        <p>
          Nettsiden laster Google Tag Manager (container GTM-N6W4329Q) på alle
          sider. Taggbeholderen i seg selv setter ingen informasjonskapsler, og
          vi fyrer ingen tagger som lagrer data eller sporer deg før du har
          samtykket. Gjennom Google Tag Manager bruker vi Google Analytics 4 til
          besøksstatistikk og konverteringssporing for Google Ads.
        </p>
        <p>
          Vi bruker Google Consent Mode v2. Alle samtykkekategorier står på
          &laquo;nei&raquo; som standard, og signalene settes før Google Tag Manager
          lastes. Først når du aktivt velger, oppdateres de. Du kan velge to
          kategorier hver for seg:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Analyse</strong> &mdash; Google Analytics, som måler hvordan
            nettsiden brukes.
          </li>
          <li>
            <strong>Markedsføring</strong> &mdash; Google Ads og
            konverteringssporing, som måler effekten av annonsene våre.
          </li>
        </ul>
        <p>
          Nødvendige funksjoner krever ikke samtykke. Det gjelder blant annet
          handlekurven, som bare ligger lokalt i nettleseren din, og tiltak for
          sikker drift av nettsiden.
        </p>
        <p>
          Behandlingsgrunnlaget for analyse og markedsføring er samtykke (GDPR
          art. 6-1 a). Google er databehandler for disse tjenestene.
          Opplysninger kan bli overført til USA. Overføringsgrunnlaget er EUs
          standard personvernbestemmelser (SCC) og EU-US Data Privacy Framework.
        </p>
        <p>
          Valget ditt lagres lokalt i nettleseren din (localStorage, under
          nøkkelen <code>hbh-samtykke</code>), ikke i en informasjonskapsel, og
          sendes ikke til oss. Det gjelder i inntil ett år, deretter spør vi på
          nytt.
        </p>
        <p>
          Du kan når som helst trekke tilbake eller endre samtykket, uten å
          oppgi noen grunn. Det gjør du i samtykkevinduet på nettsiden, eller ved
          å slette lagrede nettsteddata for hudbyhelseblikk.no i
          nettleserinnstillingene dine — da nullstilles valget, og du blir spurt
          på nytt. Å trekke tilbake samtykket påvirker ikke lovligheten av
          behandlingen som allerede har skjedd.
        </p>
        <p>
          Timebestillingen på /bestill-time vises i en ramme fra Timma, som har
          sin egen sporing. Vi videreformidler samtykkevalget ditt til denne
          rammen, slik at den følger det du har valgt hos oss.
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
    title: "Kundeklubben",
    body: (
      <>
        <p>
          Melder du deg inn i kundeklubben, lagrer vi e-postadressen din, og
          fornavn og telefonnummer dersom du oppgir det. Vi lagrer også hva du
          har sagt ja til — e-post, SMS, eller begge — og når du sa det.
          Opplysningene brukes til å sende deg tilbud, nyheter og beskjed om
          ledige timer.
        </p>
        <p>
          Grunnlaget for behandlingen er samtykket ditt. Du kan trekke det når
          som helst, uten å oppgi noen grunn: bruk avmeldingslenken nederst i
          e-postene fra oss, eller send en e-post til {ORG.email}. Da sletter vi
          deg fra listene.
        </p>
        <p>
          Medlemslista lagres hos Shopify, som er databehandler for nettbutikken
          vår, og e-post sendes via Resend. Opplysningene oppbevares til du
          melder deg av.
        </p>
      </>
    ),
  },
  {
    title: "Deling og lagringstid",
    body: (
      <>
        <p>
          Vi deler kun opplysninger med databehandlere som er nødvendige for
          driften: betalingsleverandøren vår, Vercel (drift av nettsiden), Google (analyse og
          annonsemåling, dersom du har samtykket) og fraktleverandør ved
          forsendelse. Vi selger aldri personopplysninger
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
        behandlingen. Har du gitt samtykke, kan du trekke det tilbake når som
        helst. Kontakt oss på {ORG.email} for å bruke rettighetene dine.
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
        <p className="text-xs tracking-[0.25em] uppercase text-[#8f6b28] mb-4">
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
        <p className="mt-12 text-sm text-[#1a1a1a]/65">
          Se også våre{" "}
          <Link
            href="/kjopsvilkar"
            className="text-[#8f6b28] border-b border-[#c9a96e]/40 hover:border-[#c9a96e]"
          >
            kjøpsvilkår
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
