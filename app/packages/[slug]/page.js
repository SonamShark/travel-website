import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { getPackageBySlug } from "@/lib/content";

export const revalidate = 60;

export default async function PackageDetail({ params }) {
  const pkg = await getPackageBySlug(params.slug);
  if (!pkg) notFound();

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow={pkg.type}
          title={pkg.title}
          subtitle={pkg.shortDescription}
          image={pkg.image}
        />

        <section className="section">
          <div className="wrap grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-10">
                <span className="px-4 py-2 rounded-full bg-brand-beige text-sm text-brand-ink">
                  {pkg.duration}
                </span>
                <span className="px-4 py-2 rounded-full bg-brand-beige text-sm text-brand-ink">
                  {pkg.price}
                </span>
                <span className="px-4 py-2 rounded-full bg-brand-beige text-sm text-brand-ink">
                  {(pkg.destinations || []).join(" · ")}
                </span>
              </div>

              <h2 className="font-serif text-3xl text-brand-ink">Itinerary</h2>
              <ol className="mt-6 space-y-5">
                {(pkg.itinerary || []).map((day, i) => (
                  <li key={i} className="border-l-2 border-brand-gold/50 pl-5">
                    <p className="eyebrow mb-1">{day.day}</p>
                    <h4 className="font-serif text-xl text-brand-ink">{day.title}</h4>
                    <p className="mt-1 text-brand-ink/75 leading-relaxed">{day.text}</p>
                  </li>
                ))}
              </ol>

              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div>
                  <h3 className="font-serif text-2xl text-brand-ink">Inclusions</h3>
                  <ul className="mt-3 space-y-2 text-sm text-brand-ink/85">
                    {(pkg.inclusions || []).map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="text-brand-green">✓</span> {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-brand-ink">Exclusions</h3>
                  <ul className="mt-3 space-y-2 text-sm text-brand-ink/85">
                    {(pkg.exclusions || []).map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="text-brand-gold">×</span> {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <aside className="bg-brand-beige rounded-2xl p-7 h-fit sticky top-28">
              <p className="eyebrow mb-2">Interested?</p>
              <h3 className="font-serif text-2xl text-brand-ink">Enquire about this journey</h3>
              <p className="mt-2 text-sm text-brand-ink/75">
                Send us a quick note and we'll come back with a tailored proposal — usually within
                a working day.
              </p>
              <Link href="/enquiry" className="btn-dark mt-5 w-full">
                Make an enquiry
              </Link>
              <Link href="/contact" className="btn-ghost mt-3 w-full">
                Talk to us
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
