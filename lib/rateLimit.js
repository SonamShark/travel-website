// Postgres-backed rate limit for public form submissions.
// Counts how many enquiries from a given IP landed within the window
// and rejects further submissions over the threshold. Works across
// serverless invocations (unlike an in-memory Map).
import { supabaseAdmin } from "./supabase/server";

const WINDOW_MINUTES = 60;
const MAX_PER_WINDOW = 5;

export function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function enquiryRateLimitOk(ip) {
  if (!ip || ip === "unknown") return true;
  const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
  const { count, error } = await supabaseAdmin
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .gte("created_at", since);
  if (error) {
    console.error("[rateLimit] query failed", error);
    return true; // fail open — don't block real users if the DB hiccups
  }
  return (count || 0) < MAX_PER_WINDOW;
}
