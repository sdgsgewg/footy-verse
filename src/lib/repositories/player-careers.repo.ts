import { createClient } from "@/utils/supabase/server";
import {
  DbPlayerCareerListRow,
  PlayerCareerDetailResponse,
  PlayerCareerListItem,
  PlayerCareerUpdateInput,
  PlayerContractCreateInput,
  PlayerShirtNumberCreateInput,
  TransferCreateInput,
} from "@/types/player-career";
import {
  mapPlayerCareerDetailResponse,
  mapPlayerCareerListItem,
} from "../player-careers/mapper";
import { PlayerCareerCreateInput } from "@/types/player";

async function getSupabase() {
  return createClient();
}

export async function getPlayerCareersRepo(
  playerId: string,
): Promise<PlayerCareerListItem[]> {
  const supabase = await getSupabase();

  const query = supabase
    .from("player_careers")
    .select(
      `
        id,
        joined_at,
        left_at,

        club (
        id,
        name,
        image
        ),
    `,
    )
    .eq("player_id", playerId)
    .order("joined_at");

  const { data, error } = await query.overrideTypes<DbPlayerCareerListRow[]>();

  if (error) throw error;

  return (data ?? []).map(mapPlayerCareerListItem);
}

export async function getPlayerCareerByIdRepo(
  id: string,
): Promise<PlayerCareerDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from("player_careers")
    .select(
      `
        *,
        player_contracts(*),
        player_shirt_numbers(*),
        transfer(
            *,
            from_club:clubs(*),
            to_club:clubs(*),
            season:seasons(*)
        )
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerCareerDetailResponse(data);
}

async function insertPlayerContracts(
  playerCareerId: string,
  playerContracts: PlayerContractCreateInput[],
) {
  const supabase = await getSupabase();

  const playerContractInserts = playerContracts.map((pc) => ({
    player_career_id: playerCareerId,
    contract_start: pc.contract_start,
    contract_end: pc.contract_start,
    salary: pc.salary,
  }));

  const { error: playerContractError } = await supabase
    .from("player_contracts")
    .insert(playerContractInserts);
  if (playerContractError) throw playerContractError;
}

async function insertPlayerShirtNumbers(
  playerCareerId: string,
  playerShirtNumbers: PlayerShirtNumberCreateInput[],
) {
  const supabase = await getSupabase();

  const playerShirtNumberInserts = playerShirtNumbers.map((psn) => ({
    player_career_id: playerCareerId,
    start_date: psn.start_date,
    end_date: psn.end_date,
    shirt_number: psn.shirt_number,
  }));
  const { error: playerShirtNumberError } = await supabase
    .from("player_shirt_numbers")
    .insert(playerShirtNumberInserts);
  if (playerShirtNumberError) throw playerShirtNumberError;
}

async function insertTransfer(
  playerCareerId: string,
  transfer: TransferCreateInput,
) {
  const supabase = await getSupabase();

  const transferInsert = {
    player_career_id: playerCareerId,
    from_club_id: transfer.from_club_id,
    to_club_id: transfer.to_club_id,
    season_id: transfer.season_id,
    transfer_date: transfer.transfer_date,
    transfer_fee: transfer.transfer_fee,
    transfer_type: transfer.transfer_type,
  };
  const { error: transferError } = await supabase
    .from("transfers")
    .insert(transferInsert);
  if (transferError) throw transferError;
}

export async function createPlayerCareerRepo(
  playerId: string,
  playerCareer: PlayerCareerCreateInput,
): Promise<PlayerCareerDetailResponse> {
  const supabase = await getSupabase();

  const { contracts, shirt_numbers, transfer, ...rest } = playerCareer;

  const { data: insertedPlayerCareer, error: playerCareerError } =
    await supabase
      .from("player_careers")
      .insert({
        ...rest,
        player_id: playerId,
      })
      .select("id")
      .single();

  if (playerCareerError) throw playerCareerError;

  //  Insert player contracts (table player_contracts)
  if (contracts && contracts.length > 0) {
    insertPlayerContracts(insertedPlayerCareer.id, contracts);
  }

  //  Insert player shirt numbers (table player_shirt_numbers)
  if (shirt_numbers && shirt_numbers.length > 0) {
    insertPlayerShirtNumbers(insertedPlayerCareer.id, shirt_numbers);
  }

  //  Insert transfer (table transfers)
  if (transfer) {
    insertTransfer(insertedPlayerCareer.id, transfer);
  }

  const result = await getPlayerCareerByIdRepo(insertedPlayerCareer.id);
  if (!result) {
    throw new Error("Failed to retrieve created player career");
  }

  return result;
}

export async function updatePlayerCareerRepo(
  id: string,
  playerId: string,
  playerCareer: PlayerCareerUpdateInput,
): Promise<PlayerCareerDetailResponse> {
  const supabase = await getSupabase();
  const oldPlayerCareer = await getPlayerCareerByIdRepo(id);

  if (!oldPlayerCareer) {
    throw new Error("Player career not found");
  }

  const { contracts, shirt_numbers, transfer, ...rest } = playerCareer;

  const { error: playerCareerError } = await supabase
    .from("player_careers")
    .update({
      ...rest,
      player_id: playerId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (playerCareerError) throw playerCareerError;

  // Contracts: Delete existing contracts and insert new ones

  const { error: deleteContractError } = await supabase
    .from("player_contracts")
    .delete()
    .eq("player_career_id", id);
  if (deleteContractError) throw deleteContractError;

  if (contracts && contracts.length > 0) {
    insertPlayerContracts(id, contracts);
  }

  // Shirt Numbers : Delete existing shirt numbers and insert new ones

  const { error: deleteShirtNumberError } = await supabase
    .from("player_shirt_numbers")
    .delete()
    .eq("player_career_id", id);
  if (deleteShirtNumberError) throw deleteShirtNumberError;

  if (shirt_numbers && shirt_numbers.length > 0) {
    insertPlayerShirtNumbers(id, shirt_numbers);
  }

  // Transfer : Delete existing transfer and insert new one

  const { error: deleteTransferError } = await supabase
    .from("transfers")
    .delete()
    .eq("player_career_id", id);
  if (deleteTransferError) throw deleteTransferError;

  if (transfer) {
    insertTransfer(id, transfer);
  }

  const result = await getPlayerCareerByIdRepo(id);
  if (!result) {
    throw new Error("Failed to retrieve updated player career");
  }

  return result;
}

export async function deletePlayerCareerRepo(id: string): Promise<void> {
  const supabase = await getSupabase();

  const oldPlayerCareer = await getPlayerCareerByIdRepo(id);

  if (!oldPlayerCareer) {
    throw new Error("Player career not found");
  }

  const { error: deleteContractError } = await supabase
    .from("player_contracts")
    .delete()
    .eq("player_career_id", id);
  if (deleteContractError) throw deleteContractError;

  const { error: deleteShirtNumberError } = await supabase
    .from("player_shirt_numbers")
    .delete()
    .eq("player_career_id", id);
  if (deleteShirtNumberError) throw deleteShirtNumberError;

  const { error: deleteTransferError } = await supabase
    .from("transfers")
    .delete()
    .eq("player_career_id", id);
  if (deleteTransferError) throw deleteTransferError;

  const { error: deletePlayerCareerError } = await supabase
    .from("player_careers")
    .delete()
    .eq("id", id);

  if (deletePlayerCareerError) throw deletePlayerCareerError;
}
