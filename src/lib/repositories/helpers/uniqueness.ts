import { EntityTable } from "@/config/entities";
import { ConflictError } from "@/lib/errors/http-error";
import { createClient } from "@/utils/supabase/server";

type UniqueField = {
  field: string;
  value: string;
  message: string;
};

type EnsureUniqueFieldsParams = {
  table: string;
  fields: UniqueField[];
  ignoreId?: string;
};

async function getSupabase() {
  return createClient();
}

export async function ensureUniqueFieldsRepo({
  table,
  fields,
  ignoreId,
}: EnsureUniqueFieldsParams): Promise<void> {
  const supabase = await getSupabase();

  const queries = fields.map(({ field, value }) => {
    let query = supabase.from(table).select("id").eq(field, value).limit(1);

    if (ignoreId) {
      query = query.neq("id", ignoreId);
    }

    return query.maybeSingle();
  });

  const results = await Promise.all(queries);

  for (const [index, result] of results.entries()) {
    if (result.error) {
      throw result.error;
    }

    if (result.data) {
      throw new ConflictError(fields[index].message);
    }
  }
}

export async function ensureUniqueRecord({
  table,
  name,
  slug,
  ignoreId,
}: {
  table: EntityTable;
  name: string;
  slug?: string;
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

  if (slug) {
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
}
