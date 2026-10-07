import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laser i Grimstad — kommer snart",
  description:
    "Nyhet: Candela GentleMAX Pro Plus kommer til Hud by Helseblikk i Grimstad. Varig hårreduksjon, sprengte blodkar og pigmentflekker — for alle hudtyper. Sett deg på ventelisten.",
  alternates: { canonical: "/laser" },
  openGraph: {
    title: "Ny laser kommer snart | Hud by Helseblikk",
    description:
      "Candela GentleMAX Pro Plus kommer til klinikken i Grimstad: varig hårreduksjon, blodkar og pigmentflekker.",
    url: "/laser",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
