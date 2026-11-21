import type { MetadataRoute } from "next";
import { getArticles, getPublishedServices, isPageVisible } from "@/lib/content";
import { policies } from "@/content/legal";
import { site } from "@/lib/site";

/** Only PUBLISHED content is listed. Preview/draft content is never included. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/about", "/services", "/consumer-support", "/business-startup", "/resources", "/faq", "/contact", "/legal"];
  const entries: MetadataRoute.Sitemap = staticRoutes.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
  if (isPageVisible("notary") && process.env.CONTENT_PREVIEW !== "true") entries.push({ url: `${site.url}/notary`, lastModified: now });
  for (const s of getPublishedServices().filter((s) => !s.pageHref)) entries.push({ url: `${site.url}/services/${s.slug}`, lastModified: now, priority: 0.8 });
  for (const a of getArticles().filter((a) => a.status === "published")) entries.push({ url: `${site.url}/resources/${a.slug}`, lastModified: new Date(a.updated), priority: 0.5 });
  for (const p of policies) entries.push({ url: `${site.url}/legal/${p.slug}`, lastModified: now, priority: 0.3 });
  return entries;
}
