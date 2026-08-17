import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prisliste",
  description:
    "Priser på hudbehandlinger hos Hud by Helseblikk i Grimstad — konsultasjon, microneedling, kjemisk peeling, rynkebehandling og filler.",
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
