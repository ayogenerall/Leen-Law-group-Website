import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/shared";
import { DisclosurePanel } from "@/components/layout/Disclosures";
import { Icon } from "@/components/ui/Icon";
import { policies } from "@/content/legal";

export const metadata: Metadata = {
  title: "Disclosures & Policies",
  description: "Leen Law Group's website disclaimer, service limitations, privacy policy, terms of use, refund policy, and accessibility statement.",
  alternates: { canonical: "/legal" },
};

export default function LegalHub() {
  return (
    <>
      <PageHero eyebrow="Disclosures & policies" title="Clear terms, stated plainly." intro="How we work, what our services include and exclude, and how we handle your information." />
      <section className="surface-light section-y bg-ivory text-ink">
        <div className="container-x">
          <DisclosurePanel light />
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {policies.map((p) => (
              <li key={p.slug}>
                <Link href={`/legal/${p.slug}`} className="group flex h-full flex-col border border-ink/12 bg-white p-7 transition-colors hover:border-deep-teal">
                  <Icon name="document" className="h-6 w-6 text-[#7d6518]" />
                  <h2 className="t-h3 mt-6 group-hover:text-deep-teal">{p.title}</h2>
                  <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-slate">{p.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-deep-teal">
                    Read <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
