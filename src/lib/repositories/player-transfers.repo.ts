import { ENTITY_CONFIG } from "@/config/entities";
import {
  DbPlayerTransferDetailRow,
  DbPlayerTransferListRow,
  PlayerTransferCreateInput,
  PlayerTransferDetailResponse,
  PlayerTransferFilter,
  PlayerTransferListItem,
  PlayerTransferUpdateInput,
} from "@/types/player-transfer";
import { createClient } from "@/utils/supabase/server";
import {
  mapPlayerTransferDetailResponse,
  mapPlayerTransferListItem,
} from "../player-transfers/mapper";
import { requireEntity } from "./helpers/require-entity";

const getLabel = () => {
  return ENTITY_CONFIG["playerTransfer"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["playerTransfer"]["table"];
};

async function getSupabase() {
  return createClient();
}

function getPlayerTransfersBaseQuery() {
  return `
    *,

    player_club_career:player_club_careers!inner (
      player_career:player_careers!inner (
        player_id
      )
    ),

    from_club_team:club_teams!transfers_from_club_team_id_fkey (
      id,
      squad_type,
      age_group,

      club:clubs!club_teams_club_id_fkey (
        id,
        name,
        image
      )
    ),

    to_club_team:club_teams!transfers_to_club_team_id_fkey (
      id,
      squad_type,
      age_group,

      club:clubs!club_teams_club_id_fkey (
        id,
        name,
        image
      )
    ),

    season:seasons!transfers_season_id_fkey (
      id,
      name
    )
  `;
}

/**
 *
 * @param params playerId
 * @returns PlayerTransferListItem[]
 */
export async function getPlayerTransfersRepo(
  playerId: string,
  params: PlayerTransferFilter,
): Promise<PlayerTransferListItem[]> {
  const supabase = await getSupabase();

  let query = supabase.from(getTable()).select(getPlayerTransfersBaseQuery(), {
    count: "exact",
  });

  // Filter

  query = query.eq("player_club_career.player_career.player_id", playerId);

  // Sort

  query = query.order(params.sortBy, {
    ascending: params.sortOrder === "asc",
  });

  // Execute

  const { data, error } =
    await query.overrideTypes<DbPlayerTransferListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  return data.map(mapPlayerTransferListItem);
}

function getPlayerTransferDetailBaseQuery() {
  return `
    *,

    from_club_team:club_teams!transfers_from_club_team_id_fkey (
      id,
      squad_type,
      age_group,

      club:clubs!club_teams_club_id_fkey (
        id,
        name,
        image
      )
    ),

    to_club_team:club_teams!transfers_to_club_team_id_fkey (
      id,
      squad_type,
      age_group,

      club:clubs!club_teams_club_id_fkey (
        id,
        name,
        image
      )
    ),

    season:seasons!transfers_season_id_fkey (
      id,
      name
    )
  `;
}

/**
 *
 * @param playerClubCareerId
 * @returns PlayerTransferDetailResponse | null
 */
export async function getPlayerTransferDetailByPlayerClubCareerIdRepo(
  playerClubCareerId: string,
): Promise<PlayerTransferDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getPlayerTransferDetailBaseQuery())
    .eq("player_club_career_id", playerClubCareerId)
    .maybeSingle()
    .overrideTypes<DbPlayerTransferDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerTransferDetailResponse(data);
}

/**
 *
 * @param playerClubCareerId
 * @param transfer
 */
export async function createPlayerTransferRepo(
  playerClubCareerId: string,
  transfer: PlayerTransferCreateInput,
) {
  const supabase = await getSupabase();

  const transferInsert: PlayerTransferCreateInput = {
    player_club_career_id: playerClubCareerId,
    from_club_team_id: transfer.from_club_team_id,
    to_club_team_id: transfer.to_club_team_id,
    season_id: transfer.season_id,
    transfer_date: transfer.transfer_date,
    transfer_fee: transfer.transfer_fee,
    transfer_type: transfer.transfer_type,
  };

  const { error: transferError } = await supabase
    .from(getTable())
    .insert(transferInsert);

  if (transferError) throw transferError;
}

/**
 *
 * @param playerClubCareerId
 * @param playerTransfer
 * @returns PlayerTransferDetailResponse
 */
export async function updatePlayerTransferByPlayerClubCareerIdRepo(
  playerClubCareerId: string,
  playerTransfer: PlayerTransferUpdateInput,
): Promise<PlayerTransferDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(
    getPlayerTransferDetailByPlayerClubCareerIdRepo,
    playerClubCareerId,
    getLabel(),
  );

  const { ...rest } = playerTransfer;

  const { error: playerTransferError } = await supabase
    .from(getTable())
    .update({
      ...rest,
      updated_at: new Date().toISOString(),
    })
    .eq("player_club_career_id", playerClubCareerId);

  if (playerTransferError) throw playerTransferError;

  const result =
    await getPlayerTransferDetailByPlayerClubCareerIdRepo(playerClubCareerId);

  if (!result) {
    throw new Error("Failed to retrieve updated player transfer");
  }

  return result;
}

/**
 *
 * @param playerClubCareerId
 */
export async function deletePlayerTransferRepo(playerClubCareerId: string) {
  const supabase = await getSupabase();

  const { error: deleteTransferError } = await supabase
    .from(getTable())
    .delete()
    .eq("player_club_career_id", playerClubCareerId);

  if (deleteTransferError) throw deleteTransferError;
}
