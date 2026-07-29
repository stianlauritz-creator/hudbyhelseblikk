import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products";
import {
  FREE_SHIPPING_LIMIT,
  SHIPPING_COST,
} from "@/components/CartProvider";

// Oppretter en Stripe Checkout-sesjon. Prisene slås alltid opp server-side.
// Uten STRIPE_SECRET_KEY svarer ruten 503 og klienten faller tilbake til e-postbestilling.
export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Betaling er ikke konfigurert" },
      { status: 503 }
    );
  }

  let lines: { sku: string; qty: number }[];
  try {
    const body = await req.json();
    lines = body.lines;
    if (!Array.isArray(lines) || lines.length === 0) throw new Error();
  } catch {
    return NextResponse.json({ error: "Ugyldig handlekurv" }, { status: 400 });
  }

  const items = lines
    .map((l) => ({
      product: PRODUCTS.find((p) => p.sku === l.sku),
      qty: Math.max(1, Math.min(10, Math.floor(l.qty))),
    }))
    .filter((i): i is { product: (typeof PRODUCTS)[number]; qty: number } =>
      Boolean(i.product)
    );
  if (items.length === 0) {
    return NextResponse.json({ error: "Tom handlekurv" }, { status: 400 });
  }

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shippingOre =
    subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST * 100;

  const origin = req.headers.get("origin") ?? "https://hudbyhelseblikk.vercel.app";
  const params = new URLSearchParams({
    mode: "payment",
    // {CHECKOUT_SESSION_ID} erstattes av Stripe — takk-siden verifiserer
    // sesjonen server-side før den viser ordrebekreftelse.
    success_url: `${origin}/nettbutikk/takk?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/nettbutikk`,
    currency: "nok",
    locale: "nb",
    "shipping_address_collection[allowed_countries][0]": "NO",
    "shipping_options[0][shipping_rate_data][type]": "fixed_amount",
    "shipping_options[0][shipping_rate_data][display_name]":
      shippingOre === 0 ? "Gratis levering" : "Standard levering",
    "shipping_options[0][shipping_rate_data][fixed_amount][amount]":
      String(shippingOre),
    "shipping_options[0][shipping_rate_data][fixed_amount][currency]": "nok",
    "shipping_options[1][shipping_rate_data][type]": "fixed_amount",
    "shipping_options[1][shipping_rate_data][display_name]":
      "Hent i klinikken (Odden 1D, Grimstad)",
    "shipping_options[1][shipping_rate_data][fixed_amount][amount]": "0",
    "shipping_options[1][shipping_rate_data][fixed_amount][currency]": "nok",
  });
  items.forEach(({ product, qty }, i) => {
    params.set(`line_items[${i}][quantity]`, String(qty));
    params.set(`line_items[${i}][price_data][currency]`, "nok");
    params.set(
      `line_items[${i}][price_data][unit_amount]`,
      String(product.price * 100)
    );
    params.set(
      `line_items[${i}][price_data][product_data][name]`,
      `${product.name} – ${product.size}`
    );
    params.set(
      `line_items[${i}][price_data][product_data][metadata][sku]`,
      product.sku
    );
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Stripe-feil:", err.slice(0, 500));
    return NextResponse.json(
      { error: "Kunne ikke starte betaling" },
      { status: 502 }
    );
  }

  const session = await res.json();
  return NextResponse.json({ url: session.url });
}
