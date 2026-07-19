import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "../storage";
import {
  GetNationalitiesParams,
  Nationality,
  NationalityCreateInput,
  NationalityDetailResponse,
  NationalityListItem,
  NationalityUpdateInput,
} from "@/types/nationality";
import { ensureUniqueSlug } from "./helpers/slug";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import { deleteEntityImage, prepareUpdatedImage } from "./helpers/image";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["nationality"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["nationality"]["table"];
};

export async function getNationalitiesRepo(
  params: GetNationalitiesParams,
): Promise<NationalityListItem[]> {
  const supabase = await getSupabase();

  let query = supabase.from(getTable()).select("*").order("name");

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
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getNationalityBySlugRepo(
  slug: string,
): Promise<NationalityDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function createNationalityRepo(
  nationality: NationalityCreateInput,
): Promise<Nationality> {
  const supabase = await getSupabase();

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: nationality.name,
  });

  const { data, error } = await supabase
    .from(getTable())
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

  const oldNationality = await requireEntity(
    getNationalityByIdRepo,
    id,
    getLabel(),
  );

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: nationality.name,
  });

  const finalImage = await prepareUpdatedImage({
    oldName: oldNationality.name,
    newName: nationality.name,
    oldImage: oldNationality.image,
    newImage: nationality.image ?? "",
    bucket: STORAGE_BUCKETS.NATIONALITIES,
  });

  const { data, error } = await supabase
    .from(getTable())
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

  const nationality = await requireEntity(
    getNationalityByIdRepo,
    id,
    getLabel(),
  );

  await deleteEntityImage(nationality.image, STORAGE_BUCKETS.NATIONALITIES);

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
