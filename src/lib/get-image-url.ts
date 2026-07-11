import { createClient } from "@/utils/supabase/client";

import { STORAGE_BUCKETS } from "./storage";

export function getImageUrl(path: string | null, bucket: string) {
  if (!path) return null;

  const supabase = createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}

export function getPlayerImageUrl(path: string | null) {
  if (!path) return null;

  const supabase = createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKETS.PLAYERS).getPublicUrl(path);

  return publicUrl;
}

export function getClubImageUrl(path: string | null) {
  if (!path) return null;

  const supabase = createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKETS.CLUBS).getPublicUrl(path);

  return publicUrl;
}

export function getNationalityImageUrl(path: string | null) {
  if (!path) return null;

  const supabase = createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from(STORAGE_BUCKETS.NATIONALITIES).getPublicUrl(path);

  return publicUrl;
}
