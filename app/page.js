import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionTitle from "@/components/SectionTitle";
import DestinationCard from "@/components/DestinationCard";
import PackageCard from "@/components/PackageCard";
import TestimonialCard from "@/components/TestimonialCard";
import CtaBanner from "@/components/CtaBanner";
import { readObject, readCollection } from "@/lib/db";

export default function HomePage() {
  const site = readObject("site");
  const destinations = readCollection("destinations").slice(0, 4);
  const packages = readCollection("packages").slice(0, 3);

  return (
    <>
      <Navbar transparent />
      <main>
        <Hero
          title={site.hero?.title}
          subtitle={site.hero?.subtitle}
          image={site.hero?.image}
        />

        {/* Featured destinations */}
        <section className="section">
          <div className="wrap">
            <SectionTitle
              eyebrow="Featured destinations"
              title="The valleys you came for"
              subtitle="From cliff-top monasteries to glacial valleys — start with the places that draw most travellers, then go further."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((d) => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured packages */}
        <section className="section bg-brand-beige">
          <div className="wrap">
            <SectionTitle
              eyebrow="Hand-crafted journeys"
              title="Featured holiday packages"
              subtitle="A starting point only — every itinerary can be tailored to your dates, pace, and the kind of traveller you are."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="section">
          <div className="wrap">
            <SectionTitle eyebrow="Why travel with us" title="Quietly, carefully, locally" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {(site.whyChooseUs || []).map((item, idx) => (
                <div key={idx} className="p-7 rounded-2xl bg-brand-beige/50 border border-brand-ink/5">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-serif text-lg">
                    {idx + 1}
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-brand-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-brand-ink/75 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section bg-brand-ink text-white">
          <div className="wrap">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="eyebrow mb-3">From our travellers</p>
              <h2 className="font-serif text-3xl md:text-4xl text-white">Stories worth carrying home</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {(site.testimonials || []).map((t, i) => (
                <TestimonialCard key={i} testimonial={t} />
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
