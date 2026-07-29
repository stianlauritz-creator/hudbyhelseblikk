import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Våre behandlere",
  description:
    "Møt Mabel Lorine King og Christina Dalen — kvalifisert helsepersonell innen kosmetisk dermatologi i Grimstad.",
  alternates: { canonical: "/behandlere" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
