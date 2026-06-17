"use server";

import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function getImagekitAuth(token: string) {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error("Missing Supabase config");
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false }
  });

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new Error("Forbidden");
  }

  const { data: isAdmin } = await supabase.rpc("has_role", {
    _user_id: data.user.id,
    _role: "admin",
  });
  
  if (!isAdmin) throw new Error("Forbidden");

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY!;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT!;

  const auth_token = crypto.randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 60 * 10; // 10 min
  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(auth_token + expire)
    .digest("hex");

  return { token: auth_token, expire, signature, publicKey, urlEndpoint };
}
