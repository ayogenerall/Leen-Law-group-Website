import type { PublishStatus } from "./types";

/** Publication status for standalone pages that depend on owner verification. */
export const pageStatus: Record<string, { status: PublishStatus; note: string }> = {
  notary: {
    status: "published",
    note: "Publish only after commission, state, permitted acts, availability, and in-person/remote status are verified.",
  },
  "consumer-support": { status: "published", note: "Explainer page using 'may include' language from PDF §4A." },
  "business-startup": { status: "published", note: "Explainer page using 'may include' language from PDF §4E." },
};
