import Link from "next/link";

export default function Hero({ title, subtitle, image }) {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center text-center text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      <div className="relative z-10 wrap fade-up">
        <p className="eyebrow text-brand-gold mb-4">Welcome to the Land of the Thunder Dragon</p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto text-white">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-white/85">
          {subtitle}
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/packages" className="btn-primary">Explore Packages</Link>
          <Link href="/enquiry" className="btn-outline">Make Enquiry</Link>
        </div>
      </div>
    </section>
  );
}
