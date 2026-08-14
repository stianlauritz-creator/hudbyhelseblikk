import AnimatedSection from "@/components/AnimatedSection";
import KundeklubbSkjema from "@/components/KundeklubbSkjema";
import { Sparkles, BellRing, Tag } from "lucide-react";

const fordeler = [
  {
    icon: Tag,
    tittel: "10 % på første kjøp",
    tekst:
      "Du får en personlig rabattkode med én gang du melder deg inn. Den gjelder produkter i nettbutikken.",
  },
  {
    icon: BellRing,
    tittel: "Beskjed om ledige timer",
    tekst:
      "Sier du ja til SMS, hører du fra oss når det blir en time ledig på kort varsel.",
  },
  {
    icon: Sparkles,
    tittel: "Nyheter først",
    tekst:
      "Du får vite om nye behandlinger, produkter og kampanjer før alle andre.",
  },
];

export default function KundeklubbPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#f5ede4] to-[#faf9f7]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection eager>
            <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-4">
              For deg som vil ha mer ut av huden din
            </p>
            <h1
              className="text-4xl md:text-5xl font-normal mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Kundeklubben
            </h1>
            <p className="text-[#1a1a1a]/55 leading-relaxed">
              Bli medlem og få 10 % på ditt første produktkjøp — og beskjed
              først når det skjer noe hos oss.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {fordeler.map((f) => (
            <AnimatedSection key={f.tittel}>
              <div className="w-10 h-10 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-4">
                <f.icon size={17} className="text-[#c9a96e]" />
              </div>
              <h2
                className="text-lg font-normal mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {f.tittel}
              </h2>
              <p className="text-sm text-[#1a1a1a]/55 leading-relaxed">
                {f.tekst}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto bg-[#f5ede4] rounded-2xl p-8 md:p-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e] mb-3">
            Er du student?
          </p>
          <h2
            className="text-2xl md:text-3xl font-normal mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            20 % studentrabatt
          </h2>
          <p className="text-[#1a1a1a]/60 leading-relaxed mb-6">
            Studenter får 20 % på hudpleieprodukter og hudbehandlinger hos oss.
            Rabatten gjelder hver gang du er innom — ikke bare første besøk.
          </p>
          <div className="space-y-2.5 text-sm text-[#1a1a1a]/70">
            <p className="flex gap-3">
              <span className="text-[#c9a96e]">1.</span>
              <span>Du må være medlem i kundeklubben — meld deg inn nedenfor</span>
            </p>
            <p className="flex gap-3">
              <span className="text-[#c9a96e]">2.</span>
              <span>Vis gyldig studentbevis i klinikken, så trekker vi fra ved betaling</span>
            </p>
          </div>
          <p className="text-xs text-[#1a1a1a]/45 leading-relaxed mt-6">
            Gjelder ikke injeksjonsbehandlinger som filler og muskelavslappende,
            og kan ikke kombineres med andre tilbud.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-md mx-auto bg-[#faf9f7] border border-[#e8d5b0]/60 rounded-2xl p-8">
          <h2
            className="text-2xl font-normal mb-6 text-center"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Bli medlem
          </h2>
          <KundeklubbSkjema variant="side" />
        </div>
      </section>

      <section id="avmelding" className="pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-lg font-normal mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Vil du melde deg av?
          </h2>
          <p className="text-sm text-[#1a1a1a]/55 leading-relaxed">
            Alle e-poster fra oss har en avmeldingslenke nederst. Du kan også
            sende en e-post til{" "}
            <a
              href="mailto:hei@helseblikk.no"
              className="text-[#c9a96e] underline"
            >
              hei@helseblikk.no
            </a>
            , så tar vi deg ut av listene med én gang.
          </p>
        </div>
      </section>
    </>
  );
}
