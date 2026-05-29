import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/db";
import { isAuthed } from "@/lib/auth";

const ALLOWED_STATUS = new Set(["new", "in_progress", "completed"]);

export async function PUT(request, { params }) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { status } = await request.json();
  if (status && !ALLOWED_STATUS.has(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const items = readCollection("enquiries");
  const idx = items.findIndex((x) => x.id === params.id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  items[idx] = { ...items[idx], status: status || items[idx].status };
  writeCollection("enquiries", items);
  return NextResponse.json(items[idx]);
}

export async function DELETE(_req, { params }) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = readCollection("enquiries");
  const next = items.filter((x) => x.id !== params.id);
  writeCollection("enquiries", next);
  return NextResponse.json({ ok: true });
}
