import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/shared";
import { Icon } from "@/components/ui/Icon";
import { getPolicy, policies } from "@/content/legal";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPolicy(slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, alternates: { canonical: `/legal/${p.slug}` } };
}

export default async function PolicyPage({ params }: Params) {
  const { slug } = await params;
  const p = getPolicy(slug);
  if (!p) notFound();

  return (
    <>
      <PageHero eyebrow="Disclosures & policies" title={p.title} intro={p.summary} />
      <section className="surface-light section-y bg-ivory text-ink">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {!p.approved && (
              <div role="note" className="mb-10 flex gap-3 border-l-4 border-[#7d6518] bg-[#fbf6e6] p-5 text-sm leading-relaxed">
                <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-[#7d6518]" />
                <p>
                  <strong>Draft under professional review.</strong> This policy has not yet been finalized. Questions? Contact us through the{" "}
                  <Link href="/contact" className="text-deep-teal underline underline-offset-4">Request Support form</Link>.
                </p>
              </div>
            )}
            {p.effectiveDate && <p className="mb-8 text-sm text-slate">Effective {p.effectiveDate}</p>}
            <div className="prose-leen text-[1.0625rem] text-slate [&_h2]:text-ink">
              {p.sections.map((s, i) => (
                <section key={i}>
                  {s.heading && <h2>{s.heading}</h2>}
                  {s.paragraphs?.map((t, j) => <p key={j}>{t}</p>)}
                  {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                </section>
              ))}
            </div>
          </div>
          <nav aria-label="Policies" className="lg:col-span-4">
            <ul className="border-t border-ink/12 lg:sticky lg:top-32">
              {policies.map((x) => (
                <li key={x.slug} className="border-b border-ink/12">
                  <Link
                    href={`/legal/${x.slug}`}
                    aria-current={x.slug === p.slug ? "page" : undefined}
                    className={`block py-4 text-[0.9375rem] font-semibold ${x.slug === p.slug ? "text-deep-teal" : "text-slate hover:text-deep-teal"}`}
                  >
                    {x.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
