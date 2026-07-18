import { createClient } from "@/utils/supabase/server";
import { STORAGE_BUCKETS } from "../storage";
import {
  Club,
  ClubCreateInput,
  ClubDetailResponse,
  ClubListItem,
  ClubUpdateInput,
  GetClubsParams,
} from "@/types/club";
import { requireEntity } from "./helpers/require-entity";
import { ensureUniqueSlug } from "./helpers/slug";
import { ENTITY_CONFIG } from "@/config/entities";
import { deleteEntityImage, prepareUpdatedImage } from "./helpers/image";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["club"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["club"]["table"];
};

export async function getClubsRepo(
  params: GetClubsParams,
): Promise<ClubListItem[]> {
  const supabase = await getSupabase();

  console.log("Params: ", JSON.stringify(params, null, 2));

  // Base Query
  let query = supabase
    .from(getTable())
    .select(
      `
      *,
      nation:nationalities!clubs_nation_id_fkey(
        id,
        name
      ),
      parent_club:clubs!parent_club_id(
        id,
        name
      )
      `,
    )
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

  const { data, error } = await query;

  if (error) throw error;

  return (data ?? []).map((club) => ({
    ...club,
  }));
}

export async function getClubByIdRepo(
  id: string,
): Promise<ClubDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(
      `
      *,
      nation:nationalities!clubs_nation_id_fkey(
        id,
        name
      ),
      parent_club:clubs!parent_club_id(
        id,
        name
      )
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function createClubRepo(club: ClubCreateInput): Promise<Club> {
  const supabase = await getSupabase();

  const slug = await ensureUniqueSlug({
    table: getTable(),
    name: club.name,
  });

  const { data, error } = await supabase
    .from(getTable())
    .insert({ ...club, slug })
    .select(`*`)
    .single();

  if (error) throw error;

  return data;
}

export async function updateClubRepo(
  id: string,
  club: ClubUpdateInput,
): Promise<Club> {
  const supabase = await getSupabase();

  const oldClub = await requireEntity(getClubByIdRepo, id, getLabel());

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

  const { data, error } = await supabase
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

  return data;
}

export async function deleteClubRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const club = await requireEntity(getClubByIdRepo, id, getLabel());

  await deleteEntityImage(club.image, STORAGE_BUCKETS.CLUBS);

  const { error } = await supabase.from(getTable()).delete().eq("id", id);

  if (error) throw error;
}
