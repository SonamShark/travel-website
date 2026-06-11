# Thubten Travels

A Bhutan travel-agency site with a built-in CMS, Supabase backend, and email notifications via Resend.

**Stack:** Next.js 14 (App Router) · React · Tailwind CSS · Supabase Postgres + Storage · Resend.

---

## Quick start

```bash
npm install
cp .env.example .env.local        # fill in real values
npm run dev
```

Open <http://localhost:3000>. The admin panel is at <http://localhost:3000/admin/login>.

---

## First-time Supabase setup

1. **Create a project** at <https://supabase.com>.
2. **Run the schema** in the Supabase dashboard → SQL Editor → paste [supabase/schema.sql](supabase/schema.sql) → Run. This creates every table, RLS policy, and the `uploads` storage bucket.
3. **Get keys** from Project → Settings → API:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY` (server-only)
4. **Seed the database** with the sample content from `/seed`:
   ```bash
   npm run seed
   ```
   Re-runnable — uses upsert on `slug`.

## First-time Resend setup

1. Create an account at <https://resend.com> and generate an API key → `RESEND_API_KEY`.
2. Verify a sender domain (or use `onboarding@resend.dev` while developing) → `FROM_EMAIL`.
3. Set `ADMIN_EMAIL` to wherever you want enquiry notifications delivered.

---

## Architecture

```
Browser ─► Vercel (Next.js)
            │
            ├─► Supabase Postgres  (content + enquiries)
            ├─► Supabase Storage   (image uploads — public bucket: uploads)
            └─► Resend             (admin notify + customer ack on enquiry)
```

- Public pages read via the **anon key** (RLS allows public SELECT on content tables only).
- Admin API routes write via the **service_role key** (server-only).
- The public enquiry endpoint is open but rate-limited by IP (5 / hour) via a count query against the `enquiries` table.
- Cookie-based admin session; credentials come from env vars in production, with `data/admin.json` as a local-dev fallback.

### Folder map

```
app/
  page.js                  # Home
  destinations/, packages/, holiday-types/, travel-guide/, journal/, about/, contact/, enquiry/
  admin/                   # Dashboard + CMS (auth-gated)
  api/
    auth/{login,logout}/
    destinations/, packages/, holiday-types/, blogs/  # CRUD via Supabase
    enquiries/             # public POST → DB + email; admin GET/PUT/DELETE
    site/                  # site settings KV (hero / contact / why-choose-us / testimonials)
    upload/                # multipart → Supabase Storage
components/
  Navbar, Footer, Hero, PageHeader, CtaBanner,
  DestinationCard, PackageCard, BlogCard, HolidayTypeCard,
  TestimonialCard, EnquiryForm, ImageUploader, AdminShell
lib/
  supabase/server.js       # service_role client (server-only)
  supabase/public.js       # anon client (safe everywhere)
  content.js               # public-page read helpers
  site.js                  # site_settings read helper
  crud.js                  # admin CRUD route factory
  email/resend.js          # Resend client + send helpers
  email/templates.js       # HTML email templates
  rateLimit.js             # IP-based limiter via Postgres
  auth.js, adminGuard.js   # cookie session + admin gate
  db.js                    # legacy slugify + dev-only admin file fallback
seed/                      # sample content used by `npm run seed`
supabase/
  schema.sql               # paste into Supabase SQL Editor
scripts/
  seed.mjs                 # one-shot seed runner
```

---

## Environment variables

See [.env.example](.env.example) for the full list. The non-obvious ones:

| Variable | Where | Notes |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | server only | Bypasses RLS — keep secret. |
| `RESEND_API_KEY` | server only | If unset, email sends are skipped and logged. |
| `FROM_EMAIL` | server only | Must be a verified sender in Resend. |
| `ADMIN_EMAIL` | server only | Inbox that receives new-enquiry notifications. |
| `SESSION_SECRET` | server only | Random string used as the session cookie value. |

---

## Deploying to Vercel

1. Push to GitHub (the `data/admin.json` and `.env*` are gitignored).
2. Import the repo at <https://vercel.com/new>.
3. Add every variable from `.env.example` under **Environment Variables**.
4. Deploy.

Image uploads, enquiry persistence, and admin edits all work in production because there's no longer any local-filesystem write path — everything goes to Supabase.

---

## Local development tips

- `npm run dev` — start the site on port 3000.
- `npm run seed` — refresh sample content into Supabase.
- Edit content via `/admin` (writes go to Supabase), or directly via Supabase's table editor.
- Resend has a test sender (`onboarding@resend.dev`) — use it to develop emails without verifying a domain.

---

## Security notes

- Admin credentials live in env vars; no plaintext passwords in git.
- `SUPABASE_SERVICE_ROLE_KEY` is only ever used in server-side files (`lib/supabase/server.js`, API routes).
- RLS makes the anon key safe for browsers — public callers can read content and submit enquiries, nothing else.
- The session cookie is `httpOnly`, `SameSite=Lax`, and `Secure` in production.
- Enquiry submissions are rate-limited by IP (5/hour) and the IP + user-agent are stored alongside each row for abuse tracing.
- Email templates always HTML-escape user-supplied text.
