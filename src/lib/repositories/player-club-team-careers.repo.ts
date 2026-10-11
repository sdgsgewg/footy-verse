import { createClient } from "@/utils/supabase/server";

import { ENTITY_CONFIG } from "@/config/entities";
import { requireEntity } from "./helpers/require-entity";
import {
  DbPlayerClubTeamCareerDetailRow,
  DbPlayerClubTeamCareerListRow,
  PlayerClubTeamCareerCreateInput,
  PlayerClubTeamCareerDetailResponse,
  PlayerClubTeamCareerEditResponse,
  PlayerClubTeamCareerListItem,
  PlayerClubTeamCareerLookupResponse,
  PlayerClubTeamCareerUpdateInput,
} from "@/types/player-club-team-career";
import {
  mapPlayerClubTeamCareerDetailResponse,
  mapPlayerClubTeamCareerEditResponse,
  mapPlayerClubTeamCareerListItem,
} from "../player-club-team-careers/mapper";

import { deletePlayerCareerRepo } from "./player-careers.repo";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["playerClubTeamCareer"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["playerClubTeamCareer"]["table"];
};

function getPlayerClubTeamCareersBaseQuery() {
  return `
    id,

    club_team:club_teams (
      id,
      squad_type,
      age_group,

      club: clubs (
        id,
        short_name,
        image
      )
    ),

    player_career:player_careers!player_club_team_careers_player_career_id_fkey!inner (
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
 * @returns PlayerClubTeamCareerListItem[]
 */
export async function getPlayerClubTeamCareersRepo(
  playerId: string,
): Promise<PlayerClubTeamCareerListItem[]> {
  const supabase = await getSupabase();

  const query = supabase
    .from(getTable())
    .select(getPlayerClubTeamCareersBaseQuery())
    .eq("player_career.player_id", playerId);

  const { data, error } =
    await query.overrideTypes<DbPlayerClubTeamCareerListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  const sortedData = [...data].sort((a, b) => {
    const dateA = a.player_career?.joined_at ?? "";
    const dateB = b.player_career?.joined_at ?? "";

    return dateB.localeCompare(dateA);
  });

  return sortedData.map(mapPlayerClubTeamCareerListItem);
}

function getPlayerClubTeamCareerDetailBaseQuery() {
  return `
    *,

    club_team:club_teams (
      id,
      squad_type,
      age_group,

      club: clubs (
        id,
        short_name,
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
    ),

    player_contracts (
      id,
      salary,
      contract_start,
      contract_end
    ),

    player_transfer:player_transfers (
        *,

        from_club_team:club_teams!transfers_from_club_team_id_fkey (
          id,
          squad_type,
          age_group,

          club:clubs!club_teams_club_id_fkey (
            id,
            short_name,
            image
          )
        ),

        to_club_team:club_teams!transfers_to_club_team_id_fkey (
          id,
          squad_type,
          age_group,

          club:clubs!club_teams_club_id_fkey (
            id,
            short_name,
            image
          )
        )
    )
  `;
}

/**
 *
 * @param playerClubTeamCareerId
 * @returns PlayerClubTeamCareerEditResponse | null
 */
export async function getPlayerClubTeamCareerEditRepo(
  playerClubTeamCareerId: string,
): Promise<PlayerClubTeamCareerEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getPlayerClubTeamCareerDetailBaseQuery())
    .eq("id", playerClubTeamCareerId)
    .maybeSingle()
    .overrideTypes<DbPlayerClubTeamCareerDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerClubTeamCareerEditResponse(data);
}

/**
 *
 * @param playerClubTeamCareerId
 * @returns PlayerClubTeamCareerDetailResponse | null
 */
export async function getPlayerClubTeamCareerDetailRepo(
  playerClubTeamCareerId: string,
): Promise<PlayerClubTeamCareerDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getPlayerClubTeamCareerDetailBaseQuery())
    .eq("id", playerClubTeamCareerId)
    .maybeSingle()
    .overrideTypes<DbPlayerClubTeamCareerDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerClubTeamCareerDetailResponse(data);
}

/**
 *
 * @param playerClubTeamCareerId
 * @returns PlayerClubTeamCareerDetailResponse | null
 */
export async function getPlayerClubTeamCareerLookupRepo(
  playerClubTeamCareerId: string,
): Promise<PlayerClubTeamCareerLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(`id`)
    .eq("id", playerClubTeamCareerId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data;
}

/**
 * Create Player Club Team Career via Transaction RPC
 */
export async function createPlayerClubTeamCareerRepo(
  playerId: string,
  playerClubTeamCareer: PlayerClubTeamCareerCreateInput,
): Promise<PlayerClubTeamCareerDetailResponse> {
  const supabase = await getSupabase();

  const { club_team_id, career, contracts, shirt_numbers, transfer } =
    playerClubTeamCareer;

  // Jalankan semua operasi dalam 1 transaksi atomik di database
  const { data: createdId, error } = await supabase.rpc(
    "create_player_club_team_career_trx",
    {
      p_player_id: playerId,
      p_club_team_id: club_team_id,
      p_career: career,
      p_shirt_numbers: shirt_numbers ?? [],
      p_contracts: contracts ?? [],
      p_transfer: transfer ?? null,
    },
  );

  if (error) throw error;

  const result = await getPlayerClubTeamCareerDetailRepo(createdId);
  if (!result) {
    throw new Error("Failed to retrieve created player club career");
  }

  return result;
}

/**
 * Update Player Club Team Career via Transaction RPC
 */
export async function updatePlayerClubTeamCareerRepo(
  playerClubTeamCareerId: string,
  playerId: string,
  playerClubTeamCareer: PlayerClubTeamCareerUpdateInput,
): Promise<PlayerClubTeamCareerDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(
    getPlayerClubTeamCareerDetailRepo,
    playerClubTeamCareerId,
    getLabel(),
  );

  const { club_team_id, career, contracts, shirt_numbers, transfer } =
    playerClubTeamCareer;

  // Jalankan semua update & replace secara atomik di database
  const { data: updatedId, error } = await supabase.rpc(
    "update_player_club_team_career_trx",
    {
      p_player_club_team_career_id: playerClubTeamCareerId,
      p_player_id: playerId,
      p_club_team_id: club_team_id,
      p_career: career,
      p_shirt_numbers: shirt_numbers ?? [],
      p_contracts: contracts ?? [],
      p_transfer: transfer ?? null,
    },
  );

  if (error) throw error;

  const result = await getPlayerClubTeamCareerDetailRepo(updatedId);
  if (!result) {
    throw new Error("Failed to retrieve updated player club career");
  }

  return result;
}

/**
 *
 * @param playerClubTeamCareerId
 */
export async function deletePlayerClubTeamCareerRepo(
  playerClubTeamCareerId: string,
): Promise<void> {
  const result = await requireEntity(
    getPlayerClubTeamCareerDetailRepo,
    playerClubTeamCareerId,
    getLabel(),
  );

  const { career } = result;

  await deletePlayerCareerRepo(career.id);
}
