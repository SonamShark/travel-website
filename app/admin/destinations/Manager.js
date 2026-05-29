"use client";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/ImageUploader";

const empty = {
  name: "",
  slug: "",
  image: "",
  shortDescription: "",
  longDescription: "",
  highlights: "",
  bestTime: ""
};

function toEditable(d) {
  return {
    ...empty,
    ...d,
    highlights: Array.isArray(d?.highlights) ? d.highlights.join(", ") : d?.highlights || ""
  };
}

function toPayload(form) {
  return {
    ...form,
    highlights: form.highlights
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  };
}

export default function DestinationsManager() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // id or 'new'
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/destinations");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  function startNew() {
    setEditing("new");
    setForm(empty);
  }

  function startEdit(d) {
    setEditing(d.id);
    setForm(toEditable(d));
  }

  function cancel() {
    setEditing(null);
    setError("");
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const method = editing === "new" ? "POST" : "PUT";
      const url = editing === "new" ? "/api/destinations" : `/api/destinations/${editing}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(form))
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      await load();
      cancel();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(d) {
    if (!confirm(`Delete "${d.name}"?`)) return;
    const res = await fetch(`/api/destinations/${d.id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <>
      {!editing && (
        <button onClick={startNew} className="btn-dark mb-6">+ Add destination</button>
      )}

      {editing && (
        <div className="bg-white rounded-2xl p-6 border border-brand-ink/5 mb-8">
          <h3 className="font-serif text-2xl text-brand-ink mb-5">
            {editing === "new" ? "New destination" : "Edit destination"}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label">Name</label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="label">Slug (auto if empty)</label>
              <input className="input" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <ImageUploader value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Short description</label>
              <textarea className="input" rows={2} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Long description</label>
              <textarea className="input" rows={4} value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Highlights (comma-separated)</label>
              <input className="input" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} />
            </div>
            <div>
              <label className="label">Best time to visit</label>
              <input className="input" value={form.bestTime} onChange={(e) => setForm({ ...form, bestTime: e.target.value })} />
            </div>
          </div>
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          <div className="flex gap-3 mt-6">
            <button onClick={save} disabled={saving} className="btn-dark">{saving ? "Saving…" : "Save"}</button>
            <button onClick={cancel} className="btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {items.map((d) => (
          <div key={d.id} className="bg-white rounded-2xl p-4 border border-brand-ink/5 flex items-center gap-4">
            <img src={d.image} alt="" className="w-20 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-serif text-lg text-brand-ink truncate">{d.name}</p>
              <p className="text-xs text-brand-ink/60 truncate">{d.shortDescription}</p>
            </div>
            <button onClick={() => startEdit(d)} className="text-sm text-brand-ink hover:text-brand-gold">Edit</button>
            <button onClick={() => remove(d)} className="text-sm text-red-600 hover:underline">Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-brand-ink/65">No destinations yet.</p>}
      </div>
    </>
  );
}
