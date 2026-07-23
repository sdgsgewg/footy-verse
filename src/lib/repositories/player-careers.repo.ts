import { createClient } from "@/utils/supabase/server";
import {
  DbPlayerCareerDetailRow,
  DbPlayerCareerListRow,
  PlayerCareerDetailResponse,
  PlayerCareerEditResponse,
  PlayerCareerListItem,
  PlayerCareerLookupResponse,
  PlayerCareerUpdateInput,
  PlayerContractCreateInput,
  PlayerShirtNumberCreateInput,
  TransferCreateInput,
} from "@/types/player-career";
import {
  mapPlayerCareerDetailResponse,
  mapPlayerCareerEditResponse,
  mapPlayerCareerListItem,
} from "../player-careers/mapper";
import { PlayerCareerCreateInput } from "@/types/player";
import { ENTITY_CONFIG } from "@/config/entities";
import { requireEntity } from "./helpers/require-entity";

async function getSupabase() {
  return createClient();
}

const getPlayerCareerLabel = () => {
  return ENTITY_CONFIG["playerCareer"]["label"];
};

const getPlayerCareerTable = () => {
  return ENTITY_CONFIG["playerCareer"]["table"];
};

const getPlayerContractTable = () => {
  return ENTITY_CONFIG["playerContract"]["table"];
};

const getPlayerShirtNumberTable = () => {
  return ENTITY_CONFIG["playerShirtNumber"]["table"];
};

const getTransferTable = () => {
  return ENTITY_CONFIG["transfer"]["table"];
};

function getPlayerCareersBaseQuery() {
  return `
    id,
    joined_at,
    left_at,

    clubTeam:club_teams (
      id,
      squad_type,
      age_group,
      club: clubs (
        id,
        name,
        image
      )
    )
  `;
}

/**
 *
 * @param playerId
 * @returns PlayerCareerListItem[]
 */
export async function getPlayerCareersRepo(
  playerId: string,
): Promise<PlayerCareerListItem[]> {
  const supabase = await getSupabase();

  const query = supabase
    .from(getPlayerCareerTable())
    .select(getPlayerCareersBaseQuery())
    .eq("player_id", playerId)
    .order("joined_at");

  const { data, error } = await query.overrideTypes<DbPlayerCareerListRow[]>();

  if (error) throw error;

  return (data ?? []).map(mapPlayerCareerListItem);
}

function getPlayerCareerDetailBaseQuery() {
  return `
    *,
    player_contracts(*),
    player_shirt_numbers(*),
    transfer:transfers(
        *,
        from_club_team:club_teams!transfers_from_club_team_id_fkey(*),
        to_club_team:club_teams!transfers_to_club_team_id_fkey(*),
        season:seasons!transfers_season_id_fkey(*)
    )
  `;
}

/**
 *
 * @param careerId
 * @returns PlayerCareerEditResponse | null
 */
export async function getPlayerCareerEditRepo(
  careerId: string,
): Promise<PlayerCareerEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPlayerCareerTable())
    .select(getPlayerCareerDetailBaseQuery())
    .eq("id", careerId)
    .maybeSingle()
    .overrideTypes<DbPlayerCareerDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerCareerEditResponse(data);
}

/**
 *
 * @param careerId
 * @returns PlayerCareerDetailResponse | null
 */
export async function getPlayerCareerDetailRepo(
  careerId: string,
): Promise<PlayerCareerDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPlayerCareerTable())
    .select(getPlayerCareerDetailBaseQuery())
    .eq("id", careerId)
    .maybeSingle()
    .overrideTypes<DbPlayerCareerDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerCareerDetailResponse(data);
}

/**
 *
 * @param careerId
 * @returns PlayerCareerDetailResponse | null
 */
export async function getPlayerCareerLookupRepo(
  careerId: string,
): Promise<PlayerCareerLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getPlayerCareerTable())
    .select(`id`)
    .eq("id", careerId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  return data;
}

/**
 *
 * @param playerCareerId
 * @param playerContracts
 */
async function insertPlayerContracts(
  playerCareerId: string,
  playerContracts: PlayerContractCreateInput[],
) {
  const supabase = await getSupabase();

  const playerContractInserts: PlayerContractCreateInput[] =
    playerContracts.map((pc) => ({
      player_career_id: playerCareerId,
      contract_start: pc.contract_start,
      contract_end: pc.contract_end,
      salary: pc.salary,
    }));

  const { error: playerContractError } = await supabase
    .from(getPlayerContractTable())
    .insert(playerContractInserts);
  if (playerContractError) throw playerContractError;
}

/**
 *
 * @param playerCareerId
 * @param playerShirtNumbers
 */
async function insertPlayerShirtNumbers(
  playerCareerId: string,
  playerShirtNumbers: PlayerShirtNumberCreateInput[],
) {
  const supabase = await getSupabase();

  const playerShirtNumberInserts: PlayerShirtNumberCreateInput[] =
    playerShirtNumbers.map((psn) => ({
      player_career_id: playerCareerId,
      start_date: psn.start_date,
      end_date: psn.end_date,
      shirt_number: psn.shirt_number,
    }));
  const { error: playerShirtNumberError } = await supabase
    .from(getPlayerShirtNumberTable())
    .insert(playerShirtNumberInserts);
  if (playerShirtNumberError) throw playerShirtNumberError;
}

/**
 *
 * @param playerCareerId
 * @param transfer
 */
async function insertTransfer(
  playerCareerId: string,
  transfer: TransferCreateInput,
) {
  const supabase = await getSupabase();

  const transferInsert = {
    player_career_id: playerCareerId,
    from_club_team_id: transfer.from_club_team_id,
    to_club_team_id: transfer.to_club_team_id,
    season_id: transfer.season_id,
    transfer_date: transfer.transfer_date,
    transfer_fee: transfer.transfer_fee,
    transfer_type: transfer.transfer_type,
  };
  const { error: transferError } = await supabase
    .from(getTransferTable())
    .insert(transferInsert);
  if (transferError) throw transferError;
}

/**
 *
 * @param playerId
 * @param playerCareer
 * @returns PlayerCareerDetailResponse
 */
export async function createPlayerCareerRepo(
  playerId: string,
  playerCareer: PlayerCareerCreateInput,
): Promise<PlayerCareerDetailResponse> {
  const supabase = await getSupabase();

  const { contracts, shirt_numbers, transfer, ...rest } = playerCareer;

  const { data: insertedPlayerCareer, error: playerCareerError } =
    await supabase
      .from(getPlayerCareerTable())
      .insert({
        ...rest,
        player_id: playerId,
      })
      .select("id")
      .single();

  if (playerCareerError) throw playerCareerError;

  //  Insert player contracts (table player_contracts)
  if (contracts && contracts.length > 0) {
    await insertPlayerContracts(insertedPlayerCareer.id, contracts);
  }

  //  Insert player shirt numbers (table player_shirt_numbers)
  if (shirt_numbers && shirt_numbers.length > 0) {
    await insertPlayerShirtNumbers(insertedPlayerCareer.id, shirt_numbers);
  }

  //  Insert transfer (table transfers)
  if (transfer) {
    await insertTransfer(insertedPlayerCareer.id, transfer);
  }

  const result = await getPlayerCareerDetailRepo(insertedPlayerCareer.id);
  if (!result) {
    throw new Error("Failed to retrieve created player career");
  }

  return result;
}

/**
 *
 * @param careerId
 * @param playerId
 * @param playerCareer
 * @returns PlayerCareerDetailResponse
 */
export async function updatePlayerCareerRepo(
  careerId: string,
  playerId: string,
  playerCareer: PlayerCareerUpdateInput,
): Promise<PlayerCareerDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(
    getPlayerCareerDetailRepo,
    careerId,
    getPlayerCareerLabel(),
  );

  const { contracts, shirt_numbers, transfer, ...rest } = playerCareer;

  const { error: playerCareerError } = await supabase
    .from(getPlayerCareerTable())
    .update({
      ...rest,
      player_id: playerId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", careerId);

  if (playerCareerError) throw playerCareerError;

  // Contracts: Delete existing contracts and insert new ones

  const { error: deleteContractError } = await supabase
    .from(getPlayerContractTable())
    .delete()
    .eq("player_career_id", careerId);
  if (deleteContractError) throw deleteContractError;

  if (contracts && contracts.length > 0) {
    await insertPlayerContracts(careerId, contracts);
  }

  // Shirt Numbers : Delete existing shirt numbers and insert new ones

  const { error: deleteShirtNumberError } = await supabase
    .from(getPlayerShirtNumberTable())
    .delete()
    .eq("player_career_id", careerId);
  if (deleteShirtNumberError) throw deleteShirtNumberError;

  if (shirt_numbers && shirt_numbers.length > 0) {
    await insertPlayerShirtNumbers(careerId, shirt_numbers);
  }

  // Transfer : Delete existing transfer and insert new one

  const { error: deleteTransferError } = await supabase
    .from(getTransferTable())
    .delete()
    .eq("player_career_id", careerId);
  if (deleteTransferError) throw deleteTransferError;

  if (transfer) {
    await insertTransfer(careerId, transfer);
  }

  const result = await getPlayerCareerDetailRepo(careerId);
  if (!result) {
    throw new Error("Failed to retrieve updated player career");
  }

  return result;
}

/**
 *
 * @param careerId
 */
export async function deletePlayerCareerRepo(careerId: string): Promise<void> {
  const supabase = await getSupabase();

  await requireEntity(
    getPlayerCareerDetailRepo,
    careerId,
    getPlayerCareerLabel(),
  );

  const { error: deleteContractError } = await supabase
    .from(getPlayerContractTable())
    .delete()
    .eq("player_career_id", careerId);
  if (deleteContractError) throw deleteContractError;

  const { error: deleteShirtNumberError } = await supabase
    .from(getPlayerShirtNumberTable())
    .delete()
    .eq("player_career_id", careerId);
  if (deleteShirtNumberError) throw deleteShirtNumberError;

  const { error: deleteTransferError } = await supabase
    .from(getTransferTable())
    .delete()
    .eq("player_career_id", careerId);
  if (deleteTransferError) throw deleteTransferError;

  const { error: deletePlayerCareerError } = await supabase
    .from(getPlayerCareerTable())
    .delete()
    .eq("id", careerId);

  if (deletePlayerCareerError) throw deletePlayerCareerError;
}
