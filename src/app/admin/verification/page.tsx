import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { verificationChecklist } from "@/content/verification";
import { services } from "@/content/services";
import { businessProfile } from "@/content/business-profile";
import { pageStatus } from "@/content/pages";
import { policies } from "@/content/legal";
import { statusLabel } from "@/lib/content";

/**
 * INTERNAL owner-verification dashboard.
 * Enabled only when ENABLE_INTERNAL_PAGES=true. It is NOT protected by authentication, so
 * keep it disabled in production until real auth (e.g. Supabase Auth) guards /admin.
 */
export const metadata: Metadata = { title: "Owner verification (internal)", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const Pill = ({ ok, children }: { ok: boolean; children: React.ReactNode }) => (
  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${ok ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}>{children}</span>
);

export default function VerificationPage() {
  if (process.env.ENABLE_INTERNAL_PAGES !== "true") notFound();

  const total = verificationChecklist.flatMap((g) => g.items);
  const done = total.filter((i) => i.done).length;
  const blockers = total.filter((i) => i.blocksLaunch && !i.done).length;
  const profileFields = Object.entries(businessProfile).filter(([, v]) => typeof v === "object" && v && "verified" in v) as [string, { verified: boolean; note?: string }][];

  return (
    <div className="bg-obsidian pt-20">
    <div className="surface-light bg-ivory pb-24 pt-14 text-ink">
      <div className="container-x">
        <p className="t-eyebrow">Internal · not public</p>
        <h1 className="t-h1 mt-4">Pre-launch owner verification</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-ink/12 bg-white p-5"><p className="text-sm text-slate">Checklist complete</p><p className="font-serif text-4xl">{done}/{total.length}</p></div>
          <div className="border border-ink/12 bg-white p-5"><p className="text-sm text-slate">Launch blockers open</p><p className="font-serif text-4xl text-red-800">{blockers}</p></div>
          <div className="border border-ink/12 bg-white p-5"><p className="text-sm text-slate">Services published</p><p className="font-serif text-4xl">{services.filter((s) => s.status === "published").length}/{services.length}</p></div>
        </div>

        <h2 className="t-h2 mt-16">Services</h2>
        <div className="mt-6 overflow-x-auto border border-ink/12 bg-white">
          <table className="w-full min-w-[48rem] text-left text-sm">
            <thead className="bg-linen"><tr><th className="p-3">Service</th><th className="p-3">Status</th><th className="p-3">Legal review</th><th className="p-3">Notes</th></tr></thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.slug} className="border-t border-ink/10 align-top">
                  <td className="p-3 font-semibold">{s.title}</td>
                  <td className="p-3"><Pill ok={s.status === "published"}>{statusLabel[s.status]}</Pill></td>
                  <td className="p-3">{s.requiresLegalReview ? "⚠️ Required" : "Not required"}</td>
                  <td className="p-3 text-slate">{s.reviewNotes}</td>
                </tr>
              ))}
              {Object.entries(pageStatus).map(([k, v]) => (
                <tr key={k} className="border-t border-ink/10 align-top">
                  <td className="p-3 font-semibold">Page: /{k}</td>
                  <td className="p-3"><Pill ok={v.status === "published"}>{statusLabel[v.status]}</Pill></td>
                  <td className="p-3">{k === "notary" ? "⚠️ Required" : "Not required"}</td>
                  <td className="p-3 text-slate">{v.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="t-h2 mt-16">Policies</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {policies.map((p) => (
            <li key={p.slug} className="flex items-center justify-between border border-ink/12 bg-white p-4"><span className="font-semibold">{p.title}</span><Pill ok={p.approved}>{p.approved ? "Approved" : "Attorney review"}</Pill></li>
          ))}
        </ul>

        <h2 className="t-h2 mt-16">Business profile fields</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {profileFields.map(([k, v]) => (
            <li key={k} className="border border-ink/12 bg-white p-4">
              <div className="flex items-center justify-between gap-3"><code className="text-sm">{k}</code><Pill ok={v.verified}>{v.verified ? "Verified" : "Unverified"}</Pill></div>
              {v.note && <p className="mt-2 text-xs text-slate">{v.note}</p>}
            </li>
          ))}
        </ul>

        <h2 className="t-h2 mt-16">Checklist</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {verificationChecklist.map((g) => (
            <section key={g.group} className="border border-ink/12 bg-white p-6">
              <h3 className="t-h3">{g.group}</h3>
              <ul className="mt-4 space-y-3">
                {g.items.map((i) => (
                  <li key={i.item} className="flex items-start gap-3 text-sm">
                    <span aria-hidden="true" className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${i.done ? "border-emerald-700 bg-emerald-700 text-white" : "border-ink/30"}`}>{i.done ? "✓" : ""}</span>
                    <span>
                      <span className="sr-only">{i.done ? "Done: " : "Open: "}</span>
                      {i.item}
                      {i.blocksLaunch && !i.done && <span className="ml-2 text-xs font-bold text-red-800">BLOCKS LAUNCH</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm text-slate">Edit items in <code>src/content/verification.ts</code>, services in <code>src/content/services.ts</code>, business facts in <code>src/content/business-profile.ts</code>.</p>
      </div>
    </div>
    </div>
  );
}
