"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "Who We Are" },
  { to: "/services", label: "Our Services" },
  { to: "/products", label: "Products" },
  { to: "/products", label: "Equipment Catalog" },
  { to: "/hseq", label: "HSEQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <div className="hidden bg-brand-dark text-[color:oklch(0.85_0.02_85)] md:block">
        <div className="container-prose flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="h-3 w-3 text-brand-red" /> +234 (0) 800 GODS ENERGY</span>
            <span className="flex items-center gap-2"><Mail className="h-3 w-3 text-brand-red" /> info@primerigventures.com</span>
          </div>
          <span className="tracking-wider">CAC Certified · 14 July 2025</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-prose flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="God's Energy Logo" className="h-10 w-auto object-contain" />
            <div className="leading-tight">
              <div className="font-display text-lg font-bold text-brand-dark">God's Energy International Ventures</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Limited · Nigeria</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => {
              const active = path === l.to;
              return (
                <Link
                  key={l.to}
                  href={l.to}
                  className={`text-sm font-medium uppercase tracking-wider transition-colors ${active ? "text-brand-red" : "text-foreground hover:text-brand-red"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/contact" className="btn-brand-dark hidden lg:inline-flex">
            Request RFQ <ChevronRight className="h-4 w-4" />
          </Link>

          <button onClick={() => setOpen(!open)} className="lg:hidden" aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <div className="container-prose flex flex-col py-4">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3 text-sm font-medium uppercase tracking-wider"
                >
                  {l.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="btn-brand-dark mt-4">
                Request RFQ
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-brand-dark text-[color:oklch(0.85_0.02_85)]">
        <div className="container-prose grid gap-12 py-16 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
                <img src="/logo.png" alt="God's Energy Logo" className="h-12 w-auto object-contain brightness-0 invert" />
              <div className="leading-tight">
                <div className="font-display text-lg font-bold text-white">God's Energy International Ventures</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-brand-red">Limited</div>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed opacity-80">
              Integrated infrastructure solutions across energy, telecommunications and global trade — engineered for performance across West Africa.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-brand-red">Navigate</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}><Link href={l.to} className="opacity-80 hover:text-brand-red hover:opacity-100">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-brand-red">Divisions</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Energy & Petroleum</li>
              <li>Downstream Marketing</li>
              <li>Telecommunications</li>
              <li>Global Procurement</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-[0.25em] text-brand-red">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Registered Office</li>
              <li>52b airport road Benin city Edo state.</li>
              <li className="pt-2">info@primerigventures.com</li>
              
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container-prose flex flex-col items-center justify-between gap-3 py-6 text-xs opacity-70 md:flex-row">
            <span>© 2026 God's Energy International Ventures Limited. All Rights Reserved.</span>
            <span>CAC Certified (14 July 2025) · Electronic Stamp Duty Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
