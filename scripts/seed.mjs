// One-shot Supabase seed: pushes everything in /seed/*.json into Postgres.
// Run AFTER applying supabase/schema.sql. Safe to re-run — uses upsert on slug.
//
//   NEXT_PUBLIC_SUPABASE_URL=... \
//   SUPABASE_SERVICE_ROLE_KEY=... \
//   node scripts/seed.mjs
//
// Loads .env.local automatically so the keys you already set for the app
// are reused.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// --- tiny .env.local loader ------------------------------------------------
function loadEnv(file) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
    }
  }
}
loadEnv(".env.local");
loadEnv(".env");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });
const read = (n) => JSON.parse(fs.readFileSync(path.join(ROOT, "seed", `${n}.json`), "utf8"));

async function run() {
  // ----- destinations ----
  const destinations = read("destinations").map((d, i) => ({
    slug: d.slug,
    name: d.name,
    image: d.image,
    short_description: d.shortDescription,
    long_description: d.longDescription,
    highlights: d.highlights || [],
    best_time: d.bestTime,
    sort_order: i
  }));
  let { error } = await supabase.from("destinations").upsert(destinations, { onConflict: "slug" });
  if (error) throw error;
  console.log(`✓ destinations: ${destinations.length}`);

  // ----- holiday types ----
  const types = read("holidayTypes").map((t, i) => ({
    slug: t.slug,
    name: t.name,
    image: t.image,
    description: t.description,
    sort_order: i
  }));
  ({ error } = await supabase.from("holiday_types").upsert(types, { onConflict: "slug" }));
  if (error) throw error;
  console.log(`✓ holiday_types: ${types.length}`);

  // ----- packages ----
  const packages = read("packages").map((p, i) => ({
    slug: p.slug,
    title: p.title,
    duration: p.duration,
    price: p.price,
    image: p.image,
    short_description: p.shortDescription,
    type: p.type,
    destinations: p.destinations || [],
    itinerary: p.itinerary || [],
    inclusions: p.inclusions || [],
    exclusions: p.exclusions || [],
    sort_order: i
  }));
  ({ error } = await supabase.from("packages").upsert(packages, { onConflict: "slug" }));
  if (error) throw error;
  console.log(`✓ packages: ${packages.length}`);

  // ----- blogs ----
  const blogs = read("blogs").map((b) => ({
    slug: b.slug,
    title: b.title,
    image: b.image,
    excerpt: b.excerpt,
    content: b.content,
    author: b.author,
    published_at: b.date || new Date().toISOString()
  }));
  ({ error } = await supabase.from("blogs").upsert(blogs, { onConflict: "slug" }));
  if (error) throw error;
  console.log(`✓ blogs: ${blogs.length}`);

  // ----- site settings ----
  const site = read("site");
  const rows = [
    { key: "hero", value: site.hero || {} },
    { key: "contact", value: site.contact || {} },
    { key: "why_choose_us", value: site.whyChooseUs || [] },
    { key: "testimonials", value: site.testimonials || [] }
  ];
  ({ error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" }));
  if (error) throw error;
  console.log(`✓ site_settings: ${rows.length} keys`);

  console.log("\nAll seeded ✓");
}

run().catch((e) => {
  console.error("Seed failed:", e.message || e);
  process.exit(1);
});
