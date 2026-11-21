import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service/ServiceDetail";
import { CtaBand } from "@/components/sections/shared";
import { getService, isPageVisible } from "@/lib/content";

/** Notary page. Content lives in src/content/services.ts (slug "notary-services"). */
export const metadata: Metadata = {
  title: "Notary Services",
  description:
    "Notarial acts performed as permitted by an active notary commission. A notary verifies identity and witnesses signatures, and does not give legal advice.",
  alternates: { canonical: "/notary" },
};

export default function NotaryPage() {
  const s = getService("notary-services");
  if (!s || !isPageVisible("notary")) notFound();

  return (
    <>
      <ServiceDetail
        icon={s.icon}
        title={s.title}
        status={s.status}
        summary={s.summary}
        description={s.description}
        includes={s.includes}
        eligibility={s.eligibility}
        limitations={s.limitations}
        faqs={s.faqs}
        cta={{ label: "Request an appointment", href: "/contact?service=notary-services" }}
      />
      <CtaBand />
    </>
  );
}
