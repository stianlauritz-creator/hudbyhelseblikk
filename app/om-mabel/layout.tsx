import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mabel Lorine King — Kosmetisk Dermatologisk Sykepleier",
  description:
    "Bli kjent med Mabel Lorine King, kosmetisk dermatologisk sykepleier og gründer av Hud by Helseblikk i Grimstad.",
  alternates: { canonical: "/om-mabel" },
  openGraph: {
    title: "Mabel Lorine King | Hud by Helseblikk",
    url: "/om-mabel",
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
