import type { Metadata } from "next";
import { PageHero } from "@/components/sections/shared";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { DisclosurePanel } from "@/components/layout/Disclosures";
import { Icon } from "@/components/ui/Icon";
import { processSteps } from "@/components/sections/shared";
import { getServiceOptions } from "@/lib/service-options";
import { businessProfile, verified } from "@/content/business-profile";

export const metadata: Metadata = {
  title: "Request Support",
  description:
    "Request administrative support from Leen Law Group. Tell us what you need; we'll review fit and send a written scope, fees, and timing before any work begins.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const options = getServiceOptions();
  const defaultService = options.some((o) => o.value === service) ? service : undefined;
  const responseTime = verified(businessProfile.responseTime);
  const email = verified(businessProfile.email);

  return (
    <>
      <PageHero
        eyebrow="Request support"
        title={
          <>
            Tell us what you need. <em className="text-logo-gold">We'll take it from there.</em>
          </>
        }
        intro="Start with a short request. We'll review whether it fits our administrative scope and jurisdiction. If it does, you'll receive a written scope, fees, and timing before any work begins."
      />

      <section className="surface-light section-y bg-ivory text-ink">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <InquiryForm
              serviceOptions={options}
              defaultService={defaultService}
              turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || undefined}
            />
          </div>

          <aside className="space-y-6 lg:col-span-5 xl:col-span-4" aria-label="What happens next">
            <div className="border border-ink/12 bg-white p-7">
              <h2 className="t-h3">What happens next</h2>
              <ol className="mt-6 space-y-5">
                {processSteps.map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="font-serif text-2xl leading-none text-[#7d6518]">{s.n}</span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {responseTime && <p className="mt-6 border-t border-ink/10 pt-5 text-sm text-slate">We typically respond {responseTime}.</p>}
            </div>

            <div className="border border-ink/12 bg-white p-7">
              <h2 className="flex items-center gap-2.5 t-h3">
                <Icon name="alert" className="h-5 w-5 text-[#7d6518]" /> Urgent legal matters
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                If you have a court date, have been served with a lawsuit, or need legal advice, please contact a licensed attorney in your
                jurisdiction promptly. Your state bar association can provide referral information.
              </p>
            </div>

            {email && (
              <div className="border border-ink/12 bg-white p-7">
                <h2 className="t-h3">Email</h2>
                <a href={`mailto:${email}`} className="mt-2 inline-block font-semibold text-deep-teal underline underline-offset-4">
                  {email}
                </a>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="surface-light bg-ivory pb-20 text-ink">
        <div className="container-x">
          <DisclosurePanel light />
        </div>
      </section>
    </>
  );
}
