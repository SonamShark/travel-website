import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import PackageCard from "@/components/PackageCard";
import CtaBanner from "@/components/CtaBanner";
import { readCollection } from "@/lib/db";

export const metadata = { title: "Holiday Packages — Thubten Travels" };

export default function PackagesPage() {
  const packages = readCollection("packages");
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Sample journeys"
          title="Holiday packages"
          subtitle="A library of itineraries to spark ideas — every one of them is fully customisable to your dates, pace, and interests."
          image="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80"
        />
        <section className="section">
          <div className="wrap grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </section>
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
