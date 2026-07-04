import { slugify } from "@/common/utils/slug.util";
import { type Tables } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { createPositionSchema, updatePositionSchema } from "../validations/positions.schema";

export type Position = Tables<"positions">;
export type PositionCreateInput = z.infer<typeof createPositionSchema>;
export type PositionUpdateInput = z.infer<typeof updatePositionSchema>;

type GetPositionsParams = {
  name?: string;
};

async function getSupabase() {
  return createClient();
}

async function ensureUniquePosition(params: {
  name: string;
  ignoreId?: string;
}) {
  const supabase = await getSupabase();

  let nameQuery = supabase
    .from("positions")
    .select("id")
    .eq("name", params.name)
    .limit(1);

  if (params.ignoreId) {
    nameQuery = nameQuery.neq("id", params.ignoreId);
  }

  const { data: existingName, error: nameError } =
    await nameQuery.maybeSingle();

  if (nameError) throw nameError;
  if (existingName) {
    throw new Error("Position name already exists");
  }
}

export async function getPositionsRepo(params: GetPositionsParams): Promise<Position[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from("positions")
    .select("id, name, slug, created_at, updated_at")
    .order("name");

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data ?? [];
}

export async function getPositionByIdRepo(id: string): Promise<Position | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("positions")
    .select("id, name, slug, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function createPositionRepo(position: PositionCreateInput): Promise<Position> {
  const supabase = await getSupabase();

  await ensureUniquePosition({
    name: position.name,
  });

  const slug = slugify(position.name);

  const { data, error } = await supabase
    .from("positions")
    .insert({ ...position, slug })
    .select("id, name, slug, created_at, updated_at")
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

  await ensureUniquePosition({ name: position.name, ignoreId: id });

  const { data, error } = await supabase
    .from("positions")
    .update({
      name: position.name,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id, name, slug, created_at, updated_at")
    .single();

  if (error) throw error;

  return data;
}

export async function deletePositionRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const { error } = await supabase.from("positions").delete().eq("id", id);

  if (error) throw error;
}
