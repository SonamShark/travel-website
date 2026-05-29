import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            //src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1920&q=80"
            src="https://images.unsplash.com/photo-1599026470570-a0bf3ef63deb?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Bhutan mountains"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />
          <div className="relative p-10 md:p-16 max-w-2xl text-white">
            <p className="eyebrow text-brand-gold mb-3">Ready to begin?</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              Let us design your Bhutan journey
            </h2>
            <p className="mt-4 text-white/85">
              Tell us a little about who's travelling and what matters most to you —
              we'll draft a first itinerary within one business day, with no pressure to book.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href="/enquiry" className="btn-primary">Start an enquiry</Link>
              <Link href="/contact" className="btn-outline">Contact us</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
