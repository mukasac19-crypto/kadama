-- ============================================================
-- Maid intro videos. Stored in a PRIVATE bucket; streamed only
-- to signed-in users through /api/img/video/<id>.
-- Run this in the Supabase SQL Editor.
-- ============================================================

create table public.maid_videos (
  id uuid primary key default gen_random_uuid(),
  maid_id uuid not null references public.maids (id) on delete cascade,
  video_path text not null, -- object path in private bucket 'maid-videos'
  created_at timestamptz not null default now()
);

create index maid_videos_maid_idx on public.maid_videos (maid_id);

alter table public.maid_videos enable row level security;

-- Anyone may know a video EXISTS for a listed maid (to show the
-- "sign in to watch" teaser) — the file itself stays locked.
create policy "videos: visible with their maid" on public.maid_videos
  for select using (
    public.is_admin()
    or exists (
      select 1 from public.maids m
      where m.id = maid_id and m.status in ('published', 'reserved')
    )
  );

create policy "videos: admin insert" on public.maid_videos
  for insert with check (public.is_admin());

create policy "videos: admin delete" on public.maid_videos
  for delete using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('maid-videos', 'maid-videos', false)
on conflict (id) do nothing;
