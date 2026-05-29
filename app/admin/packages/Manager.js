"use client";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/ImageUploader";

const empty = {
  title: "",
  slug: "",
  duration: "",
  price: "",
  image: "",
  shortDescription: "",
  type: "",
  destinations: "",
  itinerary: [{ day: "Day 1", title: "", text: "" }],
  inclusions: "",
  exclusions: ""
};

function toEditable(p) {
  return {
    ...empty,
    ...p,
    destinations: Array.isArray(p?.destinations) ? p.destinations.join(", ") : p?.destinations || "",
    inclusions: Array.isArray(p?.inclusions) ? p.inclusions.join("\n") : p?.inclusions || "",
    exclusions: Array.isArray(p?.exclusions) ? p.exclusions.join("\n") : p?.exclusions || "",
    itinerary: Array.isArray(p?.itinerary) && p.itinerary.length ? p.itinerary : empty.itinerary
  };
}

function toPayload(f) {
  return {
    ...f,
    destinations: f.destinations.split(",").map((s) => s.trim()).filter(Boolean),
    inclusions: f.inclusions.split("\n").map((s) => s.trim()).filter(Boolean),
    exclusions: f.exclusions.split("\n").map((s) => s.trim()).filter(Boolean),
    itinerary: f.itinerary.filter((d) => d.title || d.text)
  };
}

export default function PackagesManager() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/packages");
    setItems(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function save() {
    setSaving(true); setError("");
    try {
      const method = editing === "new" ? "POST" : "PUT";
      const url = editing === "new" ? "/api/packages" : `/api/packages/${editing}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(form))
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      await load();
      setEditing(null);
    } catch (e) { setError(e.message); } finally { setSaving(false); }
  }

  async function remove(p) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    const res = await fetch(`/api/packages/${p.id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  function updateItinerary(i, key, val) {
    setForm((f) => {
      const next = [...f.itinerary];
      next[i] = { ...next[i], [key]: val };
      return { ...f, itinerary: next };
    });
  }

  function addItineraryDay() {
    setForm((f) => ({
      ...f,
      itinerary: [...f.itinerary, { day: `Day ${f.itinerary.length + 1}`, title: "", text: "" }]
    }));
  }

  function removeItineraryDay(i) {
    setForm((f) => ({ ...f, itinerary: f.itinerary.filter((_, idx) => idx !== i) }));
  }

  return (
    <>
      {!editing && (
        <button className="btn-dark mb-6" onClick={() => { setForm(empty); setEditing("new"); }}>
          + Add package
        </button>
      )}

      {editing && (
        <div className="bg-white rounded-2xl p-6 border border-brand-ink/5 mb-8">
          <h3 className="font-serif text-2xl text-brand-ink mb-5">
            {editing === "new" ? "New package" : "Edit package"}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Title</label>
              <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="label">Slug (auto)</label>
              <input className="input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div>
              <label className="label">Duration</label>
              <input className="input" placeholder="e.g. 7 days / 6 nights" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            </div>
            <div>
              <label className="label">Price</label>
              <input className="input" placeholder="From $X per person" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <label className="label">Holiday type</label>
              <input className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
            </div>
            <div>
              <label className="label">Destinations covered (comma-separated)</label>
              <input className="input" value={form.destinations} onChange={(e) => setForm({ ...form, destinations: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <ImageUploader value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Short description</label>
              <textarea className="input" rows={2} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="label mb-0">Itinerary</label>
                <button onClick={addItineraryDay} className="text-sm text-brand-gold hover:underline">+ Add day</button>
              </div>
              <div className="space-y-3 mt-2">
                {form.itinerary.map((d, i) => (
                  <div key={i} className="grid gap-2 md:grid-cols-[120px_1fr_auto] items-start bg-brand-beige/50 p-3 rounded-xl">
                    <input className="input" placeholder="Day 1" value={d.day} onChange={(e) => updateItinerary(i, "day", e.target.value)} />
                    <div className="space-y-2">
                      <input className="input" placeholder="Title" value={d.title} onChange={(e) => updateItinerary(i, "title", e.target.value)} />
                      <textarea className="input" rows={2} placeholder="Activities for the day" value={d.text} onChange={(e) => updateItinerary(i, "text", e.target.value)} />
                    </div>
                    <button onClick={() => removeItineraryDay(i)} className="text-red-600 text-sm">Remove</button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Inclusions (one per line)</label>
              <textarea className="input" rows={5} value={form.inclusions} onChange={(e) => setForm({ ...form, inclusions: e.target.value })} />
            </div>
            <div>
              <label className="label">Exclusions (one per line)</label>
              <textarea className="input" rows={5} value={form.exclusions} onChange={(e) => setForm({ ...form, exclusions: e.target.value })} />
            </div>
          </div>
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          <div className="flex gap-3 mt-6">
            <button onClick={save} disabled={saving} className="btn-dark">{saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} className="btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {items.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl p-4 border border-brand-ink/5 flex items-center gap-4">
            <img src={p.image} alt="" className="w-20 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-serif text-lg text-brand-ink truncate">{p.title}</p>
              <p className="text-xs text-brand-ink/60">{p.duration} · {p.price}</p>
            </div>
            <button onClick={() => { setForm(toEditable(p)); setEditing(p.id); }} className="text-sm text-brand-ink hover:text-brand-gold">Edit</button>
            <button onClick={() => remove(p)} className="text-sm text-red-600 hover:underline">Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-brand-ink/65">No packages yet.</p>}
      </div>
    </>
  );
}
