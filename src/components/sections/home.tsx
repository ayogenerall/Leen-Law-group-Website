import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Eyebrow, SectionHeading, TextLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type AnyIcon } from "@/components/ui/Icon";
import { ServiceCard } from "@/components/service/ServiceCard";
import { getServices, serviceHref } from "@/lib/content";

/* HERO */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-obsidian">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_78%_38%,rgba(32,184,176,0.20),transparent_62%),radial-gradient(ellipse_35%_45%_at_8%_100%,rgba(217,188,86,0.07),transparent_70%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[linear-gradient(90deg,var(--color-obsidian),transparent_40%)] lg:block" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-14 pb-20 pt-32 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-28">
        <div className="lg:col-span-7">
          <Eyebrow className="mb-7">Consumer support &amp; business administration</Eyebrow>
          <h1 id="hero-title" className="t-display">
            <span className="hero-line block" style={{ "--d": "80ms" } as React.CSSProperties}>Practical Support.</span>
            <span className="hero-line block" style={{ "--d": "220ms" } as React.CSSProperties}>Clear Direction.</span>
            <span className="hero-line block italic text-logo-gold" style={{ "--d": "360ms" } as React.CSSProperties}>
              Organized Next Steps.
            </span>
          </h1>
          <p className="hero-line t-lead mt-8 max-w-xl text-ivory/80" style={{ "--d": "520ms" } as React.CSSProperties}>
            Leen Law Group offers consumer-support and business-administration services to help individuals and entrepreneurs
            organize records, navigate administrative processes, and connect with appropriate professional resources.
          </p>
          <div className="hero-line mt-10 flex flex-col gap-4 sm:flex-row" style={{ "--d": "640ms" } as React.CSSProperties}>
            <ButtonLink href="/contact">Request Support</ButtonLink>
            <ButtonLink href="/services" variant="secondary" arrow={false}>
              Explore Our Services
            </ButtonLink>
          </div>
          <p className="hero-line mt-8 text-[0.8125rem] leading-relaxed text-mist" style={{ "--d": "760ms" } as React.CSSProperties}>
            <Icon name="shield" className="mr-2 inline-block h-4 w-4 -translate-y-px align-middle text-champagne" />
            Administrative support, not a law firm.{" "}
            <Link href="/legal/disclaimer" className="text-ivory/85 underline underline-offset-4 hover:text-turquoise">
              See disclosures
            </Link>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:max-w-none">
          <Image
            src="/brand/leen-emblem-gold.webp"
            alt=""
            width={400}
            height={401}
            priority
            className="pointer-events-none absolute -right-8 -top-10 w-[85%] opacity-[0.08]"
          />
          <div className="hero-line relative" style={{ "--d": "300ms" } as React.CSSProperties}>
            <span aria-hidden="true" className="absolute -bottom-3 -left-3 h-full w-full border border-champagne/50 sm:-bottom-5 sm:-left-5" />
            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
              <Image
                src="/images/founder-portrait.jpg"
                alt="The founder of Leen Law Group standing with arms crossed, wearing a white blazer"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-[50%_25%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <span aria-hidden="true" className="absolute -right-3 top-10 h-24 w-px bg-turquoise" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* CAPABILITY STRIP */
const capabilities: { icon: AnyIcon; label: string; href: string }[] = [
  { icon: "folder", label: "Record organization", href: "/consumer-support" },
  { icon: "document", label: "Client-reviewed correspondence", href: "/consumer-support" },
  { icon: "clock", label: "Deadline tracking", href: "/consumer-support" },
  { icon: "briefcase", label: "Startup administration", href: "/business-startup" },
  { icon: "referral", label: "Professional referrals", href: "/faq#referrals" },
];

export function CapabilityStrip() {
  return (
    <section aria-label="What we help with" className="relative border-y border-graphite bg-charcoal">
      <ul className="container-x flex snap-x gap-0 overflow-x-auto py-1 [scrollbar-width:none] lg:justify-between">
        {capabilities.map((c, i) => (
          <li key={c.label} className="snap-start">
            <Link
              href={c.href}
              className={`group flex min-w-max items-center gap-3.5 px-5 py-6 transition-colors hover:text-turquoise lg:px-2 ${i > 0 ? "lg:border-l lg:border-graphite lg:pl-8" : ""}`}
            >
              <Icon name={c.icon} className="h-5 w-5 text-champagne transition-colors group-hover:text-turquoise" />
              <span className="text-sm font-semibold tracking-[0.01em]">{c.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* INTRODUCTION */
const principles: { icon: AnyIcon; title: string; body: string }[] = [
  { icon: "folder", title: "Organization", body: "Records, timelines, and correspondence brought into clear order." },
  { icon: "compass", title: "Transparency", body: "Scope, exclusions, fees, and timing in writing before work begins." },
  { icon: "referral", title: "Clear referrals", body: "Honest guidance on when a licensed attorney or tax professional is needed." },
];

export function Introduction() {
  return (
    <section aria-labelledby="intro-title" className="surface-light section-y bg-ivory text-ink">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <Eyebrow className="mb-6">About Leen Law Group</Eyebrow>
          <h2 id="intro-title" className="t-h2">
            Clear information and practical administrative support for complex processes.
          </h2>
          <p className="t-lead mt-7 text-slate">
            Leen Law Group was developed around a simple idea: people and small businesses should be able to access clear information
            and practical administrative support when navigating complex processes. Our approach emphasizes organization,
            transparency, and informed next steps.
          </p>
          <div className="mt-9">
            <TextLink href="/about" light>
              Learn more about our approach
            </TextLink>
          </div>
        </Reveal>
        <ul className="space-y-0 lg:col-span-5 lg:border-l lg:border-ink/12 lg:pl-12">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 90} className="flex gap-5 border-b border-ink/10 py-7 first:pt-0 last:border-0">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#7d6518]/40 text-[#7d6518]">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* SERVICES OVERVIEW */
export function ServicesOverview() {
  const services = getServices();
  return (
    <section aria-labelledby="services-title" className="section-y bg-obsidian">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHeading id="services-title" eyebrow="Our services" title="How we can support you" />
          </Reveal>
          <Reveal delay={100}>
            <TextLink href="/services">View all services</TextLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 3) * 80}>
              <ServiceCard href={serviceHref(s)} icon={s.icon} title={s.title} summary={s.summary} status={s.status} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* WHO WE HELP */
const audiences = [
  { title: "Individuals with account records to organize", body: "People who need help organizing consumer account records, notices, and correspondence." },
  { title: "Consumers reviewing their credit files", body: "People who believe information in a credit file or account record may be inaccurate and want their records in order." },
  { title: "People acting under a valid authorization", body: "Those who need administrative help communicating under a power of attorney or other accepted authorization." },
  { title: "Entrepreneurs and small-business owners", body: "Founders navigating startup paperwork, filings, and administrative setup." },
  { title: "Anyone who needs the right professional", body: "People who need a referral to a qualified attorney, tax preparer, or other specialist." },
];

export function WhoWeHelp() {
  return (
    <section aria-labelledby="who-title" className="surface-light section-y bg-linen text-ink">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="who-title" eyebrow="Who we help" title="Support for people and businesses with paperwork to untangle." />
          </div>
        </Reveal>
        <ol className="lg:col-span-8">
          {audiences.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 60} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ink/12 py-8 last:border-b sm:grid-cols-[5rem_1fr]">
              <span className="font-serif text-3xl text-[#7d6518] sm:text-4xl">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="t-h3">{a.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* WHY LEEN */
const commitments: { icon: AnyIcon; title: string; body: string }[] = [
  { icon: "document", title: "Written scope before work", body: "You see the scope, exclusions, fees, and timing in writing, and nothing begins until you agree." },
  { icon: "shield", title: "Only necessary documents", body: "We ask only for what the agreed service requires, through an appropriate secure channel, and never through a public form." },
  { icon: "check", title: "You review everything", body: "Correspondence is prepared from the facts you provide and is reviewed and approved by you before it is used." },
  { icon: "referral", title: "Honest referrals", body: "When a matter needs legal, tax, or other professional advice, we tell you, and help you find the right professional." },
];

export function WhyLeen() {
  return (
    <section aria-labelledby="why-title" className="section-y relative overflow-hidden bg-charcoal">
      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            id="why-title"
            eyebrow="Why choose Leen"
            title={
              <>
                Clear boundaries. <em className="text-logo-gold">Careful work.</em>
              </>
            }
            intro={<p className="text-mist">No promises we can't keep, just a transparent, organized process built around you.</p>}
          />
        </Reveal>
        <ul className="mt-14 grid gap-px overflow-hidden border border-graphite bg-graphite sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 80} className="bg-charcoal p-8 transition-colors duration-500 hover:bg-[#1c1f23]">
              <Icon name={c.icon} className="h-7 w-7 text-logo-gold" strokeWidth={1.3} />
              <h3 className="t-h3 mt-8">{c.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{c.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
