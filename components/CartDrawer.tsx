"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart, FREE_SHIPPING_LIMIT } from "@/components/CartProvider";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
  const cart = useCart();
  const [busy, setBusy] = useState(false);
  const [fallback, setFallback] = useState(false);

  const checkout = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines: cart.lines }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setFallback(true);
    } catch {
      setFallback(true);
    } finally {
      setBusy(false);
    }
  };

  const mailtoOrder = () => {
    const linjer = cart.items
      .map(
        (i) =>
          `${i.qty} x ${i.product.name} (${i.product.sku}) — ${formatPrice(
            i.product.price * i.qty
          )}`
      )
      .join("%0D%0A");
    return (
      `mailto:hei@hudbyhelseblikk.no?subject=Bestilling fra nettbutikken` +
      `&body=Hei!%0D%0A%0D%0AJeg ønsker å bestille:%0D%0A%0D%0A${linjer}` +
      `%0D%0A%0D%0ATotalt: ${formatPrice(cart.total)}` +
      `%0D%0A%0D%0ANavn:%0D%0ATelefon:%0D%0AAdresse (eller hentes i klinikken):`
    );
  };

  return (
    <AnimatePresence>
      {cart.open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => cart.setOpen(false)}
            className="fixed inset-0 bg-[#1a1a1a]/40 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white z-[70] flex flex-col shadow-2xl"
          >
            {/* Topp */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8d5b0]/40">
              <p
                className="text-lg"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Handlekurv{" "}
                {cart.count > 0 && (
                  <span className="text-sm text-[#8f6b28]">({cart.count})</span>
                )}
              </p>
              <button
                onClick={() => cart.setOpen(false)}
                aria-label="Lukk handlekurv"
                className="p-2 text-[#1a1a1a]/65 hover:text-[#1a1a1a] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Innhold */}
            {cart.items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-[#1a1a1a]/65">
                <ShoppingBag size={32} className="text-[#8f6b28]/40" />
                <p className="text-sm">Handlekurven er tom</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                  {cart.items.map(({ product, qty }) => (
                    <div key={product.sku} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl bg-[#faf9f7] border border-[#e8d5b0]/30 overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#1a1a1a]/85 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-[#1a1a1a]/65 mb-2">
                          {product.size}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-[#e8d5b0]/60 rounded-full px-2 py-0.5">
                            <button
                              onClick={() => cart.setQty(product.sku, qty - 1)}
                              aria-label="Færre"
                              className="text-[#1a1a1a]/65 hover:text-[#8f6b28]"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="text-xs w-4 text-center">{qty}</span>
                            <button
                              onClick={() => cart.setQty(product.sku, qty + 1)}
                              aria-label="Flere"
                              className="text-[#1a1a1a]/65 hover:text-[#8f6b28]"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <p className="text-sm text-[#8f6b28]">
                            {formatPrice(product.price * qty)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bunn */}
                <div className="border-t border-[#e8d5b0]/40 px-6 py-5 space-y-3">
                  {cart.shipping > 0 ? (
                    <p className="text-xs text-[#1a1a1a]/65">
                      Frakt {formatPrice(cart.shipping)} — gratis frakt over{" "}
                      {formatPrice(FREE_SHIPPING_LIMIT)} (
                      {formatPrice(FREE_SHIPPING_LIMIT - cart.subtotal)} igjen)
                    </p>
                  ) : (
                    <p className="text-xs text-[#3d4a3e]">
                      Gratis frakt ✓ — eller hent gratis i klinikken
                    </p>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#1a1a1a]/65">Totalt</span>
                    <span className="text-[#1a1a1a] font-medium">
                      {formatPrice(cart.total)}
                    </span>
                  </div>

                  {fallback ? (
                    <div className="space-y-2">
                      <p className="text-xs text-[#1a1a1a]/65 leading-relaxed">
                        Online betaling er ikke aktivert ennå. Send bestillingen
                        på e-post, så tar vi kontakt for betaling og levering.
                      </p>
                      <a
                        href={mailtoOrder()}
                        className="block w-full text-center px-6 py-3.5 bg-[#8f6b28] text-white text-sm tracking-wide rounded-full hover:bg-[#7a5b20] transition-colors"
                      >
                        Send bestilling på e-post
                      </a>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={checkout}
                        disabled={busy}
                        className="w-full px-6 py-3.5 bg-[#8f6b28] text-white text-sm tracking-wide rounded-full hover:bg-[#7a5b20] transition-colors disabled:opacity-60"
                      >
                        {busy ? "Et øyeblikk …" : "Til betaling"}
                      </button>
                      <p className="text-[11px] text-[#1a1a1a]/35 text-center">
                        Ved å fullføre kjøpet godtar du våre{" "}
                        <a
                          href="/kjopsvilkar"
                          className="underline hover:text-[#8f6b28]"
                        >
                          kjøpsvilkår
                        </a>
                      </p>
                    </>
                  )}
                  <button
                    onClick={cart.clear}
                    className="w-full text-center text-xs text-[#1a1a1a]/35 hover:text-[#1a1a1a]/65 transition-colors"
                  >
                    Tøm handlekurven
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
