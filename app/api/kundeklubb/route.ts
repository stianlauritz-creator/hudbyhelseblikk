import { NextResponse } from "next/server";
import { validerPaamelding, lagRabattkode } from "@/lib/kundeklubb";
import { adminGraphql, adminKonfigurert } from "@/lib/shopify-admin";

const RABATT_PROSENT = 0.1;

type KundeSvar = {
  customerCreate: {
    customer: { id: string; email: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
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

  let alleredeMedlem = false;
  try {
    const svar = await adminGraphql<KundeSvar>(OPPRETT_KUNDE, {
      input: kundeInput,
    });
    const feil = svar.customerCreate.userErrors;
    if (feil.length > 0) {
      const teksten = feil.map((f) => f.message).join(" ");
      if (/taken|allerede/i.test(teksten)) {
        alleredeMedlem = true;
      } else {
        console.error("Kundeklubb: customerCreate userErrors", teksten);
        return NextResponse.json(
          { feil: "Vi fikk ikke registrert deg. Prøv igjen om litt." },
          { status: 502 }
        );
      }
    }
  } catch (e) {
    console.error("Kundeklubb: customerCreate feilet", e);
    return NextResponse.json(
      { feil: "Vi fikk ikke registrert deg. Prøv igjen om litt." },
      { status: 502 }
    );
  }

  // Er hun allerede medlem, skal hun ikke få en ny rabattkode. Svar likevel
  // nøytralt, slik at skjemaet ikke røper hvem som står i registeret.
  if (alleredeMedlem) {
    return NextResponse.json({ ok: true, alleredeMedlem: true });
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

  // Task 4 kobler på e-postutsending her, når DNS er verifisert.
  console.log("Kundeklubb: opprettet medlem med kode", kode);

  return NextResponse.json({ ok: true });
}
