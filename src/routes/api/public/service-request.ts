import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const payloadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(30).optional().default(""),
  service: z.string().trim().min(1, "Choose a service").max(80),
  message: z.string().trim().min(1, "Please describe what you need").max(2000),
});

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

        const parsed = payloadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Please check your details and try again." },
            { status: 400 },
          );
        }

        const { name, email, phone, service, message } = parsed.data;

        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(
          process.env["VITE_SUPABASE_URL"]!,
          process.env["VITE_SUPABASE_PUBLISHABLE_KEY"]!,
          { auth: { persistSession: false } },
        );

        const { error } = await supabase.from("service_requests").insert({
          name,
          email,
          phone: phone === "" ? null : phone,
          service_needed: service,
          message,
        });

        if (error) {
          console.error("service_request insert failed:", error.message);
          return Response.json(
            { error: "Something went wrong. Please call or email us instead." },
            { status: 500 },
          );
        }

        return Response.json({ success: true });
      },
    },
  },
});
