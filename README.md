# Maid Link

A UAE marketplace connecting families with verified maids, nannies and caregivers
sourced from licensed recruitment agencies (plus Maid Link's own pool).

Built with **Next.js 16 (App Router) + Supabase** (Postgres, Auth, Storage) and
Tailwind CSS.

## How the platform works

- **Families** browse a public catalog. Photos are **genuinely blurred** for
  anonymous visitors — signing up (free) unlocks the real photos via short-lived
  signed URLs. There is no CSS-blur trick; the original images live in a private
  bucket.
- **WhatsApp is the funnel.** Every button routes through `/api/wa`, which logs
  the click (maid, page, user) and redirects to `wa.me` with a pre-filled message
  carrying the maid's profile code. One WhatsApp Business number handles both
  family leads and agency intake.
- **Agencies never log in.** They send candidate details over WhatsApp; your team
  enters them in the admin panel and tags the source agency. Agencies are internal
  records used for lead attribution and commission tracking.
- **Freshness is enforced.** Every published listing carries a
  `last_confirmed_at` date; anything older than 7 days appears in the admin
  "stale queue" so your team re-confirms availability with the agency each morning.
- **Fully bilingual.** The public site is served in English (`/en/...`) and
  Arabic with RTL layout (`/ar/...`). The proxy redirects bare paths to the
  visitor's last-used language (`NEXT_LOCALE` cookie, default English), and the
  header has a language switcher. All UI strings and data labels (nationalities,
  skills, visa statuses…) live in `src/lib/i18n/en.ts` and `ar.ts` — edit those
  files to change wording. WhatsApp pre-filled messages are localized too. The
  admin panel is intentionally English-only.

## Setup

### 1. Create a Supabase project

Go to [supabase.com](https://supabase.com), create a project, then in the
**SQL Editor** run, in order:

1. `supabase/migrations/001_init.sql` — tables, RLS policies, storage buckets
2. `supabase/seed.sql` — demo agencies + 6 demo maids (optional)

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in:

| Variable | Where to find it |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API (anon / public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API (service_role — keep secret) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp Business number, digits only (e.g. `971501234567`) |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` locally; your domain in production |

### 2b. Enable Google sign-in (one-time)

The auth page has a "Continue with Google" button. To activate it:

1. In [Google Cloud Console](https://console.cloud.google.com) create a project →
   **APIs & Services → OAuth consent screen** (External, add your app name/logo) →
   **Credentials → Create Credentials → OAuth client ID → Web application**:
   - Authorized JavaScript origins: `https://YOUR-PROJECT-REF.supabase.co`, your
     production domain, and `http://localhost:3000`
   - Authorized redirect URI: `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`
2. In Supabase → **Authentication → Sign In / Providers → Google**: toggle it on
   and paste the Client ID + Client Secret.
3. In Supabase → **Authentication → URL Configuration**: add
   `http://localhost:3000/**` and `https://your-domain.com/**` to Redirect URLs.

Until this is done the Google button will show a generic error — email/password
works regardless.

### 3. Run it

```bash
npm install
npm run dev
```

### 4. Make yourself admin

Sign up through the site (`/signup`), then in the Supabase SQL Editor:

```sql
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

Refresh the site — an **Admin** link appears in the header.

> Tip: for local development you can turn off email confirmation in
> Supabase → Authentication → Providers → Email, so signups are instant.

## Project map

| Path | What it is |
| --- | --- |
| `src/app/page.tsx` | Home — hero, quick search, latest maids, how-it-works |
| `src/app/maids/` | Browse (filter form works without JS) + profile pages |
| `src/app/[locale]/list-your-maids/` | Landing page for agencies (WhatsApp intake CTA) |
| `src/app/[locale]/about`, `how-it-works`, `contact`, `terms`, `privacy` | Content pages — copy lives in `src/lib/i18n/{en,ar}.ts` |
| `src/app/login`, `signup`, `auth/` | Email/password auth |
| `src/app/api/wa/route.ts` | Tracked WhatsApp redirect (logs `wa_clicks`) |
| `src/app/api/admin/photos/route.ts` | Upload pipeline: original → private bucket, blurred → public |
| `src/app/admin/` | Dashboard (stats + stale queue), maids CRUD, inquiries ledger, agencies |
| `src/proxy.ts` | Session refresh + `/admin` auth gate |
| `src/lib/config.ts` | WhatsApp number, nationalities, skills, statuses — edit lists here |
| `supabase/migrations/001_init.sql` | Full schema + RLS |

## Daily operations

1. **Morning:** open Admin → Dashboard. Work the stale queue — ping each agency
   on WhatsApp, tap *Confirmed available / Reserved / Hired*.
2. **Agency sends candidates:** Admin → Maids → *Add maid*. Save as draft, upload
   photos (blur is automatic), publish.
3. **Family messages:** reply on WhatsApp, then Admin → Inquiries → *Log inquiry*
   with the maid's code. Update status as the deal progresses; record the
   commission when hired. Unpaid commissions show on the dashboard.

## Deploying

Deploy to [Vercel](https://vercel.com): import the repo, set the same env vars,
done. Update `NEXT_PUBLIC_SITE_URL` and add your production URL to Supabase →
Authentication → URL Configuration (Site URL + redirect URLs).

## Roadmap ideas (phase 2+)

- Arabic + RTL localization
- Search alerts ("notify me when a Filipina nanny in Dubai under AED 2,500 is listed")
- Video intro clips on profiles (gated like photos)
- WhatsApp Business API intake queue (semi-automated agency submissions)
- Hiring-guide content hub for SEO (MoHRE/Tadbeer process, salary benchmarks)
