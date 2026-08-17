import type { NextConfig } from "next";

// Laser- og PRP-sidene er tatt ned (utstyret er ikke i klinikken lenger).
// Sidene lå indeksert i Google, så gamle treff sendes til behandlingsoversikten
// i stedet for 404. Midlertidig redirect (307) — hvis tilbudet kommer tilbake
// kan sidene gjenopprettes uten at en 301 ligger cachet hos søkemotorene.
const FJERNEDE_BEHANDLINGER = [
  "aknebehandling-laser",
  "blodkarbehandling-laser",
  "harfjerning-laser",
  "leppelaser",
  "oyelokk-laser",
  "rosacea-behandling-laser",
  "prp-behandling",
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Produktbilder serveres fra Shopify CDN når katalogen styres derfra
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
  async redirects() {
    return FJERNEDE_BEHANDLINGER.map((slug) => ({
      source: `/behandlinger/${slug}`,
      destination: "/behandlinger",
      permanent: false,
    }));
  },
};

export default nextConfig;
