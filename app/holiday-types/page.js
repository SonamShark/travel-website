import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import HolidayTypeCard from "@/components/HolidayTypeCard";
import CtaBanner from "@/components/CtaBanner";
import { readCollection } from "@/lib/db";

export const metadata = { title: "Holiday Types — Thubten Travels" };

export default function HolidayTypesPage() {
  const types = readCollection("holidayTypes");
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="What kind of journey?"
          title="Holiday types"
          subtitle="Six ways into Bhutan — pick a starting point and we'll shape the journey around it."
         // image="https://images.unsplash.com/photo-1583774148228-94eed8b0b22e?auto=format&fit=crop&w=1920&q=80"
          image="https://images.unsplash.com/photo-1657615772758-2b75b1f21e37?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <section className="section">
          <div className="wrap grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {types.map((t) => (
              <HolidayTypeCard key={t.id} type={t} />
            ))}
          </div>
        </section>
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
