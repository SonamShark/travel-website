import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";

const faqs = [
  {
    q: "Do I need a visa to visit Bhutan?",
    a: "Yes — every visitor except Indian, Bangladeshi and Maldivian passport holders needs a visa, which we arrange for you once your trip is confirmed."
  },
  {
    q: "What is the Sustainable Development Fee (SDF)?",
    a: "The SDF is a nightly fee paid to the Bhutan government — currently US$100 per adult per night, with reductions for children and select markets. It funds healthcare, education and environmental conservation."
  },
  {
    q: "When is the best time to visit?",
    a: "Spring (March–May) and autumn (September–November) are the most popular — clear skies, festivals and dry trails. Winter is quieter and beautiful in the lower valleys; summer is lush but wet."
  },
  {
    q: "How do I get to Bhutan?",
    a: "By air via Paro International Airport, served by Druk Air and Bhutan Airlines from hubs including Delhi, Kolkata, Bangkok, Singapore and Kathmandu. We can advise on the best connections."
  },
  {
    q: "Is Bhutan safe?",
    a: "Yes — Bhutan is one of the safest countries in Asia, with low crime and a strong sense of community. Solo travellers, families and older guests all travel here comfortably."
  },
  {
    q: "What should I pack?",
    a: "Layers, sturdy walking shoes, a warm jacket (even in summer for higher elevations), modest clothing for monastery visits, and a refillable water bottle. We send a detailed list once your trip is booked."
  }
];

const festivals = [
  { name: "Paro Tshechu", when: "March / April", where: "Paro Dzong" },
  { name: "Thimphu Tshechu", when: "September / October", where: "Tashichho Dzong" },
  { name: "Punakha Drubchen & Tshechu", when: "February / March", where: "Punakha Dzong" },
  { name: "Jambay Lhakhang Drup", when: "October / November", where: "Bumthang" },
  { name: "Black-Necked Crane Festival", when: "November", where: "Phobjikha Valley" },
  { name: "Haa Summer Festival", when: "July", where: "Haa Valley" }
];

export const metadata = { title: "Travel Guide — Thubten Travels" };

export default function TravelGuidePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Plan your journey"
          title="Bhutan travel guide"
          subtitle="Everything you'll want to know before you go — visas, seasons, festivals and practical tips."
          //image="https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1920&q=80"
          //image="https://images.unsplash.com/photo-1649932362638-ad9d984659ef?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          image="https://images.unsplash.com/photo-1761048158383-50372fed6f73?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <section className="section">
          <div className="wrap grid lg:grid-cols-3 gap-8">
            <div className="card p-7">
              <p className="eyebrow mb-2">Bhutan in brief</p>
              <h3 className="font-serif text-2xl text-brand-ink">A kingdom of valleys</h3>
              <p className="mt-3 text-sm text-brand-ink/75 leading-relaxed">
                Bhutan is a small Buddhist kingdom in the eastern Himalaya — roughly the size of
                Switzerland, with around 770,000 people. Famous for Gross National Happiness,
                cliff-top monasteries, and a determined approach to "high value, low volume" tourism.
              </p>
            </div>
            <div className="card p-7">
              <p className="eyebrow mb-2">Visa & SDF</p>
              <h3 className="font-serif text-2xl text-brand-ink">Visa and Sustainable Development Fee</h3>
              <p className="mt-3 text-sm text-brand-ink/75 leading-relaxed">
                All visitors (except India, Bangladesh, Maldives) require a visa — US$40 one-time fee.
                The SDF is currently US$100 per adult per night, with reductions for children. We
                arrange both as part of every trip we run.
              </p>
            </div>
            <div className="card p-7">
              <p className="eyebrow mb-2">Best time to visit</p>
              <h3 className="font-serif text-2xl text-brand-ink">Seasons in Bhutan</h3>
              <p className="mt-3 text-sm text-brand-ink/75 leading-relaxed">
                Spring (Mar–May) and autumn (Sep–Nov) are the classic windows — clear mountain views
                and festival season. Winter is quieter, sunny and crisp in the lower valleys; summer
                is green and lush, with afternoon rains.
              </p>
            </div>
          </div>
        </section>

        {/* Festivals */}
        <section className="section bg-brand-beige">
          <div className="wrap">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">Festivals</p>
              <h2 className="h-section">When the valleys come alive</h2>
              <p className="mt-3 text-brand-ink/75">
                Bhutan's tshechus are religious festivals of masked dance, performed in dzong
                courtyards. A few worth planning around:
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {festivals.map((f) => (
                <div key={f.name} className="bg-white rounded-2xl p-5">
                  <h4 className="font-serif text-xl text-brand-ink">{f.name}</h4>
                  <p className="text-sm text-brand-gold uppercase tracking-widest mt-1">{f.when}</p>
                  <p className="mt-2 text-sm text-brand-ink/75">{f.where}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Travel tips */}
        <section className="section">
          <div className="wrap grid lg:grid-cols-2 gap-10">
            <div>
              <p className="eyebrow mb-3">Travel tips</p>
              <h2 className="h-section">Small things that make a difference</h2>
            </div>
            <ul className="space-y-4 text-brand-ink/85">
              <li><strong className="text-brand-ink">Currency.</strong> The Ngultrum (BTN) is pegged to the Indian Rupee, which is also accepted. ATMs are present in major towns; carry some cash for villages.</li>
              <li><strong className="text-brand-ink">SIM cards.</strong> Buy a local SIM at Paro airport. Coverage is good in valleys, patchy on passes.</li>
              <li><strong className="text-brand-ink">Dress.</strong> Modest clothing for monastery visits (long sleeves, long trousers). Layers for changing altitudes.</li>
              <li><strong className="text-brand-ink">Altitude.</strong> Most travel sits at 2,000–3,000m. Take it easy on day one; drink plenty of water.</li>
              <li><strong className="text-brand-ink">Photography.</strong> Photography inside temples and dzongs is usually not permitted — always ask your guide first.</li>
              <li><strong className="text-brand-ink">Tipping.</strong> Tipping is appreciated but not expected. We share guidelines before your trip.</li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-brand-beige">
          <div className="wrap max-w-3xl">
            <p className="eyebrow mb-3">FAQ</p>
            <h2 className="h-section mb-8">Frequently asked questions</h2>
            <div className="space-y-3">
              {faqs.map((item, i) => (
                <details key={i} className="bg-white rounded-2xl p-5 group">
                  <summary className="cursor-pointer flex items-center justify-between font-serif text-lg text-brand-ink">
                    {item.q}
                    <span className="text-brand-gold text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-brand-ink/75 leading-relaxed">{item.a}</p>
                </details>
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
