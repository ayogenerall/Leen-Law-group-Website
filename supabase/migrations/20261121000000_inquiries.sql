-- Leen Law Group: public inquiry intake
-- Least privilege: RLS on, NO policies for anon/authenticated, so the public API keys cannot read or write.
-- Inserts happen only server-side via the service role (which bypasses RLS) in /api/inquiry.
-- Sensitive records (SSNs, account numbers, IDs, credit reports, signed POAs) are NOT collected here.

create table if not exists public.inquiries (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  first_name      text not null check (char_length(first_name) between 1 and 80),
  last_name       text not null check (char_length(last_name) between 1 and 80),
  email           text not null check (char_length(email) <= 200),
  phone           text check (char_length(phone) <= 30),
  jurisdiction    text not null,
  service         text not null,
  description     text not null check (char_length(description) between 20 and 2000),
  has_deadline    text not null check (has_deadline in ('yes','no','unsure')),
  deadline_date   date,
  acting_as       text not null check (acting_as in ('self','business','authorization')),
  privacy_ack     boolean not null check (privacy_ack),
  limitations_ack boolean not null check (limitations_ack),
  status          text not null default 'new' check (status in ('new','in_review','in_scope','referred','closed'))
);

alter table public.inquiries enable row level security;
revoke all on public.inquiries from anon, authenticated;

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);

-- Retention: purge inquiries older than the owner-approved period.
-- Default 90 days. CHANGE to the approved value. Requires the pg_cron extension (Database > Extensions).
-- create extension if not exists pg_cron;
-- select cron.schedule(
--   'purge-old-inquiries',
--   '15 3 * * *',
--   $$ delete from public.inquiries where created_at < now() - interval '90 days' $$
-- );

-- FUTURE (not active): client portal -- Reserved design, NOT deployed. Build only after a security + retention plan is approved:
--   profiles(id = auth.uid()), matters(client_id references profiles.id), documents(matter_id, storage_path)
--   RLS: using (client_id = auth.uid()); private Storage bucket with signed URLs; audit log.
