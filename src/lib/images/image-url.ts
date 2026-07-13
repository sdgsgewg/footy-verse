import { createClient } from "@/utils/supabase/client";

export function getImageUrl(bucket: string, path: string | null) {
  if (!path) return null;

  const supabase = createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}
