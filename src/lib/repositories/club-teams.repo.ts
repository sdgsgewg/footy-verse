import { createClient } from "@/utils/supabase/server";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import {
  ClubTeamCreateInput,
  ClubTeamDetailResponse,
  ClubTeamEditResponse,
  ClubTeamListItem,
  ClubTeamLookupResponse,
  ClubTeamUpdateInput,
  DbClubTeamDetailRow,
  DbClubTeamListRow,
  GetClubTeamsParams,
} from "@/types/club-team";
import {
  mapClubTeamDetailResponse,
  mapClubTeamEditResponse,
  mapClubTeamListItem,
} from "../club-teams/mapper";

async function getSupabase() {
  return createClient();
}

const getClubTeamLabel = () => {
  return ENTITY_CONFIG["clubTeam"]["label"];
};

const getClubTeamTable = () => {
  return ENTITY_CONFIG["clubTeam"]["table"];
};

function getClubTeamsBaseQuery(options?: { isClubFiltered?: boolean }) {
  const clubJoin = options?.isClubFiltered ? "!inner" : "";

  return `
    id,
    squad_type,
    age_group,
    created_at,

    club:clubs!club_teams_club_id_fkey(
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param params
 * @returns ClubTeamListItem[]
 */
export async function getClubTeamsRepo(
  params: GetClubTeamsParams,
): Promise<ClubTeamListItem[]> {
  const supabase = await getSupabase();

  // Base Query
  let query = supabase
    .from(getClubTeamTable())
    .select(getClubTeamsBaseQuery())
    .order("created_at");

  // Filter
  if (params.squadType) {
    query = query.eq("squad_type", params.squadType);
  }

  if (params.ageGroup) {
    query = query.eq("age_group", params.ageGroup);
  }

  if (params.clubId) {
    query = query.eq("club_id", params.clubId);
  }

  const { data, error } = await query.overrideTypes<DbClubTeamListRow[]>();

  if (error) throw error;

  return (data ?? []).map(mapClubTeamListItem);
}

function getClubTeamDetailBaseQuery() {
  return `
    *,

    club:clubs!club_teams_club_id_fkey(
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param id
 * @returns ClubTeamEditResponse | null
 */
export async function getClubTeamEditRepo(
  id: string,
): Promise<ClubTeamEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getClubTeamTable())
    .select(getClubTeamDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbClubTeamDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapClubTeamEditResponse(data);
}

/**
 *
 * @param id
 * @returns ClubTeamDetailResponse | null
 */
export async function getClubTeamDetailRepo(
  id: string,
): Promise<ClubTeamDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getClubTeamTable())
    .select(getClubTeamDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbClubTeamDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapClubTeamDetailResponse(data);
}

/**
 *
 * @param id
 * @returns ClubTeamLookupResponse
 */
export async function getClubTeamLookupRepo(
  id: string,
): Promise<ClubTeamLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getClubTeamTable())
    .select(`id`)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data;
}

/**
 *
 * @param clubId
 * @param clubTeam
 * @returns ClubTeamDetailResponse
 */
export async function createClubTeamRepo(
  clubId: string,
  clubTeam: ClubTeamCreateInput,
): Promise<ClubTeamDetailResponse> {
  const supabase = await getSupabase();

  const { data: insertedClubTeam, error } = await supabase
    .from(getClubTeamTable())
    .insert({ ...clubTeam, club_id: clubId })
    .select(`*`)
    .single();

  if (error) throw error;

  const result = await getClubTeamDetailRepo(insertedClubTeam.id);
  if (!result) {
    throw new Error("Failed to retrieve created club team");
  }

  return result;
}

/**
 *
 * @param teamId
 * @param clubId
 * @param club
 * @returns ClubTeamDetailResponse
 */
export async function updateClubTeamRepo(
  teamId: string,
  clubId: string,
  clubTeam: ClubTeamUpdateInput,
): Promise<ClubTeamDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(getClubTeamEditRepo, teamId, getClubTeamLabel());

  const { error } = await supabase
    .from(getClubTeamTable())
    .update({
      ...clubTeam,
      club_id: clubId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", teamId);

  if (error) throw error;

  const result = await getClubTeamDetailRepo(teamId);
  if (!result) {
    throw new Error("Failed to retrieve updated club team");
  }

  return result;
}

/**
 *
 * @param teamId
 */
export async function deleteClubTeamRepo(teamId: string): Promise<void> {
  const supabase = await getSupabase();

  await requireEntity(getClubTeamEditRepo, teamId, getClubTeamLabel());

  const { error } = await supabase
    .from(getClubTeamTable())
    .delete()
    .eq("id", teamId);

  if (error) throw error;
}
