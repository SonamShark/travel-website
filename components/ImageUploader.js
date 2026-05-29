"use client";
import { useState } from "react";

// Reusable image input — accepts a URL or lets the admin upload a file,
// which calls /api/upload and stores the returned URL.
export default function ImageUploader({ value, onChange, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="input flex-1"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste an image URL or upload below"
        />
        <label className="btn-ghost cursor-pointer sm:w-auto whitespace-nowrap">
          {uploading ? "Uploading…" : "Upload file"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      {value && (
        <img
          src={value}
          alt=""
          className="mt-3 w-full max-w-xs h-32 object-cover rounded-lg border border-brand-ink/10"
        />
      )}
    </div>
  );
}
