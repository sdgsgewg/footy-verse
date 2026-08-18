import { createClient } from "@/utils/supabase/server";
import { ensureUniqueRecord } from "./helpers/uniqueness";
import {
  SeasonCreateInput,
  SeasonDetailResponse,
  SeasonFilter,
  SeasonListItem,
  SeasonUpdateInput,
} from "@/types/season";
import { ENTITY_CONFIG } from "@/config/entities";
import { requireEntity } from "./helpers/require-entity";
import { ensureUniqueSlug } from "./helpers/slug";
import { createEntityActivityLog } from "./activity-logs.repo";
import { ActivityLogAction } from "@/enums/ActivityLogAction";
import { getChangedFields } from "./helpers/get-changed-field";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["season"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["season"]["table"];
};

/**
 *
 * @param params
 * @returns SeasonListItem[]
 */
export async function getSeasonsRepo(
  params: SeasonFilter,
): Promise<SeasonListItem[]> {
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

  return data ?? [];
}

export async function getSeasonByIdRepo(
  id: string,
): Promise<SeasonDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function createSeasonRepo(
  season: SeasonCreateInput,
): Promise<SeasonDetailResponse> {
  const supabase = await getSupabase();

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: season.name,
  });

  const { data, error } = await supabase
    .from(getTable())
    .insert({ ...season, slug })
    .select("*")
    .single();

  if (error) throw error;

  await createEntityActivityLog({
    action: ActivityLogAction.CREATE,
    entity: "nationality",
    entityId: data.id,
    name: data.name,
  });

  return data;
}

export async function updateSeasonRepo(
  id: string,
  season: SeasonUpdateInput,
): Promise<SeasonDetailResponse> {
  const supabase = await getSupabase();

  const oldSeason = await requireEntity(getSeasonByIdRepo, id, getLabel());

  await ensureUniqueRecord({
    table: getTable(),
    name: season.name,
    ignoreId: id,
  });

  const { data, error } = await supabase
    .from(getTable())
    .update({
      name: season.name,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  const result = await getSeasonByIdRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated season");
  }

  const changes = getChangedFields(oldSeason, result, ["name"] as const);

  await createEntityActivityLog({
    action: ActivityLogAction.UPDATE,
    entity: "season",
    entityId: result.id,
    name: result.name,
    metadata: {
      changes,
    },
  });

  return data;
}

export async function deleteSeasonRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const season = await requireEntity(getSeasonByIdRepo, id, getLabel());

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;

  await createEntityActivityLog({
    action: ActivityLogAction.DELETE,
    entity: "season",
    entityId: id,
    name: season.name,
  });
}
