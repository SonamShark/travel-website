import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { isAuthed } from "@/lib/auth";

// GET — admin only: list enquiries.
export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = readCollection("enquiries");
  // newest first
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return NextResponse.json(items);
}

// POST — public submission from the EnquiryForm.
export async function POST(request) {
  const body = await request.json();
  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }
  const items = readCollection("enquiries");
  const entry = {
    id: Math.random().toString(36).slice(2, 10) + Date.now().toString(36),
    status: "new",
    createdAt: new Date().toISOString(),
    ...body
  };
  items.push(entry);
  writeCollection("enquiries", items);
  return NextResponse.json({ ok: true, id: entry.id }, { status: 201 });
}
