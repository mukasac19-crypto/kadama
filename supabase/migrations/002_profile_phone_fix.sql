-- ============================================================
-- Fix: store the phone number entered on the signup form.
-- The form saves it in user metadata; the original trigger only
-- read auth.users.phone (used for OTP auth, always null here).
-- Run this in the Supabase SQL Editor.
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    coalesce(new.phone, new.raw_user_meta_data ->> 'phone')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Backfill phones for anyone who already signed up via the form.
update public.profiles p
set phone = u.raw_user_meta_data ->> 'phone'
from auth.users u
where u.id = p.id
  and p.phone is null
  and coalesce(u.raw_user_meta_data ->> 'phone', '') <> '';
