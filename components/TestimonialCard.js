export default function TestimonialCard({ testimonial }) {
  return (
    <figure className="card p-7 flex flex-col h-full">
      <svg width="28" height="22" viewBox="0 0 28 22" className="text-brand-gold mb-4" fill="currentColor">
        <path d="M11.4 0v8.6c0 7.1-3 11-9 13.4l-1.6-3.4c3.4-1.4 5-3.4 5-6H1V0h10.4zm15.6 0v8.6c0 7.1-3 11-9 13.4l-1.6-3.4c3.4-1.4 5-3.4 5-6h-5.4V0H27z"/>
      </svg>
      <blockquote className="text-brand-ink/85 leading-relaxed font-serif text-lg italic flex-1">
        “{testimonial.text}”
      </blockquote>
      <figcaption className="mt-5">
        <p className="font-medium text-brand-ink">{testimonial.name}</p>
        <p className="text-xs uppercase tracking-widest text-brand-gold mt-1">
          {testimonial.country}
        </p>
      </figcaption>
    </figure>
  );
}
