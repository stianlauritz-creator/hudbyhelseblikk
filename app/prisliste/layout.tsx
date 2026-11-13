import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prisliste — hudbehandlinger og laser",
  description:
    "Priser hos Hud by Helseblikk i Grimstad — laserhårfjerning fra 690,-, konsultasjon, microneedling, kjemisk peeling, rynkebehandling og filler.",
  alternates: { canonical: "/prisliste" },
  openGraph: {
    title: "Prisliste — hudbehandlinger og laser | Hud by Helseblikk",
    url: "/prisliste",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
