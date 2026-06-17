import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteLayout } from "@/components/SiteLayout";
import hero from "@/assets/hero-energy.jpg";
import telecom from "@/assets/telecom.jpg";
import logistics from "@/assets/logistics.jpg";
import downstream from "@/assets/downstream.jpg";
import { Drill, Fuel, Radio, Globe2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services — Energy, Telecom, Downstream & Procurement",
  description: "Four strategic divisions: Oil & Gas Exploration, Downstream Petroleum, Telecommunications Infrastructure, and Global Procurement.",
  openGraph: {
    title: "Our Services — God's Energy International Ventures",
    description: "Four strategic business divisions delivering integrated industrial infrastructure.",
  },
};

const blocks = [
  {
    icon: Drill, img: hero, eyebrow: "Division 01",
    title: "Oil & Gas Exploration & Refinery Support",
    caps: [
      { t: "Upstream & Field Operations", d: "Comprehensive oil and gas exploration and production across onshore and offshore oil fields, including specialized oil production tools, commercial oil vessel acquisition and leasing." },
      { t: "Refinery Engineering & Technical Repairs", d: "Dedicated petroleum services with advanced technical know-how, imported technology, and transferred global systems via our known associate partners from China." },
    ],
  },
  {
    icon: Fuel, img: downstream, eyebrow: "Division 02",
    title: "Downstream Petroleum Marketing & Retail",
    caps: [
      { t: "Supply, Marketing & Facilities", d: "Sourcing, marketing and supplying crude oil, all-grade petroleum products including bio-fuels, natural gas and petrochemicals nationwide." },
      { t: "Retail & Distribution Network", d: "Owning and operating commercial filling stations as authorized NNPC distributors for fuel, kerosene, cooking gas and allied products." },
    ],
  },
  {
    icon: Radio, img: telecom, eyebrow: "Division 03",
    title: "Telecommunications Infrastructure & Broadcasting",
    caps: [
      { t: "Network & GSM Infrastructure", d: "Turnkey deployment of telephone lines, cellular setups, mobile GSM networks, digital cabling, satellite links and payphone installations." },
      { t: "Media, Broadcasting & Hardware", d: "Manufacturing and installing radio, television, cable satellite systems, public addressing gear, industrial walkie-talkies and broadcast hardware." },
    ],
  },
  {
    icon: Globe2, img: logistics, eyebrow: "Division 04",
    title: "Global Procurement, Imports & General Contracts",
    caps: [
      { t: "Trade, Marketing & Supply Lines", d: "International import-export logistics, wholesale trading, and the widespread distribution of general goods as certified general suppliers and manufacturers' representatives." },
      { t: "Commercial Merchant Services", d: "Executing broad general merchant contracts to procure, supply and deal in systems and merchandise across all industrial categories." },
    ],
  },
];

export default function Services() {
  return (
    <SiteLayout>
      <section className="bg-brand-dark py-24 text-white">
        <div className="container-prose">
          <span className="eyebrow">Our Services</span>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold md:text-6xl">
            Four strategic divisions delivering <span className="text-brand-red">end-to-end</span> industrial infrastructure.
          </h1>
          <p className="mt-8 max-w-2xl text-lg opacity-80">
            From offshore rigs and refineries to satellite uplinks and global supply chains — one accountable partner for every layer of execution.
          </p>
        </div>
      </section>

      <section className="bg-background">
        {blocks.map((b, i) => (
          <div key={b.title} className={`border-b border-border py-24 ${i % 2 ? "bg-secondary" : ""}`}>
            <div className="container-prose grid items-center gap-16 lg:grid-cols-2">
              <div className={i % 2 ? "lg:order-2" : ""}>
                <div className="overflow-hidden">
                  <Image src={b.img} alt={b.title} width={1280} height={800}
                    className="aspect-[4/3] w-full object-cover" />
                </div>
              </div>
              <div className={i % 2 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center bg-brand-red">
                    <b.icon className="h-7 w-7 text-brand-dark" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] text-brand-red">{b.eyebrow}</span>
                </div>
                <h2 className="mt-6 font-display text-4xl font-bold text-brand-dark">{b.title}</h2>
                <div className="mt-8 space-y-6">
                  {b.caps.map((c) => (
                    <div key={c.t} className="border-l-2 border-brand-red pl-5">
                      <h3 className="font-display text-xl font-semibold text-brand-dark">{c.t}</h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{c.d}</p>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="btn-brand-dark mt-10">
                  Discuss This Division <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
