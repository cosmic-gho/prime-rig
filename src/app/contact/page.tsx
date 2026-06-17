"use client";

import { SiteLayout } from "@/components/SiteLayout";
import { MapPin, Phone, Mail, Upload, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      <section className="bg-navy-deep py-20 text-white">
        <div className="container-prose">
          <span className="eyebrow">Contact Us</span>
          <h1 className="mt-6 font-display text-5xl font-bold md:text-6xl">
            Submit Your <span className="text-gold">Official Inquiry</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-lg opacity-80">Procurement officers, partners and engineers — describe your project and we will route it to the right division desk.</p>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-prose grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy-deep">Corporate Contact Points</h2>
              <div className="mt-6 space-y-6">
                {[
                  { i: MapPin, t: "Registered Office", l: ["Federal Republic of Nigeria", "Primary Operations Office"] },
                  { i: Phone, t: "Direct Desks", l: ["Upstream & Energy Support", "Telecom & Infrastructure", "Global Logistics"] },
                  { i: Mail, t: "Corporate Email", l: ["info@primerigventures.com", "procurement@primerigventures.com"] },
                ].map((c) => (
                  <div key={c.t} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-navy-deep text-gold">
                      <c.i className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{c.t}</h3>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {c.l.map((x) => <div key={x}>{x}</div>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="aspect-[4/3] overflow-hidden border border-border bg-secondary">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.2,6.4,3.5,6.7&layer=mapnik"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="bg-card p-8 shadow-xl ring-1 ring-border md:p-12">
            <span className="eyebrow">Smart RFQ Intake</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-navy-deep">Tell us about your project.</h2>

            {submitted ? (
              <div className="mt-10 border-l-4 border-gold bg-secondary p-8">
                <h3 className="font-display text-2xl font-bold text-navy-deep">Inquiry Received.</h3>
                <p className="mt-2 text-muted-foreground">Our division desk will respond within one business day.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" name="name" />
                  <Field label="Company Name" name="company" />
                  <Field label="Email" name="email" type="email" />
                  <Field label="Phone Number" name="phone" type="tel" />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-navy-deep">Department</label>
                  <select required className="w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-gold">
                    <option value="">Select Department...</option>
                    <option>Oilfield Engineering & Refinery Repairs</option>
                    <option>Bulk Petroleum Procurement & Filling Stations</option>
                    <option>Telecommunications & Satellite Deployment</option>
                    <option>Equipment Procurement & General Contracts</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-navy-deep">Project Description</label>
                  <textarea required rows={5}
                    placeholder="Describe your project or required equipment specifications..."
                    className="w-full resize-none border border-input bg-background px-4 py-3 text-sm outline-none focus:border-gold" />
                </div>

                <label className="flex cursor-pointer items-center gap-3 border-2 border-dashed border-border bg-secondary p-6 transition-colors hover:border-gold">
                  <Upload className="h-5 w-5 text-gold" />
                  <div className="text-sm">
                    <div className="font-semibold text-navy-deep">Drag & drop RFQ document</div>
                    <div className="text-xs text-muted-foreground">PDF, Word — technical specifications welcome</div>
                  </div>
                  <input type="file" className="hidden" />
                </label>

                <button type="submit" className="btn-navy w-full">
                  Submit Official Inquiry <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-navy-deep">{label}</label>
      <input required name={name} type={type}
        className="w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-gold" />
    </div>
  );
}
