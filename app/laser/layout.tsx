import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laserhårfjerning i Grimstad — Candela GentleMAX Pro Plus",
  description:
    "Laserhårfjerning og behandling av blodkar hos Hud by Helseblikk i Grimstad. Candela GentleMAX Pro Plus med to bølgelengder for alle hudtyper. Priser fra 690,- — bestill time.",
  alternates: { canonical: "/laser" },
  openGraph: {
    title: "Laserhårfjerning i Grimstad | Hud by Helseblikk",
    description:
      "Candela GentleMAX Pro Plus: varig hårreduksjon og blodkar, for alle hudtyper. Priser fra 690,-.",
    url: "/laser",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
