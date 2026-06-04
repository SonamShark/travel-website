import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import DestinationCard from "@/components/DestinationCard";
import CtaBanner from "@/components/CtaBanner";
import { readCollection } from "@/lib/db";

export const metadata = { title: "Destinations — Thubten Travels" };

export default function DestinationsPage() {
  const destinations = readCollection("destinations");

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Where to go in Bhutan"
          title="Destinations across the kingdom"
          subtitle="From the western valleys to the sacred lands of the centre and east — eight places to begin imagining your journey."
          //image="https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1920&q=80"
          image="https://images.unsplash.com/photo-1639623536570-021f51e28107?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <section className="section">
          <div className="wrap">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          </div>
        </section>
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
