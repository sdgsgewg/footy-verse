import { slugify } from "@/utils/string";
import { ensureUniqueRecord } from "./uniqueness";
import { EntityTable } from "@/config/entities";

interface EnsureUniqueSlugParams {
  table: EntityTable;
  name: string;
  ignoreId?: string;
}

export async function ensureUniqueSlug({
  table,
  name,
  ignoreId,
}: EnsureUniqueSlugParams): Promise<string> {
  const slug = slugify(name);

  await ensureUniqueRecord({
    table,
    name,
    slug,
    ignoreId,
  });

  return slug;
}
