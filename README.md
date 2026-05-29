# Thubten Tour and Travel

A clean, modern Bhutan travel-agency website with a simple built-in CMS.

Built with **Next.js 14 (App Router) + React + Tailwind CSS**. Content is stored in JSON files under `/data` — no database required.

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Admin panel

Open <http://localhost:3000/admin/login>.

- **Username:** `admin`
- **Password:** `happiness2026`

(Change these in `data/admin.json`.)

---

## Features

### Public site
- **Home** — hero, featured destinations, featured packages, why-choose-us, testimonials, CTA
- **Destinations** index + individual destination pages
- **Holiday Types** (Cultural, Adventure, Spiritual, Festival, Wellness, Luxury)
- **Packages** index + detail pages (itinerary, inclusions/exclusions)
- **Travel Guide** — visa & SDF, seasons, festivals, travel tips, FAQ
- **About** — story, mission/values, team
- **Journal** index + post pages
- **Contact** — form, map, social links
- **Make Enquiry** — full enquiry form
- Mobile responsive, soft Bhutan-inspired palette (white / gold / green / beige / ink)

### Admin / CMS
- Secure login (cookie session)
- Dashboard with content counts
- Manage **Destinations**, **Holiday Packages**, **Holiday Types**, **Journal Posts**
- Upload images directly to `/public/uploads`
- Edit homepage hero (title, subtitle, image)
- Edit contact info and social links
- View submitted **Enquiries**, mark as New / In Progress / Completed
- Delete or update any record from the dashboard

---

## Project structure

```
app/
  page.js                  # Home
  destinations/            # public destination pages
  holiday-types/
  packages/
  travel-guide/
  about/
  journal/
  contact/
  enquiry/
  admin/
    login/                 # admin login
    page.js                # admin dashboard
    destinations/          # CMS pages
    packages/
    holiday-types/
    blogs/
    enquiries/
    settings/
  api/
    auth/{login,logout}/   # session endpoints
    destinations/, packages/, holiday-types/, blogs/   # CRUD
    enquiries/             # public POST + admin GET/PUT/DELETE
    site/                  # homepage hero + contact settings
    upload/                # image upload endpoint
components/
  Navbar, Footer, Hero, PageHeader, CtaBanner,
  DestinationCard, PackageCard, BlogCard, HolidayTypeCard,
  TestimonialCard, EnquiryForm, ImageUploader, AdminShell
data/
  site.json                # hero + contact + testimonials
  destinations.json
  holidayTypes.json
  packages.json
  blogs.json
  enquiries.json
  admin.json               # admin credentials
lib/
  db.js                    # JSON read/write helpers
  auth.js                  # session helpers
  adminGuard.js            # requireAuth() for admin pages
  crud.js                  # shared CRUD route handlers
public/
  uploads/                 # uploaded images live here
```

---

## How content is stored

- All content lives as plain JSON in `/data`. You can edit it by hand, or use the admin panel.
- Image uploads are saved to `public/uploads/` and referenced by URL (`/uploads/your-image.jpg`).
- Sample image URLs in the seed data use Unsplash. Replace them with your own (or upload via admin) before going live.

---

## Customising

- **Brand colours and fonts:** `tailwind.config.js` and `app/globals.css`
- **Navigation links:** `components/Navbar.js`
- **Hero / homepage content:** Admin → Site Settings (or edit `data/site.json` directly)
- **Why-choose-us & testimonials:** `data/site.json`

---

## Build for production

```bash
npm run build
npm run start
```

---

## Notes

- Authentication is a simple cookie session, suitable for a single admin. For a public production deployment, replace it with a proper auth provider and hash the password.
- File-based JSON storage works perfectly on a single server. If you deploy to a serverless platform with a read-only filesystem (e.g. Vercel), move content to a database (Postgres, SQLite via Turso, Supabase, etc.) — the `lib/db.js` interface should make that easy.
