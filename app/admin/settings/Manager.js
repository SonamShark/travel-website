"use client";
import { useEffect, useState } from "react";
import ImageUploader from "@/components/ImageUploader";

export default function SettingsManager() {
  const [site, setSite] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/site");
    setSite(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function save() {
    setSaving(true); setError(""); setSaved(false);
    try {
      const res = await fetch("/api/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(site)
      });
      if (!res.ok) throw new Error((await res.json()).error || "Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) { setError(e.message); } finally { setSaving(false); }
  }

  if (!site) return <p>Loading…</p>;

  function setHero(k, v) {
    setSite({ ...site, hero: { ...site.hero, [k]: v } });
  }
  function setContact(k, v) {
    setSite({ ...site, contact: { ...site.contact, [k]: v } });
  }
  function setSocial(k, v) {
    setSite({ ...site, contact: { ...site.contact, social: { ...(site.contact?.social || {}), [k]: v } } });
  }

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Homepage hero */}
      <section className="bg-white rounded-2xl p-6 border border-brand-ink/5">
        <h3 className="font-serif text-2xl text-brand-ink mb-5">Homepage hero</h3>
        <div className="space-y-4">
          <div>
            <label className="label">Hero title</label>
            <input className="input" value={site.hero?.title || ""} onChange={(e) => setHero("title", e.target.value)} />
          </div>
          <div>
            <label className="label">Hero subtitle</label>
            <textarea className="input" rows={2} value={site.hero?.subtitle || ""} onChange={(e) => setHero("subtitle", e.target.value)} />
          </div>
          <ImageUploader label="Hero image" value={site.hero?.image} onChange={(v) => setHero("image", v)} />
        </div>
      </section>

      {/* Contact info */}
      <section className="bg-white rounded-2xl p-6 border border-brand-ink/5">
        <h3 className="font-serif text-2xl text-brand-ink mb-5">Contact information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">Phone</label>
            <input className="input" value={site.contact?.phone || ""} onChange={(e) => setContact("phone", e.target.value)} />
          </div>
          <div>
            <label className="label">WhatsApp</label>
            <input className="input" value={site.contact?.whatsapp || ""} onChange={(e) => setContact("whatsapp", e.target.value)} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" value={site.contact?.email || ""} onChange={(e) => setContact("email", e.target.value)} />
          </div>
          <div>
            <label className="label">Hours</label>
            <input className="input" value={site.contact?.hours || ""} onChange={(e) => setContact("hours", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="label">Address</label>
            <input className="input" value={site.contact?.address || ""} onChange={(e) => setContact("address", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="label">Google Maps embed URL</label>
            <input className="input" value={site.contact?.mapEmbed || ""} onChange={(e) => setContact("mapEmbed", e.target.value)} />
          </div>
        </div>
      </section>

      {/* Social links */}
      <section className="bg-white rounded-2xl p-6 border border-brand-ink/5">
        <h3 className="font-serif text-2xl text-brand-ink mb-5">Social links</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {["facebook", "instagram", "youtube", "tripadvisor"].map((k) => (
            <div key={k}>
              <label className="label capitalize">{k}</label>
              <input className="input" value={site.contact?.social?.[k] || ""} onChange={(e) => setSocial(k, e.target.value)} />
            </div>
          ))}
        </div>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-700">Saved.</p>}

      <div>
        <button onClick={save} disabled={saving} className="btn-dark">
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
