import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

const ALLOWED = new Set(["new", "in_progress", "completed"]);

export async function PUT(request, { params }) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { status } = await request.json();
  if (status && !ALLOWED.has(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from("enquiries")
    .update({ status })
    .eq("id", params.id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req, { params }) {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { error } = await supabaseAdmin.from("enquiries").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
