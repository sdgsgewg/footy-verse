import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "../storage";
import {
  DbNationalityListRow,
  GetNationalitiesParams,
  NationalityCreateInput,
  NationalityDetailResponse,
  NationalityEditResponse,
  NationalityListItem,
  NationalityLookupResponse,
  NationalityUpdateInput,
} from "@/types/nationality";
import { ensureUniqueSlug } from "./helpers/slug";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import { deleteEntityImage, prepareUpdatedImage } from "./helpers/image";
import {
  mapNationalityDetailResponse,
  mapNationalityEditResponse,
  mapNationalityListItem,
} from "../nationalities/mapper";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["nationality"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["nationality"]["table"];
};

function getNationalitiesBaseQuery() {
  return `
    id,
    image,
    name,
    slug
  `;
}

/**
 *
 * @param params
 * @returns NationalityListItem[]
 */
export async function getNationalitiesRepo(
  params: GetNationalitiesParams,
): Promise<NationalityListItem[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from(getTable())
    .select(getNationalitiesBaseQuery())
    .order("name");

  // Filter
  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  const { data, error } = await query.overrideTypes<DbNationalityListRow[]>();

  if (error) throw error;

  return (data ?? []).map(mapNationalityListItem);
}

/**
 *
 * @param id
 * @returns NationalityEditResponse | null
 */
export async function getNationalityEditRepo(
  id: string,
): Promise<NationalityEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapNationalityEditResponse(data);
}

/**
 *
 * @param id
 * @returns NationalityDetailResponse | null
 */
export async function getNationalityDetailRepo(
  id: string,
): Promise<NationalityDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapNationalityDetailResponse(data);
}

/**
 *
 * @param slug
 * @returns NationalityLookupResponse | null
 */
export async function getNationalityLookupRepo(
  slug: string,
): Promise<NationalityLookupResponse | null> {
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

/**
 *
 * @param nationality
 * @returns
 */
export async function createNationalityRepo(
  nationality: NationalityCreateInput,
): Promise<NationalityDetailResponse> {
  const supabase = await getSupabase();

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: nationality.name,
  });

  const { data: insertedNationality, error } = await supabase
    .from(getTable())
    .insert({ ...nationality, slug })
    .select("*")
    .single();

  if (error) throw error;

  const result = await getNationalityDetailRepo(insertedNationality.id);
  if (!result) {
    throw new Error("Failed to retrieve created nationality");
  }

  return result;
}

export async function updateNationalityRepo(
  id: string,
  nationality: NationalityUpdateInput,
): Promise<NationalityDetailResponse> {
  const supabase = await getSupabase();

  const oldNationality = await requireEntity(
    getNationalityEditRepo,
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

  const { error } = await supabase
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

  const result = await getNationalityDetailRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated nationality");
  }

  return result;
}

export async function deleteNationalityRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const nationality = await requireEntity(
    getNationalityEditRepo,
    id,
    getLabel(),
  );

  await deleteEntityImage(nationality.image, STORAGE_BUCKETS.NATIONALITIES);

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
