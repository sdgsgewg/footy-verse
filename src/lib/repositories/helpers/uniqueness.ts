import { createClient } from "@/utils/supabase/server";

type Table = "nationalities" | "clubs" | "positions" | "players" | "seasons";

async function getSupabase() {
  return createClient();
}

export async function ensureUniqueRecord({
  table,
  name,
  slug,
  ignoreId,
}: {
  table: Table;
  name: string;
  slug: string;
  ignoreId?: string;
}) {
  const supabase = await getSupabase();

  let nameQuery = supabase.from(table).select("id").eq("name", name).limit(1);

  if (ignoreId) {
    nameQuery = nameQuery.neq("id", ignoreId);
  }

  const { data: existingName, error: nameError } =
    await nameQuery.maybeSingle();

  if (nameError) throw nameError;

  if (existingName) {
    throw new Error(`${table} name already exists`);
  }

  let slugQuery = supabase.from(table).select("id").eq("slug", slug).limit(1);

  if (ignoreId) {
    slugQuery = slugQuery.neq("id", ignoreId);
  }

  const { data: existingSlug, error: slugError } =
    await slugQuery.maybeSingle();

  if (slugError) throw slugError;

  if (existingSlug) {
    throw new Error(`${table} slug already exists`);
  }
}
