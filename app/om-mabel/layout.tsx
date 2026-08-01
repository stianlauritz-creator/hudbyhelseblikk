import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mabel Lorine King — Kosmetisk Dermatologisk Sykepleier",
  description:
    "Bli kjent med Mabel Lorine King, kosmetisk dermatologisk sykepleier og gründer av Hud By Helseblikk i Grimstad.",
  alternates: { canonical: "/om-mabel" },
  openGraph: {
    title: "Mabel Lorine King | Hud By Helseblikk",
    url: "/om-mabel",
    siteName: "Hud By Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
