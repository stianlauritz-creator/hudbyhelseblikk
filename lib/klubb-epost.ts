import { Resend } from "resend";

// Underdomenet klubb.hudbyhelseblikk.no er det som er verifisert hos Resend —
// ikke hoveddomenet. Endres dette, slutter utsendingen å virke.
const AVSENDER = "Hud by Helseblikk <klubb@klubb.hudbyhelseblikk.no>";

function mal(kode: string, fornavn?: string): string {
  const hilsen = fornavn ? `Hei ${fornavn}!` : "Hei!";
  return `<!doctype html>
<html lang="nb">
<body style="margin:0;padding:0;background:#faf9f7;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;margin:0 0 24px;">Hud by Helseblikk</p>

    <h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;line-height:1.2;margin:0 0 16px;">Velkommen i kundeklubben</h1>

    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">${hilsen} Så hyggelig at du ble medlem. Her er rabattkoden din på 10 % til ditt første produktkjøp:</p>

    <div style="background:#fff;border:1px solid #e8d5b0;border-radius:4px;padding:20px;text-align:center;margin:0 0 24px;">
      <p style="font-size:24px;letter-spacing:2px;font-weight:600;margin:0;color:#1a1a1a;">${kode}</p>
    </div>

    <p style="font-size:15px;line-height:1.6;margin:0 0 24px;">Koden gjelder produkter i nettbutikken og kan brukes én gang. Skriv den inn i kassen.</p>

    <p style="margin:0 0 32px;">
      <a href="https://hudbyhelseblikk.no/nettbutikk" style="display:inline-block;background:#c9a96e;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-size:15px;">Se utvalget</a>
    </p>

    <p style="font-size:15px;line-height:1.6;margin:0 0 32px;">Som medlem får du beskjed først om kampanjer og nyheter, og medlemspris på utvalgte produkter.</p>

    <hr style="border:0;border-top:1px solid #e8d5b0;margin:0 0 16px;">
    <p style="font-size:12px;line-height:1.6;color:#8a8a8a;margin:0;">
      Du får denne e-posten fordi du meldte deg inn i kundeklubben på hudbyhelseblikk.no.<br>
      <a href="https://hudbyhelseblikk.no/kundeklubb#avmelding" style="color:#8a8a8a;">Meld deg av</a> ·
      Helseblikk Hud AS · Odden 1D, 4876 Grimstad
    </p>
  </div>
</body>
</html>`;
}

export async function sendVelkomstEpost(args: {
  til: string;
  fornavn?: string;
  kode: string;
}): Promise<boolean> {
  const noekkel = process.env.RESEND_API_KEY;
  if (!noekkel) {
    console.error(
      "Kundeklubb: RESEND_API_KEY mangler — e-post ikke sendt til",
      args.til
    );
    return false;
  }

  try {
    const resend = new Resend(noekkel);
    const { error } = await resend.emails.send({
      from: AVSENDER,
      to: args.til,
      subject: "Velkommen i kundeklubben — her er rabattkoden din",
      html: mal(args.kode, args.fornavn),
    });
    if (error) {
      console.error("Kundeklubb: Resend-feil for", args.til, error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Kundeklubb: e-postutsending kastet for", args.til, e);
    return false;
  }
}
