import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "../storage";
import {
  ClubCreateInput,
  ClubDetailResponse,
  ClubEditResponse,
  ClubListItem,
  ClubLookupResponse,
  ClubUpdateInput,
  DbClubDetailRow,
  DbClubListRow,
  GetClubsParams,
} from "@/types/club";
import { requireEntity } from "./helpers/require-entity";
import { ensureUniqueSlug } from "./helpers/slug";
import { ENTITY_CONFIG } from "@/config/entities";
import { deleteEntityImage, prepareUpdatedImage } from "./helpers/image";
import {
  mapClubDetailResponse,
  mapClubEditResponse,
  mapClubListItem,
} from "../clubs/mapper";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["club"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["club"]["table"];
};

function getClubsBaseQuery() {
  return `
    id,
    image,
    name,
    slug,
    club_type,

    nation:nationalities!clubs_nation_id_fkey(
      id,
      name,
      image
    ),

    parent_club:clubs!parent_club_id(
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param params
 * @returns ClubListItem[]
 */
export async function getClubsRepo(
  params: GetClubsParams,
): Promise<ClubListItem[]> {
  const supabase = await getSupabase();

  // Base Query
  let query = supabase
    .from(getTable())
    .select(getClubsBaseQuery())
    .order("name");

  // Filter
  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  if (params.nationId) {
    query = query.eq("nation_id", params.nationId);
  }

  if (params.clubType) {
    query = query.eq("club_type", params.clubType);
  }

  const { data, error } = await query.overrideTypes<DbClubListRow[]>();

  if (error) throw error;

  return (data ?? []).map(mapClubListItem);
}

function getClubDetailBaseQuery() {
  return `
    *,

    nation:nationalities!clubs_nation_id_fkey(
      id,
      name,
      image
    ),

    parent_club:clubs!parent_club_id(
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param id
 * @returns ClubEditResponse | null
 */
export async function getClubEditRepo(
  id: string,
): Promise<ClubEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getClubDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbClubDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapClubEditResponse(data);
}

/**
 *
 * @param id
 * @returns ClubDetailResponse | null
 */
export async function getClubDetailRepo(
  id: string,
): Promise<ClubDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getClubDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbClubDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapClubDetailResponse(data);
}

/**
 *
 * @param id
 * @returns ClubLookupResponse
 */
export async function getClubLookupRepo(
  slug: string,
): Promise<ClubLookupResponse | null> {
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
 * @param club
 * @returns ClubDetailResponse
 */
export async function createClubRepo(
  club: ClubCreateInput,
): Promise<ClubDetailResponse> {
  const supabase = await getSupabase();

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: club.name,
  });

  const { data: insertedClub, error } = await supabase
    .from(getTable())
    .insert({ ...club, slug })
    .select(`*`)
    .single();

  if (error) throw error;

  const result = await getClubDetailRepo(insertedClub.id);
  if (!result) {
    throw new Error("Failed to retrieve created club");
  }

  return result;
}

/**
 *
 * @param id
 * @param club
 * @returns ClubDetailResponse
 */
export async function updateClubRepo(
  id: string,
  club: ClubUpdateInput,
): Promise<ClubDetailResponse> {
  const supabase = await getSupabase();

  const oldClub = await requireEntity(getClubEditRepo, id, getLabel());

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: club.name,
  });

  const finalImage = await prepareUpdatedImage({
    oldName: oldClub.name,
    newName: club.name,
    oldImage: oldClub.image,
    newImage: club.image ?? "",
    bucket: STORAGE_BUCKETS.CLUBS,
  });

  const { error } = await supabase
    .from(getTable())
    .update({
      name: club.name,
      club_type: club.club_type,
      nation_id: club.nation_id,
      parent_club_id: club.parent_club_id,
      image: finalImage,
      slug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  const result = await getClubDetailRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated club");
  }

  return result;
}

/**
 *
 * @param id
 */
export async function deleteClubRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const club = await requireEntity(getClubEditRepo, id, getLabel());

  await deleteEntityImage(club.image, STORAGE_BUCKETS.CLUBS);

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
