import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import EnquiryForm from "@/components/EnquiryForm";
import { readObject, readCollection } from "@/lib/db";

export const metadata = { title: "Contact — Thubten Travels" };

export default function ContactPage() {
  const { contact = {} } = readObject("site");
  const destinations = readCollection("destinations");
  const holidayTypes = readCollection("holidayTypes");
  const social = contact.social || {};

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Get in touch"
          title="Contact us"
          subtitle="We answer every enquiry personally — usually within one business day."
          //image="https://images.unsplash.com/photo-1583774148228-94eed8b0b22e?auto=format&fit=crop&w=1920&q=80"
          image="https://plus.unsplash.com/premium_photo-1692386759483-c3b25c241acd?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <section className="section">
          <div className="wrap grid lg:grid-cols-3 gap-10">
            {/* Info column */}
            <div className="space-y-6">
              <div>
                <p className="eyebrow mb-2">Office</p>
                <p className="text-brand-ink/85">{contact.address}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Phone / WhatsApp</p>
                <p className="text-brand-ink/85">{contact.phone}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Email</p>
                <a href={`mailto:${contact.email}`} className="text-brand-ink/85 hover:text-brand-gold">
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="eyebrow mb-2">Hours</p>
                <p className="text-brand-ink/85">{contact.hours}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Follow</p>
                <div className="flex gap-3 text-sm">
                  {social.facebook && <a href={social.facebook} className="hover:text-brand-gold">Facebook</a>}
                  {social.instagram && <a href={social.instagram} className="hover:text-brand-gold">Instagram</a>}
                  {social.youtube && <a href={social.youtube} className="hover:text-brand-gold">YouTube</a>}
                  {social.tripadvisor && <a href={social.tripadvisor} className="hover:text-brand-gold">TripAdvisor</a>}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-6 md:p-10 border border-brand-ink/5">
              <h2 className="font-serif text-3xl text-brand-ink mb-2">Send a message</h2>
              <p className="text-brand-ink/70 mb-6">Tell us a little about your trip and we'll be in touch.</p>
              <EnquiryForm destinations={destinations} holidayTypes={holidayTypes} />
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="pb-20">
          <div className="wrap">
            <div className="rounded-3xl overflow-hidden aspect-[16/7] border border-brand-ink/5">
              <iframe
                title="Map"
                src={contact.mapEmbed || "https://www.google.com/maps?q=Thimphu,Bhutan&output=embed"}
                width="100%"
                height="100%"
                loading="lazy"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
