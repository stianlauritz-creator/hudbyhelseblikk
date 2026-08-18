import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Débora Dias De Oliveira — Ansvarlig Lege",
  description:
    "Débora Dias De Oliveira er ansvarlig lege hos Hud by Helseblikk i Grimstad. Lege siden 2001, med kompetanse innen indremedisin, allergi, klinisk immunologi og estetisk medisin.",
  alternates: { canonical: "/om-debora" },
  openGraph: {
    title: "Débora Dias De Oliveira | Hud by Helseblikk",
    url: "/om-debora",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
