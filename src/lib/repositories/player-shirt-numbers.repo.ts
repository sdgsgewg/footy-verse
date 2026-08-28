import { ENTITY_CONFIG } from "@/config/entities";
import {
  DbPlayerClubTeamShirtNumberListRow,
  DbPlayerNationalTeamShirtNumberListRow,
  PlayerClubTeamShirtNumberListItem,
  PlayerNationalTeamShirtNumberListItem,
  PlayerShirtNumberCreateInput,
  PlayerShirtNumberFilter,
} from "@/types/player-shirt-number";
import { createClient } from "@/utils/supabase/server";
import {
  mapPlayerClubTeamShirtNumberListItem,
  mapPlayerNationalTeamShirtNumberListItem,
} from "../player-shirt-numbers/mapper";

const getTable = () => {
  return ENTITY_CONFIG["playerShirtNumber"]["table"];
};

async function getSupabase() {
  return createClient();
}

function getPlayerClubTeamShirtNumbersBaseQuery() {
  return `
    *,

    player_career:player_careers!player_shirt_numbers_player_career_id_fkey!inner (
      player_id,

      player_club_team_career:player_club_team_careers!player_club_team_careers_player_career_id_fkey!inner (
        club_team:club_teams!player_club_team_careers_club_team_id_fkey (
          id,
          squad_type,
          age_group,

          club:clubs!club_teams_club_id_fkey (
            id,
            name,
            image
          )
        )
      )
    )
  `;
}

export async function getPlayerClubShirtNumbersRepo(
  playerId: string,
  params: PlayerShirtNumberFilter,
): Promise<PlayerClubTeamShirtNumberListItem[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from(getTable())
    .select(getPlayerClubTeamShirtNumbersBaseQuery(), {
      count: "exact",
    });

  // Filter

  query = query.eq("player_career.player_id", playerId);

  // Sort

  query = query.order(params.sortBy, {
    ascending: params.sortOrder === "asc",
  });

  // Execute

  const { data, error } =
    await query.overrideTypes<DbPlayerClubTeamShirtNumberListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  return data.map(mapPlayerClubTeamShirtNumberListItem);
}

function getPlayerNationalTeamShirtNumbersBaseQuery() {
  return `
    *,

    player_career:player_careers!player_shirt_numbers_player_career_id_fkey!inner (
      player_id,

      player_national_team_career:player_national_team_careers!player_national_team_careers_player_career_id_fkey!inner (
        national_team:national_teams!player_national_team_careers_national_team_id_fkey (
          id,
          gender,
          age_group,
          team_type,

          nation:nationalities!national_teams_nation_id_fkey (
            id,
            name,
            image
          )
        )
      )
    )
  `;
}

export async function getPlayerNationalTeamShirtNumbersRepo(
  playerId: string,
  params: PlayerShirtNumberFilter,
): Promise<PlayerNationalTeamShirtNumberListItem[]> {
  const supabase = await getSupabase();

  let query = supabase
    .from(getTable())
    .select(getPlayerNationalTeamShirtNumbersBaseQuery(), {
      count: "exact",
    });

  // Filter

  query = query.eq("player_career.player_id", playerId);

  // Sort

  query = query.order(params.sortBy, {
    ascending: params.sortOrder === "asc",
  });

  // Execute

  const { data, error } =
    await query.overrideTypes<DbPlayerNationalTeamShirtNumberListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  return data.map(mapPlayerNationalTeamShirtNumberListItem);
}

/**
 *
 * @param playerCareerId
 * @param playerShirtNumbers
 */
export async function createPlayerShirtNumbersRepo(
  playerCareerId: string,
  playerShirtNumbers: PlayerShirtNumberCreateInput[],
) {
  const supabase = await getSupabase();

  const playerShirtNumberInserts: PlayerShirtNumberCreateInput[] =
    playerShirtNumbers.map((psn) => ({
      player_career_id: playerCareerId,
      shirt_number: psn.shirt_number,
      start_date: psn.start_date,
      end_date: psn.end_date,
    }));

  const { error: playerShirtNumberError } = await supabase
    .from(getTable())
    .insert(playerShirtNumberInserts);
  if (playerShirtNumberError) throw playerShirtNumberError;
}

/**
 *
 * @param playerCareerId
 * @param playerShirtNumbers
 */
export async function deletePlayerShirtNumberRepo(playerCareerId: string) {
  const supabase = await getSupabase();

  const { error: deleteShirtNumberError } = await supabase
    .from(getTable())
    .delete()
    .eq("player_career_id", playerCareerId);

  if (deleteShirtNumberError) throw deleteShirtNumberError;
}
