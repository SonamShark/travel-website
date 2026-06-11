// Plain HTML email templates. No JSX — keeps the email layer dependency-free
// and works with any sending provider. Always HTML-escape user-supplied text.

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function row(label, value) {
  if (value === null || value === undefined || value === "") return "";
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#777;font-size:13px;white-space:nowrap;vertical-align:top">${esc(label)}</td>
    <td style="padding:6px 0;font-size:14px;color:#1f2a24;vertical-align:top">${value}</td>
  </tr>`;
}

export function adminEnquiryTemplate(e) {
  const emailLink = `<a href="mailto:${esc(e.email)}" style="color:#3f6b4e">${esc(e.email)}</a>`;
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#fbf8f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #eee">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#c8a45d">New enquiry</p>
    <h1 style="margin:0 0 20px;font-family:Georgia,serif;font-size:26px;color:#1f2a24">${esc(e.name)}</h1>

    <table style="width:100%;border-collapse:collapse">
      ${row("Email", emailLink)}
      ${row("Phone", esc(e.phone))}
      ${row("Country", esc(e.country))}
      ${row("Travel date", esc(e.travel_date || e.travelDate))}
      ${row("Travellers", esc(e.travelers))}
      ${row("Destination", esc(e.destination))}
      ${row("Holiday type", esc(e.holiday_type || e.holidayType))}
      ${row("Budget", esc(e.budget))}
      ${row("Source", esc(e.source))}
    </table>

    ${e.message ? `
      <div style="margin-top:20px;background:#f6f1e7;border-radius:12px;padding:16px">
        <p style="margin:0 0 6px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#c8a45d">Message</p>
        <p style="margin:0;font-size:14px;color:#1f2a24;white-space:pre-wrap;line-height:1.55">${esc(e.message)}</p>
      </div>` : ""}

    <p style="margin:24px 0 0;font-size:12px;color:#999">
      Reply directly to this email to respond to ${esc(e.name.split(" ")[0])}.
    </p>
  </div>
</body></html>`;
}

export function customerAckTemplate(e) {
  const first = (e.name || "there").split(" ")[0];
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#fbf8f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #eee">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#c8a45d">Thubten Travels</p>
    <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:28px;color:#1f2a24">Thank you, ${esc(first)}</h1>
    <p style="font-size:15px;line-height:1.6;color:#1f2a24;margin:0 0 14px">
      Your enquiry has reached our team in Thimphu. We'll respond personally within one business day with first thoughts on your journey.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#1f2a24;margin:0 0 14px">
      If anything's changed or you'd like to add details, simply reply to this email — it will come straight to us.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#1f2a24;margin:24px 0 4px">
      Warmly,
    </p>
    <p style="font-size:15px;line-height:1.6;color:#1f2a24;margin:0">
      The Thubten Travels team
    </p>
  </div>
</body></html>`;
}
