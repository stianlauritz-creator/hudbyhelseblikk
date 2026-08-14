import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Christina Dalen — Kosmetisk Sykepleier",
  description:
    "Bli kjent med Christina Dalen, kosmetisk sykepleier hos Hud by Helseblikk i Grimstad.",
  alternates: { canonical: "/om-christina" },
  openGraph: {
    title: "Christina Dalen | Hud by Helseblikk",
    url: "/om-christina",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
