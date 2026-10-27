import { describe, expect, it, vi } from "vitest";
import { deliverQuote, quoteSchema } from "@/lib/quote-delivery.server";

const quote = { name: "Test Client", email: "client@example.com", phone: "321-555-0100", service: "Computer Repair", message: "My laptop needs repair." };

describe("Web3Forms quote delivery", () => {
  it("forwards client contact details and technical help to Web3Forms", async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ success: true }));
    const result = await deliverQuote(quote, "test-only", send);
    expect(send.mock.calls[0]?.[0]).toBe("https://api.web3forms.com/submit");
    const payload = JSON.parse(String(send.mock.calls[0]?.[1]?.body));
    expect(payload).toMatchObject({ name: "Test Client", email: "client@example.com", phone: "321-555-0100", service_needed: "Computer Repair", message: "My laptop needs repair." });
    expect(result.accepted).toBe(true);
  });
  it("does not report success when the provider refuses delivery", async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ success: false }, { status: 200 }));
    expect((await deliverQuote(quote, "test-only", send)).accepted).toBe(false);
  });
  it("rejects a quote without valid client contact details", () => {
    expect(quoteSchema.safeParse({ ...quote, email: "invalid" }).success).toBe(false);
  });
});