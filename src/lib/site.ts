import { businessProfile, verified } from "@/content/business-profile";

export const site = {
  name: "Leen Law Group",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  description:
    "Leen Law Group offers consumer-support and business-administration services to help individuals and entrepreneurs organize records, navigate administrative processes, and connect with appropriate professional resources. Not a law firm.",
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const legalNav = [
  { label: "Disclosures & Policies", href: "/legal" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Website Disclaimer", href: "/legal/disclaimer" },
  { label: "Service Limitations", href: "/legal/service-limitations" },
  { label: "Cancellation & Refunds", href: "/legal/cancellation-refund" },
  { label: "Accessibility", href: "/legal/accessibility" },
];

/**
 * PDF §7 general disclaimer, DRAFT FOR ATTORNEY REVIEW.
 * The entity clause renders only once the legal entity name + type are verified.
 */
const entity = verified(businessProfile.legalEntityName);
const entityType = verified(businessProfile.entityType);
const opener =
  entity && entityType
    ? `Leen Law Group (${entity}, a ${entityType}) provides`
    : "Leen Law Group provides";

export const generalDisclaimer = `${opener} administrative, consumer-support, and business-support services. Unless expressly stated otherwise, Leen Law Group is not a law firm and does not provide legal advice or legal representation. No attorney-client relationship is created by visiting this website, submitting an inquiry, or purchasing an administrative service. For legal advice or representation, consult a licensed attorney in the relevant jurisdiction. Services are limited to the written scope agreed with the client and may vary by jurisdiction.`;
