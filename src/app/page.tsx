import { CapabilityStrip, Hero, Introduction, ServicesOverview, WhoWeHelp, WhyLeen } from "@/components/sections/home";
import { CtaBand, Process } from "@/components/sections/shared";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading, TextLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { DisclosurePanel } from "@/components/layout/Disclosures";
import { getFeaturedFaqs } from "@/lib/content";
import { site } from "@/lib/site";
import { businessProfile, verified } from "@/content/business-profile";

export default function HomePage() {
  const faqs = getFeaturedFaqs().slice(0, 6);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/leen-logo-gold.png`,
    description: site.description,
    ...(verified(businessProfile.founderName) && {
      founder: { "@type": "Person", name: verified(businessProfile.founderName), jobTitle: verified(businessProfile.founderTitle) ?? undefined },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <CapabilityStrip />
      <Introduction />
      <ServicesOverview />
      <WhoWeHelp />
      <Process />
      <WhyLeen />

      <section aria-labelledby="faq-title" className="surface-light section-y bg-ivory text-ink">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="faq-title" eyebrow="Questions" title="Frequently asked questions" />
            <div className="mt-8">
              <TextLink href="/faq" light>
                See all FAQs
              </TextLink>
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <Accordion items={faqs} light />
          </Reveal>
        </div>
      </section>

      <CtaBand />

      <section aria-label="Professional disclosures" className="bg-obsidian py-16 lg:py-20">
        <div className="container-x">
          <DisclosurePanel />
        </div>
      </section>
    </>
  );
}
