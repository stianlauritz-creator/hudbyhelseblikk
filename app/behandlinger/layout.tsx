import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Behandlinger",
  description:
    "Hudkonsultasjon, microneedling med Dermapen, kjemisk peeling, medisinsk rynkebehandling og filler hos Hud by Helseblikk i Grimstad.",
  alternates: { canonical: "/behandlinger" },
  openGraph: {
    title: "Behandlinger | Hud by Helseblikk",
    url: "/behandlinger",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
