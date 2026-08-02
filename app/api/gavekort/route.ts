import { NextResponse } from "next/server";
import { createGavekortCheckout } from "@/lib/shopify";

const VALORER = [500, 1000, 1500, 2000];

export async function POST(req: Request) {
  let amount: number;
  try {
    const body = await req.json();
    amount = Number(body.amount);
  } catch {
    amount = NaN;
  }
  if (!VALORER.includes(amount)) {
    return NextResponse.json({ error: "Ugyldig valør" }, { status: 400 });
  }

  const url = await createGavekortCheckout(amount);
  if (!url) {
    return NextResponse.json(
      { error: "Kunne ikke starte betaling" },
      { status: 502 }
    );
  }
  return NextResponse.json({ url });
}
