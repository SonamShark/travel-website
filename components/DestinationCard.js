import Link from "next/link";

export default function DestinationCard({ destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="card group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="font-serif text-2xl">{destination.name}</h3>
          <p className="mt-1 text-xs uppercase tracking-widest text-brand-gold">
            Best: {destination.bestTime}
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-brand-ink/75 leading-relaxed line-clamp-3">
          {destination.shortDescription}
        </p>
        <p className="mt-4 text-sm text-brand-gold font-medium">Discover →</p>
      </div>
    </Link>
  );
}
