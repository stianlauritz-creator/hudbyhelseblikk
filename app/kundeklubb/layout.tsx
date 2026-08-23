import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kundeklubb",
  description:
    "Bli medlem i kundeklubben til Hud by Helseblikk og få 15 % på ditt første produktkjøp — og beskjed først om ledige timer og nyheter.",
  alternates: { canonical: "/kundeklubb" },
  openGraph: {
    title: "Kundeklubb | Hud by Helseblikk",
    description:
      "Bli medlem og få 15 % på ditt første produktkjøp, samt tilbud og nyheter først.",
    url: "/kundeklubb",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
