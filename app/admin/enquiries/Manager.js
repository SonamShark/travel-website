"use client";
import { useEffect, useState } from "react";

const STATUS_LABEL = {
  new: "New",
  in_progress: "In Progress",
  completed: "Completed"
};

const STATUS_CLASS = {
  new: "bg-brand-gold/15 text-brand-goldDark border-brand-gold/30",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200"
};

export default function EnquiriesManager() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);

  async function load() {
    const res = await fetch("/api/enquiries");
    setItems(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (res.ok) load();
  }

  async function remove(e) {
    if (!confirm("Delete this enquiry?")) return;
    const res = await fetch(`/api/enquiries/${e.id}`, { method: "DELETE" });
    if (res.ok) { setOpen(null); load(); }
  }

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "new", "in_progress", "completed"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              filter === s
                ? "bg-brand-ink text-white border-brand-ink"
                : "bg-white text-brand-ink border-brand-ink/15"
            }`}
          >
            {s === "all" ? "All" : STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-brand-ink/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-brand-beige text-brand-ink/70 uppercase text-xs tracking-widest">
            <tr>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Country</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Destination</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-t border-brand-ink/5 hover:bg-brand-beige/40">
                <td className="px-4 py-3 text-brand-ink/70">{new Date(e.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 font-medium text-brand-ink">{e.name}</td>
                <td className="px-4 py-3 text-brand-ink/70">{e.country || "—"}</td>
                <td className="px-4 py-3 text-brand-ink/70 hidden md:table-cell">{e.destination || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_CLASS[e.status]}`}>
                    {STATUS_LABEL[e.status] || e.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setOpen(e)} className="text-brand-gold hover:underline">View</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-ink/55">No enquiries.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-2xl text-brand-ink">Enquiry from {open.name}</h3>
              <button onClick={() => setOpen(null)} className="text-2xl text-brand-ink/55 hover:text-brand-ink leading-none">×</button>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <Detail label="Email" value={open.email} />
              <Detail label="Phone" value={open.phone} />
              <Detail label="Country" value={open.country} />
              <Detail label="Travel date" value={open.travelDate} />
              <Detail label="Travellers" value={open.travelers} />
              <Detail label="Destination" value={open.destination} />
              <Detail label="Holiday type" value={open.holidayType} />
              <Detail label="Budget" value={open.budget} />
              <Detail label="Submitted" value={new Date(open.createdAt).toLocaleString()} />
            </dl>
            {open.message && (
              <div className="mt-4 bg-brand-beige rounded-lg p-4">
                <p className="text-xs uppercase tracking-widest text-brand-gold mb-1">Message</p>
                <p className="text-sm text-brand-ink/85 whitespace-pre-wrap">{open.message}</p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-brand-ink/70 mr-1">Mark as:</span>
              {["new", "in_progress", "completed"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(open.id, s).then(() => setOpen({ ...open, status: s }))}
                  className={`px-3 py-1.5 rounded-full text-xs border ${
                    open.status === s
                      ? "bg-brand-ink text-white border-brand-ink"
                      : "bg-white text-brand-ink border-brand-ink/15 hover:bg-brand-beige"
                  }`}
                >
                  {STATUS_LABEL[s]}
                </button>
              ))}
              <button onClick={() => remove(open)} className="ml-auto text-sm text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-brand-gold">{label}</dt>
      <dd className="mt-0.5 text-brand-ink">{value || "—"}</dd>
    </div>
  );
}
