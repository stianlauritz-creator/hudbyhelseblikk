import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kampanjer og tilbud",
  description:
    "Pågående kampanjer hos Hud by Helseblikk i Grimstad — gaver ved kjøp av Face Formula og ZO Skin Health, og lanseringstilbud i nettbutikken.",
  alternates: { canonical: "/kampanjer" },
  openGraph: {
    title: "Kampanjer og tilbud | Hud by Helseblikk",
    description:
      "Gaver ved kjøp av Face Formula og ZO Skin Health, og lanseringstilbud i nettbutikken.",
    url: "/kampanjer",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
