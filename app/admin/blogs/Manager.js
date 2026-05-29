"use client";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/ImageUploader";

const empty = {
  title: "",
  slug: "",
  image: "",
  excerpt: "",
  content: "",
  date: new Date().toISOString().slice(0, 10),
  author: ""
};

export default function BlogsManager() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/blogs");
    setItems(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function save() {
    setSaving(true); setError("");
    try {
      const method = editing === "new" ? "POST" : "PUT";
      const url = editing === "new" ? "/api/blogs" : `/api/blogs/${editing}`;
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

  async function remove(b) {
    if (!confirm(`Delete "${b.title}"?`)) return;
    const res = await fetch(`/api/blogs/${b.id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <>
      {!editing && (
        <button className="btn-dark mb-6" onClick={() => { setForm(empty); setEditing("new"); }}>
          + Add journal post
        </button>
      )}

      {editing && (
        <div className="bg-white rounded-2xl p-6 border border-brand-ink/5 mb-8">
          <h3 className="font-serif text-2xl text-brand-ink mb-5">
            {editing === "new" ? "New journal post" : "Edit journal post"}
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
              <label className="label">Date</label>
              <input type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label className="label">Author</label>
              <input className="input" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <ImageUploader value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Excerpt</label>
              <textarea className="input" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Content</label>
              <textarea className="input" rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              <p className="text-xs text-brand-ink/55 mt-1">Separate paragraphs with a blank line.</p>
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
        {items.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl p-4 border border-brand-ink/5 flex items-center gap-4">
            <img src={b.image} alt="" className="w-20 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-serif text-lg text-brand-ink truncate">{b.title}</p>
              <p className="text-xs text-brand-ink/60">{b.date} {b.author ? `· ${b.author}` : ""}</p>
            </div>
            <button onClick={() => { setForm({ ...empty, ...b }); setEditing(b.id); }} className="text-sm text-brand-ink hover:text-brand-gold">Edit</button>
            <button onClick={() => remove(b)} className="text-sm text-red-600 hover:underline">Delete</button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-brand-ink/65">No journal posts yet.</p>}
      </div>
    </>
  );
}
