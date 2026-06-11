import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { getDestinationBySlug } from "@/lib/content";

export const revalidate = 60;

export default async function DestinationDetail({ params }) {
  const d = await getDestinationBySlug(params.slug);
  if (!d) notFound();

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Destination"
          title={d.name}
          subtitle={d.shortDescription}
          image={d.image}
        />
        <section className="section">
          <div className="wrap grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 prose max-w-none">
              <p className="font-serif text-2xl text-brand-ink leading-relaxed">
                {d.longDescription || d.shortDescription}
              </p>
              <h3 className="mt-10 font-serif text-2xl text-brand-ink">Why visit {d.name}</h3>
              <p className="mt-3 text-brand-ink/75 leading-relaxed">
                {d.shortDescription}
              </p>
            </div>
            <aside className="bg-brand-beige rounded-2xl p-7 h-fit">
              <h4 className="font-serif text-xl text-brand-ink">Highlights</h4>
              <ul className="mt-3 space-y-2 text-sm text-brand-ink/85">
                {(d.highlights || []).map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-brand-gold">◆</span>
                    {h}
                  </li>
                ))}
              </ul>
              <h4 className="mt-7 font-serif text-xl text-brand-ink">Best time to visit</h4>
              <p className="mt-2 text-sm text-brand-ink/85">{d.bestTime}</p>
              <Link href="/enquiry" className="btn-dark mt-7 w-full">
                Enquire about {d.name}
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
