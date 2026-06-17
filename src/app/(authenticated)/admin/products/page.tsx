"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { uploadToImageKit } from "@/lib/imagekit-upload";
import Image from "next/image";

type Category = { id: string; name: string };
type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
};

export default function ProductsAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", category_id: "" });
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const [c, p] = await Promise.all([
      supabase.from("categories").select("id,name").order("name"),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
    ]);
    setCategories((c.data ?? []) as Category[]);
    setProducts((p.data ?? []) as Product[]);
  }
  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      let image_url: string | null = null;
      if (file) image_url = await uploadToImageKit(file);
      const { error } = await supabase.from("products").insert({
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: Number(form.price) || 0,
        category_id: form.category_id || null,
        image_url,
      });
      if (error) throw error;
      setForm({ name: "", description: "", price: "", category_id: "" });
      setFile(null);
      (document.getElementById("file-input") as HTMLInputElement | null)?.value &&
        ((document.getElementById("file-input") as HTMLInputElement).value = "");
      load();
    } catch (e: any) {
      setErr(e.message ?? "Failed to save");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) { alert(error.message); return; }
    load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
      <div>
        <h2 className="font-display text-xl font-semibold text-brand-dark">Add Product</h2>
        <form onSubmit={submit} className="mt-4 space-y-3 rounded-md border border-border bg-card p-5">
          <Field label="Name">
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inp} />
          </Field>
          <Field label="Category">
            <select required value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className={inp}>
              <option value="">Select category…</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {categories.length === 0 && (
              <p className="mt-1 text-xs text-destructive">Create a category first.</p>
            )}
          </Field>
          <Field label="Price (USD)">
            <input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className={inp} />
          </Field>
          <Field label="Description">
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inp} />
          </Field>
          <Field label="Image">
            <label className="mt-1 flex cursor-pointer items-center gap-2 rounded border border-dashed border-input bg-background px-3 py-3 text-sm hover:border-brand-red">
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{file ? file.name : "Click to upload"}</span>
              <input id="file-input" type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </label>
          </Field>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button disabled={busy || categories.length === 0} className="btn-brand-dark w-full justify-center">
            <Plus className="h-4 w-4" /> {busy ? "Saving..." : "Add Product"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold text-brand-dark">Products ({products.length})</h2>
        <div className="mt-4 space-y-3">
          {products.length === 0 ? (
            <p className="rounded-md border border-border bg-card p-6 text-sm text-muted-foreground">No products yet.</p>
          ) : (
            products.map((p) => {
              const cat = categories.find((c) => c.id === p.category_id);
              return (
                <div key={p.id} className="flex items-center gap-4 rounded-md border border-border bg-card p-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded bg-muted">
                    {p.image_url ? <Image width={64} height={64} src={p.image_url} alt={p.name} className="h-full w-full object-cover" /> : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{cat?.name ?? "Uncategorized"} · ${Number(p.price).toFixed(2)}</p>
                  </div>
                  <button onClick={() => remove(p.id)} className="rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

const inp = "mt-1 w-full rounded border border-input bg-background px-3 py-2 text-sm";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
