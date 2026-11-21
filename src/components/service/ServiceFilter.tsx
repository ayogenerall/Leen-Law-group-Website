"use client";

import { useMemo, useState } from "react";
import { ServiceCard } from "./ServiceCard";
import type { AnyIcon } from "@/components/ui/Icon";
import type { PublishStatus } from "@/content/types";

export interface DirectoryItem {
  href: string;
  title: string;
  summary: string;
  icon: AnyIcon;
  category: string;
  status?: PublishStatus;
}

const categoryLabels: Record<string, string> = {
  all: "All",
  consumer: "Consumer",
  business: "Business",
  representative: "Authorized representative",
  notary: "Notary",
  referral: "Referrals & coordination",
  education: "Education",
};

export function ServiceFilter({ items }: { items: DirectoryItem[] }) {
  const [active, setActive] = useState("all");
  const categories = useMemo(() => ["all", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const shown = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter services by category" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            data-cat={c}
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              active === c
                ? "border-turquoise bg-turquoise text-obsidian"
                : "border-graphite text-ivory/85 hover:border-champagne/70 hover:text-ivory"
            }`}
          >
            {categoryLabels[c] ?? c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "service" : "services"}
      </p>
      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <li key={s.href} data-category={s.category}>
            <ServiceCard {...s} />
          </li>
        ))}
      </ul>
    </div>
  );
}
