import { createClient } from "@/utils/supabase/server";
import { requireEntity } from "./helpers/require-entity";
import { ENTITY_CONFIG } from "@/config/entities";
import { DbNationalTeamDetailRow, DbNationalTeamListRow, GetNationalTeamsParams, NationalTeamCreateInput, NationalTeamDetailResponse, NationalTeamEditResponse, NationalTeamListItem, NationalTeamLookupResponse, NationalTeamUpdateInput } from "@/types/national-team";
import { mapNationalTeamDetailResponse, mapNationalTeamEditResponse, mapNationalTeamListItem } from "../national-teams/mapper";


async function getSupabase() {
  return createClient();
}

const getNationalTeamLabel = () => {
  return ENTITY_CONFIG["nationalTeam"]["label"];
};

const getNationalTeamTable = () => {
  return ENTITY_CONFIG["nationalTeam"]["table"];
};

function getNationalTeamsBaseQuery() {
  return `
    id,
    team_category,
    age_group,
    created_at,

    nation:nationalities!national_teams_nation_id_fkey(
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param params
 * @returns NationalTeamListItem[]
 */
export async function getNationalTeamsRepo(
  params: GetNationalTeamsParams,
): Promise<NationalTeamListItem[]> {
  const supabase = await getSupabase();

  // Base Query
  let query = supabase
    .from(getNationalTeamTable())
    .select(getNationalTeamsBaseQuery())
    .order("created_at");

  // Filter
  if (params.teamCategory) {
    query = query.eq("team_category", params.teamCategory);
  }

  if (params.ageGroup) {
    query = query.eq("age_group", params.ageGroup);
  }

  if (params.nationId) {
    query = query.eq("nation_id", params.nationId);
  }

  const { data, error } = await query.overrideTypes<DbNationalTeamListRow[]>();

  if (error) throw error;

  return (data ?? []).map(mapNationalTeamListItem);
}

function getNationalTeamDetailBaseQuery() {
  return `
    *,

    nation:nationalities!national_teams_nation_id_fkey(
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param id
 * @returns NationalTeamEditResponse | null
 */
export async function getNationalTeamEditRepo(
  id: string,
): Promise<NationalTeamEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getNationalTeamTable())
    .select(getNationalTeamDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbNationalTeamDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapNationalTeamEditResponse(data);
}

/**
 *
 * @param id
 * @returns NationalTeamDetailResponse | null
 */
export async function getNationalTeamDetailRepo(
  id: string,
): Promise<NationalTeamDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getNationalTeamTable())
    .select(getNationalTeamDetailBaseQuery())
    .eq("id", id)
    .maybeSingle()
    .overrideTypes<DbNationalTeamDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapNationalTeamDetailResponse(data);
}

/**
 *
 * @param id
 * @returns NationalTeamLookupResponse
 */
export async function getNationalTeamLookupRepo(
  id: string,
): Promise<NationalTeamLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getNationalTeamTable())
    .select(`id`)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data;
}

/**
 *
 * @param nationId
 * @param NationalTeam
 * @returns NationalTeamDetailResponse
 */
export async function createNationalTeamRepo(
  nationId: string,
  nationalTeam: NationalTeamCreateInput,
): Promise<NationalTeamDetailResponse> {
  const supabase = await getSupabase();

  const { data: insertedNationalTeam, error } = await supabase
    .from(getNationalTeamTable())
    .insert({ ...nationalTeam, club_id: nationId })
    .select(`*`)
    .single();

  if (error) throw error;

  const result = await getNationalTeamDetailRepo(insertedNationalTeam.id);
  if (!result) {
    throw new Error("Failed to retrieve created national team");
  }

  return result;
}

/**
 *
 * @param teamId
 * @param nationId
 * @param nationalTeam
 * @returns NationalTeamDetailResponse
 */
export async function updateNationalTeamRepo(
  teamId: string,
  nationId: string,
  nationalTeam: NationalTeamUpdateInput,
): Promise<NationalTeamDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(getNationalTeamEditRepo, teamId, getNationalTeamLabel());

  const { error } = await supabase
    .from(getNationalTeamTable())
    .update({
      ...nationalTeam,
      club_id: nationId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", teamId);

  if (error) throw error;

  const result = await getNationalTeamDetailRepo(teamId);
  if (!result) {
    throw new Error("Failed to retrieve updated national team");
  }

  return result;
}

/**
 *
 * @param teamId
 */
export async function deleteNationalTeamRepo(teamId: string): Promise<void> {
  const supabase = await getSupabase();

  await requireEntity(getNationalTeamEditRepo, teamId, getNationalTeamLabel());

  const { error } = await supabase
    .from(getNationalTeamTable())
    .delete()
    .eq("id", teamId);

  if (error) throw error;
}
