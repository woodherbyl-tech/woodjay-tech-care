import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().default(""),
  service: z.string().trim().min(1).max(80),
  message: z.string().trim().min(1).max(2000),
});

export async function deliverQuote(
  quote: z.infer<typeof quoteSchema>,
  accessKey: string,
  send: typeof fetch = fetch,
) {
  const response = await send("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: "New free quote request — WOOD-JAY TECH & MULTI SERVICES",
      from_name: "WOOD-JAY TECH & MULTI SERVICES",
      name: quote.name,
      email: quote.email,
      phone: quote.phone,
      service_needed: quote.service,
      message: quote.message,
    }),
    signal: AbortSignal.timeout(20000),
  });
  const result: unknown = await response.json().catch(() => null);
  const accepted = response.ok && typeof result === "object" && result !== null &&
    "success" in result && result.success === true;
  // Never expose upstream bodies: a provider may echo credentials or client details.
  return { accepted, status: response.status };
}