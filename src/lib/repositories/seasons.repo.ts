import { createClient } from "@/utils/supabase/server";
import { ensureUniqueRecord } from "./helpers/uniqueness";
import {
  GetSeasonsParams,
  SeasonCreateInput,
  SeasonDetailResponse,
  SeasonListItem,
  SeasonUpdateInput,
} from "@/types/season";
import { ENTITY_CONFIG } from "@/config/entities";
import { requireEntity } from "./helpers/require-entity";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["season"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["season"]["table"];
};

export async function getSeasonsRepo(
  params: GetSeasonsParams,
): Promise<SeasonListItem[]> {
  const supabase = await getSupabase();

  let query = supabase.from(getTable()).select("*").order("name");

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

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

  await ensureUniqueRecord({
    table: getTable(),
    name: season.name,
  });

  const { data, error } = await supabase
    .from(getTable())
    .insert({ ...season })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function updateSeasonRepo(
  id: string,
  season: SeasonUpdateInput,
): Promise<SeasonDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(getSeasonByIdRepo, id, getLabel());

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

  return data;
}

export async function deleteSeasonRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  await requireEntity(getSeasonByIdRepo, id, getLabel());

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
