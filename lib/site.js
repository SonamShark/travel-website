// Read site settings (hero, contact, why-choose-us, testimonials) from
// Supabase site_settings, returning the legacy shape the UI already expects:
// { hero, contact, whyChooseUs, testimonials }
//
// Returns {} on any failure so the layout still renders during a build
// where Supabase env vars aren't available.
import { supabasePublic } from "./supabase/public";

const KEY_MAP = {
  hero: "hero",
  contact: "contact",
  why_choose_us: "whyChooseUs",
  testimonials: "testimonials"
};

export async function getSiteSettings() {
  try {
    const { data, error } = await supabasePublic
      .from("site_settings")
      .select("key,value");
    if (error) {
      console.error("[site] failed to read site_settings", error);
      return {};
    }
    const out = {};
    for (const row of data || []) {
      const k = KEY_MAP[row.key] || row.key;
      out[k] = row.value;
    }
    return out;
  } catch (err) {
    console.error("[site] read threw", err.message);
    return {};
  }
}
