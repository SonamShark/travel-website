"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({ status: "idle", error: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setState({ status: "loading", error: "" });
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream px-5">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-sm p-8 border border-brand-ink/5">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-brand-green flex items-center justify-center">
            <span className="font-serif text-brand-gold text-xl">T</span>
          </div>
          <h1 className="mt-3 font-serif text-2xl text-brand-ink">Admin sign in</h1>
          <p className="text-sm text-brand-ink/65 mt-1">Thubten Travels CMS</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Username</label>
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {state.status === "error" && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {state.error}
            </p>
          )}
          <button type="submit" className="btn-dark w-full" disabled={state.status === "loading"}>
            {state.status === "loading" ? "Signing in…" : "Sign in"}
          </button>
          <p className="text-xs text-brand-ink/50 text-center pt-1">
            Default credentials: <code>admin</code> / <code>happiness2026</code>
          </p>
        </form>
      </div>
    </div>
  );
}
