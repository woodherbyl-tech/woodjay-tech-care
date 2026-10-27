import { createFileRoute } from "@tanstack/react-router";

// Public endpoint: the handler verifies and validates everything itself —
// /api/public/* bypasses site auth, so nothing here may trust the caller.
export const Route = createFileRoute("/api/public/service-request")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }

        const { quoteSchema, deliverQuote } = await import("@/lib/quote-delivery.server");
        const parsed = quoteSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Please check your details and try again." },
            { status: 400 },
          );
        }

        const accessKey = process.env["WEB3FORMS_ACCESS_KEY"];
        if (!accessKey) {
          return Response.json(
            { error: "Quote delivery is temporarily unavailable. Please email herbywoodl@gmail.com." },
            { status: 503 },
          );
        }
        try {
          const result = await deliverQuote(parsed.data, accessKey);
          if (!result.accepted) {
            console.error("Quote email provider rejected submission", { status: result.status });
            return Response.json(
              { error: "Your request could not be emailed. Please try again or email herbywoodl@gmail.com." },
              { status: 502 },
            );
          }
          return Response.json({ success: true });
        } catch {
          return Response.json(
            { error: "Email delivery could not be confirmed. Please email herbywoodl@gmail.com." },
            { status: 502 },
          );
        }
      },
    },
  },
});
