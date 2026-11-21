import { getServices, isPreview, serviceHref } from "./content";
import type { NavServiceLink } from "@/components/layout/Nav";

/** Service links shown in nav/footer. Only visible (published, or preview) services appear. */
export function getServiceLinks(): NavServiceLink[] {
  const links: NavServiceLink[] = [{ label: "All services", href: "/services", description: "Our service directory and scope" }];
  for (const s of getServices()) {
    links.push({ label: s.shortTitle + (isPreview && s.status !== "published" ? " (preview)" : ""), href: serviceHref(s) });
  }
  return links;
}
