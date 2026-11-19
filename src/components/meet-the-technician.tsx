import { ArrowRight, BadgeCheck, Network, ShieldCheck, Wrench } from "lucide-react";
const ownerPortrait = { url: "/WhatsApp%20Image%202026-11-07%20at%201.04.47%20PM.jpeg"
};
const ownerWorkshop = { url: "/WhatsApp%20Image%202026-11-07%20at%201.18.22%20PM.jpeg"
};
const PHONE = "321-247-1251";
export function MeetTheTechnician() {
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden border-y bg-muted/20">
      <img
        src={ownerWorkshop.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-[1.05fr_1fr]">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-c1/50 bg-c1/10 px-3 py-1 text-sm font-semibold text-c1">
            <BadgeCheck className="h-4 w-4" aria-hidden="true" /> Meet your technician
          </span>
          <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
            You work directly with <span className="text-gradient">Wood Herby</span>, the owner
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I'm Wood Herby Levasseur — owner and lead technician of WOOD-JAY TECH &amp; MULTI
            SERVICES. When you call, you talk to me, and I'm the one who does the work.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            <li className="rounded-2xl border border-c1/40 bg-c1/10 p-5">
              <Network className="h-6 w-6 text-c1" aria-hidden="true" />
              <h3 className="mt-3 font-bold">On the network side</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Server rooms, cabling, switches and monitoring — set up and tested.
              </p>
            </li>
            <li className="rounded-2xl border border-c2/40 bg-c2/10 p-5">
              <Wrench className="h-6 w-6 text-c2" aria-hidden="true" />
              <h3 className="mt-3 font-bold">At the repair bench</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Laptops and desktops opened, diagnosed and repaired by hand.
              </p>
            </li>
          </ul>
          <a
            href={`tel:${PHONE}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-bold text-primary-foreground shadow-lg transition hover:scale-105 motion-reduce:transform-none"
          >
            Talk to me: {PHONE} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="relative min-w-0">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 rounded-2xl border border-c1/40 bg-card p-2 shadow-xl">
              <img
                src={ownerPortrait.url}
                alt="WOOD-JAY owner Wood Herby Levasseur holding a network cable tester in front of a server rack"
                width={1086}
                height={1448}
                className="h-[380px] w-full rounded-xl object-cover object-top sm:h-[520px]"
              />
            </div>
            <div className="col-span-2 flex min-w-0 flex-col gap-4">
              <div className="rounded-2xl border border-c3/40 bg-card p-2 shadow-xl">
                <img
                  src={ownerWorkshop.url}
                  alt="Wood Herby Levasseur at a computer repair bench with open laptops, tools and test equipment"
                  width={1024}
                  height={1024}
                  className="aspect-square w-full rounded-xl object-cover"
                />
              </div>
              <div className="rounded-2xl border border-c4/40 bg-c4/10 p-4 text-center">
                <ShieldCheck className="mx-auto h-6 w-6 text-c4" aria-hidden="true" />
                <p className="mt-2 text-sm font-bold">Owner-led, every job</p>
                <p className="mt-1 text-xs text-muted-foreground">Same person from quote to finish.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
