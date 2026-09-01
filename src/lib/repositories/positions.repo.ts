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
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  mapPositionDetailResponse,
  mapPositionEditResponse,
  mapPositionListItem,
} from "../positions/mapper";
import { slugify } from "@/lib/utils/slugify";
import { createEntityActivityLog } from "./activity-logs.repo";
import { ActivityLogAction } from "@/enums/ActivityLogAction";
import { getChangedFields } from "./helpers/get-changed-field";
import { ensureUniqueFieldsRepo } from "./helpers/uniqueness";
import { Option } from "@/types/option";
import { mapEntityOption } from "../entities/mapper";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["position"]["label"];
};

const getTable = () => {
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

  let query = supabase.from(getTable()).select(
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

/**
 *
 * @returns Option[]
 */
export async function getPositionOptionsRepo(): Promise<Option[]> {
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

  return data.map((data) => mapEntityOption(data, "position"));
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
    .from(getTable())
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
    .from(getTable())
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
    .from(getTable())
    .select(`id, slug`)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data;
}

export async function ensurePositionUniqueRepo({
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
        message: "Position name already exists",
      },
    ],
    ignoreId,
  });

  return slug;
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

  const slug = await ensurePositionUniqueRepo({
    name: position.name,
  });

  const { data: lastPosition, error: lastPositionError } = await supabase
    .from(getTable())
    .select("display_order")
    .eq("position_category_id", position.position_category_id)
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastPositionError) throw lastPositionError;

  const displayOrder = (lastPosition?.display_order ?? 0) + 1;

  const { data: insertedPosition, error } = await supabase
    .from(getTable())
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

  const oldPosition = await requireEntity(getPositionEditRepo, id, getLabel());

  const slug = ensurePositionUniqueRepo({
    name: position.name,
    ignoreId: id,
  });

  /**
   * update data
   * move category if changed
   * normalize display order of positions from old/new category
   */
  const { error } = await supabase.rpc("update_position", {
    p_position_id: id,
    p_name: position.name,
    p_slug: slug,
    p_position_category_id: position.position_category_id,
  });

  if (error) throw error;

  const result = await getPositionEditRepo(id);

  if (!result) {
    throw new Error("Failed to retrieve updated position");
  }

  // Create activity log

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

  // drag-and-drop operation to reorder display_order of positions from the selected position category

  const { error } = await supabase.rpc("reorder_positions", {
    p_position_category_id: position_category_id,
    p_position_ids: position_ids,
  });

  if (error) throw error;
}

export async function deletePositionRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const position = await requireEntity(getPositionDetailRepo, id, getLabel());

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;

  // tidy up display_order of other positions from the same position category

  await supabase.rpc("normalize_position_display_order", {
    p_position_category_id: position.category.id,
  });

  await createEntityActivityLog({
    action: ActivityLogAction.DELETE,
    entity: "position",
    entityId: id,
    name: position.name,
  });
}
