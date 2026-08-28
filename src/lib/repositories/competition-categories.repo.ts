import { createClient } from "@/utils/supabase/server";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  CompetitionCategoryCreateInput,
  CompetitionCategoryDetailResponse,
  CompetitionCategoryEditResponse,
  CompetitionCategoryFilter,
  CompetitionCategoryListItem,
  CompetitionCategoryLookupResponse,
  CompetitionCategoryUpdateInput,
} from "@/types/competition-category";
import {
  mapCompetitionCategoryDetailResponse,
  mapCompetitionCategoryEditResponse,
  mapCompetitionCategoryListItem,
} from "../competition-categories/mapper";
import { slugify } from "@/utils/string";
import { createEntityActivityLog } from "./activity-logs.repo";
import { ActivityLogAction } from "@/enums/ActivityLogAction";
import { getChangedFields } from "./helpers/get-changed-field";
import { Option } from "@/types/option";
import { mapEntityOption } from "../entities/mapper";
import { ensureUniqueFieldsRepo } from "./helpers/uniqueness";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["competitionCategory"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["competitionCategory"]["table"];
};

/**
 *
 * @param params
 * @returns CompetitionCategoryListItem[]
 */
export async function getCompetitionCategoriesRepo(
  params: CompetitionCategoryFilter,
): Promise<CompetitionCategoryListItem[]> {
  const supabase = await getSupabase();

  // Base Query

  let query = supabase.from(getTable()).select("*", {
    count: "exact",
  });

  // Filter

  if (params.search) {
    query = query.ilike("name", `%${params.search}%`);
  }

  // Sort

  query = query.order(params.sortBy, {
    ascending: params.sortOrder === "asc",
  });

  // Execute

  const { data, error } = await query;

  if (error) throw error;

  return (data ?? []).map(mapCompetitionCategoryListItem);
}

/**
 *
 * @returns Option[]
 */
export async function getCompetitionCategoryOptionsRepo(): Promise<Option[]> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(
      `
      id,
      name
    `,
    )
    .order("name", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) return [];

  return data.map((data) => mapEntityOption(data, "competitionCategory"));
}

/**
 *
 * @param id
 * @returns CompetitionCategoryEditResponse | null
 */
export async function getCompetitionCategoryEditRepo(
  id: string,
): Promise<CompetitionCategoryEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapCompetitionCategoryEditResponse(data);
}

/**
 *
 * @param id
 * @returns CompetitionCategoryDetailResponse | null
 */
export async function getCompetitionCategoryDetailRepo(
  id: string,
): Promise<CompetitionCategoryDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapCompetitionCategoryDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns CompetitionCategoryLookupResponse | null
 */
export async function getCompetitionCategoryLookupRepo(
  slug: string,
): Promise<CompetitionCategoryLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(`id, slug`)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data;
}

export async function ensureCompetitionCategoryUniqueRepo({
  name,
  ignoreId,
}: {
  name: string;
  ignoreId?: string;
}): Promise<string> {
  const slug = slugify(name);

  await ensureUniqueFieldsRepo({
    table: getTable(),
    fields: [
      {
        field: "slug",
        value: slug,
        message: "Competition category name already exists",
      },
    ],
    ignoreId,
  });

  return slug;
}

/**
 *
 * @param competitionCategory
 * @returns CompetitionCategoryDetailResponse
 */
export async function createCompetitionCategoryRepo(
  competitionCategory: CompetitionCategoryCreateInput,
): Promise<CompetitionCategoryDetailResponse> {
  const supabase = await getSupabase();

  const slug = await ensureCompetitionCategoryUniqueRepo({
    name: competitionCategory.name,
  });

  const { data: insertedCompetitionCategory, error } = await supabase
    .from(getTable())
    .insert({ ...competitionCategory, slug })
    .select("*")
    .single();

  if (error) throw error;

  const result = await getCompetitionCategoryDetailRepo(
    insertedCompetitionCategory.id,
  );
  if (!result) {
    throw new Error("Failed to retrieve created competition category");
  }

  await createEntityActivityLog({
    action: ActivityLogAction.CREATE,
    entity: "competitionCategory",
    entityId: result.id,
    name: result.name,
  });

  return result;
}

export async function updateCompetitionCategoryRepo(
  id: string,
  competitionCategory: CompetitionCategoryUpdateInput,
): Promise<CompetitionCategoryDetailResponse> {
  const supabase = await getSupabase();

  const oldCompetitionCategory = await requireEntity(
    getCompetitionCategoryDetailRepo,
    id,
    getLabel(),
  );

  const slug = ensureCompetitionCategoryUniqueRepo({
    name: competitionCategory.name,
    ignoreId: id,
  });

  const { error } = await supabase
    .from(getTable())
    .update({
      ...competitionCategory,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  const result = await getCompetitionCategoryDetailRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated competition category");
  }

  const changes = getChangedFields(oldCompetitionCategory, result, [
    "name",
    "description",
  ] as const);

  await createEntityActivityLog({
    action: ActivityLogAction.UPDATE,
    entity: "competitionCategory",
    entityId: result.id,
    name: result.name,
    metadata: {
      changes,
    },
  });

  return result;
}

export async function deleteCompetitionCategoryRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const competitionCategory = await requireEntity(
    getCompetitionCategoryDetailRepo,
    id,
    getLabel(),
  );

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;

  await createEntityActivityLog({
    action: ActivityLogAction.DELETE,
    entity: "competitionCategory",
    entityId: id,
    name: competitionCategory.name,
  });
}
