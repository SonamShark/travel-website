// Service-role Supabase client. Bypasses RLS — server-only.
// NEVER import this from a "use client" component.
//
// Implemented as a lazy proxy so `next build` can complete without env vars
// (Next.js eagerly imports route modules during the build trace step). The
// real client is constructed only the first time something hits it.
import { createClient } from "@supabase/supabase-js";

let _client;

function getClient() {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase service-role client used without NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }
  _client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  return _client;
}

export const supabaseAdmin = new Proxy(
  {},
  {
    get(_target, prop) {
      const c = getClient();
      const value = c[prop];
      return typeof value === "function" ? value.bind(c) : value;
    }
  }
);
