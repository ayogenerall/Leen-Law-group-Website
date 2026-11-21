import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/sections/shared";
import { ServiceFilter, type DirectoryItem } from "@/components/service/ServiceFilter";
import { DisclosurePanel } from "@/components/layout/Disclosures";
import { TextLink } from "@/components/ui/primitives";
import { getServices, serviceHref } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Administrative, consumer-support, and business-support services from Leen Law Group. Every service has a written scope and clear limitations. Not legal advice.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const services = getServices();
  const items: DirectoryItem[] = services.map((s) => ({
    href: serviceHref(s),
    title: s.title,
    summary: s.summary,
    icon: s.icon,
    category: s.category,
    status: s.status,
  }));

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Administrative support with a <em className="text-logo-gold">clearly defined scope.</em>
          </>
        }
        intro="Every engagement starts with a written description of what is included, what is not, the fee, and the timing. If your matter needs a licensed professional, we'll say so."
      />
      <section aria-label="Service directory" className="section-y bg-obsidian">
        <div className="container-x">
          <ServiceFilter items={items} />
          {services.length === 0 && (
            <div className="mt-12 flex flex-col gap-4 border-l-2 border-champagne/60 bg-charcoal px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-[0.9375rem] text-mist">
                Additional service lines are being finalized and will be listed here once they are confirmed. Not sure where your request
                fits? Send it anyway, and we'll tell you whether we can help.
              </p>
              <TextLink href="/contact">Request Support</TextLink>
            </div>
          )}
        </div>
      </section>
      <section className="bg-obsidian pb-20">
        <div className="container-x">
          <DisclosurePanel />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
