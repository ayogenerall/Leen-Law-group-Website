import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service/ServiceDetail";
import { CtaBand } from "@/components/sections/shared";
import { getService, getServices, isPreview } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

// Only visible services are pre-rendered; anything else 404s.
export function generateStaticParams() {
  return getServices()
    .filter((s) => !s.pageHref)
    .map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
    robots: s.status !== "published" || isPreview ? { index: false, follow: false } : undefined,
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s || s.pageHref) notFound();

  return (
    <>
      <ServiceDetail
        icon={s.icon}
        title={s.title}
        summary={s.summary}
        status={s.status}
        description={s.description}
        includes={s.includes}
        eligibility={s.eligibility}
        limitations={s.limitations}
        faqs={s.faqs}
        cta={s.cta}
      />
      <CtaBand />
    </>
  );
}
