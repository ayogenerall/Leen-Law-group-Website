"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/primitives";
import { ACTING_AS, US_JURISDICTIONS, flattenErrors, inquirySchema } from "@/lib/inquiry-schema";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "mt-2 block w-full rounded-[2px] border bg-white px-4 py-3 text-[0.9375rem] text-ink placeholder:text-slate/70 transition-colors focus:border-deep-teal";

declare global {
  interface Window {
    turnstile?: { reset: (el?: string | HTMLElement) => void };
  }
}

export function InquiryForm({
  serviceOptions,
  defaultService,
  turnstileSiteKey,
}: {
  serviceOptions: { value: string; label: string }[];
  defaultService?: string;
  turnstileSiteKey?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [hasDeadline, setHasDeadline] = useState("");
  const [descLen, setDescLen] = useState(0);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function readForm() {
    const fd = new FormData(formRef.current!);
    return {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      jurisdiction: String(fd.get("jurisdiction") ?? ""),
      service: String(fd.get("service") ?? ""),
      description: String(fd.get("description") ?? ""),
      hasDeadline: String(fd.get("hasDeadline") ?? "") as "yes",
      deadlineDate: String(fd.get("deadlineDate") ?? ""),
      actingAs: String(fd.get("actingAs") ?? "") as "self",
      privacyAck: fd.get("privacyAck") === "on",
      limitationsAck: fd.get("limitationsAck") === "on",
      company: String(fd.get("company") ?? ""),
      turnstileToken: String(fd.get("cf-turnstile-response") ?? ""),
    };
  }

  function validateField(name: string) {
    const result = inquirySchema.safeParse(readForm());
    const all = result.success ? {} : flattenErrors(result.error);
    setErrors((prev) => {
      const next = { ...prev };
      if (all[name]) next[name] = all[name];
      else delete next[name];
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setServerMessage("");
    const data = readForm();
    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      setErrors(flattenErrors(parsed.error));
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Record<string, string> };
      if (res.ok && body.ok) {
        setStatus("success");
        formRef.current?.reset();
        return;
      }
      if (body.errors) setErrors(body.errors);
      setServerMessage(body.message || "Something went wrong while sending your request. Please try again.");
      setStatus("error");
      window.turnstile?.reset();
      requestAnimationFrame(() => summaryRef.current?.focus());
    } catch {
      setServerMessage("We couldn't reach the server. Please check your connection and try again.");
      setStatus("error");
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="border border-deep-teal/40 bg-white p-8 outline-none sm:p-12">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-deep-teal text-white">
          <Icon name="check" className="h-7 w-7" strokeWidth={2} />
        </span>
        <h2 className="t-h2 mt-7">Thank you, your request has been received.</h2>
        <p className="mt-4 max-w-[60ch] text-[0.9375rem] leading-relaxed text-slate">
          We'll review whether your request fits our administrative service scope and jurisdiction. If it does, you'll receive a written
          scope, fees, and timing before any work begins. Please don't send documents until we tell you which ones are needed and how to
          send them securely.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className={`${buttonClass("light")} mt-8`}>
          Submit another request
        </button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const err = (name: string) => errors[name];
  const describedBy = (name: string, hint?: boolean) =>
    [hint ? `${name}-hint` : null, err(name) ? `${name}-error` : null].filter(Boolean).join(" ") || undefined;
  const cls = (name: string) => `${fieldBase} ${err(name) ? "border-red-700" : "border-ink/20 hover:border-ink/40"}`;

  const ErrorText = ({ name }: { name: string }) =>
    err(name) ? (
      <p id={`${name}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-800">
        <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" /> {err(name)}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-intro" className="space-y-8">
      {turnstileSiteKey && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}

      <div
        ref={summaryRef}
        tabIndex={-1}
        aria-live="assertive"
        className={errorCount || serverMessage ? "border-l-4 border-red-700 bg-red-50 p-5 outline-none" : "sr-only"}
      >
        {(errorCount > 0 || serverMessage) && (
          <>
            <p className="font-semibold text-red-900">
              {serverMessage || `Please correct ${errorCount} ${errorCount === 1 ? "field" : "fields"} below.`}
            </p>
            {errorCount > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-900">
                {Object.entries(errors).map(([k, v]) => (
                  <li key={k}>
                    <a href={`#${k}`} className="underline">
                      {v}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>

      <div className="border-l-4 border-[#7d6518] bg-[#fbf6e6] p-5 text-sm leading-relaxed text-ink" id="form-intro">
        <p className="flex items-center gap-2 font-semibold">
          <Icon name="shield" className="h-4 w-4 text-[#7d6518]" /> Please don't include sensitive information
        </p>
        <p className="mt-1.5 text-slate">
          Don't enter Social Security numbers, full account or card numbers, ID documents, credit reports, medical records, or signed
          authorizations. If documents are needed, we'll arrange a secure channel after reviewing your request.
        </p>
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="t-h3 mb-6">Your details</legend>
        <div>
          <label htmlFor="firstName" className="text-sm font-semibold">
            First name <span aria-hidden="true" className="text-red-800">*</span>
          </label>
          <input id="firstName" name="firstName" autoComplete="given-name" required aria-required="true" aria-invalid={!!err("firstName")} aria-describedby={describedBy("firstName")} onBlur={() => validateField("firstName")} className={cls("firstName")} />
          <ErrorText name="firstName" />
        </div>
        <div>
          <label htmlFor="lastName" className="text-sm font-semibold">
            Last name <span aria-hidden="true" className="text-red-800">*</span>
          </label>
          <input id="lastName" name="lastName" autoComplete="family-name" required aria-required="true" aria-invalid={!!err("lastName")} aria-describedby={describedBy("lastName")} onBlur={() => validateField("lastName")} className={cls("lastName")} />
          <ErrorText name="lastName" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold">
            Email <span aria-hidden="true" className="text-red-800">*</span>
          </label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required aria-required="true" aria-invalid={!!err("email")} aria-describedby={describedBy("email")} onBlur={() => validateField("email")} className={cls("email")} />
          <ErrorText name="email" />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-semibold">
            Phone <span className="font-normal text-slate">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!err("phone")} aria-describedby={describedBy("phone")} onBlur={() => validateField("phone")} className={cls("phone")} />
          <ErrorText name="phone" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="jurisdiction" className="text-sm font-semibold">
            State or jurisdiction <span aria-hidden="true" className="text-red-800">*</span>
          </label>
          <select id="jurisdiction" name="jurisdiction" defaultValue="" required aria-required="true" aria-invalid={!!err("jurisdiction")} aria-describedby={describedBy("jurisdiction", true)} onBlur={() => validateField("jurisdiction")} className={cls("jurisdiction")}>
            <option value="" disabled>
              Select
            </option>
            {US_JURISDICTIONS.map((j) => (
              <option key={j}>{j}</option>
            ))}
          </select>
          <p id="jurisdiction-hint" className="mt-2 text-sm text-slate">
            The state whose rules or agencies your request involves.
          </p>
          <ErrorText name="jurisdiction" />
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="t-h3 mb-6">Your request</legend>
        <div>
          <label htmlFor="service" className="text-sm font-semibold">
            Requested service <span aria-hidden="true" className="text-red-800">*</span>
          </label>
          <select id="service" name="service" defaultValue={defaultService ?? ""} required aria-required="true" aria-invalid={!!err("service")} aria-describedby={describedBy("service")} onBlur={() => validateField("service")} className={cls("service")}>
            <option value="" disabled>
              Select
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ErrorText name="service" />
        </div>

        <div>
          <label htmlFor="description" className="text-sm font-semibold">
            Brief description of the assistance{"\u00a0"}needed{"\u00a0"}<span aria-hidden="true" className="text-red-800">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            maxLength={2000}
            required
            aria-required="true"
            aria-invalid={!!err("description")}
            aria-describedby={describedBy("description", true)}
            onBlur={() => validateField("description")}
            onChange={(e) => setDescLen(e.target.value.length)}
            className={cls("description")}
          />
          <p id="description-hint" className="mt-2 flex justify-between gap-4 text-sm text-slate">
            <span>A short summary is enough. No account numbers or personal identifiers.</span>
            <span aria-hidden="true">{descLen}/2000</span>
          </p>
          <ErrorText name="description" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <fieldset aria-describedby={describedBy("hasDeadline")}>
            <legend className="text-sm font-semibold">
              Is there a deadline? <span aria-hidden="true" className="text-red-800">*</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                ["yes", "Yes"],
                ["no", "No"],
                ["unsure", "Not sure"],
              ].map(([v, l]) => (
                <label key={v} className="flex min-h-11 cursor-pointer items-center gap-2.5 border border-ink/20 bg-white px-4 has-[:checked]:border-deep-teal has-[:checked]:bg-deep-teal/5">
                  <input type="radio" name="hasDeadline" id={v === "yes" ? "hasDeadline" : undefined} value={v} onChange={(e) => { setHasDeadline(e.target.value); setErrors((p) => { const n = { ...p }; delete n.hasDeadline; return n; }); }} className="h-4 w-4 accent-[#06706b]" />
                  <span className="text-[0.9375rem]">{l}</span>
                </label>
              ))}
            </div>
            <ErrorText name="hasDeadline" />
          </fieldset>
          {(
            <div id="deadline-wrap" hidden={hasDeadline !== "yes"}>
              <label htmlFor="deadlineDate" className="text-sm font-semibold">
                Deadline date <span aria-hidden="true" className="text-red-800">*</span>
              </label>
              <input id="deadlineDate" name="deadlineDate" type="date" disabled={hasDeadline !== "yes"} required aria-required="true" aria-invalid={!!err("deadlineDate")} aria-describedby={describedBy("deadlineDate", true)} onBlur={() => validateField("deadlineDate")} className={cls("deadlineDate")} />
              <p id="deadlineDate-hint" className="mt-2 text-sm text-slate">
                If a court date or lawsuit is involved, please contact a licensed attorney promptly.
              </p>
              <ErrorText name="deadlineDate" />
            </div>
          )}
        </div>

        <fieldset aria-describedby={describedBy("actingAs")}>
          <legend className="text-sm font-semibold">
            Are you acting for yourself or under an authorization? <span aria-hidden="true" className="text-red-800">*</span>
          </legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {ACTING_AS.map((o, i) => (
              <label key={o.value} className="flex min-h-11 cursor-pointer items-start gap-2.5 border border-ink/20 bg-white px-4 py-3 has-[:checked]:border-deep-teal has-[:checked]:bg-deep-teal/5">
                <input type="radio" name="actingAs" id={i === 0 ? "actingAs" : undefined} value={o.value} onChange={() => setErrors((p) => { const n = { ...p }; delete n.actingAs; return n; })} className="mt-1 h-4 w-4 shrink-0 accent-[#06706b]" />
                <span className="text-[0.9375rem] leading-snug">{o.label}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate">Please don't upload or attach authorization documents here.</p>
          <ErrorText name="actingAs" />
        </fieldset>
      </fieldset>

      <fieldset className="space-y-4 border-t border-ink/12 pt-8">
        <legend className="sr-only">Acknowledgments</legend>
        {[
          {
            name: "privacyAck",
            label: (
              <>
                I have read the{" "}
                <Link href="/legal/privacy" className="font-semibold text-deep-teal underline underline-offset-4" target="_blank">
                  Privacy Policy
                </Link>{" "}
                and consent to Leen Law Group using this information to respond to my request.
              </>
            ),
          },
          {
            name: "limitationsAck",
            label: (
              <>
                I understand Leen Law Group is not a law firm, does not provide legal advice or representation, and that submitting this form
                does not create an attorney-client relationship or engage any service.{" "}
                <Link href="/legal/service-limitations" className="font-semibold text-deep-teal underline underline-offset-4" target="_blank">
                  Service limitations
                </Link>
              </>
            ),
          },
        ].map((c) => (
          <div key={c.name}>
            <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-slate">
              <input
                id={c.name}
                name={c.name}
                type="checkbox"
                required
                aria-required="true"
                aria-invalid={!!err(c.name)}
                aria-describedby={err(c.name) ? `${c.name}-error` : undefined}
                onChange={() => validateField(c.name)}
                className="mt-1 h-5 w-5 shrink-0 accent-[#06706b]"
              />
              <span>
                {c.label} <span aria-hidden="true" className="text-red-800">*</span>
              </span>
            </label>
            <ErrorText name={c.name} />
          </div>
        ))}
      </fieldset>

      {turnstileSiteKey && <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-theme="light" />}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "submitting"} aria-disabled={status === "submitting"} className={`${buttonClass("primary")} !bg-deep-teal !text-white hover:!bg-[#055d59] sm:min-w-56`}>
          {status === "submitting" ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
                <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Submit Request <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
        <p className="text-sm text-slate">
          Fields marked <span className="text-red-800">*</span> are required.
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Submitting your request" : ""}
      </p>
    </form>
  );
}
