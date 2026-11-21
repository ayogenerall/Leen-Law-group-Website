import type { Service } from "./types";

/**
 * SERVICE REGISTRY
 * Source: Leen_Law_Group_Website_Build_Brief.pdf §4 (potential service categories).
 * These are POTENTIAL services, not confirmation that any are operating.
 *
 * To publish a service, set `status: "published"` and `ownerApprovedAt: "YYYY-MM-DD"`.
 * To hide one, set `status: "pending_verification"`.
 */
export const services: Service[] = [
  {
    slug: "consumer-administrative-support",
    pageHref: "/consumer-support",
    title: "Consumer Advocacy & Administrative Support",
    shortTitle: "Consumer Support",
    category: "consumer",
    status: "published",
    ownerApprovedAt: "2026-11-21",
    icon: "folder",
    summary:
      "Organizing account records, correspondence, and timelines so you can understand the process and take informed next steps.",
    description: [
      "Consumer matters often involve scattered statements, notices, and letters arriving on different timelines. This service focuses on bringing that information into order and helping you follow the administrative process clearly.",
      "Correspondence is prepared from the facts and documents you provide, and you review and approve it before it is sent. When a question calls for a legal opinion or legal strategy, we tell you so and help you identify an appropriate licensed professional.",
    ],
    includes: [
      "Organizing account records, billing statements, notices, and correspondence",
      "Building a clear timeline of events from client-provided documents",
      "Sharing general information about common consumer processes",
      "Preparing client-reviewed administrative correspondence from client-provided facts",
      "Tracking responses, follow-ups, and deadlines",
      "Identifying relevant agencies and qualified professionals",
    ],
    eligibility: [
      "Individuals seeking organizational and administrative help with their own consumer matters",
      "Matters within the service area and jurisdiction confirmed during service review",
    ],
    limitations: [
      "We do not provide legal advice, individualized legal opinions, or legal strategy.",
      "We do not represent clients in court, negotiate legal claims, or threaten litigation on a client's behalf.",
      "Correspondence is based on information you provide; you are responsible for its accuracy and approve it before use.",
      "No particular outcome is promised or guaranteed.",
    ],
    faqs: [
      {
        q: "Will you tell me whether I have a legal claim?",
        a: "No. Evaluating legal claims is legal advice. We can help you organize your records and identify when to consult a licensed attorney.",
      },
      {
        q: "Who sends the correspondence?",
        a: "That is defined in your written scope before work begins. In every case, you review and approve correspondence before it is used.",
      },
    ],
    cta: { label: "Request Support", href: "/contact?service=consumer-administrative-support" },
    requiresLegalReview: false,
    reviewNotes: "Confirm active status, service area, and fees.",
  },
  {
    slug: "attorney-in-fact",
    title: "Attorney-in-Fact & Authorized-Representative Support",
    shortTitle: "Attorney-in-Fact Support",
    category: "representative",
    status: "published",
    ownerApprovedAt: "2026-11-21",
    icon: "signature",
    summary:
      "Acting as your agent (attorney-in-fact) under a valid power of attorney, for permitted administrative matters accepted by the receiving institution.",
    description: [
      "An attorney-in-fact is the agent you name in a power of attorney to handle certain matters on your behalf. Leen Law Group provides attorney-in-fact and authorized-representative support for administrative matters, acting only within the scope of a valid written authorization, where it is accepted by the receiving institution and permitted by law.",
      "“Attorney-in-fact” does not mean attorney-at-law. This service is not legal representation, and we do not give legal advice. We act in your interest, keep records of every communication and action taken, and refer legal questions to a licensed attorney.",
    ],
    includes: [
      "Confirming that your written authorization covers the requested task",
      "Confirming that the receiving institution accepts the authorization",
      "Communicating with institutions on your behalf within the scope of the authorization",
      "Organizing records and correspondence related to the authorized matter",
      "Keeping a record of communications and actions taken, shared with you",
    ],
    eligibility: [
      "A valid written authorization (such as a power of attorney) naming the agent and covering the requested task",
      "The receiving institution accepts the authorization",
      "The task is legally permitted without a professional license",
    ],
    limitations: [
      "An attorney-in-fact is not an attorney-at-law. This is not legal representation and does not create an attorney-client relationship.",
      "We act only within the scope of a valid authorization, and only for tasks that do not require a professional license.",
      "We do not draft powers of attorney or advise on their terms. Please consult a licensed attorney for that.",
      "Some institutions require their own forms or may decline an authorization. Acceptance is confirmed before work begins.",
      "Signed authorizations are never collected through the website form. A secure channel is arranged after service review.",
      "No particular outcome is promised or guaranteed.",
    ],
    faqs: [
      {
        q: "What is an attorney-in-fact?",
        a: "An attorney-in-fact is the agent named in a power of attorney to act on someone's behalf for the matters that document covers. It does not mean the agent is a lawyer, and it is not legal representation.",
      },
      {
        q: "Can you prepare my power of attorney?",
        a: "No. Drafting or advising on a power of attorney is legal work. Please consult a licensed attorney. Once a valid authorization is in place, we can act within its scope for permitted administrative matters.",
      },
      {
        q: "What if an institution won't accept my power of attorney?",
        a: "Institutions set their own acceptance requirements. We confirm acceptance before beginning work, and if an institution declines, we'll tell you so you can consult an attorney or provide what the institution requires.",
      },
    ],
    cta: { label: "Request Support", href: "/contact?service=attorney-in-fact" },
    requiresLegalReview: true,
    reviewNotes:
      "Legal review still recommended: POA scope and validity checks, third-party acceptance process, fiduciary duties, recordkeeping, and state-specific agent rules.",
  },
  {
    slug: "notary-services",
    pageHref: "/notary",
    title: "Notary Services",
    shortTitle: "Notary",
    category: "notary",
    status: "published",
    ownerApprovedAt: "2026-11-21",
    icon: "stamp",
    summary: "Notarial acts permitted by an active commission, in the jurisdiction where the commission is valid.",
    description: [
      "Notarial acts are performed only as permitted by an active notary commission and the law of the state where the act takes place.",
      "A notary verifies identity and witnesses signatures. A notary does not choose document language, explain legal consequences, or prepare legal documents.",
    ],
    includes: [
      "Notarial acts permitted under the notary's active commission",
      "Identity verification of each signer, as the law requires",
      "Scheduling an appointment that fits your timeline",
    ],
    eligibility: [
      "Signers who can present acceptable, current identification",
      "Documents that are complete and ready to sign. The notary cannot fill in or advise on content",
      "Notarial acts permitted in the jurisdiction where the notarization takes place",
    ],
    limitations: [
      "A notary cannot provide legal advice or draft legal instruments.",
      "Remote online notarization is not offered unless separately authorized and stated.",
      "Commission details, permitted acts, availability, and fees are confirmed when you request an appointment. Fees never exceed state limits.",
    ],
    faqs: [],
    cta: { label: "Request Support", href: "/contact?service=notary-services" },
    requiresLegalReview: true,
    reviewNotes:
      "NOTARY: verify commission number, state, expiration, permitted acts, fee schedule, journal requirements, in-person vs remote authorization.",
  },
  {
    slug: "credit-dispute-document-assistance",
    title: "Credit-Dispute Document Assistance",
    shortTitle: "Credit-Dispute Documents",
    category: "consumer",
    status: "published",
    ownerApprovedAt: "2026-11-21",
    icon: "report",
    summary:
      "Help organizing credit-file information and supporting records, and preparing correspondence you review about items you believe are inaccurate.",
    description: [
      "If you believe information in your credit file is inaccurate or incomplete, this administrative service helps you organize your reports and supporting records and prepare factual dispute correspondence for your review.",
      "Disputes must reflect your own good-faith factual position. Accurate information cannot be removed simply because it is negative.",
    ],
    includes: [
      "Helping you obtain and organize your own credit reports",
      "Organizing items you believe are inaccurate or incomplete, with supporting records",
      "Preparing client-reviewed dispute correspondence based on your facts",
      "Tracking responses and timelines",
    ],
    eligibility: ["Individuals reviewing their own credit files", "A good-faith factual basis for each disputed item"],
    limitations: [
      "No credit-score increase, deletion, or specific result is promised or guaranteed.",
      "Accurate negative information cannot be removed through a dispute.",
      "We do not submit disputes without a factual basis, assist with false identity-theft claims, or use fabricated documents.",
      "This is not legal advice. You can also dispute inaccuracies directly with the credit bureaus at no cost.",
    ],
    faqs: [
      {
        q: "Can I dispute errors myself?",
        a: "Yes. You have the right to dispute inaccurate information directly with credit reporting companies at no cost. See our Resources section for official links.",
      },
    ],
    cta: { label: "Request Support", href: "/contact?service=credit-dispute-document-assistance" },
    requiresLegalReview: true,
    reviewNotes:
      "CREDIT REPAIR: assess Credit Repair Organizations Act + state credit-services laws (registration, bonding, written contract, disclosures, 3-day cancellation, advance-fee restrictions) BEFORE advertising or charging.",
  },
  {
    slug: "business-startup-administration",
    pageHref: "/business-startup",
    title: "Business Creation & Startup Administration",
    shortTitle: "Business Startup",
    category: "business",
    status: "published",
    ownerApprovedAt: "2026-11-21",
    icon: "briefcase",
    summary:
      "Startup checklists, filing assistance using information you approve, EIN guidance, and organized business records.",
    description: [
      "Starting a business involves many administrative steps. This service helps entrepreneurs stay organized, understand the general sequence of startup tasks, and keep important records in one place.",
      "Your written scope states who files each document. You remain responsible for the accuracy of the information you provide.",
    ],
    includes: [
      "Business startup checklists",
      "Entity-formation filing assistance using client-approved information",
      "EIN application guidance",
      "Business contact setup (such as a business email and phone)",
      "Business document organization and basic operational templates",
      "Referrals to accountants, attorneys, registered agents, and other qualified providers",
    ],
    eligibility: ["Entrepreneurs and small-business owners organizing startup administration"],
    limitations: [
      "We do not guarantee entity approval, EIN issuance, business credit, funding, grants, or contracts.",
      "We do not advise which entity type to choose. Please consult an attorney or tax professional for that decision.",
      "Government filing fees are separate and paid to the relevant agency.",
    ],
    faqs: [
      {
        q: "Can you tell me whether to form an LLC or a corporation?",
        a: "That choice has legal and tax consequences, so we refer it to an attorney or tax professional. We can help organize the administrative steps once you decide.",
      },
    ],
    cta: { label: "Request Support", href: "/contact?service=business-startup-administration" },
    requiresLegalReview: false,
    reviewNotes: "Confirm who files, filing fees disclosure, and active status.",
  },
  {
    slug: "foreign-grantor-trust-ein-setup",
    title: "Foreign Grantor Trust EIN Setup",
    shortTitle: "Foreign Grantor Trust EIN",
    category: "business",
    status: "published",
    ownerApprovedAt: "2026-11-21",
    icon: "document",
    summary:
      "Administrative help applying to the IRS for an Employer Identification Number (EIN) for a trust that has already been established, using information you provide and approve.",
    description: [
      "Once a trust has been properly established, it may need its own Employer Identification Number (EIN) from the IRS. This administrative service helps the trustee or responsible party organize the required information, prepare the EIN application for their review, and keep the confirmation records in order.",
      "Whether a trust is a “foreign” trust or a “grantor” trust for U.S. tax purposes is a legal and tax determination. We do not make that determination. Please confirm the trust's classification with a qualified attorney or international tax professional before applying.",
    ],
    includes: [
      "Organizing the trust and trustee information needed for the EIN application",
      "Preparing the IRS EIN application (Form SS-4) from client-provided, client-approved information",
      "General guidance on the IRS application channels available to your situation",
      "Organizing and storing the EIN confirmation records",
      "Referrals to attorneys and international tax professionals",
    ],
    eligibility: [
      "Trusts that have already been established under a written trust instrument",
      "A trustee or authorized responsible party who can review and approve the application",
      "Classification of the trust confirmed by a qualified attorney or tax professional",
    ],
    limitations: [
      "We do not create or draft trusts, or advise on whether a foreign or grantor trust is right for you.",
      "We do not determine a trust's tax classification or give tax advice.",
      "An EIN identifies the trust for tax purposes. It does not create tax-exempt status, reduce taxes, or remove any filing or reporting obligation.",
      "Foreign trusts and their U.S. owners or beneficiaries may have significant IRS reporting obligations, with penalties for non-compliance. Consult an international tax professional.",
      "We will not assist with any arrangement intended to avoid lawful taxes or reporting requirements.",
      "EIN issuance is decided by the IRS and is not guaranteed. Taxpayer identification numbers are never collected through the website form.",
    ],
    faqs: [
      {
        q: "Does getting an EIN make my trust tax-exempt?",
        a: "No. An EIN is an identification number. It does not create tax-exempt status, change how the trust is taxed, or remove any filing or reporting obligation.",
      },
      {
        q: "Can you tell me whether my trust is a foreign grantor trust?",
        a: "No. Trust classification is a legal and tax determination. Please confirm it with a qualified attorney or international tax professional, and we can then help with the administrative EIN application.",
      },
      {
        q: "Who submits the application?",
        a: "Your written scope states who submits it. In every case, the trustee or responsible party reviews and approves the information before it goes to the IRS.",
      },
    ],
    cta: { label: "Request Support", href: "/contact?service=foreign-grantor-trust-ein-setup" },
    requiresLegalReview: true,
    reviewNotes:
      "TAX / TRUST: HIGH RISK. Foreign trust arrangements draw IRS scrutiny (abusive trust schemes). Confirm administrative-only scope, Form SS-4 third-party-designee practice, and referral partners with an international tax professional.",
  },
  {
    slug: "trust-planning-coordination",
    title: "Trust-Planning Administrative Coordination",
    shortTitle: "Trust-Planning Coordination",
    category: "referral",
    status: "published",
    ownerApprovedAt: "2026-11-21",
    icon: "network",
    summary:
      "Intake organization, document collection, scheduling, and referrals to qualified legal and tax professionals.",
    description: [
      "Trust planning involves legal and tax decisions that must be made with qualified professionals. This service is limited to administrative coordination: organizing your information, gathering documents, and connecting you with a licensed attorney or tax professional.",
    ],
    includes: [
      "Intake organization and information gathering",
      "Document collection and scheduling",
      "Referrals to licensed attorneys and qualified tax professionals",
    ],
    eligibility: ["Individuals preparing to meet with a licensed estate-planning professional"],
    limitations: [
      "We do not draft trusts, select legal terms, advise which trust is appropriate, or interpret trust provisions.",
      "We do not advise on asset transfers or tax treatment.",
      "Trust documents are prepared only by a properly licensed professional.",
    ],
    faqs: [],
    cta: { label: "Request Support", href: "/contact?service=trust-planning-coordination" },
    requiresLegalReview: true,
    reviewNotes:
      "TRUST: HIGH RISK (unauthorized practice of law). Confirm coordination-only scope and named attorney referral arrangement before publishing.",
  },
  {
    slug: "tax-preparation-referrals",
    title: "Tax-Preparation Referrals",
    shortTitle: "Tax-Prep Referrals",
    category: "referral",
    status: "published",
    ownerApprovedAt: "2026-11-21",
    icon: "referral",
    summary: "Referrals to a qualified tax preparer, with clear disclosure of who performs the work and who is paid.",
    description: [
      "If you need a tax return prepared, we can refer you to a qualified tax preparer. Before you proceed, we tell you who the preparer is, who performs the work, who receives payment, and who is responsible for the return.",
    ],
    includes: [
      "A referral to a qualified tax preparer suited to your situation",
      "Written disclosure of who prepares the return, who is paid, and who is responsible for it",
      "Disclosure of any referral arrangement or fee before you proceed",
    ],
    eligibility: ["Individuals or businesses seeking a tax-preparation referral"],
    limitations: [
      "Leen Law Group does not prepare tax returns unless that is expressly stated and properly qualified.",
      "We do not provide tax advice.",
    ],
    faqs: [],
    cta: { label: "Request Support", href: "/contact?service=tax-preparation-referrals" },
    requiresLegalReview: true,
    reviewNotes:
      "TAX: identify the preparer, verify PTIN/e-file status, clarify the previously discussed $100 figure (client fee vs referral fee), check referral-fee rules. Do not publish any amount until clarified.",
  },
  {
    slug: "irs-508c1a-educational-support",
    title: "IRS / 508(c)(1)(A) Educational & Administrative Support",
    shortTitle: "IRS Educational Support",
    category: "education",
    status: "published",
    ownerApprovedAt: "2026-11-21",
    icon: "book",
    summary: "General educational information and administrative organization, plus referrals to qualified tax professionals.",
    description: [
      "This service provides general educational information about IRS processes and helps organize related records. Questions about exemption, entity structure, or filing obligations are referred to a qualified tax professional or attorney.",
    ],
    includes: [
      "General educational information, with links to official IRS resources",
      "Organizing records related to an organization's administrative files",
      "Referrals to qualified tax professionals and attorneys",
    ],
    eligibility: ["Organizations seeking general educational information and administrative organization"],
    limitations: [
      "We do not promise tax-exempt status, automatic exemption, or relief from filing requirements.",
      "No label, notice, or document creates tax-exempt status on its own.",
      "We do not provide tax advice or determine whether an organization qualifies for any status.",
    ],
    faqs: [],
    cta: { label: "Request Support", href: "/contact?service=irs-508c1a-educational-support" },
    requiresLegalReview: true,
    reviewNotes:
      "TAX/EXEMPTION: HIGH RISK. Content must be reviewed by a qualified tax professional or attorney before publication.",
  },
];
