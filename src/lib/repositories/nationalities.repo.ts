import { slugify } from "@/common/utils/slug.util";
import { type Tables } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/server";
import { renameImage, tryDeleteImage } from "../services/storage.service";
import z from "zod";
import { createNationalitySchema, updateNationalitySchema } from "../validations/nationalities.schema";
import { STORAGE_BUCKETS } from "../storage";

export type Nationality = Tables<"nationalities">;
export type NationalityCreateInput = z.infer<typeof createNationalitySchema>;
export type NationalityUpdateInput = z.infer<typeof updateNationalitySchema>;

type GetNationalitiesParams = {
  name?: string;
  slug?: string;
};

async function getSupabase() {
  return createClient();
}

async function ensureUniqueNationality(params: {
  name: string;
  slug: string;
  ignoreId?: string;
}) {
  const supabase = await getSupabase();

  let nameQuery = supabase
    .from("nationalities")
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
    throw new Error("Nationality name already exists");
  }

  let slugQuery = supabase
    .from("nationalities")
    .select("id")
    .eq("slug", params.slug)
    .limit(1);

  if (params.ignoreId) {
    slugQuery = slugQuery.neq("id", params.ignoreId);
  }

  const { data: existingSlug, error: slugError } =
    await slugQuery.maybeSingle();

  if (slugError) throw slugError;
  if (existingSlug) {
    throw new Error("Nationality slug already exists");
  }
}

export async function getNationalitiesRepo(params: GetNationalitiesParams): Promise<Nationality[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from("nationalities")
    .select("id, image, name, slug, created_at, updated_at")
    .order("name");

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data ?? [];
}

export async function getNationalityByIdRepo(id: string): Promise<Nationality | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("nationalities")
    .select("id, image, name, slug, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function createNationalityRepo(nationality: NationalityCreateInput): Promise<Nationality> {
  const supabase = await getSupabase();

  await ensureUniqueNationality({
    name: nationality.name,
    slug: slugify(nationality.name),
  });

  const slug = slugify(nationality.name);

  const { data, error } = await supabase
    .from("nationalities")
    .insert({ ...nationality, slug })
    .select("id, image, name, slug, created_at, updated_at")
    .single();

  if (error) throw error;

  return data;
}

export async function updateNationalityRepo(
  id: string,
  nationality: NationalityUpdateInput,
): Promise<Nationality> {
  const supabase = await getSupabase();
  const oldNationality = await getNationalityByIdRepo(id);
  const slug = slugify(nationality.name);

  if (!oldNationality) {
    throw new Error("Nationality not found");
  }

  await ensureUniqueNationality({ name: nationality.name, slug, ignoreId: id });

  let finalImage = nationality.image;

  // If the nationality name has changed and the image is still the same (no new upload),
  // we rename the file in the storage bucket to reflect the new name's slug.
  if (oldNationality.name !== nationality.name && oldNationality.image && oldNationality.image === nationality.image) {
    finalImage = await renameImage(oldNationality.image, nationality.name, STORAGE_BUCKETS.NATIONALITIES);
  }

  // To comply with RLS policies where deleting the old image requires the database
  // record to still reference the old path, we delete the old image before updating.
  if (oldNationality.image && oldNationality.image !== nationality.image) {
    await tryDeleteImage(oldNationality.image, STORAGE_BUCKETS.NATIONALITIES);
  }

  const { data, error } = await supabase
    .from("nationalities")
    .update({
      name: nationality.name,
      image: finalImage,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("id, image, name, slug, created_at, updated_at")
    .single();

  if (error) throw error;

  return data;
}

export async function deleteNationalityRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const nationality = await getNationalityByIdRepo(id);

  if (nationality?.image) {
    await tryDeleteImage(nationality.image, STORAGE_BUCKETS.NATIONALITIES);
  }

  const { error } = await supabase.from("nationalities").delete().eq("id", id);

  if (error) throw error;
}
