import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1e2d3d] text-white/70">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3
              className="text-2xl text-white mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hud by Helseblikk
            </h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Vi kombinerer medisinsk kompetanse med estetisk presisjon.
              Forebygging, naturlig skjønnhet og faglig forsvarlighet i fokus.
            </p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-white/70">En del av</p>
              <a
                href="https://helseblikk.no"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#c9a96e] hover:text-[#e8d5b0] transition-colors mt-1 inline-block"
              >
                Helseblikk AS →
              </a>
            </div>
          </div>

          {/* Lenker */}
          <div>
            <h4 className="text-sm tracking-[0.15em] uppercase text-white/70 mb-5">
              Navigasjon
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                ["Behandlinger", "/behandlinger"],
                ["Plastikkirurgi", "/plastikkirurgi"],
                ["Nettbutikk", "/nettbutikk"],
                ["Kampanjer", "/kampanjer"],
                ["Behandlere", "/behandlere"],
                ["Prisliste", "/prisliste"],
                ["Gavekort", "/gavekort"],
                ["Kundeklubb", "/kundeklubb"],
                ["FAQ", "/faq"],
                ["Kontakt", "/kontakt"],
                ["Kjøpsvilkår", "/kjopsvilkar"],
                ["Personvern", "/personvern"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-[#c9a96e] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-sm tracking-[0.15em] uppercase text-white/70 mb-5">
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm">
              <li>Odden 1D, 4876 Grimstad</li>
              <li>
                <a
                  href="tel:37040500"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  370 40 500
                </a>
              </li>
              <li>
                <a
                  href="mailto:hei@hudbyhelseblikk.no"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  hei@hudbyhelseblikk.no
                </a>
              </li>
            </ul>
            <div className="mt-6 text-xs text-white/70 space-y-1">
              <p>Man 09–18 · Tir 09–16</p>
              <p>Ons 09–17 · Tor 09–16</p>
              <p>Fre 09–16 · Lør ved avtale</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} Hud by Helseblikk · Helseblikk Hud AS
            · Org.nr. 830 724 052
          </p>
          <p className="text-xs text-white/70">
            Ansvarlig lege: Débora Dias De Oliveira
          </p>
        </div>
      </div>
    </footer>
  );
}
