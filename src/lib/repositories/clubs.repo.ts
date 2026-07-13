import { slugify } from "@/utils/string";
import { createClient } from "@/utils/supabase/server";
import { renameImage, tryDeleteImage } from "../services/storage.service";
import { STORAGE_BUCKETS } from "../storage";
import { ensureUniqueRecord } from "./helpers/uniqueness";
import {
  Club,
  ClubCreateInput,
  ClubDetailResponse,
  ClubListItem,
  ClubUpdateInput,
  GetClubsParams,
} from "@/types/club";

async function getSupabase() {
  return createClient();
}

export async function getClubsRepo(
  params: GetClubsParams,
): Promise<ClubListItem[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from("clubs")
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

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
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
    .from("clubs")
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

  const slug = slugify(club.name);

  await ensureUniqueRecord({
    table: "clubs",
    name: club.name,
    slug,
  });

  const { data, error } = await supabase
    .from("clubs")
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
  const oldClub = await getClubByIdRepo(id);
  const slug = slugify(club.name);

  if (!oldClub) {
    throw new Error("Club not found");
  }

  await ensureUniqueRecord({
    table: "clubs",
    name: club.name,
    slug,
    ignoreId: id,
  });

  let finalImage = club.image;

  // If the club name has changed and the image is still the same (no new upload),
  // we rename the file in the storage bucket to reflect the new name's slug.
  if (
    oldClub.name !== club.name &&
    oldClub.image &&
    oldClub.image === club.image
  ) {
    finalImage = await renameImage(
      oldClub.image,
      club.name,
      STORAGE_BUCKETS.CLUBS,
    );
  }

  // To comply with RLS policies where deleting the old image requires the database
  // record to still reference the old path, we delete the old image before updating.
  if (oldClub.image && oldClub.image !== club.image) {
    await tryDeleteImage(oldClub.image, STORAGE_BUCKETS.CLUBS);
  }

  const { data, error } = await supabase
    .from("clubs")
    .update({
      name: club.name,
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

  const club = await getClubByIdRepo(id);

  if (club?.image) {
    await tryDeleteImage(club.image, STORAGE_BUCKETS.CLUBS);
  }

  const { error } = await supabase.from("clubs").delete().eq("id", id);

  if (error) throw error;
}
