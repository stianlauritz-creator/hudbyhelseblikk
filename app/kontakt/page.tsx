"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { MapPin, Phone, Mail, Clock, CalendarCheck } from "lucide-react";
import { BOOKING_URL } from "@/lib/site";

const aapningstider = [
  { dag: "Mandag", tid: "09:00 – 18:00" },
  { dag: "Tirsdag", tid: "09:00 – 16:00" },
  { dag: "Onsdag", tid: "09:00 – 17:00" },
  { dag: "Torsdag", tid: "09:00 – 16:00" },
  { dag: "Fredag", tid: "09:00 – 16:00" },
  { dag: "Lørdag", tid: "Ved avtale" },
  { dag: "Søndag", tid: "Stengt" },
];

export default function KontaktPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
              Vi hører fra deg
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Kontakt & Bestill time
            </h1>
            <p className="text-[#1a1a1a]/55 leading-relaxed">
              Ta kontakt for å bestille time, stille spørsmål eller høre mer
              om våre behandlinger.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Kontaktinfo */}
          <div className="space-y-8">
            <AnimatedSection direction="left">
              <h2
                className="text-2xl font-normal mb-8"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Finn oss
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-[#1a1a1a]/40 mb-1">
                      Adresse
                    </p>
                    <p className="text-sm text-[#1a1a1a]/75">
                      Odden 1D, 4876 Grimstad
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-[#1a1a1a]/40 mb-1">
                      Telefon
                    </p>
                    <a
                      href="tel:37040500"
                      className="text-sm text-[#1a1a1a]/75 hover:text-[#c9a96e] transition-colors"
                    >
                      370 40 500
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-[#1a1a1a]/40 mb-1">
                      E-post
                    </p>
                    <a
                      href="mailto:hei@helseblikk.no"
                      className="text-sm text-[#1a1a1a]/75 hover:text-[#c9a96e] transition-colors"
                    >
                      hei@helseblikk.no
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.15em] uppercase text-[#1a1a1a]/40 mb-2">
                      Åpningstider
                    </p>
                    <div className="space-y-1.5">
                      {aapningstider.map((a) => (
                        <div
                          key={a.dag}
                          className="flex justify-between gap-8 text-sm text-[#1a1a1a]/65"
                        >
                          <span>{a.dag}</span>
                          <span className={a.tid === "Stengt" ? "text-[#1a1a1a]/30" : ""}>
                            {a.tid}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Bestill time / Kart */}
          <div className="space-y-8">
            <AnimatedSection direction="right">
              <div className="p-8 rounded-2xl bg-[#1e2d3d] text-white">
                <h2
                  className="text-2xl font-normal mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Bestill time
                </h2>
                <p className="text-white/55 text-sm leading-relaxed mb-8">
                  Book direkte i vår timebok. Starter med en
                  hudkonsultasjon? Det anbefales for nye pasienter.
                </p>
                <div className="space-y-3">
                  <a
                    href={BOOKING_URL}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#c9a96e] text-white rounded-full text-sm tracking-wide hover:bg-[#b8955a] transition-colors"
                  >
                    <CalendarCheck size={16} />
                    Book time online
                  </a>
                  <a
                    href="tel:37040500"
                    className="flex items-center justify-center w-full py-3.5 bg-white/10 text-white rounded-full text-sm tracking-wide hover:bg-white/20 transition-colors"
                  >
                    Ring oss: 370 40 500
                  </a>
                  <a
                    href="mailto:hei@helseblikk.no"
                    className="flex items-center justify-center w-full py-3.5 border border-white/20 text-white/80 rounded-full text-sm tracking-wide hover:border-[#c9a96e]/60 hover:text-white transition-colors"
                  >
                    Send e-post
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Kart */}
            <AnimatedSection direction="right" delay={0.15}>
              <div className="rounded-2xl overflow-hidden border border-[#e8d5b0]/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2046.5!2d8.5923!3d58.3421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sOdden+1D%2C+4876+Grimstad!5e0!3m2!1snb!2sno!4v1"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kart til Hud By Helseblikk"
                />
              </div>
              <p className="text-xs text-[#1a1a1a]/35 mt-2 text-center">
                Odden 1D, 4876 Grimstad
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
