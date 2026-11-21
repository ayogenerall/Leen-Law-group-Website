"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export interface ResourceListItem {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  updated: string;
  readingMinutes: number;
  searchText: string;
}

export function ResourceExplorer({ items, categories }: { items: ResourceListItem[]; categories: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter(
      (a) => (cat === "All" || a.category === cat) && terms.every((t) => a.searchText.includes(t)),
    );
  }, [items, q, cat]);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              data-cat={c}
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                cat === c ? "border-turquoise bg-turquoise text-obsidian" : "border-graphite text-ivory/85 hover:border-champagne/70"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor="resource-search" className="sr-only">
            Search resources
          </label>
          <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-mist" />
          <input
            id="resource-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search resources"
            autoComplete="off"
            className="h-12 w-full rounded-[2px] border border-graphite bg-charcoal pl-12 pr-4 text-[0.9375rem] text-ivory placeholder:text-mist/80 focus:border-turquoise"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-mist" aria-live="polite">
        {results.length} {results.length === 1 ? "resource" : "resources"}
        {q && <> matching “{q}”</>}
      </p>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <li key={a.slug} data-category={a.category} data-search={a.searchText}>
              <ArticleCard {...a} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 border border-dashed border-graphite p-10 text-center">
          <p className="text-ivory">No resources match your search.</p>
          <button
            type="button"
            onClick={() => {
              setQ("");
              setCat("All");
            }}
            className="mt-4 text-sm font-semibold text-turquoise underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export function ArticleCard({ slug, title, category, excerpt, readingMinutes }: Omit<ResourceListItem, "searchText" | "updated"> & { updated?: string }) {
  return (
    <Link
      href={`/resources/${slug}`}
      className="group flex h-full flex-col border border-graphite bg-charcoal p-7 transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-champagne/60"
    >
      <p className="t-eyebrow">{category}</p>
      <h3 className="mt-4 font-serif text-[1.7rem] leading-tight transition-colors group-hover:text-soft-gold">{title}</h3>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-mist">{excerpt}</p>
      <div className="mt-7 flex items-center justify-between text-sm">
        <span className="text-mist">{readingMinutes} min read</span>
        <span className="inline-flex items-center gap-2 font-semibold text-turquoise">
          Read <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
