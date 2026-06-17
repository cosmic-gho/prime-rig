import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteLayout } from "@/components/SiteLayout";
import about from "@/assets/about.jpg";
import { Target, Eye, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Who We Are — Prime Rig Ventures Limited",
  description: "Built on integrity, engineered for performance. Learn about Prime Rig Ventures Limited — a CAC-certified Nigerian multi-sector industrial partner.",
  openGraph: {
    title: "Who We Are — Prime Rig Ventures",
    description: "Established July 2025 — bridging global technology and local industrial needs across Nigeria.",
  },
};

export default function About() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden bg-navy-deep text-white">
        <Image src={about} alt="Executive boardroom" width={1280} height={800}
          className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 to-navy-deep" />
        <div className="container-prose relative py-32 md:py-40">
          <span className="eyebrow">Who We Are</span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold md:text-7xl">
            Built on Integrity, <span className="text-gold">Engineered</span> for Performance.
          </h1>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-prose grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="sticky top-32 self-start">
            <span className="eyebrow">The Prime Rig Story</span>
            <h2 className="mt-4 font-display text-4xl font-bold text-navy-deep">Bridging global technology and local industrial need.</h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Established in <span className="font-semibold text-navy-deep">July 2025</span> under the laws of the Federal Republic of Nigeria, Prime Rig Ventures Limited was created to solve complex logistical and technical engineering challenges across multiple critical economic sectors.
            </p>
            <p>
              We bridge the gap between global technology manufacturers and local industrial needs, ensuring that whether we are servicing a refinery or deploying a cellular network, we deliver unmatched technical precision.
            </p>
            <div className="border-l-4 border-gold bg-secondary p-6">
              <p className="font-display text-xl text-navy-deep">
                Backed by <span className="text-gold">1,000,000 Ordinary Shares</span>, our financial architecture ensures stability, compliance, and risk mitigation across all long-term assets, leases, and procurement pipelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-prose">
          <div className="grid gap-px bg-border md:grid-cols-3">
            {[
              { icon: Target, t: "Our Mission", d: "To deploy cutting-edge engineering, reliable petroleum distribution, and seamless global supply chains that empower businesses and communities across West Africa." },
              { icon: Eye, t: "Our Vision", d: "To be the premier multi-sector industrial partner in Nigeria, recognized for regulatory compliance, technical excellence, and zero-compromise safety standards." },
              { icon: Building2, t: "Our Framework", d: "A CAC-certified private limited liability company structured for high-stakes public and private infrastructure contracts at national scale." },
            ].map((b) => (
              <div key={b.t} className="bg-background p-10">
                <div className="flex h-14 w-14 items-center justify-center bg-navy-deep text-gold">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-navy-deep">{b.t}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-prose text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Sister Companies</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 font-display text-xl text-navy-deep">
            <span>Prime Rig Ventures Limited</span>
            <span className="text-gold">·</span>
            <span>Gods Energy International Ventures Limited</span>
            <span className="text-gold">·</span>
            <span>Ochinawata Ventures Limited</span>
          </div>
          <Link href="/contact" className="btn-navy mt-12">Partner With Us</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
