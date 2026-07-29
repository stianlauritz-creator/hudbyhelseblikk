import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

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
  title: "Hud By Helseblikk — Naturlig skjønnhet, medisinsk kvalitet",
  description:
    "Premium medisinsk hudklinikk i Grimstad. Vi tilbyr laserbehandlinger, injeksjonsbehandlinger, microneedling, kjemisk peeling og hudkonsultasjoner. Bestill time i dag.",
  keywords:
    "hudklinikk grimstad, laserbehandling, botox, filler, microneedling, medisinsk hudpleie, hud by helseblikk",
  openGraph: {
    title: "Hud By Helseblikk — Naturlig skjønnhet, medisinsk kvalitet",
    description:
      "Premium medisinsk hudklinikk i Grimstad. Laserbehandlinger, injeksjonsbehandlinger og avansert hudpleie.",
    url: "https://hudbyhelseblikk.no",
    siteName: "Hud By Helseblikk",
    locale: "nb_NO",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Hud By Helseblikk",
  description:
    "Premium medisinsk hudklinikk i Grimstad. Laserbehandlinger, injeksjonsbehandlinger, microneedling og avansert hudpleie.",
  url: "https://hudbyhelseblikk.no",
  telephone: "+4737040500",
  email: "hei@helseblikk.no",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
