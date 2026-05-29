import Link from "next/link";

function formatDate(d) {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogCard({ post }) {
  return (
    <Link href={`/journal/${post.slug}`} className="card group block">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <p className="text-xs uppercase tracking-widest text-brand-gold">
          {formatDate(post.date)} {post.author ? `· ${post.author}` : ""}
        </p>
        <h3 className="mt-2 font-serif text-2xl text-brand-ink">{post.title}</h3>
        <p className="mt-3 text-sm text-brand-ink/75 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <p className="mt-4 text-sm text-brand-gold font-medium">Read story →</p>
      </div>
    </Link>
  );
}
