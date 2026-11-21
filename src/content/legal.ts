import { generalDisclaimer } from "@/lib/site";
import type { ArticleSection } from "./types";

/**
 * POLICIES: DRAFTS FOR ATTORNEY REVIEW.
 * These are NOT legally approved. Set `approved: true` (and `effectiveDate`) only after counsel signs off.
 * While `approved` is false, each page shows a visible "draft under professional review" notice.
 */
export interface Policy {
  slug: string;
  title: string;
  summary: string;
  approved: boolean;
  effectiveDate: string | null;
  sections: ArticleSection[];
}

export const policies: Policy[] = [
  {
    slug: "disclaimer",
    title: "Website Disclaimer",
    summary: "The nature of Leen Law Group's services and the limits of information on this website.",
    approved: false,
    effectiveDate: null,
    sections: [
      { paragraphs: [generalDisclaimer] },
      {
        heading: "No legal, tax, or financial advice",
        paragraphs: [
          "Information on this website is general and educational. It is not legal, tax, or financial advice, and it may not reflect current law or the rules in your jurisdiction. Do not act or refrain from acting based on website content without consulting a qualified, licensed professional.",
        ],
      },
      {
        heading: "About our name",
        paragraphs: [
          "Although the name “Leen Law Group” includes the words “Law Group,” the business is not a law firm, does not employ attorneys to represent clients, and does not provide legal representation.",
        ],
      },
      {
        heading: "No affiliation or endorsement",
        paragraphs: [
          "Leen Law Group is not affiliated with, endorsed by, or acting on behalf of any government agency, court, the IRS, or any credit reporting company. References and links to official sources are provided for convenience.",
        ],
      },
      {
        heading: "No guarantees",
        paragraphs: [
          "We do not promise or guarantee any result, including credit-score changes, removal of accurate information, debt elimination, tax-exempt status, government approvals, funding, grants, or legal outcomes.",
        ],
      },
    ],
  },
  {
    slug: "service-limitations",
    title: "Service Limitations",
    summary: "What our administrative services include, and what they do not.",
    approved: false,
    effectiveDate: null,
    sections: [
      {
        paragraphs: [
          "Leen Law Group provides administrative, consumer-support, and business-support services. Every engagement is limited to the written scope agreed with the client before work begins.",
        ],
      },
      {
        heading: "We do not",
        bullets: [
          "Provide legal advice, individualized legal opinions, or legal strategy",
          "Represent clients in court or in legal negotiations, or threaten litigation on a client's behalf",
          "Draft legal instruments such as trusts, wills, or powers of attorney",
          "Provide tax advice or prepare tax returns unless expressly stated and properly qualified",
          "Submit disputes or correspondence without a good-faith factual basis provided by the client",
          "Guarantee any outcome",
        ],
      },
      {
        heading: "Client responsibilities",
        bullets: [
          "Providing accurate and complete information",
          "Reviewing and approving correspondence before it is used",
          "Meeting deadlines that apply to your matter",
          "Consulting a licensed professional when we advise that a matter is outside our scope",
        ],
      },
      {
        heading: "Authorized-representative matters",
        paragraphs: [
          "Where a service involves acting under a written authorization (such as a power of attorney), we act only within the scope of a valid authorization accepted by the receiving institution, and only for tasks that are legally permitted without a professional license. “Attorney-in-fact” refers to an agent under a power of attorney, not an attorney-at-law.",
        ],
      },
      {
        heading: "Service-specific disclosures",
        paragraphs: [
          "Some service lines, such as credit-dispute assistance, notary services, tax-preparation referrals, and trust-planning coordination, are subject to additional legal requirements. Each is published only after its compliance review is complete, together with any disclosures the law requires.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "How information submitted through this website is collected, used, and protected.",
    approved: false,
    effectiveDate: null,
    sections: [
      {
        heading: "Information we collect",
        paragraphs: ["When you submit a request, we collect the information you enter:"],
        bullets: [
          "Name, email address, and (optionally) phone number",
          "State or jurisdiction, requested service, and a brief description",
          "Whether there is a deadline (and its date) and whether you are acting for yourself or under an authorization",
          "Your acknowledgments of this policy and our service limitations",
        ],
      },
      {
        paragraphs: [
          "Our website form is not designed for sensitive information. Please do not submit Social Security numbers, full financial account numbers, identity documents, credit reports, medical records, or signed authorizations through it. The form automatically rejects some sensitive number formats.",
          "Like most websites, our hosting provider may process technical data (such as IP address and browser type) for security and reliability. We currently do not use advertising or analytics cookies. If that changes, this policy will be updated and consent requested where required.",
        ],
      },
      {
        heading: "How we use information",
        bullets: [
          "To review and respond to your request",
          "To determine whether your request fits our service scope and jurisdiction",
          "To protect the website against spam and abuse",
        ],
      },
      {
        heading: "Sharing",
        paragraphs: [
          "We do not sell your personal information. We share it only with service providers that help us operate the website and handle requests (such as hosting, database, email-delivery, and spam-protection providers), under their own security obligations, or where required by law. We will not share your information with a referral partner without your permission.",
        ],
      },
      {
        heading: "Retention",
        paragraphs: ["Website inquiries are kept only as long as needed to respond to your request and maintain basic business records, and are then deleted, unless they become part of an engagement covered by a written service agreement."],
      },
      {
        heading: "Security",
        paragraphs: [
          "Requests are transmitted over encrypted connections (HTTPS) and stored with restricted access. No method of transmission or storage is completely secure. If documents are needed for an agreed service, we will arrange an appropriate secure channel.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You may ask us to access, correct, or delete the information you submitted, subject to applicable law. To make a request, use our Request Support form and select “General inquiry.” Depending on where you live, you may have additional rights under state law.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: ["We may update this policy. The effective date at the top of the page shows when it was last revised."],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    summary: "The terms that apply to your use of this website.",
    approved: false,
    effectiveDate: null,
    sections: [
      {
        heading: "Acceptance",
        paragraphs: ["By using this website, you agree to these terms. If you do not agree, please do not use the website."],
      },
      {
        heading: "Informational purpose",
        paragraphs: [
          "Website content is general information, not legal, tax, or financial advice. Using the website or submitting a request does not create an attorney-client relationship or engage any service. Services begin only under a written scope that you accept.",
        ],
      },
      {
        heading: "Acceptable use",
        bullets: [
          "Do not submit false, misleading, or another person's information without authorization",
          "Do not submit sensitive personal records through the website form",
          "Do not attempt to disrupt, probe, or gain unauthorized access to the website",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: ["The Leen Law Group name, logo, and website content are protected and may not be used without permission."],
      },
      {
        heading: "Third-party links",
        paragraphs: ["Links to other websites, including government sites, are provided for convenience. We are not responsible for their content."],
      },
      {
        heading: "Disclaimer of warranties and limitation of liability",
        paragraphs: [
          "This website and its content are provided “as is,” without warranties of any kind. To the extent permitted by law, Leen Law Group is not liable for any loss arising from use of, or reliance on, information on this website. Some jurisdictions do not allow certain limitations, so they may not apply to you.",
        ],
      },
    ],
  },
  {
    slug: "cancellation-refund",
    title: "Cancellation & Refund Policy",
    summary: "How cancellations and refunds are handled.",
    approved: false,
    effectiveDate: null,
    sections: [
      {
        paragraphs: [
          "Cancellation and refund terms for each service are stated in your written scope and service agreement before any payment is accepted.",
          "Where the law gives you a right to cancel, such as for certain credit-related services, that right and how to use it are described in your service agreement.",
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    summary: "Our commitment to an accessible website.",
    approved: true,
    effectiveDate: null,
    sections: [
      {
        paragraphs: [
          "We want everyone to be able to use this website. It has been designed with the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA in mind, including keyboard navigation, visible focus indicators, sufficient color contrast, descriptive labels, text alternatives for images, and support for reduced-motion preferences.",
          "If you have difficulty using any part of the site, please let us know through the Request Support form (select “General inquiry”) and describe the problem. We will work to provide the information in another way and to fix the issue.",
        ],
      },
    ],
  },
];

export const getPolicy = (slug: string) => policies.find((p) => p.slug === slug);
