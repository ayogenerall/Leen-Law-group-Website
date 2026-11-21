import type { VerifiableField } from "./types";

/**
 * BUSINESS PROFILE. Every fact here is UNVERIFIED until the owner confirms it.
 * Components render a field only when `verified: true` and `value` is set.
 * Source for each gap: PDF §2 “Not established; do not invent” and §11 checklist.
 */
export const businessProfile = {
  brandName: "Leen Law Group", // working brand name (PDF §3)
  legalEntityName: { value: null, verified: false, note: "Registered entity name" } as VerifiableField,
  entityType: { value: null, verified: false, note: "e.g. LLC" } as VerifiableField,
  stateOfFormation: { value: null, verified: false } as VerifiableField,
  dbaStatus: { value: null, verified: false, note: "Legal name vs DBA vs marketing name" } as VerifiableField,

  founderName: { value: "Patricia Leen", verified: true } as VerifiableField,
  founderTitle: {
    value: "Paralegal and Consumer Advocate",
    verified: true,
    note: "Owner-approved 2026-11-21. Legal review recommended: use of the title “paralegal” without attorney supervision is regulated in some states.",
  } as VerifiableField,
  founderBio: { value: null, verified: false, note: "Owner will supply the biography." } as VerifiableField,

  serviceArea: { value: null, verified: false, note: "States / in-person vs remote" } as VerifiableField,
  phone: { value: null, verified: false, note: "Owner will supply the business phone number." } as VerifiableField,
  email: {
    value: null,
    verified: false,
    note: "Owner will supply the business email. Set value + verified: true to show it in the footer and contact page.",
  } as VerifiableField,
  address: { value: null, verified: false } as VerifiableField,
  hours: { value: null, verified: false } as VerifiableField,
  responseTime: { value: null, verified: false, note: "e.g. 'within 2 business days'" } as VerifiableField,
  domain: { value: null, verified: false } as VerifiableField,
  social: {
    instagram: { value: null, verified: false } as VerifiableField,
    facebook: { value: null, verified: false } as VerifiableField,
    linkedin: { value: null, verified: false } as VerifiableField,
  },
};

export function verified(field: VerifiableField): string | null {
  return field.verified && field.value ? field.value : null;
}
