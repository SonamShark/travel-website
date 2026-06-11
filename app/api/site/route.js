// Site settings are stored as a small key/value table in Supabase:
//   ('hero', {...}), ('contact', {...}), ('why_choose_us', [...]), ('testimonials', [...])
// We expose them to the admin UI as a single object with legacy field names.
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

const KEY_FROM_LEGACY = {
  hero: "hero",
  contact: "contact",
  whyChooseUs: "why_choose_us",
  testimonials: "testimonials"
};

const LEGACY_FROM_KEY = {
  hero: "hero",
  contact: "contact",
  why_choose_us: "whyChooseUs",
  testimonials: "testimonials"
};

async function readAll() {
  const { data } = await supabaseAdmin.from("site_settings").select("key,value");
  const out = {};
  for (const row of data || []) {
    out[LEGACY_FROM_KEY[row.key] || row.key] = row.value;
  }
  return out;
}

export async function GET() {
  return NextResponse.json(await readAll());
}

export async function PUT(request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();

  // Merge any provided keys; ignore anything we don't recognise.
  const rows = [];
  for (const [legacy, value] of Object.entries(body)) {
    const key = KEY_FROM_LEGACY[legacy];
    if (!key) continue;
    rows.push({ key, value });
  }

  if (rows.length) {
    const { error } = await supabaseAdmin
      .from("site_settings")
      .upsert(rows, { onConflict: "key" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(await readAll());
}
