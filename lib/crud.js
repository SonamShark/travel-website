// Supabase-backed CRUD factory used by API routes. Replaces the old
// file-system version. Each route file calls listHandler/createHandler/etc
// with a table name and gets back ready-to-export route handlers.
//
// Boundary mapping:
//   - Incoming admin payloads use camelCase (shortDescription, bestTime, …)
//   - Supabase columns are snake_case
//   - We translate both directions so the UI components are unchanged.
import { NextResponse } from "next/server";
import { supabaseAdmin } from "./supabase/server";
import { isAuthed } from "./auth";
import { slugify } from "./db";

// camelCase payload → snake_case insert/update row
const TO_DB = {
  destinations: (b) => ({
    name: b.name,
    slug: b.slug,
    image: b.image,
    short_description: b.shortDescription ?? b.short_description,
    long_description: b.longDescription ?? b.long_description,
    highlights: b.highlights || [],
    best_time: b.bestTime ?? b.best_time
  }),
  holiday_types: (b) => ({
    name: b.name,
    slug: b.slug,
    image: b.image,
    description: b.description
  }),
  packages: (b) => ({
    title: b.title,
    slug: b.slug,
    duration: b.duration,
    price: b.price,
    image: b.image,
    short_description: b.shortDescription ?? b.short_description,
    type: b.type,
    destinations: b.destinations || [],
    itinerary: b.itinerary || [],
    inclusions: b.inclusions || [],
    exclusions: b.exclusions || []
  }),
  blogs: (b) => ({
    title: b.title,
    slug: b.slug,
    image: b.image,
    excerpt: b.excerpt,
    content: b.content,
    author: b.author,
    published_at: b.date ?? b.published_at ?? new Date().toISOString()
  })
};

// snake_case Supabase row → camelCase payload for the UI
const FROM_DB = {
  destinations: (r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    image: r.image,
    shortDescription: r.short_description,
    longDescription: r.long_description,
    highlights: r.highlights || [],
    bestTime: r.best_time
  }),
  holiday_types: (r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    image: r.image,
    description: r.description
  }),
  packages: (r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    duration: r.duration,
    price: r.price,
    image: r.image,
    shortDescription: r.short_description,
    type: r.type,
    destinations: r.destinations || [],
    itinerary: r.itinerary || [],
    inclusions: r.inclusions || [],
    exclusions: r.exclusions || []
  }),
  blogs: (r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    image: r.image,
    excerpt: r.excerpt,
    content: r.content,
    author: r.author,
    date: r.published_at
  })
};

function toDb(table, body) {
  const fn = TO_DB[table];
  return fn ? fn(body) : body;
}

function fromDb(table, row) {
  if (!row) return row;
  const fn = FROM_DB[table];
  return fn ? fn(row) : row;
}

async function ensureUniqueSlug(table, desired) {
  let slug = desired;
  let i = 2;
  while (true) {
    const { data } = await supabaseAdmin.from(table).select("id").eq("slug", slug).limit(1);
    if (!data || data.length === 0) return slug;
    slug = `${desired}-${i++}`;
  }
}

export function listHandler(table, opts = {}) {
  const orderBy = opts.orderBy || (table === "blogs" ? "published_at" : "sort_order");
  const ascending = opts.ascending ?? (table !== "blogs");
  return async function GET() {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select("*")
      .order(orderBy, { ascending });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json((data || []).map((r) => fromDb(table, r)));
  };
}

export function createHandler(table) {
  return async function POST(request) {
    if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const payload = toDb(table, body);
    if (!payload.slug) {
      const base = slugify(payload.title || payload.name || "");
      payload.slug = base ? await ensureUniqueSlug(table, base) : crypto.randomUUID();
    }
    const { data, error } = await supabaseAdmin
      .from(table)
      .insert(payload)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(fromDb(table, data), { status: 201 });
  };
}

export function itemGet(table) {
  return async function GET(_req, { params }) {
    const { data, error } = await supabaseAdmin
      .from(table)
      .select("*")
      .eq("id", params.id)
      .single();
    if (error) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(fromDb(table, data));
  };
}

export function itemPut(table) {
  return async function PUT(request, { params }) {
    if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const payload = toDb(table, body);
    delete payload.id;
    const { data, error } = await supabaseAdmin
      .from(table)
      .update(payload)
      .eq("id", params.id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(fromDb(table, data));
  };
}

export function itemDelete(table) {
  return async function DELETE(_req, { params }) {
    if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { error } = await supabaseAdmin.from(table).delete().eq("id", params.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  };
}

export { fromDb, toDb };
