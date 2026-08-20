import { createClient } from "@/utils/supabase/server";
import { ensureUniqueSlug } from "./helpers/slug";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  PositionCategoryCreateInput,
  PositionCategoryDetailResponse,
  PositionCategoryEditResponse,
  PositionCategoryFilter,
  PositionCategoryListItem,
  PositionCategoryLookupResponse,
  PositionCategoryUpdateInput,
  ReorderPositionCategoriesInput,
} from "@/types/position-category";
import {
  mapPositionCategoryDetailResponse,
  mapPositionCategoryEditResponse,
  mapPositionCategoryListItem,
} from "../position-categories/mapper";
import { createEntityActivityLog } from "./activity-logs.repo";
import { ActivityLogAction } from "@/enums/ActivityLogAction";
import { getChangedFields } from "./helpers/get-changed-field";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["positionCategory"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["positionCategory"]["table"];
};

/**
 *
 * @param params
 * @returns PositionCategoryListItem[]
 */
export async function getPositionCategoriesRepo(
  params: PositionCategoryFilter,
): Promise<PositionCategoryListItem[]> {
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

  return (data ?? []).map(mapPositionCategoryListItem);
}

/**
 *
 * @param id
 * @returns PositionCategoryEditResponse | null
 */
export async function getPositionCategoryEditRepo(
  id: string,
): Promise<PositionCategoryEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapPositionCategoryEditResponse(data);
}

/**
 *
 * @param id
 * @returns PositionCategoryDetailResponse | null
 */
export async function getPositionCategoryDetailRepo(
  id: string,
): Promise<PositionCategoryDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapPositionCategoryDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns PositionCategoryLookupResponse | null
 */
export async function getPositionCategoryLookupRepo(
  slug: string,
): Promise<PositionCategoryLookupResponse | null> {
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

/**
 *
 * @param positionCategory
 * @returns PositionCategoryDetailResponse
 */
export async function createPositionCategoryRepo(
  positionCategory: PositionCategoryCreateInput,
): Promise<PositionCategoryDetailResponse> {
  const supabase = await getSupabase();

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: positionCategory.name,
  });

  const { data: lastPositionCategory, error: lastPositionCategoryError } =
    await supabase
      .from(getTable())
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1)
      .single();

  if (lastPositionCategoryError) throw lastPositionCategoryError;

  const displayOrder = lastPositionCategory.display_order + 1;

  const { data: insertedPositionCategory, error } = await supabase
    .from(getTable())
    .insert({ ...positionCategory, slug, display_order: displayOrder })
    .select("*")
    .single();

  if (error) throw error;

  const result = await getPositionCategoryDetailRepo(
    insertedPositionCategory.id,
  );
  if (!result) {
    throw new Error("Failed to retrieve created position category");
  }

  await createEntityActivityLog({
    action: ActivityLogAction.CREATE,
    entity: "positionCategory",
    entityId: result.id,
    name: result.name,
  });

  return result;
}

export async function updatePositionCategoryRepo(
  id: string,
  positionCategory: PositionCategoryUpdateInput,
): Promise<PositionCategoryDetailResponse> {
  const supabase = await getSupabase();

  const oldPositionCategory = await requireEntity(
    getPositionCategoryDetailRepo,
    id,
    getLabel(),
  );

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: positionCategory.name,
  });

  const { error } = await supabase
    .from(getTable())
    .update({
      name: positionCategory.name,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  const result = await getPositionCategoryDetailRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated positionCategory");
  }

  const changes = getChangedFields(oldPositionCategory, result, [
    "name",
  ] as const);

  await createEntityActivityLog({
    action: ActivityLogAction.UPDATE,
    entity: "positionCategory",
    entityId: result.id,
    name: result.name,
    metadata: {
      changes,
    },
  });

  return result;
}

export async function reorderPositionCategoriesRepo(
  input: ReorderPositionCategoriesInput,
): Promise<void> {
  const supabase = await getSupabase();

  const { position_category_ids } = input;

  // drag-and-drop operation to reorder display_order of position categories

  const { error } = await supabase.rpc("reorder_position_categories", {
    p_position_category_ids: position_category_ids,
  });

  if (error) throw error;
}

export async function deletePositionCategoryRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const positionCategory = await requireEntity(
    getPositionCategoryDetailRepo,
    id,
    getLabel(),
  );

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;

  await createEntityActivityLog({
    action: ActivityLogAction.DELETE,
    entity: "positionCategory",
    entityId: id,
    name: positionCategory.name,
  });
}
