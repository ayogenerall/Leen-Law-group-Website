import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, CtaBand } from "@/components/sections/shared";
import { Eyebrow, PlumeDivider } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type AnyIcon } from "@/components/ui/Icon";
import { businessProfile, verified } from "@/content/business-profile";
import { isPreview } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Leen Law Group's approach: organization, transparency, and informed next steps, with clear boundaries and referrals to licensed professionals when needed.",
  alternates: { canonical: "/about" },
};

const pillars: { icon: AnyIcon; title: string; body: string }[] = [
  {
    icon: "compass",
    title: "Our approach",
    body: "We help clients understand the administrative process, organize relevant records, and identify the next informed step, one clear stage at a time.",
  },
  {
    icon: "folder",
    title: "Organization & transparency",
    body: "Records are kept orderly, and you receive the scope, exclusions, fees, and timing in writing before any work begins. No hidden steps, no surprise charges.",
  },
  {
    icon: "person",
    title: "Consumer-support philosophy",
    body: "Clients stay informed and in control. Correspondence is based on your facts and approved by you, and we never promise outcomes we can't deliver.",
  },
  {
    icon: "document",
    title: "Administrative support model",
    body: "Our work is administrative: organizing, preparing client-reviewed materials, tracking, and coordinating. It is not legal advice or legal representation.",
  },
  {
    icon: "referral",
    title: "Professional referral boundaries",
    body: "When a matter calls for a licensed attorney, tax professional, or other qualified provider, we tell you plainly and help you find the right one.",
  },
];

function Field({ label, value }: { label: string; value: string | null }) {
  if (value) return <>{value}</>;
  if (!isPreview) return null;
  return (
    <span className="inline-block border border-dashed border-amber-400/70 px-2 py-0.5 text-sm text-amber-300">
      [{label}: pending owner verification]
    </span>
  );
}

export default function AboutPage() {
  const name = verified(businessProfile.founderName);
  const title = verified(businessProfile.founderTitle);
  const bio = verified(businessProfile.founderBio);

  return (
    <>
      <PageHero
        eyebrow="About Leen Law Group"
        title={
          <>
            Built on a simple idea: <em className="text-logo-gold">clarity should be accessible.</em>
          </>
        }
        intro="People and small businesses should be able to access clear information and practical administrative support when navigating complex processes."
      />

      <section aria-labelledby="story-title" className="surface-light section-y bg-ivory text-ink">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <span aria-hidden="true" className="absolute -right-4 -top-4 h-full w-full border border-[#7d6518]/50" />
              <div className="relative aspect-[4/5] overflow-hidden bg-linen">
                <Image
                  src="/images/founder-portrait.jpg"
                  alt="The founder of Leen Law Group in a white blazer, standing with arms crossed"
                  fill
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="object-cover object-[50%_22%]"
                />
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:pt-8">
            <Reveal>
              <Eyebrow className="mb-6">Our story</Eyebrow>
              <h2 id="story-title" className="t-h2">
                Organization, transparency, and informed next steps.
              </h2>
              <div className="prose-leen mt-8 text-[1.0625rem] text-slate">
                <p>
                  Leen Law Group was developed around a simple idea: people and small businesses should be able to access clear information
                  and practical administrative support when navigating complex processes.
                </p>
                <p>
                  Our approach emphasizes organization, transparency, and informed next steps. We help clients understand the administrative
                  process, organize relevant records, and identify when a matter should be referred to a licensed attorney, tax
                  professional, or other qualified provider.
                </p>
              </div>
            </Reveal>

            {(name || isPreview) && (
            <Reveal className="mt-12 border-t border-ink/12 pt-10">
              <p className="t-eyebrow">Founder</p>
              {(name || isPreview) && (
                <p className="mt-4 font-serif text-3xl">
                  <Field label="Founder name" value={name} />
                </p>
              )}
              {(title || isPreview) && (
                <p className="mt-2 text-[0.9375rem] font-semibold text-deep-teal">
                  <Field label="Approved professional title" value={title} />
                </p>
              )}
              {name && (
                <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-slate">
                  {name} is not a licensed attorney. Leen Law Group does not provide legal advice or legal representation.
                </p>
              )}
              {(bio || isPreview) && (
                <div className="mt-5 max-w-[60ch] text-[0.9375rem] leading-relaxed text-slate">
                  <Field label="Verified biography" value={bio} />
                </div>
              )}
            </Reveal>
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="section-y bg-obsidian">
        <div className="container-x">
          <Reveal className="max-w-3xl">
            <Eyebrow className="mb-5">How we work</Eyebrow>
            <h2 id="principles-title" className="t-h2">
              The principles behind every engagement
            </h2>
          </Reveal>
          <PlumeDivider className="mt-12" />
          <ul className="mt-4 grid gap-x-12 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 90} className="flex gap-6 border-b border-graphite py-10">
                <Icon name={p.icon} className="h-7 w-7 shrink-0 text-logo-gold" strokeWidth={1.3} />
                <div>
                  <h3 className="t-h3">{p.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="name-title" className="surface-light bg-linen py-16 text-ink lg:py-20">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 id="name-title" className="t-h3">
              A note about our name
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-slate">
              Although our name includes the words “Law Group,” Leen Law Group is not a law firm. We do not employ attorneys to represent
              clients, and we do not provide legal advice or legal representation. Our services are administrative, consumer-support, and
              business-support services.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
