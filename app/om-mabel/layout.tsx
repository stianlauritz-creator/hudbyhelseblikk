import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mabel Lorine King — Kosmetisk Dermatologisk Sykepleier",
  description:
    "Bli kjent med Mabel Lorine King, kosmetisk dermatologisk sykepleier og gründer av Hud By Helseblikk i Grimstad.",
  alternates: { canonical: "/om-mabel" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
