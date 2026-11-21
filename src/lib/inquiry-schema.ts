import { z } from "zod";

/** Shared client + server validation for the public Request Support form. */

export const US_JURISDICTIONS = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming", "Puerto Rico", "Other / outside the U.S.",
] as const;

export const ACTING_AS = [
  { value: "self", label: "For myself" },
  { value: "business", label: "For my own business" },
  { value: "authorization", label: "Under a power of attorney or other written authorization" },
] as const;

/** Detects data that must never be sent through the public form. */
export function containsSensitiveNumbers(text: string): boolean {
  const ssn = /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/;
  const longAccount = /\d(?:[\s-]?\d){11,}/; // 12+ digits (card / account numbers)
  return ssn.test(text) || longAccount.test(text);
}

const noSensitive = (s: string) => !containsSensitiveNumbers(s);
const SENSITIVE_MSG =
  "For your protection, please remove Social Security, card, or account numbers. We'll request any necessary details securely later.";

export const inquirySchema = z
  .object({
    firstName: z.string().trim().min(1, "Please enter your first name.").max(80),
    lastName: z.string().trim().min(1, "Please enter your last name.").max(80),
    email: z.string().trim().min(1, "Please enter your email address.").email("Please enter a valid email address.").max(200),
    phone: z
      .string()
      .trim()
      .max(30)
      .refine((v) => v === "" || /^[+()\d\s.-]{7,30}$/.test(v), "Please enter a valid phone number, or leave it blank.")
      .optional()
      .default(""),
    jurisdiction: z.string().refine((v) => (US_JURISDICTIONS as readonly string[]).includes(v), "Please select your state or jurisdiction."),
    service: z.string().trim().min(1, "Please select the type of support you're requesting.").max(120),
    description: z
      .string()
      .trim()
      .min(20, "Please describe the assistance you need (at least 20 characters).")
      .max(2000, "Please keep your description under 2,000 characters.")
      .refine(noSensitive, SENSITIVE_MSG),
    hasDeadline: z.enum(["yes", "no", "unsure"], { message: "Please tell us whether there is a deadline." }),
    deadlineDate: z.string().trim().optional().default(""),
    actingAs: z.enum(["self", "business", "authorization"], { message: "Please tell us who you're acting for." }),
    privacyAck: z.literal(true, { message: "Please acknowledge the Privacy Policy." }),
    limitationsAck: z.literal(true, { message: "Please acknowledge the service limitations." }),
    // spam controls
    company: z.string().max(0).optional().default(""), // honeypot: must stay empty
    turnstileToken: z.string().optional().default(""),
  })
  .superRefine((d, ctx) => {
    if (d.hasDeadline === "yes") {
      if (!d.deadlineDate) {
        ctx.addIssue({ code: "custom", path: ["deadlineDate"], message: "Please enter the deadline date." });
      } else if (Number.isNaN(Date.parse(d.deadlineDate))) {
        ctx.addIssue({ code: "custom", path: ["deadlineDate"], message: "Please enter a valid date." });
      }
    }
  });

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

export function flattenErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
