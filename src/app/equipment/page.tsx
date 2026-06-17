"use client";

import Link from "next/link";
import { SiteLayout } from "@/components/SiteLayout";
import { Search, BadgeCheck, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

type Item = { id: string; name: string; part: string; cat: "Energy" | "Telecom" | "Commodities"; avail: "In Stock" | "Available for Lease"; desc: string };

const items: Item[] = [
  { id: "1", name: "Oil Production Drill Bit", part: "OPT-DB-2245", cat: "Energy", avail: "In Stock", desc: "High-grade tungsten carbide drill bit for offshore deployment." },
  { id: "2", name: "Commercial Satellite Dish", part: "TLC-SAT-180KU", cat: "Telecom", avail: "Available for Lease", desc: "Ku-band 1.8m commercial satellite uplink dish." },
  { id: "3", name: "Industrial Walkie-Talkies", part: "TLC-WT-IP67", cat: "Telecom", avail: "In Stock", desc: "IP67-rated long-range industrial radio set, intrinsically safe." },
  { id: "4", name: "Petrochemical Bulk Supply", part: "COM-PCH-BLK", cat: "Commodities", avail: "Available for Lease", desc: "Wholesale petrochemical derivatives, all grades available." },
  { id: "5", name: "Marine Vessel Lease Unit", part: "OPT-MV-AHTS", cat: "Energy", avail: "Available for Lease", desc: "Anchor handling tug supply vessel for offshore operations." },
  { id: "6", name: "GSM Tower Deployment Kit", part: "TLC-GSM-TWR", cat: "Telecom", avail: "In Stock", desc: "Turnkey cellular tower hardware package including transmitters." },
  { id: "7", name: "Refinery Maintenance Toolkit", part: "OPT-REF-MTK", cat: "Energy", avail: "In Stock", desc: "Imported precision toolkit for refinery repair operations." },
  { id: "8", name: "Cooking Gas Cylinders (Bulk)", part: "COM-LPG-12KG", cat: "Commodities", avail: "In Stock", desc: "NNPC-authorized LPG cylinders for retail and wholesale distribution." },
];

export default function Equipment() {
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [avails, setAvails] = useState<string[]>([]);

  const filtered = useMemo(() => items.filter((i) => {
    if (q && !`${i.name} ${i.part} ${i.desc}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (cats.length && !cats.includes(i.cat)) return false;
    if (avails.length && !avails.includes(i.avail)) return false;
    return true;
  }), [q, cats, avails]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <SiteLayout>
      <section className="bg-brand-dark py-20 text-white">
        <div className="container-prose">
          <span className="eyebrow">Equipment Catalog</span>
          <h1 className="mt-6 font-display text-5xl font-bold md:text-6xl">Procurement Portal</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-80">Browse certified industrial equipment. Every listing includes a compliance badge and direct RFQ pathway.</p>

          <div className="mt-10 flex items-center gap-3 bg-white p-2 shadow-2xl">
            <Search className="ml-4 h-5 w-5 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search equipment — e.g. Satellite, Drill Bit, Radio..."
              className="flex-1 bg-transparent py-3 text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button className="btn-brand-dark">Search</button>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container-prose grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-8">
            <div>
              <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-brand-red">Filter by Category</h3>
              <div className="space-y-3">
                {["Energy", "Telecom", "Commodities"].map((c) => (
                  <label key={c} className="flex cursor-pointer items-center gap-3 text-sm">
                    <input type="checkbox" checked={cats.includes(c)} onChange={() => toggle(cats, setCats, c)}
                      className="h-4 w-4 accent-[color:var(--brand-red)]" />
                    {c === "Energy" && "Oilfield & Production Tools"}
                    {c === "Telecom" && "Telecom Hardware & Gadgets"}
                    {c === "Commodities" && "Industrial Commodities"}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-brand-red">Filter by Availability</h3>
              <div className="space-y-3">
                {["In Stock", "Available for Lease"].map((c) => (
                  <label key={c} className="flex cursor-pointer items-center gap-3 text-sm">
                    <input type="checkbox" checked={avails.includes(c)} onChange={() => toggle(avails, setAvails, c)}
                      className="h-4 w-4 accent-[color:var(--brand-red)]" />
                    {c}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Displaying {filtered.length} of {items.length} items
              </p>
              <span className="text-xs uppercase tracking-[0.25em] text-brand-red">Compliance Verified</span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item) => (
                <article key={item.id} className="group flex flex-col border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-dark to-brand-blue">
                    <span className="font-display text-6xl font-bold text-brand-red/30">{item.cat[0]}</span>
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 bg-brand-red px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-dark">
                      <BadgeCheck className="h-3 w-3" /> Verified
                    </span>
                    <span className="absolute bottom-3 left-3 bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-dark">{item.avail}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-brand-red">{item.cat}</p>
                    <h3 className="mt-2 font-display text-xl font-bold text-brand-dark">{item.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">Part #: {item.part}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    <Link href="/contact" className="mt-5 inline-flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold uppercase tracking-widest text-brand-dark transition-colors group-hover:text-brand-red">
                      Request Quote <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="border border-dashed border-border bg-secondary p-12 text-center">
                <p className="text-muted-foreground">No equipment matches your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
