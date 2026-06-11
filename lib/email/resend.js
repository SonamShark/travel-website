// Resend-based transactional email. Two sends per enquiry:
//   1. Admin notification to ADMIN_EMAIL
//   2. Customer acknowledgement to the email they submitted
//
// Failures are logged but never thrown to the caller — the enquiry has
// already been persisted by the time we get here. The caller wraps both
// sends in Promise.allSettled.
import { Resend } from "resend";
import { adminEnquiryTemplate, customerAckTemplate } from "./templates";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

function env(name) {
  const v = process.env[name];
  if (!v) console.warn(`[email] Missing ${name}`);
  return v;
}

export async function sendAdminEnquiryEmail(enquiry) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY missing — admin email skipped");
    return { skipped: true };
  }
  const from = env("FROM_EMAIL");
  const to = env("ADMIN_EMAIL");
  if (!from || !to) return { skipped: true };
  return resend.emails.send({
    from,
    to,
    replyTo: enquiry.email,
    subject: `New enquiry — ${enquiry.name}${enquiry.country ? ` (${enquiry.country})` : ""}`,
    html: adminEnquiryTemplate(enquiry)
  });
}

export async function sendCustomerAckEmail(enquiry) {
  if (!resend) return { skipped: true };
  const from = env("FROM_EMAIL");
  if (!from || !enquiry.email) return { skipped: true };
  return resend.emails.send({
    from,
    to: enquiry.email,
    subject: "We've received your enquiry — Thubten Travels",
    html: customerAckTemplate(enquiry)
  });
}
