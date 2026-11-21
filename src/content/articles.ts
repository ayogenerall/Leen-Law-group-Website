import type { Article } from "./types";

/**
 * Educational resource center.
 * General information only, not individualized legal, tax, or financial advice.
 * DRAFT COPY: owner + professional review before launch.
 */
export const articles: Article[] = [
  {
    slug: "organizing-consumer-account-records",
    title: "How to Organize Your Consumer Account Records",
    category: "Document organization",
    excerpt:
      "A simple system for gathering statements, notices, and letters so you can see what happened and when.",
    updated: "2026-11-21",
    readingMinutes: 5,
    status: "published",
    sections: [
      {
        paragraphs: [
          "When an account issue comes up, the first obstacle is usually paperwork scattered across email, mail, and online portals. A consistent structure makes it easier to follow what happened, respond on time, and share the right information when you need help.",
        ],
      },
      {
        heading: "1. Create one folder per account or matter",
        paragraphs: ["Use a physical folder, a secure digital folder, or both. Name it clearly, for example: “Utility, account ending 1234, billing dispute.”"],
      },
      {
        heading: "2. Keep a simple timeline",
        bullets: [
          "Date of each event, letter, call, or payment",
          "Who you spoke with and what was said",
          "What was promised and by when",
          "Any deadline mentioned in a notice",
        ],
      },
      {
        heading: "3. Save the documents that matter",
        bullets: [
          "Statements and invoices",
          "Notices and letters received",
          "Copies of anything you sent, with proof of mailing where available",
          "Receipts and payment confirmations",
        ],
      },
      {
        heading: "4. Protect sensitive information",
        paragraphs: [
          "Store documents containing Social Security numbers, full account numbers, or identification securely. When sharing copies, consider redacting all but the last four digits of account numbers unless the full number is specifically required.",
        ],
      },
    ],
    officialLinks: [{ label: "Consumer Financial Protection Bureau", href: "https://www.consumerfinance.gov/" }],
    related: ["tracking-deadlines-and-responses", "reading-your-credit-report"],
  },
  {
    slug: "reading-your-credit-report",
    title: "Reading Your Credit Report: A Plain-Language Overview",
    category: "Credit-file education",
    excerpt: "What the main sections of a credit report contain, and where to get your reports from official sources.",
    updated: "2026-11-21",
    readingMinutes: 6,
    status: "published",
    sections: [
      {
        paragraphs: [
          "Your credit reports summarize how accounts in your name have been reported by lenders and other furnishers. Reviewing them periodically helps you spot information you don’t recognize.",
        ],
      },
      {
        heading: "Where to get your reports",
        paragraphs: [
          "AnnualCreditReport.com is the official site for requesting free credit reports from the nationwide credit reporting companies. Be cautious of look-alike sites.",
        ],
      },
      {
        heading: "Typical sections",
        bullets: [
          "Identifying information (name, addresses, employers)",
          "Accounts and their reported payment history",
          "Inquiries (who has requested your report)",
          "Public-record and collection information, where applicable",
        ],
      },
      {
        heading: "If something looks wrong",
        paragraphs: [
          "You can dispute information you believe is inaccurate or incomplete directly with the credit reporting company and with the business that furnished it, at no cost. Keep copies of everything you send and receive. Accurate information generally remains on a report for the period allowed by law, even if it is negative.",
        ],
      },
    ],
    officialLinks: [
      { label: "AnnualCreditReport.com (official)", href: "https://www.annualcreditreport.com/" },
      { label: "CFPB: Credit reports and scores", href: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/" },
    ],
    related: ["organizing-consumer-account-records", "tracking-deadlines-and-responses"],
  },
  {
    slug: "tracking-deadlines-and-responses",
    title: "Tracking Deadlines and Responses Without Missing a Step",
    category: "Administrative processes",
    excerpt: "Why deadlines matter in administrative processes, and a lightweight way to stay on top of them.",
    updated: "2026-11-21",
    readingMinutes: 4,
    status: "published",
    sections: [
      {
        paragraphs: [
          "Many notices include a response window. Missing it can limit your options, so recording deadlines the day a notice arrives is one of the most useful habits you can build.",
        ],
      },
      {
        heading: "A simple tracking method",
        bullets: [
          "Record the date you received the notice and the deadline it states",
          "Set two reminders: one a week before and one two days before",
          "Note how you responded (mail, portal, phone) and keep proof",
          "Log any reply you receive and the next expected step",
        ],
      },
      {
        heading: "When to get professional help quickly",
        paragraphs: [
          "If a notice involves a court date, a lawsuit, or legal deadlines, contact a licensed attorney promptly. Administrative support can’t substitute for legal advice in those situations.",
        ],
      },
    ],
    related: ["organizing-consumer-account-records", "when-to-contact-a-licensed-professional"],
  },
  {
    slug: "business-startup-checklist",
    title: "A Business Startup Administrative Checklist",
    category: "Business startup",
    excerpt: "The common administrative steps entrepreneurs work through when setting up a new business.",
    updated: "2026-11-21",
    readingMinutes: 6,
    status: "published",
    sections: [
      {
        paragraphs: [
          "Requirements vary by state, locality, and industry, so treat this as a general starting list and confirm details with official sources and qualified professionals.",
        ],
      },
      {
        heading: "Foundations",
        bullets: [
          "Choose a business name and check availability in your state",
          "Decide on a business structure with advice from an attorney or tax professional",
          "Register with your state if your structure requires it",
          "Obtain an Employer Identification Number (EIN) from the IRS if needed (the IRS does not charge for an EIN)",
        ],
      },
      {
        heading: "Operations",
        bullets: [
          "Research state and local licenses or permits for your activity",
          "Open a separate business bank account",
          "Set up business contact details (email, phone, mailing address)",
          "Create a simple system for invoices, receipts, and contracts",
        ],
      },
    ],
    officialLinks: [
      { label: "SBA: Business guide", href: "https://www.sba.gov/business-guide" },
      { label: "IRS: Get an EIN", href: "https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number" },
    ],
    related: ["when-to-contact-a-licensed-professional"],
  },
  {
    slug: "when-to-contact-a-licensed-professional",
    title: "When to Contact a Licensed Attorney or Tax Professional",
    category: "Consumer education",
    excerpt: "Situations that call for a licensed professional rather than administrative support.",
    updated: "2026-11-21",
    readingMinutes: 4,
    status: "published",
    sections: [
      {
        paragraphs: [
          "Administrative support can help you get organized, but some situations require a licensed professional. Recognizing them early protects your interests.",
        ],
      },
      {
        heading: "Contact a licensed attorney if you",
        bullets: [
          "Need advice about your legal rights or options",
          "Have been sued, served, or given a court date",
          "Need a will, trust, power of attorney, or other legal document drafted",
          "Want someone to negotiate or represent you",
        ],
      },
      {
        heading: "Contact a qualified tax professional if you",
        bullets: [
          "Need a tax return prepared or reviewed",
          "Have received an IRS or state tax notice you don’t understand",
          "Are deciding on an entity structure or tax classification",
          "Have questions about tax-exempt status",
        ],
      },
    ],
    officialLinks: [{ label: "Find your state consumer protection office (USA.gov)", href: "https://www.usa.gov/state-consumer" }],
    related: ["tracking-deadlines-and-responses", "irs-resources-for-organizations"],
  },
  {
    slug: "irs-resources-for-organizations",
    title: "Official IRS Resources for Charities and Religious Organizations",
    category: "IRS educational resources",
    excerpt: "Where to find the IRS’s own guidance, and why a qualified professional should review your situation.",
    updated: "2026-11-21",
    readingMinutes: 3,
    status: "published",
    sections: [
      {
        paragraphs: [
          "Federal tax rules for charities, churches, and religious organizations are complex. Whether an organization qualifies for any particular status depends on its facts, and no label, notice, or document creates tax-exempt status on its own.",
          "The IRS publishes guidance for these organizations. Review the official sources below, and have a qualified tax professional or attorney review your specific situation.",
        ],
      },
    ],
    officialLinks: [{ label: "IRS: Charities and nonprofits", href: "https://www.irs.gov/charities-non-profits" }],
    related: ["when-to-contact-a-licensed-professional"],
  },
];
