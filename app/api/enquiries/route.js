import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { isAuthed } from "@/lib/auth";
import { sendAdminEnquiryEmail, sendCustomerAckEmail } from "@/lib/email/resend";
import { clientIp, enquiryRateLimitOk } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

// Convert a DB row → the camelCase shape the admin UI consumes.
function serialize(r) {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    country: r.country,
    travelDate: r.travel_date,
    travelers: r.travelers,
    destination: r.destination,
    holidayType: r.holiday_type,
    budget: r.budget,
    message: r.message,
    source: r.source,
    status: r.status,
    createdAt: r.created_at
  };
}

// GET — admin only: list enquiries (newest first).
export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data, error } = await supabaseAdmin
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json((data || []).map(serialize));
}

// POST — public submission. Inserts, rate-limits, fires both emails.
export async function POST(request) {
  const body = await request.json();
  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const ip = clientIp(request);
  const userAgent = request.headers.get("user-agent") || null;

  // 1. Rate limit (Postgres-backed, works across serverless instances)
  if (!(await enquiryRateLimitOk(ip))) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  // 2. Persist
  const { data: row, error } = await supabaseAdmin
    .from("enquiries")
    .insert({
      name: String(body.name).trim(),
      email: String(body.email).trim().toLowerCase(),
      phone: body.phone || null,
      country: body.country || null,
      travel_date: body.travelDate || null,
      travelers: body.travelers ? Number(body.travelers) : null,
      destination: body.destination || null,
      holiday_type: body.holidayType || null,
      budget: body.budget || null,
      message: body.message || null,
      source: body.source === "contact" ? "contact" : "enquiry",
      ip,
      user_agent: userAgent
    })
    .select()
    .single();

  if (error) {
    console.error("[enquiries] insert failed", error);
    return NextResponse.json({ error: "Could not save enquiry" }, { status: 500 });
  }

  // 3. Email — best-effort, never breaks the user's submission.
  const results = await Promise.allSettled([
    sendAdminEnquiryEmail(row),
    sendCustomerAckEmail(row)
  ]);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[enquiries] ${i === 0 ? "admin" : "customer"} email failed`, r.reason);
    }
  });

  return NextResponse.json({ ok: true, id: row.id }, { status: 201 });
}
