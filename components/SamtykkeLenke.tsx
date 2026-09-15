"use client";

/**
 * «Informasjonskapsler» i footeren — åpner samtykkevinduet igjen.
 *
 * Personvernerklæringen lover at valget kan endres når som helst, og etter
 * GDPR skal det være like lett å trekke tilbake et samtykke som å gi det.
 * Banneret forsvinner når kunden har svart, så uten denne lenken finnes det
 * ingen vei tilbake.
 *
 * Footeren er en serverkomponent, derfor ligger knappen i sin egen lille
 * klientkomponent i stedet for at hele footeren må bli klient.
 */
export default function SamtykkeLenke({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("hbh-apne-samtykke"))}
      className={`text-left hover:text-[#c9a96e] transition-colors cursor-pointer ${className}`}
    >
      Informasjonskapsler
    </button>
  );
}
