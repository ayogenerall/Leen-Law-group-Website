import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/sections/shared";
import { ResourceExplorer, type ResourceListItem } from "@/components/resource/ResourceExplorer";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Educational resources on consumer records, credit files, business startup administration, and official agency links. General information, not legal or tax advice.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const articles = getArticles();
  const items: ResourceListItem[] = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    excerpt: a.excerpt,
    updated: a.updated,
    readingMinutes: a.readingMinutes,
    searchText: [a.title, a.category, a.excerpt, ...a.sections.flatMap((s) => [s.heading ?? "", ...(s.paragraphs ?? []), ...(s.bullets ?? [])])]
      .join(" ")
      .toLowerCase(),
  }));
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <>
      <PageHero
        eyebrow="Resource center"
        title={
          <>
            Plain-language guides for <em className="text-logo-gold">getting organized.</em>
          </>
        }
        intro="General educational information, with links to official agencies. These guides are not individualized legal, tax, or financial advice."
      />
      <section aria-label="Articles" className="section-y bg-obsidian">
        <div className="container-x">
          <ResourceExplorer items={items} categories={categories} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
