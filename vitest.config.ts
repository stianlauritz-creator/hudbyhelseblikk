import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/__tests__/**/*.test.ts"],
  },
  resolve: {
    // Samme «@»-alias som Next bruker, slik at lib-filer kan importere
    // hverandre med @/... også under test.
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
});
