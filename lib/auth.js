// Cookie-based admin session.
// Credentials and the session secret come from environment variables in
// production. data/admin.json is an optional local-dev override (gitignored).
import { cookies } from "next/headers";
import { readObject } from "./db";

export const SESSION_COOKIE = "hh_admin";

function getSessionSecret() {
  return process.env.SESSION_SECRET || "hh-admin-session-dev";
}

export function isAuthed() {
  return cookies().get(SESSION_COOKIE)?.value === getSessionSecret();
}

export function verifyCredentials(username, password) {
  const local = readObject("admin"); // optional local override
  const adminUser = process.env.ADMIN_USERNAME || local.username || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || local.password;
  if (!adminPass) return false;
  return username === adminUser && password === adminPass;
}

export function getSessionValue() {
  return getSessionSecret();
}
