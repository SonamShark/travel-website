"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "/destinations", label: "Destinations" },
  { href: "/holiday-types", label: "Holiday Types" },
  { href: "/packages", label: "Packages" },
  { href: "/travel-guide", label: "Travel Guide" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar({ transparent = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !transparent || scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid ? "bg-brand-cream/95 backdrop-blur border-b border-brand-ink/5" : "bg-transparent"
      }`}
    >
      <div className="wrap flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className={`w-9 h-9 rounded-full flex items-center justify-center ${
              solid ? "bg-brand-green" : "bg-white/20 backdrop-blur"
            }`}
          >
            <span className="font-serif text-brand-gold text-lg">T</span>
          </span>
          <span
            className={`font-serif text-lg md:text-xl tracking-wide ${
              solid ? "text-brand-ink" : "text-white"
            }`}
          >
            Thubten Tour and Travel
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium hover:text-brand-gold transition-colors ${
                solid ? "text-brand-ink" : "text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/enquiry" className="btn-primary">
            Make Enquiry
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className={`lg:hidden p-2 ${solid ? "text-brand-ink" : "text-white"}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d={open ? "M6 6l12 12M6 18L18 6" : "M3 6h18M3 12h18M3 18h18"}
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-brand-cream border-t border-brand-ink/5">
          <div className="wrap py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1.5 text-brand-ink hover:text-brand-gold"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/enquiry" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Make Enquiry
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
