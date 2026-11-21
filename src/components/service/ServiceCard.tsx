import Link from "next/link";
import { Icon, type AnyIcon } from "@/components/ui/Icon";
import { PreviewBadge } from "@/components/ui/primitives";
import { statusLabel } from "@/lib/content";
import type { PublishStatus } from "@/content/types";

export function ServiceCard({
  href,
  icon,
  title,
  summary,
  status,
  cta = "Learn more",
}: {
  href: string;
  icon: AnyIcon;
  title: string;
  summary: string;
  status?: PublishStatus;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col border border-graphite bg-charcoal p-7 transition-[border-color,transform,background-color] duration-500 ease-[var(--ease-premium)] hover:-translate-y-0.5 hover:border-champagne/60 hover:bg-[#1c1f23] sm:p-8"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-champagne to-turquoise transition-transform duration-700 group-hover:scale-x-100" />
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/40 text-logo-gold transition-colors group-hover:border-champagne">
          <Icon name={icon} className="h-[1.4rem] w-[1.4rem]" />
        </span>
        {status && status !== "published" && <PreviewBadge status={statusLabel[status]} />}
      </div>
      <h3 className="t-h3 mt-7">{title}</h3>
      <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-mist">{summary}</p>
      <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-turquoise">
        {cta}
        <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
