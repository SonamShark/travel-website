import { NextResponse } from "next/server";
import { readObject, writeObject } from "@/lib/db";
import { isAuthed } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(readObject("site"));
}

export async function PUT(request) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const current = readObject("site");
  const merged = { ...current, ...body };
  // shallow-merge nested objects so partial updates are safe
  if (body.hero) merged.hero = { ...current.hero, ...body.hero };
  if (body.contact) merged.contact = { ...current.contact, ...body.contact };
  writeObject("site", merged);
  return NextResponse.json(merged);
}
