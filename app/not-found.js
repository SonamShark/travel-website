import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center text-center px-5 pt-24">
        <div>
          <p className="eyebrow mb-3">404</p>
          <h1 className="h-display">This path led somewhere else</h1>
          <p className="mt-3 text-brand-ink/70 max-w-md mx-auto">
            The page you were looking for could not be found. Try going back to the home page.
          </p>
          <Link href="/" className="btn-dark mt-7">Back to home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
