// E-postmalen til engangsjobben i oppgrader-klubbkoder.mjs. Skilt ut i egen
// fil så teksten kan forhåndsvises uten å kjøre jobben:
//   node scripts/forhandsvis-klubbmal.mjs
//
// Stilen er med vilje identisk med lib/klubb-epost.ts (velkomst-e-posten) —
// samme avsender, samme oppsett, samme avmeldingsfot.

import { createHmac } from "node:crypto";

const SITE_URL = "https://hudbyhelseblikk.no";

export function avmeldingsUrl(epost) {
  const n = process.env.KLUBB_HEMMELIGHET;
  if (!n) return null;
  const e = epost.trim().toLowerCase();
  const token = createHmac("sha256", n).update(e).digest("hex").slice(0, 32);
  return `${SITE_URL}/api/avmelding?e=${encodeURIComponent(e)}&t=${token}`;
}

export const EMNE = "Koden din er oppgradert til 15 %";

export function tekst(kode, fornavn, avmeld) {
  const hilsen = fornavn ? `Hei ${fornavn}!` : "Hei!";
  return `Koden din er oppgradert til 15 %

${hilsen} Da du meldte deg inn i kundeklubben, ga velkomstrabatten 10 %. Vi har
økt den til 15 % — og da skal du ha den samme, selv om du meldte deg inn før vi
endret den.

Her er den nye koden din:

    ${kode}

Den gir 15 % på produkter i nettbutikken og kan brukes én gang. Den gamle koden
din er slått av, så bruk denne.

Nettbutikken er akkurat åpnet for bestilling, så nå er det noe å bruke den på:
${SITE_URL}/nettbutikk

Hilsen oss i Hud by Helseblikk

--
Du får denne e-posten fordi du er medlem i kundeklubben på hudbyhelseblikk.no.
Meld deg av: ${avmeld ?? `${SITE_URL}/kundeklubb#avmelding`}
Helseblikk Hud AS · Odden 1D, 4876 Grimstad`;
}

export function html(kode, fornavn, avmeld) {
  const hilsen = fornavn ? `Hei ${fornavn}!` : "Hei!";
  return `<!doctype html>
<html lang="nb">
<body style="margin:0;padding:0;background:#faf9f7;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;margin:0 0 24px;">Hud by Helseblikk</p>

    <h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;line-height:1.2;margin:0 0 16px;">Koden din er oppgradert til 15&nbsp;%</h1>

    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">${hilsen} Da du meldte deg inn i kundeklubben, ga velkomstrabatten 10&nbsp;%. Vi har økt den til 15&nbsp;% — og da skal du ha den samme, selv om du meldte deg inn før vi endret den.</p>

    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Her er den nye koden din:</p>

    <div style="background:#fff;border:1px solid #e8d5b0;border-radius:4px;padding:20px;text-align:center;margin:0 0 24px;">
      <p style="font-size:24px;letter-spacing:2px;font-weight:600;margin:0;color:#1a1a1a;">${kode}</p>
    </div>

    <p style="font-size:15px;line-height:1.6;margin:0 0 24px;">Den gir 15&nbsp;% på produkter i nettbutikken og kan brukes én gang. Den gamle koden din er slått av, så bruk denne.</p>

    <p style="font-size:15px;line-height:1.6;margin:0 0 24px;">Nettbutikken er akkurat åpnet for bestilling, så nå er det noe å bruke den på.</p>

    <p style="margin:0 0 32px;">
      <a href="${SITE_URL}/nettbutikk" style="display:inline-block;background:#c9a96e;color:#fff;text-decoration:none;padding:14px 28px;border-radius:999px;font-size:15px;">Se utvalget</a>
    </p>

    <hr style="border:0;border-top:1px solid #e8d5b0;margin:0 0 16px;">
    <p style="font-size:12px;line-height:1.6;color:#8a8a8a;margin:0;">
      Du får denne e-posten fordi du er medlem i kundeklubben på hudbyhelseblikk.no.<br>
      <a href="${avmeld ?? `${SITE_URL}/kundeklubb#avmelding`}" style="color:#8a8a8a;">Meld deg av</a> ·
      Helseblikk Hud AS · Odden 1D, 4876 Grimstad
    </p>
  </div>
</body>
</html>`;
}

