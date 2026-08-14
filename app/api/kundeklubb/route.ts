import { NextResponse } from "next/server";
import { validerPaamelding, lagRabattkode } from "@/lib/kundeklubb";
import { adminGraphql, adminKonfigurert } from "@/lib/shopify-admin";
import { sendVelkomstEpost } from "@/lib/klubb-epost";

const RABATT_PROSENT = 0.1;

type KundeSvar = {
  customerCreate: {
    customer: { id: string; email: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

type FinnKundeSvar = {
  customers: { edges: { node: { id: string; email: string | null; tags: string[] } }[] };
};

type RabattSvar = {
  discountCodeBasicCreate: {
    codeDiscountNode: { id: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

const OPPRETT_KUNDE = `
mutation opprettKunde($input: CustomerInput!) {
  customerCreate(input: $input) {
    customer { id email }
    userErrors { field message }
  }
}`;

const OPPRETT_RABATT = `
mutation opprettRabatt($input: DiscountCodeBasicInput!) {
  discountCodeBasicCreate(basicCodeDiscount: $input) {
    codeDiscountNode { id }
    userErrors { field message }
  }
}`;

// Shopify-søket er uskarpt: «email:stian+test@gmail.com» tokeniseres på + @ og
// . og treffer også stian@gmail.com. Vi henter derfor flere treff og krever
// eksakt e-postmatch under — ellers ville en ny kunde blitt avvist som medlem,
// eller verre: tagget på en annen persons record.
const FINN_KUNDE = `
query finnKunde($sok: String!) {
  customers(first: 25, query: $sok) {
    edges { node { id email tags } }
  }
}`;

const LEGG_TIL_TAGG = `
mutation leggTilTagg($id: ID!, $tags: [String!]!) {
  tagsAdd(id: $id, tags: $tags) {
    userErrors { field message }
  }
}`;

const OPPDATER_EPOSTSAMTYKKE = `
mutation epostSamtykke($input: CustomerEmailMarketingConsentUpdateInput!) {
  customerEmailMarketingConsentUpdate(input: $input) {
    userErrors { field message }
  }
}`;

const OPPDATER_SMSSAMTYKKE = `
mutation smsSamtykke($input: CustomerSmsMarketingConsentUpdateInput!) {
  customerSmsMarketingConsentUpdate(input: $input) {
    userErrors { field message }
  }
}`;

export async function POST(req: Request) {
  if (!adminKonfigurert()) {
    console.error("Kundeklubb: Shopify Admin mangler miljøvariabler");
    return NextResponse.json(
      { feil: "Påmelding er midlertidig utilgjengelig. Prøv igjen senere." },
      { status: 503 }
    );
  }

  let kropp: unknown;
  try {
    kropp = await req.json();
  } catch {
    return NextResponse.json({ feil: "Ugyldig skjema." }, { status: 400 });
  }

  // Honningkrukke: skjult felt som mennesker aldri fyller ut. Svar 200 slik at
  // roboten tror den lyktes og ikke prøver på nytt.
  if ((kropp as Record<string, unknown>)?.felle) {
    return NextResponse.json({ ok: true });
  }

  const validering = validerPaamelding(kropp);
  if (!validering.ok) {
    return NextResponse.json({ feil: validering.feil }, { status: 400 });
  }
  const { fornavn, epost, telefon, samtykkeSms } = validering.verdi;

  const naa = new Date().toISOString();

  const kundeInput: Record<string, unknown> = {
    email: epost,
    tags: ["kundeklubb"],
    emailMarketingConsent: {
      marketingState: "SUBSCRIBED",
      marketingOptInLevel: "SINGLE_OPT_IN",
      consentUpdatedAt: naa,
    },
  };
  if (fornavn) kundeInput.firstName = fornavn;
  if (telefon) kundeInput.phone = telefon;
  if (telefon && samtykkeSms) {
    // `consentCollectedFrom` finnes ikke i API 2026-07 — verifisert med
    // scripts/probe-shopify.mjs. Legges det til, feiler hver SMS-påmelding.
    kundeInput.smsMarketingConsent = {
      marketingState: "SUBSCRIBED",
      marketingOptInLevel: "SINGLE_OPT_IN",
      consentUpdatedAt: naa,
    };
  }

  // Finnes kunden fra før? Mange har handlet i nettbutikken uten å være
  // klubbmedlem — de skal kunne melde seg inn, ikke avvises.
  let eksisterende: { id: string; email: string | null; tags: string[] } | null =
    null;
  try {
    const svar = await adminGraphql<FinnKundeSvar>(FINN_KUNDE, {
      sok: `email:"${epost}"`,
    });
    eksisterende =
      svar.customers.edges
        .map((e) => e.node)
        .find((n) => n.email?.trim().toLowerCase() === epost) ?? null;
  } catch (e) {
    console.error("Kundeklubb: kundeoppslag feilet", e);
    return NextResponse.json(
      { feil: "Vi fikk ikke registrert deg. Prøv igjen om litt." },
      { status: 502 }
    );
  }

  // Allerede medlem: ingen ny kode. Svar nøytralt, slik at skjemaet ikke
  // røper hvem som står i registeret.
  if (eksisterende?.tags.includes("kundeklubb")) {
    return NextResponse.json({ ok: true, alleredeMedlem: true });
  }

  try {
    if (eksisterende) {
      // Eksisterende kunde melder seg inn i klubben: tagg og samtykke må
      // oppdateres hver for seg — customerCreate ville feilet på e-posten.
      await adminGraphql(LEGG_TIL_TAGG, {
        id: eksisterende.id,
        tags: ["kundeklubb"],
      });
      await adminGraphql(OPPDATER_EPOSTSAMTYKKE, {
        input: {
          customerId: eksisterende.id,
          emailMarketingConsent: {
            marketingState: "SUBSCRIBED",
            marketingOptInLevel: "SINGLE_OPT_IN",
            consentUpdatedAt: naa,
          },
        },
      });
      if (telefon && samtykkeSms) {
        await adminGraphql(OPPDATER_SMSSAMTYKKE, {
          input: {
            customerId: eksisterende.id,
            smsMarketingConsent: {
              marketingState: "SUBSCRIBED",
              marketingOptInLevel: "SINGLE_OPT_IN",
              consentUpdatedAt: naa,
            },
          },
        });
      }
    } else {
      const svar = await adminGraphql<KundeSvar>(OPPRETT_KUNDE, {
        input: kundeInput,
      });
      const feil = svar.customerCreate.userErrors;
      if (feil.length > 0) {
        console.error(
          "Kundeklubb: customerCreate userErrors",
          feil.map((f) => f.message).join(" ")
        );
        return NextResponse.json(
          { feil: "Vi fikk ikke registrert deg. Prøv igjen om litt." },
          { status: 502 }
        );
      }
    }
  } catch (e) {
    console.error("Kundeklubb: innmelding feilet", e);
    return NextResponse.json(
      { feil: "Vi fikk ikke registrert deg. Prøv igjen om litt." },
      { status: 502 }
    );
  }

  const kode = lagRabattkode();
  const kolleksjon = process.env.SHOPIFY_KLUBB_COLLECTION_ID;
  if (!kolleksjon) {
    console.error(
      "Kundeklubb: SHOPIFY_KLUBB_COLLECTION_ID mangler — kunde opprettet uten kode",
      epost
    );
    return NextResponse.json({ ok: true, utenKode: true });
  }

  try {
    const svar = await adminGraphql<RabattSvar>(OPPRETT_RABATT, {
      input: {
        title: `Kundeklubb 10 % — ${epost}`,
        code: kode,
        startsAt: naa,
        usageLimit: 1,
        appliesOncePerCustomer: true,
        // `context` erstattet `customerSelection` i 2026-07 og er PÅKREVD —
        // uten den svarer Shopify «Context can't be blank». ALL = alle kjøpere;
        // engangsbruken sikres av usageLimit, ikke av kundebegrensning.
        context: { all: "ALL" },
        customerGets: {
          value: { percentage: RABATT_PROSENT },
          items: { collections: { add: [kolleksjon] } },
        },
      },
    });
    const feil = svar.discountCodeBasicCreate.userErrors;
    if (feil.length > 0) {
      // Kunden er opprettet — kode kan sendes manuelt. Logg tydelig.
      console.error(
        "Kundeklubb: RABATTKODE FEILET for",
        epost,
        JSON.stringify(feil)
      );
      return NextResponse.json({ ok: true, utenKode: true });
    }
  } catch (e) {
    console.error("Kundeklubb: RABATTKODE FEILET for", epost, e);
    return NextResponse.json({ ok: true, utenKode: true });
  }

  const sendt = await sendVelkomstEpost({ til: epost, fornavn, kode });
  if (!sendt) {
    // Kunden og koden finnes — bare e-posten sviktet. Logg tydelig slik at
    // koden kan sendes for hånd.
    console.error("Kundeklubb: E-POST FEILET — send", kode, "manuelt til", epost);
  }

  return NextResponse.json({ ok: true });
}
