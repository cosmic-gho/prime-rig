import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import Image from "next/image";
import hseqImg from "@/assets/hseq.jpg";
import { HardHat, Leaf, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "HSEQ — Health, Safety, Environment & Quality",
  description: "Safety First. Quality Always. Environment Protected. Our policy framework for occupational health, environmental stewardship and asset integrity.",
  openGraph: {
    title: "HSEQ — God's Energy International Ventures",
    description: "International safety, environmental and quality standards across every operation.",
  },
};

export default function HSEQ() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden bg-brand-dark text-white">
        <Image src={hseqImg} alt="Safety officers reviewing blueprints" width={1280} height={800}
          className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-transparent" />
        <div className="container-prose relative py-32 md:py-40">
          <span className="eyebrow">HSEQ Policy</span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold md:text-7xl">
            Safety First. <span className="text-brand-red">Quality</span> Always. Environment Protected.
          </h1>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-prose">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="eyebrow mx-auto justify-center">Core Pillars of Our Policy</span>
            <h2 className="mt-4 font-display text-4xl font-bold text-brand-dark">Zero-compromise standards across every operation.</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: HardHat, n: "01", t: "Occupational Health & Safety", d: "We prioritize protecting our workforce and partners across all hazardous sites, including offshore oil vessels and high-altitude telecom tower installations. Continuous risk assessment and absolute adherence to international safety standards are mandatory." },
              { icon: Leaf, n: "02", t: "Environmental Stewardship", d: "From downstream fuel delivery to upstream drilling and refinery repairs, we deploy rigorous waste-mitigation strategies to safeguard local ecosystems and comply fully with Nigerian environmental regulations." },
              { icon: ShieldCheck, n: "03", t: "Quality Assurance & Asset Integrity", d: "All general merchandise, communication devices, and oil production tools imported or supplied by God's Energy International Ventures Limited pass rigid quality testing, ensuring structural durability and operational longevity." },
            ].map((p) => (
              <article key={p.t} className="group relative overflow-hidden border border-border bg-card p-10 transition-all hover:border-brand-red hover:shadow-xl">
                <span className="absolute right-6 top-6 font-display text-5xl font-bold text-brand-red/20 transition-colors group-hover:text-brand-red/50">{p.n}</span>
                <div className="flex h-14 w-14 items-center justify-center bg-brand-dark text-brand-red">
                  <p.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold text-brand-dark">{p.t}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container-prose grid gap-8 text-center md:grid-cols-4">
          {[
            { v: "0", l: "Compromise Tolerance" },
            { v: "100%", l: "Compliance Coverage" },
            { v: "24/7", l: "Safety Monitoring" },
            { v: "ISO", l: "Aligned Standards" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-5xl font-bold text-brand-dark">{s.v}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
