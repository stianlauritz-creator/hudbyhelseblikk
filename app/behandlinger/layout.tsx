import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Behandlinger",
  description:
    "Hudkonsultasjon, laserbehandling, microneedling med Dermapen, kjemisk peeling og injeksjonsbehandlinger hos Hud By Helseblikk i Grimstad.",
  alternates: { canonical: "/behandlinger" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
