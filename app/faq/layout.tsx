import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ofte stilte spørsmål",
  description:
    "Svar på vanlige spørsmål om hudbehandlinger, konsultasjon, priser og etterbehandling hos Hud by Helseblikk.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Ofte stilte spørsmål | Hud by Helseblikk",
    url: "/faq",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
