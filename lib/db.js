// Legacy JSON helpers. The bulk of the file-system storage was replaced
// by Supabase in lib/content.js, lib/site.js and lib/crud.js; what remains
// here is just slugify and a tiny readObject used as a local-dev fallback
// for admin credentials in lib/auth.js.
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");

export function readObject(name) {
  const p = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(p)) return {};
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return {};
  }
}

export function slugify(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
