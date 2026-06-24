"use client";

import { SiteLayout } from "@/components/SiteLayout";
import { MapPin, Phone, Mail, Upload, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSubmitted(true);
      toast.success("Inquiry sent successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An error occurred while sending your inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="bg-brand-dark py-20 text-white">
        <div className="container-prose">
          <span className="eyebrow">Contact Us</span>
          <h1 className="mt-6 font-display text-5xl font-bold md:text-6xl">
            Submit Your <span className="text-brand-red">Official Inquiry</span>.
          </h1>
          <p className="mt-4 max-w-2xl text-lg opacity-80">Procurement officers, partners and engineers — describe your project and we will route it to the right division desk.</p>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container-prose grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-dark">Corporate Contact Points</h2>
              <div className="mt-6 space-y-6">
                {[
                  { i: MapPin, t: "Registered Office", l: ["52b airport road Benin city Edo state.", "Primary Operations Office"] },
                  { i: Phone, t: "Direct Desks", l: ["+234 8035658402"] },
                  { i: Mail, t: "Corporate Email", l: [] },
                ].map((c) => (
                  <div key={c.t} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand-dark text-brand-red">
                      <c.i className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red">{c.t}</h3>
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
            <h2 className="mt-4 font-display text-3xl font-bold text-brand-dark">Tell us about your project.</h2>

            {submitted ? (
              <div className="mt-10 border-l-4 border-brand-red bg-secondary p-8">
                <h3 className="font-display text-2xl font-bold text-brand-dark">Inquiry Received.</h3>
                <p className="mt-2 text-muted-foreground">Our division desk will respond within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" name="name" />
                  <Field label="Company Name" name="company" />
                  <Field label="Email" name="email" type="email" />
                  <Field label="Phone Number" name="phone" type="tel" />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">Department</label>
                  <select required name="department" className="w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-brand-red">
                    <option value="">Select Department...</option>
                    <option value="Oilfield Engineering & Refinery Repairs">Oilfield Engineering & Refinery Repairs</option>
                    <option value="Bulk Petroleum Procurement & Filling Stations">Bulk Petroleum Procurement & Filling Stations</option>
                    <option value="Telecommunications & Satellite Deployment">Telecommunications & Satellite Deployment</option>
                    <option value="Equipment Procurement & General Contracts">Equipment Procurement & General Contracts</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">Project Description</label>
                  <textarea required name="description" rows={5}
                    placeholder="Describe your project or required equipment specifications..."
                    className="w-full resize-none border border-input bg-background px-4 py-3 text-sm outline-none focus:border-brand-red" />
                </div>

                <label className={`flex cursor-pointer items-center gap-3 border-2 border-dashed bg-secondary p-6 transition-colors ${file ? 'border-brand-dark' : 'border-border hover:border-brand-red'}`}>
                  <Upload className={`h-5 w-5 ${file ? 'text-brand-dark' : 'text-brand-red'}`} />
                  <div className="text-sm">
                    <div className="font-semibold text-brand-dark">
                      {file ? file.name : "Drag & drop RFQ document or click to browse"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF, Word — technical specifications welcome (Max 5MB)"}
                    </div>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        if (e.target.files[0].size > 5 * 1024 * 1024) {
                          toast.error("File is too large. Maximum size is 5MB.");
                          return;
                        }
                        setFile(e.target.files[0]);
                      }
                    }} 
                  />
                </label>

                <button disabled={loading} type="submit" className="btn-brand-dark w-full disabled:opacity-70">
                  {loading ? (
                    <>Sending Inquiry <Loader2 className="h-4 w-4 animate-spin" /></>
                  ) : (
                    <>Submit Official Inquiry <Send className="h-4 w-4" /></>
                  )}
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
      <label className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-brand-dark">{label}</label>
      <input required name={name} type={type}
        className="w-full border border-input bg-background px-4 py-3 text-sm outline-none focus:border-brand-red" />
    </div>
  );
}
