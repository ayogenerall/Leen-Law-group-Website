import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/shared";
import { ArticleCard } from "@/components/resource/ResourceExplorer";
import { Eyebrow, PreviewBadge } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { getArticle, getArticles, statusLabel } from "@/lib/content";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/resources/${a.slug}` },
    openGraph: { type: "article", title: a.title, description: a.excerpt, modifiedTime: a.updated },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const all = getArticles();
  const related = (a.related ?? [])
    .map((s) => all.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .concat(all.filter((x) => x.slug !== a.slug && x.category === a.category && !(a.related ?? []).includes(x.slug)))
    .slice(0, 3);

  const updated = new Date(a.updated + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    dateModified: a.updated,
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/resources/${a.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="relative overflow-hidden bg-obsidian pb-14 pt-36 lg:pb-20 lg:pt-44">
          <div className="bg-plume pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="container-x relative max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-mist">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/resources" className="inline-block py-2 hover:text-turquoise">
                    Resources
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ivory/85">
                  {a.category}
                </li>
              </ol>
            </nav>
            <div className="flex flex-wrap items-center gap-4">
              <Eyebrow>{a.category}</Eyebrow>
              {a.status !== "published" && <PreviewBadge status={statusLabel[a.status]} />}
            </div>
            <h1 className="t-h1 mt-6">{a.title}</h1>
            <p className="t-lead mt-6 text-mist">{a.excerpt}</p>
            <p className="mt-8 text-sm text-mist">
              Updated <time dateTime={a.updated}>{updated}</time> · {a.readingMinutes} min read
            </p>
          </div>
        </header>

        <div className="surface-light bg-ivory py-16 text-ink lg:py-24">
          <div className="container-x max-w-4xl">
            <div className="prose-leen text-[1.0625rem] text-slate [&_h2]:text-ink">
              {a.sections.map((s, i) => (
                <section key={i}>
                  {s.heading && <h2>{s.heading}</h2>}
                  {s.paragraphs?.map((p, j) => <p key={j}>{p}</p>)}
                  {s.bullets && (
                    <ul>
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {a.officialLinks && a.officialLinks.length > 0 && (
              <aside aria-labelledby="official-links" className="mt-14 border border-ink/12 bg-white p-7">
                <h2 id="official-links" className="t-h3">
                  Official resources
                </h2>
                <ul className="mt-4 space-y-3">
                  {a.officialLinks.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-semibold text-deep-teal underline underline-offset-4"
                      >
                        {l.label}
                        <Icon name="external" className="h-4 w-4" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-slate">Leen Law Group is not affiliated with, or endorsed by, any government agency or credit bureau.</p>
              </aside>
            )}

            <p className="mt-10 border-l-2 border-[#7d6518] pl-5 text-sm leading-relaxed text-slate">
              This article is general educational information, not legal, tax, or financial advice, and may not reflect the rules in your
              jurisdiction. For advice about your situation, consult a licensed professional.
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-y bg-obsidian">
          <div className="container-x">
            <h2 id="related-title" className="t-h2">
              Related resources
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <ArticleCard slug={r.slug} title={r.title} category={r.category} excerpt={r.excerpt} readingMinutes={r.readingMinutes} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
