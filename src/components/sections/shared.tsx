import Image from "next/image";
import { ButtonLink, Eyebrow, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export const processSteps = [
  { n: "01", title: "Submit Your Request", body: "Tell us what administrative assistance you need using our short request form. Please don't include sensitive documents or numbers." },
  { n: "02", title: "Service Review", body: "We review whether your inquiry fits our service scope and jurisdiction, and tell you plainly if a licensed professional is the better fit." },
  { n: "03", title: "Scope & Fees", body: "You receive the proposed service scope, exclusions, fees, and timing in writing before any work begins." },
  { n: "04", title: "Secure Documentation", body: "Only the documents needed for the agreed service are collected, through an appropriate secure channel." },
  { n: "05", title: "Administrative Support", body: "We complete the agreed work, or direct you to an appropriate professional when a matter is outside our scope." },
];

export function Process({ id = "how-it-works" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y relative overflow-hidden bg-obsidian">
      <div className="bg-plume pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            id={`${id}-title`}
            eyebrow="How it works"
            title={
              <>
                A clear process, <em className="text-logo-gold">in writing</em>, before any work begins.
              </>
            }
          />
        </Reveal>

        <Reveal as="div" className="relative mt-16">
          {/* connector line: vertical on mobile, horizontal on desktop */}
          <span aria-hidden="true" className="draw-line absolute bottom-6 left-[1.6rem] top-6 w-px bg-gradient-to-b from-champagne/70 via-turquoise/50 to-transparent lg:hidden" />
          <span aria-hidden="true" className="draw-line-x absolute left-0 right-0 top-[1.6rem] hidden h-px bg-gradient-to-r from-champagne/70 via-turquoise/50 to-transparent lg:block" />
          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {processSteps.map((s, i) => (
              <li key={s.n} className="relative flex gap-6 lg:block">
                <span className="relative z-10 flex h-[3.2rem] w-[3.2rem] shrink-0 items-center justify-center rounded-full border border-champagne/60 bg-obsidian font-serif text-xl text-logo-gold">
                  {s.n}
                </span>
                <div className="lg:mt-7" style={{ transitionDelay: `${i * 80}ms` }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-turquoise">Step {s.n}</p>
                  <h3 className="t-h3 mt-2">{s.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand({
  title = (
    <>
      Ready to organize your <em className="text-logo-gold">next step?</em>
    </>
  ),
  body = "Tell us what you need help with. We'll review whether it fits our administrative scope and, if it does, send you a written scope, fees, and timing before any work begins.",
}: {
  title?: React.ReactNode;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-y border-champagne/20 bg-charcoal">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_100%_50%,rgba(32,184,176,0.18),transparent_60%)]" aria-hidden="true" />
      <Image
        src="/brand/leen-emblem-gold.webp"
        alt=""
        width={400}
        height={401}
        className="pointer-events-none absolute -right-10 top-1/2 hidden h-[130%] w-auto -translate-y-1/2 opacity-[0.06] md:block"
      />
      <div className="container-x relative flex flex-col gap-10 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28">
        <Reveal className="max-w-2xl">
          <Eyebrow className="mb-5">Request support</Eyebrow>
          <h2 id="cta-title" className="t-h1">
            {title}
          </h2>
          <p className="t-lead mt-6 text-mist">{body}</p>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/contact">Request Support</ButtonLink>
          <ButtonLink href="/faq" variant="secondary" arrow={false}>
            Read the FAQ
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/** Inner-page hero */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-obsidian pb-16 pt-36 lg:pb-24 lg:pt-48">
      <div className="bg-plume pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <h1 className="t-h1 max-w-4xl">{title}</h1>
        {intro && <div className="t-lead mt-7 max-w-2xl text-mist">{intro}</div>}
        {children}
      </div>
      <div className="hairline-gold absolute inset-x-0 bottom-0 opacity-40" aria-hidden="true" />
    </section>
  );
}
