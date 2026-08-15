import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import { getCatalog } from "@/lib/shopify";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hud by Helseblikk — Hudklinikk i Grimstad",
    template: "%s | Hud by Helseblikk",
  },
  description:
    "Medisinsk hudklinikk i Grimstad. Laserbehandlinger, injeksjonsbehandlinger, microneedling, kjemisk peeling og nettbutikk med ZO Skin Health, Face Formula og ColoreScience.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hud by Helseblikk — Hudklinikk i Grimstad",
    description:
      "Medisinsk hudklinikk i Grimstad med nettbutikk for medisinsk hudpleie.",
    url: SITE_URL,
    siteName: "Hud by Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "HealthAndBeautyBusiness"],
  "@id": `${SITE_URL}/#klinikk`,
  name: "Hud by Helseblikk",
  description:
    "Premium medisinsk hudklinikk i Grimstad. Laserbehandlinger, injeksjonsbehandlinger, microneedling og avansert hudpleie.",
  url: SITE_URL,
  image: `${SITE_URL}/behandling-banner.jpg`,
  telephone: "+4737040500",
  email: "hei@helseblikk.no",
  priceRange: "kr 290 – kr 5 000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Odden 1D",
    postalCode: "4876",
    addressLocality: "Grimstad",
    addressCountry: "NO",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "16:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "16:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "16:00" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalog = await getCatalog();
  return (
    <html
      lang="nb"
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col"
        style={{
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
          background: "#faf9f7",
        }}
      >
        <CartProvider catalog={catalog}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
