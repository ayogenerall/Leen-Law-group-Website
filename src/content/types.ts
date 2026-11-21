/**
 * Content model, kept separate from presentation.
 * Every public-facing item carries a status. Only `published` renders on the live site.
 * (Set CONTENT_PREVIEW=true locally to review drafts with a PREVIEW badge.)
 */

export type PublishStatus = "published" | "draft" | "pending_verification" | "disabled";

export type IconName =
  | "folder"
  | "signature"
  | "stamp"
  | "report"
  | "briefcase"
  | "network"
  | "referral"
  | "book"
  | "shield"
  | "clock"
  | "compass"
  | "check"
  | "document"
  | "person";

export type ServiceCategory = "consumer" | "business" | "representative" | "notary" | "referral" | "education";

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  category: ServiceCategory;
  status: PublishStatus;
  icon: IconName;
  summary: string;
  /** Paragraphs describing the administrative scope. */
  description: string[];
  /** What the service may include (administrative tasks only). */
  includes: string[];
  eligibility: string[];
  /** Always rendered on the service page. Never optional. */
  limitations: string[];
  faqs: Faq[];
  cta: { label: string; href: string };
  /** If set, this service is presented by a dedicated page (e.g. /consumer-support) instead of /services/[slug]. */
  pageHref?: string;
  image?: { src: string; alt: string };
  /** Internal review controls, never rendered publicly. */
  requiresLegalReview: boolean;
  reviewNotes: string;
  ownerApprovedAt?: string;
}

export interface ArticleSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export type ArticleCategory =
  | "Consumer education"
  | "Credit-file education"
  | "Business startup"
  | "Administrative processes"
  | "Document organization"
  | "IRS educational resources";

export interface Article {
  slug: string;
  title: string;
  category: ArticleCategory;
  excerpt: string;
  updated: string; // ISO date
  readingMinutes: number;
  status: PublishStatus;
  sections: ArticleSection[];
  officialLinks?: { label: string; href: string }[];
  related?: string[];
}

export type FaqGroup = "About Leen" | "Services & scope" | "Process" | "Privacy & documents" | "Professional referrals";

export interface FaqItem extends Faq {
  id: string;
  group: FaqGroup;
  status: PublishStatus;
  featured?: boolean;
}

/** A business fact that may only render once verified by the owner. */
export interface VerifiableField<T = string> {
  value: T | null;
  verified: boolean;
  note?: string;
}
