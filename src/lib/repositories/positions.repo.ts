import {
  DbPositionDetailRow,
  DbPositionListRow,
  PositionCreateInput,
  PositionDetailResponse,
  PositionEditResponse,
  PositionFilter,
  PositionListItem,
  PositionLookupResponse,
  PositionUpdateInput,
  ReorderPositionsInput,
} from "@/types/position";
import { createClient } from "@/utils/supabase/server";
import { ensureUniqueSlug } from "./helpers/slug";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  mapPositionDetailResponse,
  mapPositionEditResponse,
  mapPositionListItem,
} from "../positions/mapper";
import { slugify } from "@/utils/string";
import { createEntityActivityLog } from "./activity-logs.repo";
import { ActivityLogAction } from "@/enums/ActivityLogAction";
import { getChangedFields } from "./helpers/get-changed-field";

async function getSupabase() {
  return createClient();
}

const getPositionLabel = () => {
  return ENTITY_CONFIG["position"]["label"];
};

const getPositionTable = () => {
  return ENTITY_CONFIG["position"]["table"];
};

function getPositionsBaseQuery(options?: { isCategoryFiltered?: boolean }) {
  const categoryJoin = options?.isCategoryFiltered ? "!inner" : "";

  return `
    *,

    category:position_categories!positions_position_category_id_fkey${categoryJoin} (
      id,
      name
    )
  `;
}

/**
 *
 * @param params
 * @returns PositionListItem[]
 */
export async function getPositionsRepo(
  params: PositionFilter,
): Promise<PositionListItem[]> {
  const supabase = await getSupabase();

  // Base Query

  let query = supabase.from(getPositionTable()).select(
    getPositionsBaseQuery({
      isCategoryFiltered: !!params.categoryId,
    }),
    {
      count: "exact",
    },
  );

  // Filter

  if (params.search) {
    query = query.ilike("name", `%${params.search}%`);
  }

  if (params.categoryId) {
    query = query.eq("position_category_id", params.categoryId);
  }

  // Sort

  query = query.order(params.sortBy, {
    ascending: params.sortOrder === "asc",
  });

  // Execute

  const { data, error } = await query.overrideTypes<DbPositionListRow[]>();

  if (error) throw error;

  return (data ?? []).map(mapPositionListItem);
}

function getPositionDetailQuery() {
  return `
    *,

    category:position_categories!positions_position_category_id_fkey (
      id,
      name
    )
  `;
}

/**
 *
 * @param id
 * @returns PositionEditResponse | null
 */
export async function getPositionEditRepo(
  id: string,
): Promise<PositionEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPositionTable())
    .select(getPositionDetailQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbPositionDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPositionEditResponse(data);
}

/**
 *
 * @param id
 * @returns PositionDetailResponse | null
 */
export async function getPositionDetailRepo(
  id: string,
): Promise<PositionDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPositionTable())
    .select(getPositionDetailQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbPositionDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPositionDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns PositionLookupResponse | null
 */
export async function getPositionLookupRepo(
  slug: string,
): Promise<PositionLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPositionTable())
    .select(`id, slug`)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data;
}

/**
 *
 * @param position
 * @returns PositionDetailResponse
 */
export async function createPositionRepo(
  position: PositionCreateInput,
): Promise<PositionDetailResponse> {
  const supabase = await getSupabase();

  const slug = await ensureUniqueSlug({
    table: getPositionTable(),
    name: position.name,
  });

  const { data: lastPosition, error: lastPositionError } = await supabase
    .from(getPositionTable())
    .select("display_order")
    .eq("position_category_id", position.position_category_id)
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastPositionError) throw lastPositionError;

  const displayOrder = (lastPosition?.display_order ?? 0) + 1;

  const { data: insertedPosition, error } = await supabase
    .from(getPositionTable())
    .insert({ ...position, slug, display_order: displayOrder })
    .select("*")
    .single();

  if (error) throw error;

  const result = await getPositionDetailRepo(insertedPosition.id);

  if (!result) {
    throw new Error("Failed to retrieve created position");
  }

  await createEntityActivityLog({
    action: ActivityLogAction.CREATE,
    entity: "position",
    entityId: result.id,
    name: result.name,
  });

  return result;
}

export async function updatePositionRepo(
  id: string,
  position: PositionUpdateInput,
): Promise<PositionEditResponse> {
  const supabase = await getSupabase();

  const oldPosition = await requireEntity(
    getPositionEditRepo,
    id,
    getPositionLabel(),
  );

  const slug = slugify(position.name);

  const { error } = await supabase
    .from(getPositionTable())
    .update({
      ...position,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  const result = await getPositionEditRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated position");
  }

  const changes = getChangedFields(oldPosition, result, [
    "name",
    "categoryId",
  ] as const);

  await createEntityActivityLog({
    action: ActivityLogAction.UPDATE,
    entity: "position",
    entityId: result.id,
    name: result.name,
    metadata: {
      changes,
    },
  });

  return result;
}

export async function reorderPositionsRepo(
  input: ReorderPositionsInput,
): Promise<void> {
  const supabase = await getSupabase();

  const { position_category_id, position_ids } = input;

  const { error } = await supabase.rpc("reorder_positions", {
    p_position_category_id: position_category_id,
    p_position_ids: position_ids,
  });

  if (error) throw error;
}

export async function deletePositionRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const position = await requireEntity(
    getPositionDetailRepo,
    id,
    getPositionLabel(),
  );

  const { error } = await supabase
    .from(getPositionTable())
    .delete()
    .eq("id", id);

  if (error) throw error;

  await createEntityActivityLog({
    action: ActivityLogAction.DELETE,
    entity: "position",
    entityId: id,
    name: position.name,
  });
}
