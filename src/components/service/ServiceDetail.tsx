import { Icon, type AnyIcon } from "@/components/ui/Icon";
import { ButtonLink, Eyebrow, PreviewBadge } from "@/components/ui/primitives";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { statusLabel } from "@/lib/content";
import type { Faq, PublishStatus } from "@/content/types";

/** Reusable service-detail layout. Limitations are ALWAYS shown. */
export function ServiceDetail({
  icon,
  title,
  summary,
  status,
  description,
  includes,
  includesHeading = "What this may include",
  eligibility,
  limitations,
  faqs,
  cta,
  children,
}: {
  icon: AnyIcon;
  title: string;
  summary: string;
  status?: PublishStatus;
  description: string[];
  includes: string[];
  includesHeading?: string;
  eligibility?: string[];
  limitations: string[];
  faqs?: Faq[];
  cta: { label: string; href: string };
  children?: React.ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-obsidian pb-16 pt-36 lg:pb-24 lg:pt-48">
        <div className="bg-plume pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <div className="flex flex-wrap items-center gap-4">
            <Eyebrow>Service</Eyebrow>
            {status && status !== "published" && <PreviewBadge status={statusLabel[status]} />}
          </div>
          <div className="mt-7 flex items-start gap-6">
            <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-champagne/50 text-logo-gold sm:flex">
              <Icon name={icon} className="h-7 w-7" strokeWidth={1.3} />
            </span>
            <div>
              <h1 className="t-h1 max-w-4xl">{title}</h1>
              <p className="t-lead mt-6 max-w-2xl text-mist">{summary}</p>
              <div className="mt-9">
                <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
              </div>
            </div>
          </div>
        </div>
        <div className="hairline-gold absolute inset-x-0 bottom-0 opacity-40" aria-hidden="true" />
      </section>

      <section className="surface-light section-y bg-ivory text-ink">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="t-h2">Overview</h2>
              <div className="prose-leen mt-6 text-[1.0625rem] text-slate">
                {description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal className="mt-14">
              <h2 className="t-h2">{includesHeading}</h2>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {includes.map((x) => (
                  <li key={x} className="flex gap-3 border border-ink/10 bg-white p-5 text-[0.9375rem] leading-relaxed">
                    <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-deep-teal" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            {eligibility && eligibility.length > 0 && (
              <Reveal className="mt-14">
                <h2 className="t-h2">Who this is for</h2>
                <ul className="prose-leen mt-6 text-slate">
                  {eligibility.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </Reveal>
            )}
            {children}
          </div>

          <aside className="lg:col-span-5" aria-labelledby="limits-title">
            <div className="lg:sticky lg:top-32">
              <div className="border border-ink/15 bg-white p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <Icon name="shield" className="h-6 w-6 text-[#7d6518]" />
                  <h2 id="limits-title" className="t-h3">
                    Limitations
                  </h2>
                </div>
                <ul className="mt-6 space-y-4">
                  {limitations.map((l) => (
                    <li key={l} className="flex gap-3 text-[0.9375rem] leading-relaxed text-slate">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-[#7d6518]" />
                      {l}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 border-t border-ink/10 pt-6 text-sm leading-relaxed text-slate">
                  Leen Law Group is not a law firm and does not provide legal advice or representation. Your written scope controls
                  what is and is not included.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {faqs && faqs.length > 0 && (
        <section aria-labelledby="svc-faq" className="surface-light bg-linen pb-20 pt-4 text-ink lg:pb-28">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <h2 id="svc-faq" className="t-h2 lg:col-span-4">
              Questions about this service
            </h2>
            <div className="lg:col-span-8">
              <Accordion light items={faqs.map((f, i) => ({ id: `f${i}`, ...f }))} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
