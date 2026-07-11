import { createClient } from "@/utils/supabase/server";
import { ensureUniqueRecord } from "./helpers/uniqueness";
import {
  GetSeasonsParams,
  SeasonCreateInput,
  SeasonDetailResponse,
  SeasonListItem,
  SeasonUpdateInput,
} from "@/types/season";

async function getSupabase() {
  return createClient();
}

export async function getSeasonsRepo(
  params: GetSeasonsParams,
): Promise<SeasonListItem[]> {
  const supabase = await getSupabase();

  let query = supabase.from("seasons").select("*").order("name");

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
    .from("seasons")
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
    table: "seasons",
    name: season.name,
  });

  const { data, error } = await supabase
    .from("seasons")
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
  const oldSeason = await getSeasonByIdRepo(id);

  if (!oldSeason) {
    throw new Error("Season not found");
  }

  await ensureUniqueRecord({
    table: "seasons",
    name: season.name,
    ignoreId: id,
  });

  const { data, error } = await supabase
    .from("seasons")
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

  const { error } = await supabase.from("seasons").delete().eq("id", id);

  if (error) throw error;
}
