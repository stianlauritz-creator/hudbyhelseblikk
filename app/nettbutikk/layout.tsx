import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nettbutikk — medisinsk hudpleie",
  description:
    "Kjøp ZO Skin Health, Face Formula og ColoreScience fra autorisert klinikk. 73 produkter, rask levering eller gratis henting i Grimstad.",
  alternates: { canonical: "/nettbutikk" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
