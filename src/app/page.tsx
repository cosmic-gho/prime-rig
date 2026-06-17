import Link from "next/link";
import { ArrowRight, Fuel, Satellite, Ship, ShieldCheck, Award, Globe2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import Image from "next/image";
import hero from "@/assets/hero-energy.jpg";
import telecom from "@/assets/telecom.jpg";
import logistics from "@/assets/logistics.jpg";

export default function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brand-dark text-white">
        <Image src={hero} alt="Offshore oil rig at dusk" width={1920} height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-40" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" />
        <div className="container-prose relative grid min-h-[88vh] items-center py-24">
          <div className="max-w-3xl">
            <span className="eyebrow">Multi-Sector Industrial Partner</span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-7xl">
              Integrated Infrastructure for <span className="text-brand-red">Energy</span>, Connectivity & Global Trade.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed opacity-85">
              Delivering world-class technical services, telecommunications engineering, and corporate procurement across Nigeria and West Africa.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/services" className="btn-brand-red">Explore Services <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/equipment" className="btn-outline-light">View Equipment Catalog</Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/20 pt-8">
              {[
                { v: "4", l: "Strategic Divisions" },
                { v: "1M", l: "Ordinary Shares" },
                { v: "2025", l: "CAC Certified" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold text-brand-red md:text-4xl">{s.v}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest opacity-70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-background py-24">
        <div className="container-prose">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">Core Business Pillars</span>
              <h2 className="mt-4 font-display text-4xl font-bold text-brand-dark md:text-5xl">
                Four divisions. One unified standard of engineering precision.
              </h2>
            </div>
            <Link href="/services" className="text-sm font-semibold uppercase tracking-widest text-brand-dark hover:text-brand-red">
              All Services →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Fuel, img: hero, title: "Energy & Petroleum", desc: "Upstream exploration, refinery repairs, and downstream distribution networks across Nigerian oil fields." },
              { icon: Satellite, img: telecom, title: "Telecommunications", desc: "Turnkey communication networks, satellite installations, and broadcast infrastructure deployment." },
              { icon: Ship, img: logistics, title: "Global Procurement", desc: "International import-export logistics, manufacturer representation, and industrial supply." },
            ].map((c) => (
              <article key={c.title} className="group relative overflow-hidden border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative h-56 overflow-hidden">
                  <Image src={c.img} alt={c.title} width={1280} height={800}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center bg-brand-red">
                    <c.icon className="h-6 w-6 text-brand-dark" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold text-brand-dark">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-dark group-hover:text-brand-red">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Snapshot */}
      <section className="relative bg-brand-dark py-24 text-white">
        <div className="container-prose grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Corporate Snapshot</span>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">A Certified Framework for Scale.</h2>
            <p className="mt-6 text-lg leading-relaxed opacity-85">
              Officially registered and certified by the Corporate Affairs Commission on <span className="text-brand-red">July 14, 2025</span>, God's Energy International Ventures Limited operates as a structured private limited liability company with an initial capitalization of 1,000,000 Ordinary Shares.
            </p>
            <p className="mt-4 leading-relaxed opacity-75">
              Fully built to manage high-stakes public and private infrastructure contracts across energy, telecommunications and global trade.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className="btn-brand-red">About the Company</Link>
              <Link href="/contact" className="btn-outline-light">Request a Quote</Link>
            </div>
          </div>

          <div className="grid gap-px bg-white/10">
            {[
              { icon: Award, t: "CAC Certified", d: "Registered under Nigerian federal law, July 2025." },
              { icon: ShieldCheck, t: "HSEQ Compliant", d: "International safety and environmental standards." },
              { icon: Globe2, t: "Global Reach", d: "Partnerships across China, Europe and West Africa." },
            ].map((b) => (
              <div key={b.t} className="flex gap-5 bg-brand-dark p-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-brand-red/40 text-brand-red">
                  <b.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{b.t}</h3>
                  <p className="mt-1 text-sm opacity-75">{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-red py-20 text-brand-dark">
        <div className="container-prose grid items-center gap-8 lg:grid-cols-[2fr_auto]">
          <div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Ready to deploy your next project?</h2>
            <p className="mt-3 text-lg opacity-80">Procurement officers, engineers and partners — submit a structured RFQ today.</p>
          </div>
          <Link href="/contact" className="btn-brand-dark w-fit">Submit Official Inquiry <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
