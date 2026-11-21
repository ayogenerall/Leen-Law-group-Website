import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // A preview deployment must never be indexed.
  if (process.env.CONTENT_PREVIEW === "true") return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
