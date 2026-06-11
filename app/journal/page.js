import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import BlogCard from "@/components/BlogCard";
import { getBlogs } from "@/lib/content";

export const metadata = { title: "Journal — Thubten Travels" };
export const revalidate = 60;

export default async function JournalPage() {
  const posts = await getBlogs();
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Stories & notes"
          title="Journal"
          subtitle="Field notes, travel stories and the small things we've learnt from many years of guiding in Bhutan."
          image="https://images.unsplash.com/photo-1605904583059-7880dad25595?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <section className="section">
          <div className="wrap">
            {posts.length === 0 ? (
              <p className="text-center text-brand-ink/70">No journal entries yet.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
