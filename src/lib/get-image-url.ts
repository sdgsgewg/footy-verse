import { createClient } from "@/utils/supabase/client";

import { STORAGE_BUCKETS } from "./storage";

export function getClubImageUrl(path: string | null) {
  if (!path) return null;

  const supabase = createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKETS.CLUBS).getPublicUrl(path);

  return publicUrl;
}
