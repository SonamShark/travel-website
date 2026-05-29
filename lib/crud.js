// Tiny helpers to build CRUD route handlers from a JSON collection.
// Generates GET/POST handlers for the collection and GET/PUT/DELETE for items.
import { NextResponse } from "next/server";
import { readCollection, writeCollection, slugify } from "./db";
import { isAuthed } from "./auth";

function newId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function ensureSlug(item, existing) {
  if (item.slug) return item.slug;
  const base = slugify(item.title || item.name || "");
  if (!base) return newId();
  // de-duplicate
  let slug = base;
  let i = 2;
  const taken = new Set(existing.map((x) => x.slug).filter(Boolean));
  while (taken.has(slug)) slug = `${base}-${i++}`;
  return slug;
}

export function listHandler(collection) {
  return async function GET() {
    return NextResponse.json(readCollection(collection));
  };
}

export function createHandler(collection) {
  return async function POST(request) {
    if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const items = readCollection(collection);
    const newItem = {
      id: body.id || newId(),
      ...body,
      slug: ensureSlug(body, items)
    };
    items.push(newItem);
    writeCollection(collection, items);
    return NextResponse.json(newItem, { status: 201 });
  };
}

export function itemGet(collection) {
  return async function GET(_req, { params }) {
    const item = readCollection(collection).find((x) => x.id === params.id);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  };
}

export function itemPut(collection) {
  return async function PUT(request, { params }) {
    if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await request.json();
    const items = readCollection(collection);
    const idx = items.findIndex((x) => x.id === params.id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const merged = { ...items[idx], ...body, id: items[idx].id };
    if (!merged.slug) merged.slug = ensureSlug(merged, items.filter((_, i) => i !== idx));
    items[idx] = merged;
    writeCollection(collection, items);
    return NextResponse.json(merged);
  };
}

export function itemDelete(collection) {
  return async function DELETE(_req, { params }) {
    if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const items = readCollection(collection);
    const next = items.filter((x) => x.id !== params.id);
    if (next.length === items.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
    writeCollection(collection, next);
    return NextResponse.json({ ok: true });
  };
}
