import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

// Stripe-webhook: varsler klinikken (ntfy-push) når en betaling er
// gjennomført. Konfigureres i Stripe med eventet checkout.session.completed
// og hemmeligheten i STRIPE_WEBHOOK_SECRET. Varselkanal settes i
// ORDER_NTFY_TOPIC (emnenavn på ntfy.sh).

function verifySignature(
  payload: string,
  header: string,
  secret: string
): boolean {
  const parts = Object.fromEntries(
    header.split(",").map((kv) => kv.split("=") as [string, string])
  );
  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  // Avvis gamle hendelser (replay-vern, 5 min toleranse)
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

interface LineItem {
  description: string;
  quantity: number;
  amount_total: number;
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!webhookSecret || !stripeKey) {
    return NextResponse.json({ error: "Ikke konfigurert" }, { status: 503 });
  }

  const payload = await req.text();
  const signatureHeader = req.headers.get("stripe-signature") ?? "";
  if (!verifySignature(payload, signatureHeader, webhookSecret)) {
    return NextResponse.json({ error: "Ugyldig signatur" }, { status: 400 });
  }

  const event = JSON.parse(payload);
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  // Hent ordrelinjene for et komplett varsel
  let lines: LineItem[] = [];
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${session.id}/line_items?limit=100`,
      { headers: { Authorization: `Bearer ${stripeKey}` } }
    );
    if (res.ok) {
      const data = await res.json();
      lines = data.data ?? [];
    }
  } catch {
    // Varselet sendes uten linjer om oppslaget feiler
  }

  const kr = (ore: number) => `${(ore / 100).toLocaleString("nb-NO")},-`;
  const kunde = session.customer_details;
  const levering =
    session.shipping_cost?.amount_total === 0
      ? "Henting i klinikken / gratis frakt"
      : `Frakt ${kr(session.shipping_cost?.amount_total ?? 0)}`;
  const adresse = session.collected_information?.shipping_details ??
    session.shipping_details;

  const melding = [
    ...lines.map(
      (l) => `${l.quantity} × ${l.description} — ${kr(l.amount_total)}`
    ),
    "",
    `Totalt: ${kr(session.amount_total)}`,
    levering,
    "",
    `Kunde: ${kunde?.name ?? "ukjent"}`,
    `E-post: ${kunde?.email ?? "ukjent"}`,
    ...(adresse?.address
      ? [
          `Adresse: ${adresse.address.line1 ?? ""}, ${
            adresse.address.postal_code ?? ""
          } ${adresse.address.city ?? ""}`,
        ]
      : []),
  ].join("\n");

  const topic = process.env.ORDER_NTFY_TOPIC;
  if (!topic) {
    console.log("Ny ordre (ORDER_NTFY_TOPIC ikke satt):", melding);
    return NextResponse.json({ received: true });
  }

  const ntfyRes = await fetch(`https://ntfy.sh/${topic}`, {
    method: "POST",
    headers: {
      Title: `Ny ordre i nettbutikken — ${kr(session.amount_total)}`,
      Priority: "high",
      Tags: "shopping_bags",
    },
    body: melding,
  });

  if (!ntfyRes.ok) {
    // 500 → Stripe prøver på nytt, så varselet ikke går tapt
    return NextResponse.json({ error: "Varsling feilet" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
