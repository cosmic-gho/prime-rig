import { getImagekitAuth } from "./imagekit.functions";
import { supabase } from "@/integrations/supabase/client";

export async function uploadToImageKit(file: File): Promise<string> {
  const { data } = await supabase.auth.getSession();
  const sessionToken = data.session?.access_token;
  if (!sessionToken) throw new Error("Not authenticated");

  const auth = await getImagekitAuth(sessionToken);
  
  const fd = new FormData();
  fd.append("file", file);
  fd.append("fileName", file.name);
  fd.append("publicKey", auth.publicKey);
  fd.append("signature", auth.signature);
  fd.append("expire", String(auth.expire));
  fd.append("token", auth.token);
  fd.append("folder", "/products");

  const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: fd,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ImageKit upload failed: ${text}`);
  }
  const json = (await res.json()) as { url: string };
  return json.url;
}
