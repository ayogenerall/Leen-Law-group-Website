import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service/ServiceDetail";
import { CtaBand, Process } from "@/components/sections/shared";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Consumer Support",
  description:
    "Administrative consumer support: organizing account records and correspondence, client-reviewed letters, deadline tracking, and referrals. Not legal advice.",
  alternates: { canonical: "/consumer-support" },
};

export default function ConsumerSupportPage() {
  return (
    <>
      <ServiceDetail
        icon="folder"
        title="Consumer Support"
        summary="Practical, administrative help bringing order to account records, correspondence, and deadlines so you can take informed next steps."
        description={[
          "Consumer matters can involve statements, notices, and letters from several organizations arriving on different timelines. Our administrative support focuses on organizing that information, keeping track of what has happened, and helping you follow the process clearly.",
          "Any correspondence is prepared from the facts and documents you provide, and you review and approve it before it is used. When a question calls for a legal opinion or legal strategy, we'll say so and help you identify an appropriate licensed professional.",
        ]}
        includes={[
          "Organizing account records",
          "Organizing correspondence and notices",
          "Reviewing client-provided documentation for administrative purposes",
          "Preparing client-reviewed administrative correspondence",
          "Tracking responses and deadlines",
          "Identifying appropriate agencies and professional resources",
        ]}
        eligibility={[
          "Individuals who want help organizing their own consumer records and correspondence",
          "Matters within the scope and jurisdiction confirmed during service review",
        ]}
        limitations={[
          "Administrative assistance is not legal advice. We do not give individualized legal opinions or decide legal strategy.",
          "We do not represent you in court, negotiate legal claims as an attorney, or threaten litigation on your behalf.",
          "You are responsible for the accuracy of the information you provide and approve all correspondence before use.",
          "No outcome is promised or guaranteed.",
          "Availability, scope, and fees are confirmed in writing during service review.",
        ]}
        cta={{ label: "Request Support", href: "/contact?service=consumer-administrative-support" }}
      >
        <Reveal className="mt-14">
          <h2 className="t-h2">Administrative support vs. legal services</h2>
          <div className="mt-7 grid gap-px overflow-hidden border border-ink/12 bg-ink/12 sm:grid-cols-2">
            <div className="bg-white p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-deep-teal">Administrative support</p>
              <ul className="prose-leen mt-4 text-[0.9375rem] text-slate">
                <li>Organizing records and timelines</li>
                <li>Preparing letters from your facts, for your approval</li>
                <li>Tracking responses and deadlines</li>
                <li>Pointing you to agencies and professionals</li>
              </ul>
            </div>
            <div className="bg-white p-6">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#7d6518]">Requires a licensed attorney</p>
              <ul className="prose-leen mt-4 text-[0.9375rem] text-slate">
                <li>Advice about your legal rights or options</li>
                <li>Legal strategy and claim evaluation</li>
                <li>Negotiating legal claims or settlements</li>
                <li>Court filings and representation</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </ServiceDetail>
      <Process id="consumer-process" />
      <CtaBand />
    </>
  );
}
