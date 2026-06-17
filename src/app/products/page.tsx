"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, BadgeCheck, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";
import Image from "next/image";
import Link from "next/link";

type Category = { id: string; name: string; slug: string };
type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
};

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      supabase.from("categories").select("*").order("name"),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
    ]).then(([c, p]) => {
      setCategories((c.data ?? []) as Category[]);
      setProducts((p.data ?? []) as Product[]);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cats.length && p.category_id && !cats.includes(p.category_id)) return false;
      if (q && !`${p.name} ${p.description}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [products, q, cats]);

  const toggleCat = (id: string) =>
    setCats((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <SiteLayout>
      <section className="bg-brand-dark py-20 text-white">
        <div className="container-prose">
          <span className="eyebrow">Product Catalog</span>
          <h1 className="mt-6 font-display text-5xl font-bold md:text-6xl">Industrial Procurement</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-80">
            Explore our complete inventory. Every product includes compliance checks and direct quoting.
          </p>

          <div className="mt-10 flex items-center gap-3 bg-white p-2 shadow-2xl">
            <Search className="ml-4 h-5 w-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products by name or description..."
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
                {categories.map((c) => (
                  <label key={c.id} className="flex cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={cats.includes(c.id)}
                      onChange={() => toggleCat(c.id)}
                      className="h-4 w-4 accent-[color:var(--brand-red)]"
                    />
                    {c.name}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Displaying {filtered.length} of {products.length} items
              </p>
              <span className="text-xs uppercase tracking-[0.25em] text-brand-red">Compliance Verified</span>
            </div>

            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] animate-pulse border border-border bg-muted" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="border border-dashed border-border bg-secondary p-12 text-center">
                <p className="text-muted-foreground">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} category={categories.find((c) => c.id === p.category_id)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ProductCard({ product, category }: { product: Product; category?: Category }) {
  return (
    <article className="group flex flex-col border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-dark to-brand-blue overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={300}
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="font-display text-6xl font-bold text-brand-red/30">
            {category?.name?.[0] || product.name[0]}
          </span>
        )}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 bg-brand-red px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-dark">
          <BadgeCheck className="h-3 w-3" /> Verified
        </span>
        <span className="absolute bottom-3 left-3 bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-dark">
          In Stock
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-brand-red">{category?.name || "Uncategorized"}</p>
        <h3 className="mt-2 font-display text-xl font-bold text-brand-dark">{product.name}</h3>
        {product.description && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {product.description}
          </p>
        )}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="font-display text-2xl font-bold text-brand-dark">
            ${Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-dark transition-colors group-hover:text-brand-red"
          >
            Request Quote <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
