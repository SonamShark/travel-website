export default function HolidayTypeCard({ type }) {
  return (
    <article className="card group">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={type.image}
          alt={type.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-2xl text-brand-ink">{type.name}</h3>
        <p className="mt-3 text-sm text-brand-ink/75 leading-relaxed">{type.description}</p>
      </div>
    </article>
  );
}
