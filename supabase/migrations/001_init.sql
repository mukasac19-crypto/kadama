-- ============================================================
-- Maid Link — initial schema
-- Run this in the Supabase SQL Editor (or `supabase db push`).
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- profiles (families + admin staff) ----------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'family' check (role in ('family', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "profiles: read own or admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);

-- auto-create a profile row on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.phone)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- shared trigger: keep updated_at fresh ----------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- agencies (internal records only — agencies never log in) ----------
create table public.agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_name text,
  whatsapp text,
  phone text,
  email text,
  license_no text,
  emirate text,
  commission_terms text,
  notes text,
  is_house boolean not null default false, -- true = Maid Link's own pool
  created_at timestamptz not null default now()
);

alter table public.agencies enable row level security;

create policy "agencies: admin only" on public.agencies
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- maids ----------
create sequence public.maid_code_seq start 101;

create table public.maids (
  id uuid primary key default gen_random_uuid(),
  code text not null unique
    default ('ML-' || lpad(nextval('public.maid_code_seq')::text, 4, '0')),
  agency_id uuid references public.agencies (id) on delete set null,
  full_name text not null,
  nationality text not null,
  date_of_birth date,
  religion text,
  marital_status text,
  children_count int,
  emirate text,
  visa_status text check (visa_status in
    ('inside_transferable', 'inside_visit', 'inside_cancelled', 'outside_country')),
  live_arrangement text check (live_arrangement in ('live_in', 'live_out', 'either')),
  expected_salary_aed int,
  experience_years int not null default 0,
  languages text[] not null default '{}',
  skills text[] not null default '{}',
  bio text,
  status text not null default 'draft' check (status in
    ('draft', 'review', 'published', 'reserved', 'hired', 'archived')),
  available_from date,
  last_confirmed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index maids_status_idx on public.maids (status);
create index maids_nationality_idx on public.maids (nationality);
create index maids_emirate_idx on public.maids (emirate);

create trigger maids_touch_updated_at
  before update on public.maids
  for each row execute function public.touch_updated_at();

alter table public.maids enable row level security;

-- the public catalog: anyone can see published/reserved maids
create policy "maids: public can view listed" on public.maids
  for select using (status in ('published', 'reserved') or public.is_admin());

create policy "maids: admin insert" on public.maids
  for insert with check (public.is_admin());

create policy "maids: admin update" on public.maids
  for update using (public.is_admin());

create policy "maids: admin delete" on public.maids
  for delete using (public.is_admin());

-- ---------- maid photos (original in private bucket, blurred in public) ----------
create table public.maid_photos (
  id uuid primary key default gen_random_uuid(),
  maid_id uuid not null references public.maids (id) on delete cascade,
  original_path text not null, -- object path in private bucket 'maid-photos'
  blurred_path text not null,  -- object path in public bucket 'maid-photos-public'
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

create index maid_photos_maid_idx on public.maid_photos (maid_id);

alter table public.maid_photos enable row level security;

create policy "photos: visible with their maid" on public.maid_photos
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.maids m
      where m.id = maid_id and m.status in ('published', 'reserved')
    )
  );

create policy "photos: admin insert" on public.maid_photos
  for insert with check (public.is_admin());

create policy "photos: admin update" on public.maid_photos
  for update using (public.is_admin());

create policy "photos: admin delete" on public.maid_photos
  for delete using (public.is_admin());

-- ---------- inquiries (the revenue ledger) ----------
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  maid_id uuid references public.maids (id) on delete set null,
  agency_id uuid references public.agencies (id) on delete set null,
  user_id uuid references public.profiles (id) on delete set null,
  family_name text,
  family_phone text,
  status text not null default 'new' check (status in
    ('new', 'contacted', 'forwarded', 'interviewing', 'hired', 'closed')),
  commission_aed int,
  commission_paid boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger inquiries_touch_updated_at
  before update on public.inquiries
  for each row execute function public.touch_updated_at();

alter table public.inquiries enable row level security;

create policy "inquiries: admin only" on public.inquiries
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- WhatsApp click tracking ----------
create table public.wa_clicks (
  id bigint generated always as identity primary key,
  maid_id uuid references public.maids (id) on delete set null,
  user_id uuid,
  src text not null, -- card | profile | floating | empty | agency | home
  path text,
  created_at timestamptz not null default now()
);

alter table public.wa_clicks enable row level security;

create policy "wa_clicks: anyone can insert" on public.wa_clicks
  for insert to anon, authenticated with check (true);

create policy "wa_clicks: admin read" on public.wa_clicks
  for select using (public.is_admin());

-- ---------- storage buckets ----------
-- Originals are private (served via short-lived signed URLs to signed-in users).
-- Blurred variants are public (what anonymous visitors and Google see).
insert into storage.buckets (id, name, public)
values
  ('maid-photos', 'maid-photos', false),
  ('maid-photos-public', 'maid-photos-public', true)
on conflict (id) do nothing;

-- All storage reads/writes go through the server with the service-role key,
-- so no storage.objects policies are required.
