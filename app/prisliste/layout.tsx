import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prisliste",
  description:
    "Priser på hudbehandlinger hos Hud By Helseblikk i Grimstad — konsultasjon, laser, microneedling, peeling og injeksjoner.",
  alternates: { canonical: "/prisliste" },
  openGraph: {
    title: "Prisliste | Hud By Helseblikk",
    url: "/prisliste",
    siteName: "Hud By Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
