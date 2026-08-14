import { NextResponse } from "next/server";
import { sjekkAvmeldingstoken } from "@/lib/avmelding";
import {
  adminGraphql,
  adminKonfigurert,
  finnKundeEksakt,
} from "@/lib/shopify-admin";

// Avmelding fra kundeklubbens e-poster. To innganger:
//   POST — Gmail/Yahoos ett-klikks avmelding (List-Unsubscribe-Post)
//   GET  — mennesket som klikker «Meld deg av» i e-posten
// Begge krever et signert token, ellers kunne hvem som helst meldt av andre.

const OPPDATER_EPOSTSAMTYKKE = `
mutation epostSamtykke($input: CustomerEmailMarketingConsentUpdateInput!) {
  customerEmailMarketingConsentUpdate(input: $input) {
    userErrors { field message }
  }
}`;

type SamtykkeSvar = {
  customerEmailMarketingConsentUpdate: {
    userErrors: { field: string[] | null; message: string }[];
  };
};

type Utfall = "avmeldt" | "ukjent" | "ugyldig" | "feilet";

async function meldAv(url: URL): Promise<Utfall> {
  const epost = (url.searchParams.get("e") ?? "").trim().toLowerCase();
  const token = url.searchParams.get("t") ?? "";
  if (!epost || !sjekkAvmeldingstoken(epost, token)) return "ugyldig";

  if (!adminKonfigurert()) {
    console.error("Avmelding: Shopify Admin mangler miljøvariabler", epost);
    return "feilet";
  }

  try {
    const kunde = await finnKundeEksakt(epost);
    // Ingen kunde å melde av er ikke en feil for den som klikket — hen står
    // uansett ikke på lista.
    if (!kunde) return "ukjent";

    const svar = await adminGraphql<SamtykkeSvar>(OPPDATER_EPOSTSAMTYKKE, {
      input: {
        customerId: kunde.id,
        emailMarketingConsent: {
          // Ingen marketingOptInLevel her — den hører bare til påmelding.
          marketingState: "UNSUBSCRIBED",
          consentUpdatedAt: new Date().toISOString(),
        },
      },
    });
    const feil = svar.customerEmailMarketingConsentUpdate.userErrors;
    if (feil.length > 0) {
      console.error(
        "Avmelding: MÅ GJØRES MANUELT for",
        epost,
        JSON.stringify(feil)
      );
      return "feilet";
    }
    return "avmeldt";
  } catch (e) {
    console.error("Avmelding: MÅ GJØRES MANUELT for", epost, e);
    return "feilet";
  }
}

// Gmail sender POST uten å vise noe til brukeren. Svarer vi ikke 200, teller
// det som en mislykket avmelding og trekker ned omdømmet vårt.
export async function POST(req: Request) {
  const utfall = await meldAv(new URL(req.url));
  if (utfall === "ugyldig") {
    return NextResponse.json({ feil: "Ugyldig lenke." }, { status: 400 });
  }
  return NextResponse.json({ ok: true, utfall });
}

function side(tittel: string, tekst: string): Response {
  return new Response(
    `<!doctype html>
<html lang="nb">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>${tittel} — Hud by Helseblikk</title>
</head>
<body style="margin:0;background:#faf9f7;color:#1a1a1a;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:80px 24px;">
    <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;margin:0 0 24px;">Hud by Helseblikk</p>
    <h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;line-height:1.2;margin:0 0 16px;">${tittel}</h1>
    <p style="font-size:16px;line-height:1.6;margin:0 0 32px;">${tekst}</p>
    <p style="margin:0;"><a href="/" style="display:inline-block;background:#c9a96e;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-size:15px;">Til forsiden</a></p>
  </div>
</body>
</html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

export async function GET(req: Request) {
  const utfall = await meldAv(new URL(req.url));

  if (utfall === "ugyldig") {
    return side(
      "Lenken virker ikke",
      "Avmeldingslenken er ugyldig eller ufullstendig. Send en e-post til <a href=\"mailto:hei@hudbyhelseblikk.no\" style=\"color:#c9a96e;\">hei@hudbyhelseblikk.no</a>, så melder vi deg av manuelt."
    );
  }
  if (utfall === "feilet") {
    return side(
      "Vi fikk ikke meldt deg av",
      "Noe gikk galt hos oss. Send en e-post til <a href=\"mailto:hei@hudbyhelseblikk.no\" style=\"color:#c9a96e;\">hei@hudbyhelseblikk.no</a>, så ordner vi det for hånd."
    );
  }
  return side(
    "Du er meldt av",
    "Du får ikke flere e-poster fra kundeklubben. Rabattkoder du allerede har fått, gjelder fortsatt."
  );
}
