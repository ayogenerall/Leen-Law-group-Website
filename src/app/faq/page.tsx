import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/sections/shared";
import { Accordion } from "@/components/ui/Accordion";
import { getFaqs } from "@/lib/content";
import type { FaqGroup } from "@/content/types";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about Leen Law Group's administrative services, what we do and don't do, how requests work, secure documents, and when to contact a licensed attorney.",
  alternates: { canonical: "/faq" },
};

const order: FaqGroup[] = ["About Leen", "Services & scope", "Process", "Privacy & documents", "Professional referrals"];

export default function FaqPage() {
  const faqs = getFaqs();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Straight answers about <em className="text-logo-gold">what we do, and what we don't.</em>
          </>
        }
      />
      <section className="surface-light section-y bg-ivory text-ink">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <nav aria-label="FAQ topics" className="lg:col-span-3">
            <ul className="space-y-1 lg:sticky lg:top-32">
              {order.map((g) => (
                <li key={g}>
                  <a href={`#${g.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="block py-2 text-[0.9375rem] font-semibold text-slate hover:text-deep-teal">
                    {g}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16 lg:col-span-9">
            {order.map((g) => {
              const items = faqs.filter((f) => f.group === g);
              if (!items.length) return null;
              const id = g.toLowerCase().replace(/[^a-z]+/g, "-");
              return (
                <section key={g} aria-labelledby={id}>
                  <h2 id={id} className="t-h2 mb-6 scroll-mt-32">
                    {g}
                  </h2>
                  {/* anchors for deep links such as /faq#referrals */}
                  {items.map((f) => (
                    <span key={f.id} id={f.id} className="block scroll-mt-32" />
                  ))}
                  <Accordion light items={items} />
                </section>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
