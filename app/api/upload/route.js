import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Accepts a multipart/form-data upload with field name "file".
// Saves to /public/uploads and returns the public URL.
export async function POST(request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Basic sanity check — keep it simple, just allow common image types.
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  // Build a safe filename with a timestamp prefix to avoid collisions.
  const cleanName = String(file.name || "upload")
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const filename = `${Date.now()}-${cleanName}`;
  const filepath = path.join(uploadsDir, filename);
  fs.writeFileSync(filepath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
