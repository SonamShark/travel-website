import Link from "next/link";

export default function PackageCard({ pkg }) {
  return (
    <article className="card group flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs uppercase tracking-widest px-3 py-1.5 rounded-full text-brand-ink">
          {pkg.duration}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="eyebrow mb-2">{pkg.type}</p>
        <h3 className="font-serif text-2xl text-brand-ink">{pkg.title}</h3>
        <p className="mt-3 text-sm text-brand-ink/75 leading-relaxed line-clamp-3 flex-1">
          {pkg.shortDescription}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-brand-gold font-medium text-sm">{pkg.price}</span>
          <Link
            href={`/packages/${pkg.slug}`}
            className="text-sm font-medium text-brand-ink border-b border-brand-ink/30 hover:border-brand-gold hover:text-brand-gold transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
