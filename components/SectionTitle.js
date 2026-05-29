export default function SectionTitle({ eyebrow, title, subtitle, align = "center" }) {
  return (
    <div className={`max-w-2xl mb-12 ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="h-section">{title}</h2>
      {subtitle && <p className="mt-4 text-brand-ink/70 text-base leading-relaxed">{subtitle}</p>}
    </div>
  );
}
