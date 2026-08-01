import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt og åpningstider",
  description:
    "Hud By Helseblikk, Odden 1D, 4876 Grimstad. Se åpningstider og bestill time.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt | Hud By Helseblikk",
    url: "/kontakt",
    siteName: "Hud By Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
