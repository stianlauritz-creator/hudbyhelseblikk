import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ofte stilte spørsmål",
  description:
    "Svar på vanlige spørsmål om hudbehandlinger, konsultasjon, priser og etterbehandling hos Hud By Helseblikk.",
  alternates: { canonical: "/faq" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
