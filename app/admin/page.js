import Link from "next/link";
import { requireAuth } from "@/lib/adminGuard";
import AdminShell from "@/components/AdminShell";
import { readCollection } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  requireAuth();

  const counts = {
    destinations: readCollection("destinations").length,
    packages: readCollection("packages").length,
    holidayTypes: readCollection("holidayTypes").length,
    blogs: readCollection("blogs").length,
    enquiries: readCollection("enquiries").length
  };

  const newEnquiries = readCollection("enquiries").filter((e) => e.status === "new").length;

  const tiles = [
    { href: "/admin/destinations", label: "Destinations", value: counts.destinations },
    { href: "/admin/packages", label: "Holiday Packages", value: counts.packages },
    { href: "/admin/holiday-types", label: "Holiday Types", value: counts.holidayTypes },
    { href: "/admin/blogs", label: "Journal Posts", value: counts.blogs },
    { href: "/admin/enquiries", label: "Total Enquiries", value: counts.enquiries },
    { href: "/admin/enquiries", label: "New Enquiries", value: newEnquiries, accent: true }
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className={`rounded-2xl p-6 border transition-shadow hover:shadow-md ${
              t.accent
                ? "bg-brand-gold/10 border-brand-gold/30"
                : "bg-white border-brand-ink/5"
            }`}
          >
            <p className="text-sm text-brand-ink/65">{t.label}</p>
            <p className="mt-2 font-serif text-4xl text-brand-ink">{t.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-2xl p-6 border border-brand-ink/5">
          <h3 className="font-serif text-xl text-brand-ink">Quick actions</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-brand-gold hover:underline" href="/admin/packages">+ Add holiday package</Link></li>
            <li><Link className="text-brand-gold hover:underline" href="/admin/destinations">+ Add destination</Link></li>
            <li><Link className="text-brand-gold hover:underline" href="/admin/blogs">+ Add journal post</Link></li>
            <li><Link className="text-brand-gold hover:underline" href="/admin/settings">Update homepage hero</Link></li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-brand-ink/5">
          <h3 className="font-serif text-xl text-brand-ink">CMS notes</h3>
          <p className="mt-2 text-sm text-brand-ink/70 leading-relaxed">
            Content is stored as JSON files under <code>/data</code>. Uploaded images are saved to{" "}
            <code>/public/uploads</code>. Restart the dev server if you change the admin password
            in <code>data/admin.json</code>.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
