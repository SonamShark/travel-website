"use client";
import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  country: "",
  travelDate: "",
  travelers: "2",
  destination: "",
  holidayType: "",
  budget: "",
  message: ""
};

export default function EnquiryForm({ destinations = [], holidayTypes = [], compact = false, source = "enquiry" }) {
  const [form, setForm] = useState(initialState);
  const [state, setState] = useState({ status: "idle", error: "" });

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setState({ status: "loading", error: "" });
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source })
      });
      if (!res.ok) throw new Error("Submission failed. Please try again.");
      setForm(initialState);
      setState({ status: "success", error: "" });
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  }

  if (state.status === "success") {
    return (
      <div className="bg-brand-beige border border-brand-gold/40 rounded-2xl p-8 text-center">
        <h3 className="font-serif text-2xl text-brand-ink">Thank you</h3>
        <p className="mt-2 text-brand-ink/75">
          Your enquiry has reached our Thimphu team. We'll reply within one business day.
        </p>
        <button onClick={() => setState({ status: "idle", error: "" })} className="mt-5 btn-ghost">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}
    >
      <div>
        <label className="label">Full name *</label>
        <input className="input" required value={form.name} onChange={(e) => update("name", e.target.value)} />
      </div>
      <div>
        <label className="label">Email *</label>
        <input type="email" className="input" required value={form.email} onChange={(e) => update("email", e.target.value)} />
      </div>
      <div>
        <label className="label">Phone / WhatsApp</label>
        <input className="input" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
      </div>
      <div>
        <label className="label">Country</label>
        <input className="input" value={form.country} onChange={(e) => update("country", e.target.value)} />
      </div>
      <div>
        <label className="label">Preferred travel date</label>
        <input type="date" className="input" value={form.travelDate} onChange={(e) => update("travelDate", e.target.value)} />
      </div>
      <div>
        <label className="label">Number of travellers</label>
        <input type="number" min="1" className="input" value={form.travelers} onChange={(e) => update("travelers", e.target.value)} />
      </div>
      <div>
        <label className="label">Interested destination</label>
        <select className="input" value={form.destination} onChange={(e) => update("destination", e.target.value)}>
          <option value="">Any / not sure</option>
          {destinations.map((d) => (
            <option key={d.id || d.slug} value={d.name}>{d.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">Interested holiday type</label>
        <select className="input" value={form.holidayType} onChange={(e) => update("holidayType", e.target.value)}>
          <option value="">Any / not sure</option>
          {holidayTypes.map((t) => (
            <option key={t.id || t.slug} value={t.name}>{t.name}</option>
          ))}
        </select>
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <label className="label">Budget range (USD per person)</label>
        <select className="input" value={form.budget} onChange={(e) => update("budget", e.target.value)}>
          <option value="">Select a range</option>
          <option>Under $2,500</option>
          <option>$2,500 – $5,000</option>
          <option>$5,000 – $10,000</option>
          <option>Above $10,000</option>
        </select>
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <label className="label">Message / special request</label>
        <textarea
          rows={4}
          className="input"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      {state.status === "error" && (
        <p className="md:col-span-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {state.error}
        </p>
      )}

      <div className={compact ? "" : "md:col-span-2"}>
        <button type="submit" disabled={state.status === "loading"} className="btn-dark w-full md:w-auto">
          {state.status === "loading" ? "Sending…" : "Submit Enquiry"}
        </button>
      </div>
    </form>
  );
}
