"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/holiday-types", label: "Holiday Types" },
  { href: "/admin/blogs", label: "Journal" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/settings", label: "Site Settings" }
];

export default function AdminShell({ children, title, actions }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex bg-brand-cream">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-brand-ink text-white/85 sticky top-0 h-screen">
        <Link href="/admin" className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <span className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center">
            <span className="font-serif text-brand-gold">T</span>
          </span>
          <span className="font-serif text-lg text-white">Admin</span>
        </Link>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-3 pb-5">
          <Link
            href="/"
            className="block px-3 py-2 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white"
          >
            ← Back to site
          </Link>
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-white/60 hover:bg-white/5 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        {/* Top bar (mobile) */}
        <div className="md:hidden bg-brand-ink text-white px-5 h-14 flex items-center justify-between">
          <Link href="/admin" className="font-serif">Admin</Link>
          <button onClick={logout} className="text-sm text-white/70">Sign out</button>
        </div>

        <div className="md:hidden bg-white border-b border-brand-ink/10">
          <div className="flex overflow-x-auto px-3 py-2 gap-2 text-sm whitespace-nowrap">
            {nav.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full ${
                    active ? "bg-brand-ink text-white" : "bg-brand-beige text-brand-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Page */}
        <div className="px-6 md:px-10 py-8">
          {(title || actions) && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
              <h1 className="font-serif text-3xl text-brand-ink">{title}</h1>
              {actions}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
