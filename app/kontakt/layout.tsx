import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt og åpningstider",
  description:
    "Hud by Helseblikk, Odden 1D, 4876 Grimstad. Se åpningstider og bestill time.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt | Hud by Helseblikk",
    url: "/kontakt",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
