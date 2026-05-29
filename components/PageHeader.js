// Re-usable inner-page hero. Used for everything except the home page.
export default function PageHeader({ eyebrow, title, subtitle, image }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 text-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            image ||
            "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1920&q=80"
          })`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/55" />
      <div className="relative wrap fade-up">
        {eyebrow && <p className="eyebrow text-brand-gold mb-3">{eyebrow}</p>}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-white max-w-3xl mx-auto">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-white/85 max-w-2xl mx-auto text-base md:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
