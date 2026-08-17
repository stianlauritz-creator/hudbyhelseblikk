import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plastikkirurgi i Grimstad",
  description:
    "Estetisk plastikkirurgi i lokalbedøvelse i Grimstad. Øyelokk, ører, arr og føflekker hos plastikkirurg Ole Arvid F. Østerud. Åpne priser, ingen henvisning.",
  alternates: { canonical: "/plastikkirurgi" },
  openGraph: {
    title: "Plastikkirurgi i Grimstad | Hud by Helseblikk",
    description:
      "Estetisk plastikkirurgi i lokalbedøvelse hos plastikkirurg og overlege Ole Arvid F. Østerud i Grimstad.",
    url: "/plastikkirurgi",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
