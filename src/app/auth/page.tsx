"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/SiteLayout";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      router.push("/admin");
    } catch (e: any) {
      setErr(e.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteLayout>
      <div className="container-prose flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-md border border-border bg-card p-8 shadow-sm">
          <h1 className="font-display text-2xl font-bold text-navy-deep">
            {mode === "signin" ? "Admin Sign In" : "Create Admin Account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Access the product management dashboard.
          </p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            {err && <p className="text-sm text-destructive">{err}</p>}
            <button type="submit" disabled={busy} className="btn-navy w-full justify-center">
              {busy ? "Working..." : mode === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 text-sm text-muted-foreground hover:text-gold"
          >
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-muted-foreground hover:text-gold">← Back to site</Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
