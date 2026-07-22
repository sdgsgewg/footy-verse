import { createClient } from "@/utils/supabase/server";
import { ENTITY_CONFIG } from "@/config/entities";
import { requireEntity } from "./helpers/require-entity";
import {
  DbPlayerNationalTeamDetailRow,
  DbPlayerNationalTeamListRow,
  PlayerNationalTeamDetailResponse,
  PlayerNationalTeamEditResponse,
  PlayerNationalTeamListItem,
  PlayerNationalTeamLookupResponse,
  PlayerNationalTeamUpdateInput,
} from "@/types/player-national-teams";
import {
  mapPlayerNationalTeamDetailResponse,
  mapPlayerNationalTeamEditResponse,
  mapPlayerNationalTeamListItem,
} from "../player-national-teams/mapper";
import { PlayerNationalTeamCreateInput } from "@/types/player";

async function getSupabase() {
  return createClient();
}

const getPlayerNationalTeamLabel = () => {
  return ENTITY_CONFIG["playerNationalTeam"]["label"];
};

const getPlayerNationalTeamTable = () => {
  return ENTITY_CONFIG["playerNationalTeam"]["table"];
};

function getPlayerNationalTeamsBaseQuery() {
  return `
    id,
    label,
    shirt_number,
    start_date,
    end_date,

    nationality:nationalities (
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param playerId
 * @returns PlayerNationalTeamListItem[]
 */
export async function getPlayerNationalTeamsRepo(
  playerId: string,
): Promise<PlayerNationalTeamListItem[]> {
  const supabase = await getSupabase();

  const query = supabase
    .from(getPlayerNationalTeamTable())
    .select(getPlayerNationalTeamsBaseQuery())
    .eq("player_id", playerId)
    .order("start_date");

  const { data, error } =
    await query.overrideTypes<DbPlayerNationalTeamListRow[]>();

  if (error) throw error;

  return (data ?? []).map(mapPlayerNationalTeamListItem);
}

function getPlayerNationalTeamDetailBaseQuery() {
  return `
    *,

    nationality:nationalities (
      id,
      name,
      image
    )
  `;
}

/**
 *
 * @param nationalTeamId
 * @returns PlayerNationalTeamEditResponse | null
 */
export async function getPlayerNationalTeamEditRepo(
  nationalTeamId: string,
): Promise<PlayerNationalTeamEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPlayerNationalTeamTable())
    .select(getPlayerNationalTeamDetailBaseQuery())
    .eq("id", nationalTeamId)
    .maybeSingle()
    .overrideTypes<DbPlayerNationalTeamDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerNationalTeamEditResponse(data);
}

/**
 *
 * @param nationalTeamId
 * @returns PlayerNationalTeamDetailResponse | null
 */
export async function getPlayerNationalTeamDetailRepo(
  nationalTeamId: string,
): Promise<PlayerNationalTeamDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPlayerNationalTeamTable())
    .select(getPlayerNationalTeamDetailBaseQuery())
    .eq("id", nationalTeamId)
    .maybeSingle()
    .overrideTypes<DbPlayerNationalTeamDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerNationalTeamDetailResponse(data);
}

/**
 *
 * @param nationalTeamId
 * @returns PlayerNationalTeamDetailResponse | null
 */
export async function getPlayerNationalTeamLookupRepo(
  nationalTeamId: string,
): Promise<PlayerNationalTeamLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPlayerNationalTeamTable())
    .select(`id`)
    .eq("id", nationalTeamId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  return data;
}

/**
 *
 * @param playerId
 * @param playerNationalTeam
 * @returns void
 */
export async function createPlayerNationalTeamRepo(
  playerId: string,
  playerNationalTeams: PlayerNationalTeamCreateInput,
): Promise<void> {
  const supabase = await getSupabase();

  const playerNationalTeamInserts = playerNationalTeams.map((pnt) => ({
    player_id: playerId,
    nation_id: pnt.nation_id,
    label: pnt.label,
    start_date: pnt.start_date,
    end_date: pnt.end_date || null,
    shirt_number: pnt.shirt_number,
  }));

  const { error: playerNationalTeamError } = await supabase
    .from(getPlayerNationalTeamTable())
    .insert(playerNationalTeamInserts);
  if (playerNationalTeamError) throw playerNationalTeamError;
}

/**
 *
 * @param nationalTeamId
 * @param playerId
 * @param playerNationalTeam
 * @returns PlayerNationalTeamDetailResponse
 */
export async function updatePlayerNationalTeamRepo(
  nationalTeamId: string,
  playerId: string,
  playerNationalTeam: PlayerNationalTeamUpdateInput,
): Promise<PlayerNationalTeamDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(
    getPlayerNationalTeamDetailRepo,
    nationalTeamId,
    getPlayerNationalTeamLabel(),
  );

  const { ...rest } = playerNationalTeam;

  const { error: playerNationalTeamError } = await supabase
    .from(getPlayerNationalTeamTable())
    .update({
      ...rest,
      player_id: playerId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", nationalTeamId);

  if (playerNationalTeamError) throw playerNationalTeamError;

  const result = await getPlayerNationalTeamDetailRepo(nationalTeamId);
  if (!result) {
    throw new Error("Failed to retrieve updated player national team");
  }

  return result;
}

/**
 *
 * @param nationalTeamId
 */
export async function deletePlayerNationalTeamRepo(
  nationalTeamId: string,
): Promise<void> {
  const supabase = await getSupabase();

  await requireEntity(
    getPlayerNationalTeamDetailRepo,
    nationalTeamId,
    getPlayerNationalTeamLabel(),
  );

  const { error: deletePlayerNationalTeamError } = await supabase
    .from(getPlayerNationalTeamTable())
    .delete()
    .eq("id", nationalTeamId);

  if (deletePlayerNationalTeamError) throw deletePlayerNationalTeamError;
}
