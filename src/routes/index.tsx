import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Phone, Mail, ArrowRight, Sparkles, CheckCircle2, Send } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { OurServices } from "@/components/our-services";
import { ClientReviews } from "@/components/client-reviews";
import { reviewsQueryOptions } from "@/lib/reviews-query";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(reviewsQueryOptions),
  head: () => ({
    meta: [
      { title: "WOOD-JAY TECH & MULTI SERVICES | IT, Web & Cybersecurity" },
      { name: "description", content: "IT support, networking, databases, web development, software engineering, business cybersecurity and computer repair. Call 321-247-1251." },
      { property: "og:title", content: "WOOD-JAY TECH & MULTI SERVICES" },
      { property: "og:description", content: "Your all-in-one tech partner: IT support, networking, web, software, cybersecurity and repair." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PHONE = "321-247-1251";
const EMAIL = "herbywoodl@gmail.com";

const SERVICE_OPTIONS = [
  "IT Support",
  "Networking",
  "Database",
  "Web Development",
  "Software Engineering",
  "Cybersecurity for Business",
  "Computer Repair",
  "Something else",
];

function ServiceRequestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/mjyyjgaq", {
        method: "POST",
        headers: { "Accept": "application/json",
                  "Content-Type": "application/json"},
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          service: data.get("service"),
          message: data.get("message"),
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please call or email us instead.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-10 rounded-2xl border border-c4/40 bg-c4/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-c4" />
        <h3 className="mt-3 text-2xl font-bold">Request received!</h3>
        <p className="mt-2 text-muted-foreground">
          Thanks for reaching out — we'll get back to you shortly. For anything urgent, call or text {PHONE}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-bold text-c1 underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  const fieldClass = "w-full rounded-xl border bg-background/60 px-4 py-2.5 text-sm outline-none transition focus:border-c1 focus:ring-2 focus:ring-c1/30";

  return (
    <form onSubmit={handleSubmit} className="mt-10 rounded-2xl border bg-card/60 p-6 md:p-8">
      <h3 className="text-2xl font-bold">Request a <span className="text-gradient">free quote</span></h3>
      <p className="mt-1 text-sm text-muted-foreground">Tell us what you need help with and we'll get back to you.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Name</span>
          <input name="name" required maxLength={100} placeholder="Your name" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Email</span>
          <input name="email" type="email" required maxLength={255} placeholder="you@example.com" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Phone (optional)</span>
          <input name="phone" type="tel" maxLength={30} placeholder="Your phone number" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Service needed</span>
          <select name="service" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Choose a service…</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold">How can we help?</span>
          <textarea name="message" required maxLength={2000} rows={4} placeholder="Describe the technical help you need…" className={fieldClass} />
        </label>
      </div>
      {error && <p className="mt-3 text-sm font-semibold text-c2">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-bold text-primary-foreground shadow-lg transition hover:scale-105 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send request"}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="font-display text-lg font-extrabold tracking-tight">
            <span className="text-gradient">WOOD-JAY</span> TECH
          </a>
          <a href={`tel:${PHONE}`} className="flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-bold text-primary-foreground">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </div>
      </header>

      <section id="top" className="relative">
        <img src={hero} alt="Colorful servers, laptop and security shield" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-5 py-28 md:py-40">
          <span className="inline-flex items-center gap-2 rounded-full border border-c3/50 bg-c3/10 px-3 py-1 text-sm font-semibold text-c3">
            <Sparkles className="h-4 w-4" /> Tech & Multi Services
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-tight md:text-7xl">
            <span className="text-gradient">WOOD-JAY</span> TECH & MULTI SERVICES
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Your all-in-one technology partner — from fixing your computer to securing and building your business online.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-bold text-primary-foreground shadow-lg transition hover:scale-105">
              Get a free quote <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services" className="rounded-full border border-c1/60 px-6 py-3 font-bold text-c1 transition hover:bg-c1/10">
              Our services
            </a>
          </div>
        </div>
      </section>

      <OurServices />

      <section className="border-y bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 text-center sm:grid-cols-3">
          {[["Fast", "Same-day response", "text-c1"], ["Trusted", "Honest, fair pricing", "text-c2"], ["Secure", "Business-grade protection", "text-c4"]].map(([a, b, c]) => (
            <div key={a}><div className={`font-display text-4xl font-extrabold ${c}`}>{a}</div><div className="mt-1 text-muted-foreground">{b}</div></div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
        <div className="rounded-3xl bg-gradient-brand p-[2px]">
          <div className="rounded-3xl bg-background p-8 md:p-14">
            <h2 className="text-4xl font-extrabold md:text-5xl">Let's <span className="text-gradient">talk tech</span></h2>
            <p className="mt-3 text-muted-foreground">Call, text or email for a free consultation.</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <a href={`tel:${PHONE}`} className="flex items-center gap-4 rounded-2xl border border-c1/40 bg-c1/10 p-6 transition hover:scale-[1.02]">
                <Phone className="h-8 w-8 text-c1" />
                <div><div className="text-sm text-muted-foreground">Call or text</div><div className="text-2xl font-bold">{PHONE}</div></div>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 rounded-2xl border border-c2/40 bg-c2/10 p-6 transition hover:scale-[1.02]">
                <Mail className="h-8 w-8 text-c2" />
                <div className="min-w-0"><div className="text-sm text-muted-foreground">Email</div><div className="truncate text-2xl font-bold">{EMAIL}</div></div>
              </a>
            </div>
            <ServiceRequestForm />
          </div>
        </div>
      </section>

      <ClientReviews />

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} WOOD-JAY TECH & MULTI SERVICES · {PHONE} · {EMAIL}
      </footer>
    </div>
  );
}
