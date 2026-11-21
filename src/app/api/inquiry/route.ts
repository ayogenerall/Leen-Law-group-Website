import { NextResponse } from "next/server";
import { inquirySchema, flattenErrors } from "@/lib/inquiry-schema";
import { getServiceOptions } from "@/lib/service-options";
import { rateLimit } from "@/lib/rate-limit";
import { saveInquiry, notifyOwner, verifyTurnstile, integrationsConfigured } from "@/lib/inquiry-store";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_000;

export async function POST(req: Request) {
  // Same-origin check (defence in depth against cross-site form posts)
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, message: "Invalid request origin." }, { status: 403 });
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(`inquiry:${ip}`, 5, 10 * 60_000)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, message: "Request too large." }, { status: 413 });
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) {
    const errors = flattenErrors(parsed.error);
    // Honeypot tripped: pretend success so bots learn nothing.
    if (errors.company) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, message: "Please correct the highlighted fields.", errors }, { status: 422 });
  }
  const data = parsed.data;

  if (!getServiceOptions().some((o) => o.value === data.service)) {
    return NextResponse.json(
      { ok: false, message: "Please select a valid service.", errors: { service: "Please select a valid service." } },
      { status: 422 },
    );
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    const human = await verifyTurnstile(data.turnstileToken, ip);
    if (!human) {
      return NextResponse.json({ ok: false, message: "Spam check failed. Please try again." }, { status: 400 });
    }
  }

  const { storage, email } = integrationsConfigured();
  if (!storage && !email) {
    if (process.env.NODE_ENV !== "production") {
      // Development only: accept without persisting. No personal data is logged.
      console.info("[inquiry] received (dev mode, not stored). Service:", data.service);
      return NextResponse.json({ ok: true, dev: true });
    }
    return NextResponse.json(
      {
        ok: false,
        message: "Online requests are temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }

  try {
    let stored = false;
    if (storage) {
      await saveInquiry(data);
      stored = true;
    }
    if (email) {
      try {
        await notifyOwner(data);
      } catch (e) {
        // If the inquiry was stored, a failed notification shouldn't fail the request.
        if (!stored) throw e;
        console.error("[inquiry] notification failed:", (e as Error).message);
      }
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[inquiry] failed:", (e as Error).message);
    return NextResponse.json(
      { ok: false, message: "We couldn't save your request right now. Please try again shortly." },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}
