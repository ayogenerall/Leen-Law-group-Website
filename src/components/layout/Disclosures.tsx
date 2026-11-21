import Link from "next/link";
import { generalDisclaimer } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";

/** Slim persistent notice rendered above the footer on every page. */
export function DisclosureBar() {
  return (
    <aside aria-label="Important notice" className="border-t border-graphite bg-charcoal">
      <div className="container-x flex items-start gap-3 py-4 text-[0.8125rem] leading-relaxed text-mist sm:items-center">
        <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-champagne sm:mt-0" />
        <p>
          <strong className="font-semibold text-ivory">Important:</strong> Leen Law Group provides administrative and consumer-support
          services. We are not a law firm, and we do not provide legal advice or create an attorney-client relationship.{" "}
          <Link href="/legal/service-limitations" className="text-turquoise underline underline-offset-4">
            Service limitations
          </Link>
        </p>
      </div>
    </aside>
  );
}

/** Framed full disclaimer panel used on Home, Services, and Contact. */
export function DisclosurePanel({ light = false, id }: { light?: boolean; id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby="disclosure-heading"
      className={`relative border p-7 sm:p-10 ${light ? "border-ink/15 bg-white" : "border-champagne/30 bg-charcoal"}`}
    >
      <span aria-hidden="true" className="absolute -top-px left-8 h-px w-24 bg-champagne" />
      <div className="sm:flex sm:items-start sm:gap-4">
        <span
          className={`mb-4 flex h-10 w-10 shrink-0 sm:mb-0 items-center justify-center rounded-full border ${
            light ? "border-deep-teal/40 text-deep-teal" : "border-champagne/50 text-champagne"
          }`}
        >
          <Icon name="shield" className="h-5 w-5" />
        </span>
        <div>
          <h2 id="disclosure-heading" className="t-h3">
            Professional disclosure
          </h2>
          <p className={`mt-3 max-w-[78ch] text-[0.9375rem] leading-relaxed ${light ? "text-slate" : "text-mist"}`}>{generalDisclaimer}</p>
          <p className={`mt-4 max-w-[78ch] text-[0.9375rem] ${light ? "text-slate" : "text-mist"}`}>
            No results are guaranteed. We do not promise credit-score increases, removal of accurate information, debt elimination,
            tax-exempt status, government approvals, funding, or legal outcomes.{" "}
            <Link href="/legal" className={`${light ? "text-deep-teal" : "text-turquoise"} underline underline-offset-4`}>
              All disclosures & policies
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
