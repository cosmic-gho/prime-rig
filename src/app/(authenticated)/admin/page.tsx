"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Category = { id: string; name: string; slug: string };

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function CategoriesAdmin() {
  const [items, setItems] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.from("categories").select("*").order("name");
    setItems((data ?? []) as Category[]);
  }
  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const { error } = await supabase.from("categories").insert({ name: name.trim(), slug: slugify(name) });
    setBusy(false);
    if (error) { setErr(error.message); return; }
    setName("");
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this category? Products in it will become uncategorized.")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) { alert(error.message); return; }
    load();
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
      <div>
        <h2 className="font-display text-xl font-semibold text-brand-dark">Add Category</h2>
        <form onSubmit={add} className="mt-4 space-y-3 rounded-md border border-border bg-card p-5">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Industrial Tools"
              className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button disabled={busy || !name.trim()} className="btn-brand-dark w-full justify-center">
            <Plus className="h-4 w-4" /> {busy ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold text-brand-dark">Categories ({items.length})</h2>
        <div className="mt-4 overflow-hidden rounded-md border border-border bg-card">
          {items.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No categories yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((c) => (
                <li key={c.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.slug}</p>
                  </div>
                  <button
                    onClick={() => remove(c.id)}
                    className="rounded p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
