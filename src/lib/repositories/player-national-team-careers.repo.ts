import { createClient } from "@/utils/supabase/server";
import { ENTITY_CONFIG } from "@/config/entities";
import { requireEntity } from "./helpers/require-entity";
import {
  DbPlayerNationalTeamCareerDetailRow,
  DbPlayerNationalTeamCareerListRow,
  PlayerNationalTeamCareerCreateInput,
  PlayerNationalTeamCareerDetailResponse,
  PlayerNationalTeamCareerEditResponse,
  PlayerNationalTeamCareerListItem,
  PlayerNationalTeamCareerLookupResponse,
  PlayerNationalTeamCareerUpdateInput,
} from "@/types/player-national-team-career";
import {
  mapPlayerNationalTeamCareerDetailResponse,
  mapPlayerNationalTeamCareerEditResponse,
  mapPlayerNationalTeamCareerListItem,
} from "../player-national-team-careers/mapper";
import { deletePlayerCareerRepo } from "./player-careers.repo";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["playerNationalTeamCareer"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["playerNationalTeamCareer"]["table"];
};

function getPlayerNationalTeamCareersBaseQuery() {
  return `
    id,

    national_team:national_teams (
      id,
      gender,
      age_group,
      team_type,

      nation:nationalities (
        id,
        name,
        image
      )
    ),
    
    player_career:player_careers!player_national_team_careers_player_career_id_fkey!inner (
      id,
      player_id,
      joined_at,
      left_at
    )
  `;
}

/**
 *
 * @param playerId
 * @returns PlayerNationalTeamCareerListItem[]
 */
export async function getPlayerNationalTeamCareersRepo(
  playerId: string,
): Promise<PlayerNationalTeamCareerListItem[]> {
  const supabase = await getSupabase();

  const query = supabase
    .from(getTable())
    .select(getPlayerNationalTeamCareersBaseQuery())
    .eq("player_career.player_id", playerId);

  const { data, error } =
    await query.overrideTypes<DbPlayerNationalTeamCareerListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  const sortedData = [...data].sort((a, b) => {
    const dateA = a.player_career?.joined_at ?? "";
    const dateB = b.player_career?.joined_at ?? "";

    return dateB.localeCompare(dateA);
  });

  return sortedData.map(mapPlayerNationalTeamCareerListItem);
}

function getPlayerNationalTeamCareerDetailBaseQuery() {
  return `
    *,

    national_team:national_teams (
      id,
      gender,
      age_group,
      team_type,

      nation:nationalities (
        id,
        name,
        image
      )
    ),

    player_career: player_careers (
      id,
      player_id,
      joined_at,
      left_at,
      career_type,

      player_shirt_numbers(
        id,
        shirt_number,
        start_date,
        end_date
      )
    )
  `;
}

/**
 *
 * @param playerNationalTeamCareerId
 * @returns PlayerNationalTeamCareerEditResponse | null
 */
export async function getPlayerNationalTeamCareerEditRepo(
  playerNationalTeamCareerId: string,
): Promise<PlayerNationalTeamCareerEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getPlayerNationalTeamCareerDetailBaseQuery())
    .eq("id", playerNationalTeamCareerId)
    .maybeSingle()
    .overrideTypes<DbPlayerNationalTeamCareerDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerNationalTeamCareerEditResponse(data);
}

/**
 *
 * @param playerNationalTeamCareerId
 * @returns PlayerNationalTeamCareerDetailResponse | null
 */
export async function getPlayerNationalTeamCareerDetailRepo(
  playerNationalTeamCareerId: string,
): Promise<PlayerNationalTeamCareerDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getPlayerNationalTeamCareerDetailBaseQuery())
    .eq("id", playerNationalTeamCareerId)
    .maybeSingle()
    .overrideTypes<DbPlayerNationalTeamCareerDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerNationalTeamCareerDetailResponse(data);
}

/**
 *
 * @param playerNationalTeamCareerId
 * @returns PlayerNationalTeamCareerDetailResponse | null
 */
export async function getPlayerNationalTeamCareerLookupRepo(
  playerNationalTeamCareerId: string,
): Promise<PlayerNationalTeamCareerLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(`id`)
    .eq("id", playerNationalTeamCareerId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  return data;
}

/**
 * Create Player National Team Careers via Transaction RPC
 * Menginsert seluruh array dalam 1 transaksi atomik
 */
export async function createPlayerNationalTeamCareerRepo(
  playerId: string,
  playerNationalTeamCareers: PlayerNationalTeamCareerCreateInput,
): Promise<void> {
  const supabase = await getSupabase();

  const { error } = await supabase.rpc(
    "create_player_national_team_careers_trx",
    {
      p_player_id: playerId,
      p_careers: playerNationalTeamCareers,
    },
  );

  if (error) throw error;
}

/**
 * Update Player National Team Career via Transaction RPC
 */
export async function updatePlayerNationalTeamCareerRepo(
  playerNationalTeamCareerId: string,
  playerId: string,
  playerNationalTeamCareer: PlayerNationalTeamCareerUpdateInput,
): Promise<PlayerNationalTeamCareerDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(
    getPlayerNationalTeamCareerDetailRepo,
    playerNationalTeamCareerId,
    getLabel(),
  );

  const { national_team_id, career, shirt_numbers } = playerNationalTeamCareer;

  const { data: updatedId, error } = await supabase.rpc(
    "update_player_national_team_career_trx",
    {
      p_player_national_team_career_id: playerNationalTeamCareerId,
      p_player_id: playerId,
      p_national_team_id: national_team_id,
      p_career: career,
      p_shirt_numbers: shirt_numbers ?? [],
    },
  );

  if (error) throw error;

  const result = await getPlayerNationalTeamCareerDetailRepo(updatedId);
  if (!result) {
    throw new Error("Failed to retrieve updated player national team career");
  }

  return result;
}

/**
 *
 * @param playerNationalTeamCareerId
 */
export async function deletePlayerNationalTeamCareerRepo(
  playerNationalTeamCareerId: string,
): Promise<void> {
  const result = await requireEntity(
    getPlayerNationalTeamCareerDetailRepo,
    playerNationalTeamCareerId,
    getLabel(),
  );

  const { career } = result;

  await deletePlayerCareerRepo(career.id);
}
