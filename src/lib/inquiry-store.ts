import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Inquiry } from "./inquiry-schema";

/** Server-only integrations. Secrets are read from env and never reach the browser. */

export function integrationsConfigured() {
  return {
    storage: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
    email: Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_NOTIFY_EMAIL && process.env.INQUIRY_FROM_EMAIL),
  };
}

export async function saveInquiry(d: Inquiry) {
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await supabase.from("inquiries").insert({
    first_name: d.firstName,
    last_name: d.lastName,
    email: d.email,
    phone: d.phone || null,
    jurisdiction: d.jurisdiction,
    service: d.service,
    description: d.description,
    has_deadline: d.hasDeadline,
    deadline_date: d.hasDeadline === "yes" && d.deadlineDate ? d.deadlineDate : null,
    acting_as: d.actingAs,
    privacy_ack: d.privacyAck,
    limitations_ack: d.limitationsAck,
  });
  if (error) throw new Error(`supabase insert failed: ${error.code ?? ""} ${error.message}`);
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function notifyOwner(d: Inquiry) {
  const rows: [string, string][] = [
    ["Name", `${d.firstName} ${d.lastName}`],
    ["Email", d.email],
    ["Phone", d.phone || "Not provided"],
    ["Jurisdiction", d.jurisdiction],
    ["Service", d.service],
    ["Deadline", d.hasDeadline === "yes" ? d.deadlineDate : d.hasDeadline],
    ["Acting as", d.actingAs],
  ];
  const html = `<h2>New support request</h2><table cellpadding="6">${rows
    .map(([k, v]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
    .join("")}</table><p><b>Description</b></p><p style="white-space:pre-wrap">${esc(d.description)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.INQUIRY_FROM_EMAIL,
      to: [process.env.INQUIRY_NOTIFY_EMAIL],
      reply_to: d.email,
      subject: `New support request: ${d.service}`,
      html,
    }),
  });
  if (!res.ok) throw new Error(`resend failed: ${res.status}`);
}

export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token });
  if (ip && ip !== "unknown") body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}
