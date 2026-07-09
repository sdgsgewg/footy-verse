import { slugify } from "@/common/utils/slug.util";
import { type Tables } from "@/lib/database.types";
import { createClient } from "@/utils/supabase/server";
import {
  clubsQuerySchema,
  createClubSchema,
  updateClubSchema,
} from "../validations/clubs.schema";
import { renameImage, tryDeleteImage } from "../services/storage.service";
import z from "zod";
import { STORAGE_BUCKETS } from "../storage";

export type Club = Tables<"clubs">;
export type ClubCreateInput = z.infer<typeof createClubSchema>;
export type ClubUpdateInput = z.infer<typeof updateClubSchema>;

type GetClubsParams = z.infer<typeof clubsQuerySchema>;

async function getSupabase() {
  return createClient();
}

async function ensureUniqueClub(params: {
  name: string;
  slug: string;
  ignoreId?: string;
}) {
  const supabase = await getSupabase();

  let nameQuery = supabase
    .from("clubs")
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
    throw new Error("Club name already exists");
  }

  let slugQuery = supabase
    .from("clubs")
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
    throw new Error("Club slug already exists");
  }
}

export async function getClubsRepo(params: GetClubsParams): Promise<Club[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from("clubs")
    .select(
      "id, image, name, slug, club_type, parent_club_id, nation_id, created_at, updated_at",
    )
    .order("name");

  if (params.name) {
    query = query.ilike("name", `%${params.name}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data ?? [];
}

export async function getClubByIdRepo(id: string): Promise<Club | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("clubs")
    .select(
      "id, image, name, slug, club_type, parent_club_id, nation_id, created_at, updated_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function createClubRepo(club: ClubCreateInput): Promise<Club> {
  const supabase = await getSupabase();

  await ensureUniqueClub({
    name: club.name,
    slug: slugify(club.name),
  });

  const slug = slugify(club.name);

  const { data, error } = await supabase
    .from("clubs")
    .insert({ ...club, slug })
    .select(
      "id, image, name, slug, club_type, parent_club_id, nation_id, created_at, updated_at",
    )
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

  await ensureUniqueClub({ name: club.name, slug, ignoreId: id });

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
    .select(
      "id, image, name, slug, club_type, parent_club_id, nation_id, created_at, updated_at",
    )
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
