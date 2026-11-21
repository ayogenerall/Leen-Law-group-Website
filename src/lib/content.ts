import { services } from "@/content/services";
import { articles } from "@/content/articles";
import { faqs } from "@/content/faqs";
import { pageStatus } from "@/content/pages";
import type { PublishStatus } from "@/content/types";

/**
 * Preview mode shows draft / pending items with a visible PREVIEW badge.
 * It is forced OFF in production builds unless explicitly enabled (and must not be enabled on the live site).
 */
export const isPreview = process.env.CONTENT_PREVIEW === "true";

export function isVisible(status: PublishStatus): boolean {
  if (status === "published") return true;
  if (status === "disabled") return false;
  return isPreview;
}

export const getServices = () => services.filter((s) => isVisible(s.status));
/** Public URL of a service: its dedicated page if it has one, else /services/[slug]. */
export const serviceHref = (s: { slug: string; pageHref?: string }) => s.pageHref ?? `/services/${s.slug}`;
export const getService = (slug: string) => services.find((s) => s.slug === slug && isVisible(s.status));
export const getPublishedServices = () => services.filter((s) => s.status === "published");

export const getArticles = () =>
  articles.filter((a) => isVisible(a.status)).sort((a, b) => b.updated.localeCompare(a.updated));
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug && isVisible(a.status));

export const getFaqs = () => faqs.filter((f) => isVisible(f.status));
export const getFeaturedFaqs = () => getFaqs().filter((f) => f.featured);

export const isPageVisible = (key: keyof typeof pageStatus) => isVisible(pageStatus[key].status);

export const statusLabel: Record<PublishStatus, string> = {
  published: "Published",
  draft: "Draft",
  pending_verification: "Pending owner verification",
  disabled: "Disabled",
};
