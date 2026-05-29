import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { readCollection } from "@/lib/db";

export function generateStaticParams() {
  return readCollection("blogs").map((b) => ({ slug: b.slug }));
}

function formatDate(d) {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogDetail({ params }) {
  const post = readCollection("blogs").find((b) => b.slug === params.slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow={`${formatDate(post.date)}${post.author ? ` · ${post.author}` : ""}`}
          title={post.title}
          subtitle={post.excerpt}
          image={post.image}
        />
        <section className="section">
          <div className="wrap max-w-3xl">
            <article className="prose max-w-none">
              {String(post.content || "")
                .split(/\n\n+/)
                .map((para, i) => (
                  <p key={i} className="text-brand-ink/85 leading-relaxed mb-5">
                    {para}
                  </p>
                ))}
            </article>
            <div className="mt-10">
              <Link href="/journal" className="btn-ghost">← Back to journal</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
