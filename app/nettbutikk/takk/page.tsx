import Link from "next/link";
import { redirect } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import ClearCart from "@/components/ClearCart";

// Ordrebekreftelse. Verifiserer Stripe-sesjonen server-side så siden ikke
// kan vise «betaling mottatt» uten at en faktisk betaling ligger bak.
export default async function TakkPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const key = process.env.STRIPE_SECRET_KEY;

  if (!session_id || !key) redirect("/nettbutikk");

  let paid = false;
  let email: string | null = null;
  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(
        session_id
      )}`,
      { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" }
    );
    if (res.ok) {
      const session = await res.json();
      paid = session.payment_status === "paid";
      email = session.customer_details?.email ?? null;
    }
  } catch {
    // Nettverksfeil mot Stripe — behandles som uverifisert
  }

  if (!paid) redirect("/nettbutikk");

  return (
    <section className="pt-40 pb-32 px-6 min-h-[70vh] bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
      <ClearCart />
      <div className="max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
            Bestilling mottatt
          </p>
          <h1
            className="text-4xl md:text-5xl font-normal mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Tusen takk!
          </h1>
          <p className="text-[#1a1a1a]/55 leading-relaxed mb-10">
            Betalingen er gjennomført
            {email ? (
              <>
                , og kvittering sendes til <strong>{email}</strong>
              </>
            ) : (
              " og kvittering sendes på e-post"
            )}
            . Valgte du henting i klinikken, gir vi beskjed så snart produktene
            er klare i Odden 1D, Grimstad.
          </p>
          <Link
            href="/nettbutikk"
            className="text-sm tracking-wide text-[#c9a96e] border-b border-[#c9a96e]/40 hover:border-[#c9a96e] pb-0.5 transition-colors"
          >
            Tilbake til nettbutikken →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
