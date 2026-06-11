import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import EnquiryForm from "@/components/EnquiryForm";
import { getDestinations, getHolidayTypes } from "@/lib/content";

export const metadata = { title: "Make an Enquiry — Thubten Travels" };
export const revalidate = 60;

export default async function EnquiryPage() {
  const [destinations, holidayTypes] = await Promise.all([
    getDestinations(),
    getHolidayTypes()
  ]);
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Tailor-made journeys"
          title="Make an enquiry"
          subtitle="Tell us a little about who's travelling and what matters most — we'll come back with a first draft itinerary within one business day."
          image="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80"
        />
        <section className="section">
          <div className="wrap max-w-4xl">
            <div className="bg-white rounded-3xl shadow-sm p-6 md:p-10 border border-brand-ink/5">
              <EnquiryForm destinations={destinations} holidayTypes={holidayTypes} source="enquiry" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
