/**
 * PRE-LAUNCH OWNER VERIFICATION CHECKLIST (PDF §11 + build prompt §12)
 * Flip `done: true` as each item is confirmed. Rendered at /admin/verification (internal only).
 */
export interface CheckItem {
  item: string;
  done: boolean;
  blocksLaunch: boolean;
  note?: string;
}

export const verificationChecklist: { group: string; items: CheckItem[] }[] = [
  {
    group: "Entity & name",
    items: [
      { item: "Registered entity name", done: false, blocksLaunch: true },
      { item: "Entity type", done: false, blocksLaunch: true },
      { item: "State of formation and active status", done: false, blocksLaunch: true },
      { item: "DBA / trade-name registration (is “Leen Law Group” the legal name, a DBA, or a marketing name?)", done: false, blocksLaunch: true },
      { item: "Attorney review of the words “Law Group” in each target jurisdiction", done: false, blocksLaunch: true },
      { item: "Official lockup: “Leen Law Group” vs “Leen Law Group Consulting”", done: false, blocksLaunch: false },
    ],
  },
  {
    group: "Founder",
    items: [
      { item: "Founder's public name (Patricia Leen)", done: true, blocksLaunch: false },
      { item: "Owner's approved professional title (Paralegal and Consumer Advocate)", done: true, blocksLaunch: false },
      { item: "Attorney review of the “Paralegal” title for independent, public-facing use in each target state", done: false, blocksLaunch: true },
      { item: "Founder biography (owner to supply; no unverified credentials)", done: false, blocksLaunch: false },
      { item: "Supply photos LEX06193, IMG_7133, IMG_7134, IMG_7135", done: false, blocksLaunch: false },
      { item: "Confirm hero portrait is an unaltered original photograph", done: false, blocksLaunch: false },
    ],
  },
  {
    group: "Operations & contact",
    items: [
      { item: "Current active services: all 9 approved by owner (2026-11-21)", done: true, blocksLaunch: true },
      { item: "Service area; in-person, remote, or both", done: false, blocksLaunch: true },
      { item: "Business phone number (owner to supply)", done: false, blocksLaunch: false },
      { item: "Business email address (owner to supply)", done: false, blocksLaunch: true },
      { item: "Business address", done: false, blocksLaunch: false },
      { item: "Website domain", done: false, blocksLaunch: true },
      { item: "Social media accounts", done: false, blocksLaunch: false },
      { item: "Operating hours and response-time commitment", done: false, blocksLaunch: false },
    ],
  },
  {
    group: "Pricing & terms",
    items: [
      { item: "Pricing", done: false, blocksLaunch: false },
      { item: "Consultation fees (the flyer's “free 10-min session”: confirm or drop)", done: false, blocksLaunch: false },
      { item: "Refund / cancellation terms", done: false, blocksLaunch: true },
      { item: "Payment processor", done: false, blocksLaunch: false },
    ],
  },
  {
    group: "Regulated services",
    items: [
      { item: "Notary (now PUBLISHED): active commission, state, expiry, permitted acts, in-person/remote", done: false, blocksLaunch: true },
      { item: "Tax referrals (now PUBLISHED): named preparer, PTIN, and the meaning of the “$100 referral” figure", done: false, blocksLaunch: true },
      { item: "Credit-dispute service (now PUBLISHED): CROA + state credit-services law (registration, bonding, written contract, 3-day cancellation, no advance fees)", done: false, blocksLaunch: true },
      { item: "Trust coordination (now PUBLISHED): scope and named attorney referral arrangement", done: false, blocksLaunch: true },
      { item: "IRS / 508(c)(1)(A) service (now PUBLISHED): reviewed by a qualified tax professional", done: false, blocksLaunch: true },
      { item: "Foreign Grantor Trust EIN Setup (PUBLISHED): scope and copy reviewed by an international tax professional", done: false, blocksLaunch: true },
      { item: "Attorney-in-fact service (now PUBLISHED): POA scope, acceptance process, and state agent rules reviewed by counsel", done: false, blocksLaunch: true },
    ],
  },
  {
    group: "Policies, privacy & brand",
    items: [
      { item: "Privacy Policy approved by counsel", done: false, blocksLaunch: true },
      { item: "Terms of Use, Website Disclaimer, Service Limitations approved by counsel", done: false, blocksLaunch: true },
      { item: "Service agreements for each service line", done: false, blocksLaunch: false },
      { item: "Inquiry data-retention period (INQUIRY_RETENTION_DAYS)", done: false, blocksLaunch: true },
      { item: "Final logo approval, including the nav crop (emblem + wordmark)", done: false, blocksLaunch: false },
      { item: "Transparent or SVG export of the black logo", done: false, blocksLaunch: false },
      { item: "Final colors, fonts, photography, and copy sign-off", done: false, blocksLaunch: true },
    ],
  },
];
