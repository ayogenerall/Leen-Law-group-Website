# Leen Law Group: Website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase (inquiry storage) · Resend (notifications) · Cloudflare Turnstile (spam)

> **Positioning guardrail:** Leen Law Group is presented as a consumer-support and administrative/business-support service, **not** a law firm. Source of truth: `Leen_Law_Group_Website_Build_Brief.pdf`. Don't add claims, credentials, contact details, testimonials, statistics, or pricing that the owner hasn't verified.

---

## Push to GitHub

```bash
cd leen-site
git init -b main
git add .
git commit -m "Initial commit: Leen Law Group website"
git remote add origin https://github.com/<your-account>/leen-law-group-website.git
git push -u origin main
```

Create the empty repository on GitHub first (no README, .gitignore or license, since this project already has them). Keep it **private**. `.env*` files are git-ignored, so secrets stay out of the repo; only `.env.example` is committed. GitHub Actions (`.github/workflows/ci.yml`) type-checks and builds every push and pull request.

## Quick start

```bash
npm ci
cp .env.example .env.local      # fill in values (see below)
npm run dev                     # http://localhost:3000
```

Production check: `npm run build && npm start`

### Review unpublished content locally

```bash
npm run preview      # = CONTENT_PREVIEW=true ENABLE_INTERNAL_PAGES=true next dev
```

- Any draft or pending content appears with an amber **PREVIEW** badge.
- `/admin/verification` shows the owner checklist, service status, policy status, and unverified business fields.
- Preview builds automatically send `noindex` and `Disallow: /`. **Never deploy with either flag on.**

---

## Pages

| Route | Status |
|---|---|
| `/` Home | Live |
| `/about` | Live. Founder: Patricia Leen, Paralegal and Consumer Advocate. The biography appears once it's added and verified. |
| `/services` | Live: directory of all 9 services with category filtering |
| `/consumer-support` | Live (Consumer Advocacy & Administrative Support) |
| `/business-startup` | Live (Business Creation & Startup Administration) |
| `/notary` | Live (Notary Services) |
| `/services/attorney-in-fact` | Live |
| `/services/credit-dispute-document-assistance` | Live |
| `/services/foreign-grantor-trust-ein-setup` | Live |
| `/services/trust-planning-coordination` | Live |
| `/services/tax-preparation-referrals` | Live |
| `/services/irs-508c1a-educational-support` | Live |
| `/resources`, `/resources/[slug]` | Live: 6 articles, search, category filter, related articles |
| `/faq` | Live, with FAQPage JSON-LD |
| `/contact` | Live: validated form posting to `/api/inquiry` |
| `/legal` + 6 policies | Live, labelled **"Draft under professional review"** until each is approved |
| `/admin/verification` | Internal; 404 unless `ENABLE_INTERNAL_PAGES=true` |
| `/sitemap.xml`, `/robots.txt` | Generated from published content only |

Old service URLs redirect permanently (see `next.config.ts`):

| Old URL | Redirects to |
|---|---|
| `/services/consumer-administrative-support` | `/consumer-support` |
| `/services/business-startup-administration` | `/business-startup` |
| `/services/notary-services` | `/notary` |
| `/services/authorized-representative-support` | `/services/attorney-in-fact` |

## Adding the business email, phone and biography

Edit `src/content/business-profile.ts`. For each field, set `value` and `verified: true`:

```ts
email: { value: "hello@yourdomain.com", verified: true },
phone: { value: "(555) 555-5555", verified: true },
founderBio: { value: "Patricia Leen is...", verified: true },
```

Email and phone then appear in the footer and on the contact page; the biography appears on the About page. Unverified fields never render.

---

## Editing content (no component changes needed)

| What | File |
|---|---|
| Services: copy, includes, eligibility, limitations, FAQs, **status** | `src/content/services.ts` |
| Publish the notary page / explainer pages | `src/content/pages.ts` |
| FAQs | `src/content/faqs.ts` |
| Resource articles | `src/content/articles.ts` |
| Business facts (email, phone, entity, founder) | `src/content/business-profile.ts`: set `value` **and** `verified: true` |
| Policies (set `approved: true` + `effectiveDate` after counsel signs off) | `src/content/legal.ts` |
| Owner checklist | `src/content/verification.ts` |

**Publishing or hiding a service:** set `status: "published"` (with `ownerApprovedAt: "YYYY-MM-DD"`), or `status: "pending_verification"` to hide it. The nav, footer, directory, home page, contact form options, and sitemap update automatically.

Statuses: `published`, `draft`, `pending_verification`, `disabled`.

---

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | Canonical URLs, sitemap, Open Graph (set to the verified domain) |
| `SUPABASE_URL` | **server** | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | **server, secret** | Inserts inquiries. Never prefix with `NEXT_PUBLIC_`. |
| `RESEND_API_KEY` | **server, secret** | Email notification on each inquiry |
| `INQUIRY_NOTIFY_EMAIL` | server | Owner inbox that receives notifications |
| `INQUIRY_FROM_EMAIL` | server | Verified sender address on your domain |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | public | Turnstile widget (optional but recommended) |
| `TURNSTILE_SECRET_KEY` | **server, secret** | Turnstile verification |
| `INQUIRY_RETENTION_DAYS` | reference | Retention period to set in the purge job |
| `CONTENT_PREVIEW` | server | `true` = show drafts (**never in production**) |
| `ENABLE_INTERNAL_PAGES` | server | `true` = enable `/admin/verification` (**not auth-protected**) |

**Form behaviour without integrations:** in development, submissions succeed without being stored. In production with neither Supabase nor Resend configured, the API returns a clear "temporarily unavailable" error, so inquiries are never silently lost.

---

## Supabase setup

1. Create a project and run `supabase/migrations/20261121000000_inquiries.sql` in the SQL editor.
2. RLS is enabled with **no** anon or authenticated policies. Only the server (service role) can insert, and nobody can read through the public API.
3. Read inquiries in the Supabase dashboard (Table editor, then `inquiries`).
4. Retention: enable `pg_cron`, uncomment the purge job in the migration, and set the owner-approved interval.

## Deploy (Vercel)

1. Push this folder to a Git repository and import it in Vercel (framework: Next.js).
2. Add the environment variables above (Production scope). Leave `CONTENT_PREVIEW` and `ENABLE_INTERNAL_PAGES` unset.
3. Add the verified domain and set `NEXT_PUBLIC_SITE_URL` to match.
4. Submit a test inquiry and confirm the row appears in Supabase and the email arrives.

---

## Security & privacy

- The public form never asks for SSNs, account numbers, IDs, credit reports, medical records, or signed POAs. Client and server both reject SSN-like and 12+ digit sequences.
- The API checks: same-origin, body size cap, per-IP rate limit (in-memory; swap for Redis/Upstash on multi-instance hosting), honeypot, Turnstile, zod re-validation, and an allow-list of service values.
- Security headers are set in `next.config.ts` (HSTS, nosniff, frame-deny, referrer, permissions).
- **There is no secure upload or client portal.** The schema notes reserve a design (Supabase Auth + RLS by `auth.uid()` + private Storage), to be built only after a security and retention plan is approved.

## Accessibility

Semantic landmarks, skip link, one `h1` per page, keyboard-operable menus (focus trap + Escape on mobile), ARIA accordion pattern, labelled form fields with inline and summary errors, visible focus rings, AA contrast (tokens checked), and `prefers-reduced-motion` support.

## Brand assets

- `public/brand/leen-emblem-gold.*`: the 3D gold emblem (crown and figure) cropped from `brand-source/leen-3d-gold-original.png`, background removed
- `public/brand/leen-wordmark-gold.*`: the "LEEN LAW GROUP" text logo, cropped from the original gold lockup (unchanged)
- `public/brand/leen-logo-gold.*`: footer / schema lockup = 3D emblem above the text logo
- `public/brand/leen-logo-black.*`: black lockup with the white background removed (request an official transparent/SVG export)
- `public/images/founder-portrait.*`: the only founder photo supplied

## Requirements

- Node.js 20.9 or newer (`.nvmrc` pins 22)
- npm (a lockfile is committed, so use `npm ci`)

## License

Proprietary. © Leen Law Group. All rights reserved. Not for redistribution.
