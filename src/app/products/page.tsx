"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";
import Image from "next/image";

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
  const [cat, setCat] = useState<string>("all");

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
      if (cat !== "all" && p.category_id !== cat) return false;
      if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [products, q, cat]);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-brand-dark py-16 text-white">
        <div className="container-prose">
          <h1 className="font-display text-4xl font-bold md:text-5xl">Product Catalog</h1>
          <p className="mt-3 max-w-2xl text-sm opacity-80">
            Explore our complete inventory. Use search and filters to find what you need.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background py-6">
        <div className="container-prose flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products by name..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded border border-input bg-card py-2.5 pl-10 pr-3 text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip active={cat === "all"} onClick={() => setCat("all")}>All</FilterChip>
            {categories.map((c) => (
              <FilterChip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
                {c.name}
              </FilterChip>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose py-12">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-md bg-muted" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-xl text-brand-dark">No products found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a different search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} category={categories.find((c) => c.id === p.category_id)} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition ${
        active
          ? "border-brand-dark bg-brand-dark text-white"
          : "border-border bg-card text-foreground hover:border-brand-red hover:text-brand-red"
      }`}
    >
      {children}
    </button>
  );
}

function ProductCard({ product, category }: { product: Product; category?: Category }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition hover:shadow-[var(--shadow-brand-red)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={300}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No image</div>
        )}
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-dark/90 px-2.5 py-1 text-[10px] uppercase tracking-wider text-brand-red">
            {category.name}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-brand-dark">{product.name}</h3>
        {product.description && (
          <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{product.description}</p>
        )}
        <div className="mt-auto flex items-end justify-between pt-4">
          <span className="font-display text-2xl font-bold text-brand-dark">
            ${Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </article>
  );
}
