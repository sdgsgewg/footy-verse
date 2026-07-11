import { slugify } from "@/common/utils/slug.util";
import {
  GetPositionsParams,
  Position,
  PositionCreateInput,
  PositionDetailResponse,
  PositionListItem,
  PositionUpdateInput,
} from "@/types/position";
import { createClient } from "@/utils/supabase/server";
import { ensureUniqueRecord } from "./helpers/uniqueness";

async function getSupabase() {
  return createClient();
}

export async function getPositionsRepo(
  params: GetPositionsParams,
): Promise<PositionListItem[]> {
  const supabase = await getSupabase();

  let query = supabase.from("positions").select("*").order("name");

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
    .from("positions")
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

  const slug = slugify(position.name);

  await ensureUniqueRecord({
    table: "positions",
    name: position.name,
    slug,
  });

  const { data, error } = await supabase
    .from("positions")
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
  const oldPosition = await getPositionByIdRepo(id);
  const slug = slugify(position.name);

  if (!oldPosition) {
    throw new Error("Position not found");
  }

  await ensureUniqueRecord({
    table: "positions",
    name: position.name,
    slug,
    ignoreId: id,
  });

  const { data, error } = await supabase
    .from("positions")
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

  const { error } = await supabase.from("positions").delete().eq("id", id);

  if (error) throw error;
}
