import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { services } from "@/lib/services";

export function OurServices() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <h2 className="text-4xl font-extrabold md:text-5xl">Our <span className="text-gradient">Services</span></h2>
      <p className="mt-3 text-muted-foreground">Professional solutions for homes and businesses.</p>
      <div className="mt-12 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Dialog key={service.title}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                aria-label={`View Details: ${service.title}`}
                className={`group h-full min-h-72 w-full flex-col items-start justify-start gap-0 whitespace-normal rounded-lg bg-card p-6 text-left shadow-none transition duration-200 hover:-translate-y-1 hover:bg-muted hover:text-foreground motion-reduce:transform-none motion-reduce:transition-none ${service.borderClass}`}
              >
                <span className={`inline-flex rounded-lg border p-3 ${service.iconClass}`}>
                  <service.icon className="!size-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold leading-snug">{service.title}</h3>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{service.subtitle}</span>
                <span className={`mt-auto flex items-center gap-2 pt-6 text-sm font-bold ${service.accentClass}`}>
                  View Details <ArrowRight className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className={`max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-lg bg-card p-6 sm:p-8 motion-reduce:animate-none ${service.borderClass}`}>
              <DialogHeader className="text-left">
                <span className={`mb-4 inline-flex w-fit rounded-lg border p-3 ${service.iconClass}`}>
                  <service.icon className="size-7" aria-hidden="true" />
                </span>
                <DialogTitle className="pr-5 text-2xl leading-snug tracking-normal sm:text-3xl">{service.title}</DialogTitle>
                <DialogDescription className="pt-3 text-base leading-relaxed">{service.description}</DialogDescription>
              </DialogHeader>
              <div className="mt-3 border-t pt-5">
                <h4 className="text-sm font-bold">Services Provided</h4>
                <ul className="mt-4 space-y-4">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                      <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${service.accentClass}`} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}