import Link from "next/link";
import { readObject } from "@/lib/db";

export default function Footer() {
  const { contact = {} } = readObject("site");
  const social = contact.social || {};

  return (
    <footer className="bg-brand-ink text-white/80 mt-20">
      <div className="wrap py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center">
              <span className="font-serif text-brand-gold text-lg">T</span>
            </span>
            <span className="font-serif text-xl text-white">Thubten Travels</span>
          </div>
          <p className="text-sm leading-relaxed">
            Tailor-made Bhutan holidays — designed slowly, guided locally,
            remembered for a long time.
          </p>
        </div>

        <div>
          <h4 className="text-white text-base mb-3 font-serif">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/destinations" className="hover:text-brand-gold">Destinations</Link></li>
            <li><Link href="/holiday-types" className="hover:text-brand-gold">Holiday Types</Link></li>
            <li><Link href="/packages" className="hover:text-brand-gold">Packages</Link></li>
            <li><Link href="/travel-guide" className="hover:text-brand-gold">Travel Guide</Link></li>
            <li><Link href="/journal" className="hover:text-brand-gold">Journal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base mb-3 font-serif">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>{contact.address}</li>
            <li>{contact.phone}</li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-brand-gold">
                {contact.email}
              </a>
            </li>
            <li>{contact.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base mb-3 font-serif">Follow</h4>
          <ul className="space-y-2 text-sm">
            {social.facebook && <li><a href={social.facebook} className="hover:text-brand-gold">Facebook</a></li>}
            {social.instagram && <li><a href={social.instagram} className="hover:text-brand-gold">Instagram</a></li>}
            {social.youtube && <li><a href={social.youtube} className="hover:text-brand-gold">YouTube</a></li>}
            {social.tripadvisor && <li><a href={social.tripadvisor} className="hover:text-brand-gold">TripAdvisor</a></li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Thubten Travels. All rights reserved.</p>
          <p>
            <Link href="/admin" className="hover:text-brand-gold">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
