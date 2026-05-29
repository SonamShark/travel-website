// Tiny JSON file-based "database" for the CMS.
// Each collection is a flat JSON file in /data — easy to inspect, easy to edit by hand.
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

export function readCollection(name) {
  const p = filePath(name);
  if (!fs.existsSync(p)) return [];
  const raw = fs.readFileSync(p, "utf8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function writeCollection(name, data) {
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2));
}

export function readObject(name) {
  const p = filePath(name);
  if (!fs.existsSync(p)) return {};
  const raw = fs.readFileSync(p, "utf8");
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function writeObject(name, data) {
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2));
}

// Small helper to make a URL-friendly slug from a title.
export function slugify(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
