import { Entity } from "@/config/entities";
import { createClient } from "@/utils/supabase/client";
import { StorageBucket } from "../storage";
import { getDefaultImage } from "./default-image";

export function getImageUrl(
  entity: Entity,
  bucket: StorageBucket,
  path: string | null,
): string {
  if (!path) return getDefaultImage(entity);

  const supabase = createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}
