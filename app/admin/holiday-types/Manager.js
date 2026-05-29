"use client";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/ImageUploader";

const empty = { name: "", slug: "", image: "", description: "" };

export default function HolidayTypesManager() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/holiday-types");
    setItems(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function save() {
    setSaving(true); setError("");
    try {
      const method = editing === "new" ? "POST" : "PUT";
      const url = editing === "new" ? "/api/holiday-types" : `/api/holiday-types/${editing}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      await load();
      setEditing(null);
    } catch (e) { setError(e.message); } finally { setSaving(false); }
  }

  async function remove(t) {
    if (!confirm(`Delete "${t.name}"?`)) return;
    const res = await fetch(`/api/holiday-types/${t.id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <>
      {!editing && (
        <button className="btn-dark mb-6" onClick={() => { setForm(empty); setEditing("new"); }}>
          + Add holiday type
        </button>
      )}

      {editing && (
        <div className="bg-white rounded-2xl p-6 border border-brand-ink/5 mb-8">
          <h3 className="font-serif text-2xl text-brand-ink mb-5">
            {editing === "new" ? "New holiday type" : "Edit holiday type"}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Name</label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="label">Slug (auto)</label>
              <input className="input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <ImageUploader value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Description</label>
              <textarea className="input" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          <div className="flex gap-3 mt-6">
            <button onClick={save} disabled={saving} className="btn-dark">{saving ? "Saving…" : "Save"}</button>
            <button onClick={() => setEditing(null)} className="btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl p-4 border border-brand-ink/5 flex items-center gap-4">
            <img src={t.image} alt="" className="w-20 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-serif text-lg text-brand-ink truncate">{t.name}</p>
              <p className="text-xs text-brand-ink/60 line-clamp-2">{t.description}</p>
            </div>
            <button onClick={() => { setForm({ ...empty, ...t }); setEditing(t.id); }} className="text-sm text-brand-ink hover:text-brand-gold">Edit</button>
            <button onClick={() => remove(t)} className="text-sm text-red-600 hover:underline">Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-brand-ink/65">No holiday types yet.</p>}
      </div>
    </>
  );
}
