import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Christina Dalen — Kosmetisk Sykepleier",
  description:
    "Bli kjent med Christina Dalen, kosmetisk sykepleier hos Hud By Helseblikk i Grimstad.",
  alternates: { canonical: "/om-christina" },
  openGraph: {
    title: "Christina Dalen | Hud By Helseblikk",
    url: "/om-christina",
    siteName: "Hud By Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
