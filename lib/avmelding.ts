import { createHmac, timingSafeEqual } from "node:crypto";
import { SITE_URL } from "@/lib/site";

// Avmeldingslenker signeres slik at ingen kan melde av andres e-postadresse
// ved å gjette URL-en. Tokenet utløper ikke — en avmeldingslenke i en gammel
// e-post skal virke like godt om to år.

function noekkel(): string | null {
  return process.env.KLUBB_HEMMELIGHET || null;
}

export function lagAvmeldingstoken(epost: string): string | null {
  const n = noekkel();
  if (!n) return null;
  return createHmac("sha256", n)
    .update(epost.trim().toLowerCase())
    .digest("hex")
    .slice(0, 32);
}

export function sjekkAvmeldingstoken(epost: string, token: string): boolean {
  const forventet = lagAvmeldingstoken(epost);
  if (!forventet || !token || token.length !== forventet.length) return false;
  return timingSafeEqual(Buffer.from(forventet), Buffer.from(token));
}

/** Full avmeldings-URL, eller null hvis KLUBB_HEMMELIGHET ikke er satt. */
export function avmeldingsUrl(epost: string): string | null {
  const token = lagAvmeldingstoken(epost);
  if (!token) return null;
  const e = encodeURIComponent(epost.trim().toLowerCase());
  return `${SITE_URL}/api/avmelding?e=${e}&t=${token}`;
}
