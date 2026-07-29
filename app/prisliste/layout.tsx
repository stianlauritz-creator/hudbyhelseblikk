import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prisliste",
  description:
    "Priser på hudbehandlinger hos Hud By Helseblikk i Grimstad — konsultasjon, laser, microneedling, peeling og injeksjoner.",
  alternates: { canonical: "/prisliste" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
