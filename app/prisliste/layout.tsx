import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prisliste",
  description:
    "Priser på hudbehandlinger hos Hud by Helseblikk i Grimstad — konsultasjon, laser, microneedling, peeling og injeksjoner.",
  alternates: { canonical: "/prisliste" },
  openGraph: {
    title: "Prisliste | Hud by Helseblikk",
    url: "/prisliste",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
