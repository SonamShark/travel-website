// Server-side read helpers for the public pages. They return data in the
// camelCase shape the existing page components already consume, so the
// page templates need only swap `readCollection("x")` for `await getX()`.
//
// Any error (missing env vars during a CI build, Supabase outage, RLS
// blocking a read) is logged and an empty result is returned. Pages
// gracefully render empty rather than 500-ing.
import { supabasePublic } from "./supabase/public";
import { fromDb } from "./crud";

async function list(table, orderBy, ascending = true) {
  try {
    const { data, error } = await supabasePublic
      .from(table)
      .select("*")
      .order(orderBy, { ascending });
    if (error) {
      console.error(`[content] ${table} read failed`, error);
      return [];
    }
    return (data || []).map((r) => fromDb(table, r));
  } catch (err) {
    console.error(`[content] ${table} read threw`, err.message);
    return [];
  }
}

async function single(table, slug) {
  try {
    const { data, error } = await supabasePublic
      .from(table)
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error || !data) return null;
    return fromDb(table, data);
  } catch (err) {
    console.error(`[content] ${table}/${slug} read threw`, err.message);
    return null;
  }
}

export const getDestinations  = ()      => list("destinations",  "sort_order");
export const getHolidayTypes  = ()      => list("holiday_types", "sort_order");
export const getPackages      = ()      => list("packages",      "sort_order");
export const getBlogs         = ()      => list("blogs",         "published_at", false);

export const getDestinationBySlug = (s) => single("destinations", s);
export const getPackageBySlug     = (s) => single("packages",     s);
export const getBlogBySlug        = (s) => single("blogs",        s);
