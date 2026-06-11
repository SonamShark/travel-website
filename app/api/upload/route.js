// Multipart upload → Supabase Storage. Returns the public URL.
// Replaces the old /public/uploads filesystem write so this works on Vercel.
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml"
]);

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 413 });
  }

  // Build a collision-proof filename: timestamp + short random + clean original
  const safeName = String(file.name || "upload")
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(-80);
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

  const { error } = await supabaseAdmin.storage
    .from("uploads")
    .upload(path, file, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false
    });
  if (error) {
    console.error("[upload] supabase storage error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: pub } = supabaseAdmin.storage.from("uploads").getPublicUrl(path);
  return NextResponse.json({ url: pub.publicUrl });
}
