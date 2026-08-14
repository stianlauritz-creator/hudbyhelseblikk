// Shopify Admin API. Tilgang skjer med client credentials-grant: klient-ID og
// -hemmelighet byttes inn i et token som varer ~24 timer. Tokenet mellomlagres
// i modulminnet slik at vi ikke veksler ved hvert kall.

const API_VERSION = "2026-07";

let bufretToken: { verdi: string; utloeper: number } | null = null;

export function adminKonfigurert(): boolean {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      process.env.SHOPIFY_CLIENT_ID &&
      process.env.SHOPIFY_CLIENT_SECRET
  );
}

async function hentToken(): Promise<string> {
  const naa = Date.now();
  if (bufretToken && bufretToken.utloeper > naa + 60_000) {
    return bufretToken.verdi;
  }

  const domene = process.env.SHOPIFY_STORE_DOMAIN;
  const res = await fetch(`https://${domene}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    // Ikke logg kroppen — den kan inneholde legitimasjon
    throw new Error(`Shopify token-utveksling feilet: HTTP ${res.status}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };
  bufretToken = {
    verdi: data.access_token,
    utloeper: naa + data.expires_in * 1000,
  };
  return data.access_token;
}

export async function adminGraphql<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!adminKonfigurert()) {
    throw new Error("Shopify Admin er ikke konfigurert (mangler miljøvariabler)");
  }

  const token = await hentToken();
  const domene = process.env.SHOPIFY_STORE_DOMAIN;

  const res = await fetch(
    `https://${domene}/admin/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Shopify Admin API: HTTP ${res.status}`);
  }

  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) {
    throw new Error(
      `Shopify Admin API: ${JSON.stringify(json.errors).slice(0, 300)}`
    );
  }
  if (!json.data) {
    throw new Error("Shopify Admin API: tomt svar");
  }
  return json.data;
}
