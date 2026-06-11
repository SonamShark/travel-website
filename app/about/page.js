import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import CtaBanner from "@/components/CtaBanner";
import { getSiteSettings } from "@/lib/site";

export const metadata = { title: "About — Thubten Travels" };
export const revalidate = 60;

const team = [
  { name: "Tashi Wangmo", role: "Founder & Head of Journeys" },
  { name: "Karma Dorji", role: "Senior Guide & Trek Leader" },
  { name: "Pema Yangchen", role: "Guest Experience" },
  { name: "Sonam Tobgay", role: "Operations & Logistics" }
];

const values = [
  { title: "Slow travel", text: "Fewer places, deeper stays. We'd rather spend two nights somewhere meaningful than three places in three days." },
  { title: "Bhutanese-led", text: "Owned and run from Thimphu. Every dollar you spend stays in the country and supports local guides, drivers and crafts." },
  { title: "Quietly considered", text: "Soft hellos, hot tea on arrival, the right book on your bedside table — the small things travellers remember." }
];

export default async function AboutPage() {
  const { whyChooseUs = [] } = await getSiteSettings();

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="About us"
          title="Thubten Travels"
          subtitle="A small, Bhutanese-owned travel company. We design unhurried journeys for travellers who want to see Bhutan as it actually is."
          //image="https://images.unsplash.com/photo-1582554455769-2c0a6f0b1f9d?auto=format&fit=crop&w=1920&q=80"
          image="https://images.unsplash.com/photo-1629778634400-21720d1b92b3?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <section className="section">
          <div className="wrap grid lg:grid-cols-2 gap-10 items-center">
            <img
              //src="https://images.unsplash.com/photo-1571406384350-30e8c0b5b22e?auto=format&fit=crop&w=1200&q=80"
              src="https://images.unsplash.com/photo-1602058033339-b9325bb3a6c3?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Punakha Dzong"
              className="rounded-3xl aspect-[5/6] w-full object-cover"
            />
            <div>
              <p className="eyebrow mb-3">Our story</p>
              <h2 className="h-section">A travel company shaped by the country we live in</h2>
              <p className="mt-5 text-brand-ink/75 leading-relaxed">
                Thubten Travels was founded in Thimphu by a small team of Bhutanese
                guides and hospitality friends. After many years working for the larger operators,
                we wanted to build something quieter — a company that takes the time to listen,
                designs every journey carefully, and treats guests like people, not bookings.
              </p>
              <p className="mt-4 text-brand-ink/75 leading-relaxed">
                We are small on purpose. We don't run group departures, we don't sell coach tours,
                and we won't try to fit five valleys into a week. We'd rather know your name, learn
                what matters to you, and put together a trip you'll talk about for years.
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-brand-beige">
          <div className="wrap">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">What we believe</p>
              <h2 className="h-section">Mission & values</h2>
              <p className="mt-3 text-brand-ink/75">
                Bhutan calls itself the land of Gross National Happiness. We try to design journeys
                that, in their small way, reflect that.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-7">
                  <h3 className="font-serif text-xl text-brand-ink">{v.title}</h3>
                  <p className="mt-2 text-sm text-brand-ink/75 leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">Why us</p>
              <h2 className="h-section">Why choose Thubten Travels</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {whyChooseUs.map((item, idx) => (
                <div key={idx} className="p-7 rounded-2xl bg-brand-beige/60 border border-brand-ink/5">
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-serif">
                    {idx + 1}
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-brand-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-brand-ink/75 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team placeholder */}
        <section className="section bg-brand-beige">
          <div className="wrap">
            <div className="max-w-2xl mb-10">
              <p className="eyebrow mb-3">The team</p>
              <h2 className="h-section">People who'll look after you</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m) => (
                <div key={m.name} className="text-center">
                  <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-brand-green/20 to-brand-gold/20 flex items-center justify-center font-serif text-5xl text-brand-green">
                    {m.name.charAt(0)}
                  </div>
                  <h4 className="mt-4 font-serif text-xl text-brand-ink">{m.name}</h4>
                  <p className="text-sm text-brand-gold uppercase tracking-widest mt-1">{m.role}</p>
                </div>
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
