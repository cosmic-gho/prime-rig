"use client";

import { useEffect } from "react";
import { LogOut, Package, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/use-auth";
import { SiteLayout } from "@/components/SiteLayout";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { isAdmin, user, loading } = useIsAdmin();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAdmin) {
      // Authenticated but not admin
    }
  }, [loading, isAdmin]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/auth");
  }

  if (loading) {
    return (
      <SiteLayout>
        <div className="container-prose py-20 text-center text-sm text-muted-foreground">Loading…</div>
      </SiteLayout>
    );
  }

  if (!isAdmin) {
    return (
      <SiteLayout>
        <div className="container-prose py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-navy-deep">Not Authorized</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user?.email}) does not have admin access.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            To grant admin: open the Backend → Database → user_roles table and insert a row with your user id and role <code>admin</code>.
          </p>
          <button onClick={signOut} className="btn-navy mt-6">Sign Out</button>
        </div>
      </SiteLayout>
    );
  }

  const tabs = [
    { to: "/admin", label: "Categories", icon: Tag, exact: true },
    { to: "/admin/products", label: "Products", icon: Package, exact: false },
  ];

  return (
    <SiteLayout>
      <div className="border-b border-border bg-card">
        <div className="container-prose flex items-center justify-between py-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-navy-deep">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">Signed in as {user?.email}</p>
          </div>
          <button onClick={signOut} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
        <div className="container-prose flex gap-1 border-t border-border">
          {tabs.map((t) => {
            const active = t.exact ? pathname === t.to : pathname?.startsWith(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                href={t.to}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium ${
                  active ? "border-gold text-navy-deep" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" /> {t.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="container-prose py-10">
        {children}
      </div>
    </SiteLayout>
  );
}
