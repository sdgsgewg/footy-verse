import {
  GetPositionsParams,
  Position,
  PositionCreateInput,
  PositionDetailResponse,
  PositionListItem,
  PositionUpdateInput,
} from "@/types/position";
import { createClient } from "@/utils/supabase/server";
import { ensureUniqueSlug } from "./helpers/slug";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["position"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["position"]["table"];
};

export async function getPositionsRepo(
  params: GetPositionsParams,
): Promise<PositionListItem[]> {
  const supabase = await getSupabase();

  let query = supabase.from(getTable()).select("*").order("name");

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data ?? [];
}

export async function getPositionByIdRepo(
  id: string,
): Promise<PositionDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function createPositionRepo(
  position: PositionCreateInput,
): Promise<Position> {
  const supabase = await getSupabase();

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: position.name,
  });

  const { data, error } = await supabase
    .from(getTable())
    .insert({ ...position, slug })
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function updatePositionRepo(
  id: string,
  position: PositionUpdateInput,
): Promise<Position> {
  const supabase = await getSupabase();

  await requireEntity(getPositionByIdRepo, id, getLabel());

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: position.name,
  });

  const { data, error } = await supabase
    .from(getTable())
    .update({
      name: position.name,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function deletePositionRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  await requireEntity(getPositionByIdRepo, id, getLabel());

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
