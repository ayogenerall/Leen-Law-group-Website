import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service/ServiceDetail";
import { CtaBand } from "@/components/sections/shared";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Business Startup Support",
  description:
    "Business startup administration: checklists, filing assistance using client-approved information, EIN guidance, document organization, and professional referrals.",
  alternates: { canonical: "/business-startup" },
};

export default function BusinessStartupPage() {
  return (
    <>
      <ServiceDetail
        icon="briefcase"
        title="Business Startup Support"
        summary="Organized, step-by-step administrative support for entrepreneurs working through the paperwork of starting a business."
        description={[
          "Starting a business means many administrative steps across agencies, accounts, and documents. Our startup administration support is designed to help you stay organized and understand the general sequence of tasks.",
          "Your written scope will state clearly who files each document. You remain responsible for the accuracy of the information you provide, and decisions with legal or tax consequences, such as choosing an entity type, are referred to qualified professionals.",
        ]}
        includesHeading="Possible administrative assistance"
        includes={[
          "Business startup checklists",
          "Entity-formation filing assistance using client-approved information",
          "EIN application guidance",
          "Business contact setup",
          "Document organization",
          "Operational templates",
          "Professional referrals (accountants, attorneys, registered agents)",
        ]}
        eligibility={["Entrepreneurs and small-business owners organizing startup administration"]}
        limitations={[
          "We do not guarantee business registration, EIN issuance, business credit, grants, contracts, or funding.",
          "We do not advise which entity type to choose or its tax treatment. Please consult an attorney or tax professional.",
          "Government filing fees are separate from any service fee and are paid to the relevant agency.",
          "Availability, scope, and fees are confirmed in writing during service review.",
        ]}
        cta={{ label: "Request Support", href: "/contact?service=business-startup-administration" }}
      >
        <Reveal className="mt-14 border-l-2 border-deep-teal bg-white px-6 py-6">
          <h2 className="t-h3">Free startup checklist</h2>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">
            Our general startup administrative checklist, with links to official SBA and IRS resources.
          </p>
          <div className="mt-4">
            <TextLink href="/resources/business-startup-checklist" light>
              Read the checklist
            </TextLink>
          </div>
        </Reveal>
      </ServiceDetail>
      <CtaBand />
    </>
  );
}
