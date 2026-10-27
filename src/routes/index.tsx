import { createFileRoute } from "@tanstack/react-router";
import { Headset, Network, Database, Code2, Cpu, ShieldCheck, Wrench, Phone, Mail, ArrowRight, Sparkles } from "lucide-react";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
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

const services = [
  { icon: Headset, title: "IT Support", text: "Fast, friendly help desk and on-site support to keep your team running.", color: "text-c1 bg-c1/15 border-c1/40" },
  { icon: Network, title: "Networking", text: "Wi‑Fi, routers, switches and cabling designed for speed and reliability.", color: "text-c2 bg-c2/15 border-c2/40" },
  { icon: Database, title: "Database", text: "Design, setup, backups and tuning so your data is safe and fast.", color: "text-c3 bg-c3/15 border-c3/40" },
  { icon: Code2, title: "Web Development", text: "Modern, mobile-friendly websites that win you customers.", color: "text-c4 bg-c4/15 border-c4/40" },
  { icon: Cpu, title: "Software Engineering", text: "Custom apps and tools built around how your business works.", color: "text-c5 bg-c5/15 border-c5/40" },
  { icon: ShieldCheck, title: "Cybersecurity for Business", text: "Firewalls, threat protection, audits and staff training.", color: "text-c6 bg-c6/15 border-c6/40" },
  { icon: Wrench, title: "Computer Repair", text: "Laptops and desktops: virus removal, upgrades, screens and more.", color: "text-c7 bg-c7/15 border-c7/40" },
];

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

      <section id="services" className="mx-auto max-w-6xl px-5 py-24">
        <h2 className="text-4xl font-extrabold md:text-5xl">What we <span className="text-gradient">do best</span></h2>
        <p className="mt-3 text-muted-foreground">Professional solutions for homes and businesses.</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className={`group rounded-2xl border bg-card p-6 transition hover:-translate-y-1 ${s.color.split(" ").pop()}`}>
              <div className={`inline-flex rounded-xl border p-3 ${s.color}`}>
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          ))}
          <a href="#contact" className="flex flex-col justify-center rounded-2xl bg-gradient-brand p-6 text-primary-foreground transition hover:-translate-y-1">
            <h3 className="text-2xl font-extrabold">Need something else?</h3>
            <p className="mt-2 font-semibold">Ask us — we handle it all. →</p>
          </a>
        </div>
      </section>

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
          </div>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} WOOD-JAY TECH & MULTI SERVICES · {PHONE} · {EMAIL}
      </footer>
    </div>
  );
}
