import { slugify } from "@/utils/string";
import { createClient } from "@/utils/supabase/server";
import { renameImage, tryDeleteImage } from "../services/storage.service";
import { STORAGE_BUCKETS } from "../storage";
import {
  GetNationalitiesParams,
  Nationality,
  NationalityCreateInput,
  NationalityDetailResponse,
  NationalityListItem,
  NationalityUpdateInput,
} from "@/types/nationality";
import { ensureUniqueRecord } from "./helpers/uniqueness";

async function getSupabase() {
  return createClient();
}

export async function getNationalitiesRepo(
  params: GetNationalitiesParams,
): Promise<NationalityListItem[]> {
  const supabase = await getSupabase();

  let query = supabase.from("nationalities").select("*").order("name");

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data ?? [];
}

export async function getNationalityByIdRepo(
  id: string,
): Promise<NationalityDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("nationalities")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function createNationalityRepo(
  nationality: NationalityCreateInput,
): Promise<Nationality> {
  const supabase = await getSupabase();

  const slug = slugify(nationality.name);

  await ensureUniqueRecord({
    table: "nationalities",
    name: nationality.name,
    slug,
  });

  const { data, error } = await supabase
    .from("nationalities")
    .insert({ ...nationality, slug })
    .select("*")
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

  await ensureUniqueRecord({
    table: "nationalities",
    name: nationality.name,
    slug,
    ignoreId: id,
  });

  let finalImage = nationality.image;

  // If the nationality name has changed and the image is still the same (no new upload),
  // we rename the file in the storage bucket to reflect the new name's slug.
  if (
    oldNationality.name !== nationality.name &&
    oldNationality.image &&
    oldNationality.image === nationality.image
  ) {
    finalImage = await renameImage(
      oldNationality.image,
      nationality.name,
      STORAGE_BUCKETS.NATIONALITIES,
    );
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
    .select("*")
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
