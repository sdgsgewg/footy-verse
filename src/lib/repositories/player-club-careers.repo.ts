import { createClient } from "@/utils/supabase/server";

import { ENTITY_CONFIG } from "@/config/entities";
import { requireEntity } from "./helpers/require-entity";
import {
  DbPlayerClubCareerDetailRow,
  DbPlayerClubCareerListRow,
  PlayerClubCareerCreateInput,
  PlayerClubCareerDetailResponse,
  PlayerClubCareerEditResponse,
  PlayerClubCareerListItem,
  PlayerClubCareerLookupResponse,
  PlayerClubCareerUpdateInput,
} from "@/types/player-club-career";
import {
  mapPlayerClubCareerDetailResponse,
  mapPlayerClubCareerEditResponse,
  mapPlayerClubCareerListItem,
} from "../player-club-careers/mapper";
import {
  createPlayerShirtNumbersRepo,
  deletePlayerShirtNumberRepo,
} from "./player-shirt-numbers.repo";
import {
  createPlayerCareerRepo,
  deletePlayerCareerRepo,
  updatePlayerCareerRepo,
} from "./player-careers.repo";
import {
  createPlayerContractsRepo,
  deletePlayerContractRepo,
} from "./player-contracts.repo";
import {
  createPlayerTransferRepo,
  deletePlayerTransferRepo,
  updatePlayerTransferByPlayerClubCareerIdRepo,
} from "./player-transfers.repo";
import { CareerType } from "@/enums/CareerType";

async function getSupabase() {
  return createClient();
}

const getLabel = () => {
  return ENTITY_CONFIG["playerClubCareer"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["playerClubCareer"]["table"];
};

function getPlayerClubCareersBaseQuery() {
  return `
    id,

    club_team:club_teams (
      id,
      squad_type,
      age_group,

      club: clubs (
        id,
        name,
        image
      )
    ),

    player_career:player_careers!inner (
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
 * @returns PlayerClubCareerListItem[]
 */
export async function getPlayerClubCareersRepo(
  playerId: string,
): Promise<PlayerClubCareerListItem[]> {
  const supabase = await getSupabase();

  const query = supabase
    .from(getTable())
    .select(getPlayerClubCareersBaseQuery())
    .eq("player_career.player_id", playerId)
    .order("joined_at", {
      referencedTable: "player_career",
      ascending: false,
    });

  const { data, error } =
    await query.overrideTypes<DbPlayerClubCareerListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  return data.map(mapPlayerClubCareerListItem);
}

function getPlayerClubCareerDetailBaseQuery() {
  return `
    *,

    club_team:club_teams (
      id,
      squad_type,
      age_group,

      club: clubs (
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
    )
  `;
}

/**
 *
 * @param playerClubCareerId
 * @returns PlayerClubCareerEditResponse | null
 */
export async function getPlayerClubCareerEditRepo(
  playerClubCareerId: string,
): Promise<PlayerClubCareerEditResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getPlayerClubCareerDetailBaseQuery())
    .eq("id", playerClubCareerId)
    .maybeSingle()
    .overrideTypes<DbPlayerClubCareerDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerClubCareerEditResponse(data);
}

/**
 *
 * @param playerClubCareerId
 * @returns PlayerClubCareerDetailResponse | null
 */
export async function getPlayerClubCareerDetailRepo(
  playerClubCareerId: string,
): Promise<PlayerClubCareerDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(getPlayerClubCareerDetailBaseQuery())
    .eq("id", playerClubCareerId)
    .maybeSingle()
    .overrideTypes<DbPlayerClubCareerDetailRow>();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerClubCareerDetailResponse(data);
}

/**
 *
 * @param playerClubCareerId
 * @returns PlayerClubCareerDetailResponse | null
 */
export async function getPlayerClubCareerLookupRepo(
  playerClubCareerId: string,
): Promise<PlayerClubCareerLookupResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(`id`)
    .eq("id", playerClubCareerId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  return data;
}

/**
 *
 * @param playerId
 * @param playerClubCareer
 * @returns PlayerClubCareerDetailResponse
 */
export async function createPlayerClubCareerRepo(
  playerId: string,
  playerClubCareer: PlayerClubCareerCreateInput,
): Promise<PlayerClubCareerDetailResponse> {
  const supabase = await getSupabase();

  const { club_team_id, career, contracts, shirt_numbers, transfer } =
    playerClubCareer;

  //  Insert player career (table player_careers)

  const insertedPlayerCareer = await createPlayerCareerRepo(
    playerId,
    career,
    CareerType.CLUB,
  );

  //  Insert player club career (table player_club_careers)

  const { data: insertedPlayerClubCareer, error: playerClubCareerError } =
    await supabase
      .from(getTable())
      .insert({
        player_career_id: insertedPlayerCareer.id,
        club_team_id,
      })
      .select("id")
      .single();

  if (playerClubCareerError) throw playerClubCareerError;

  //  Insert player shirt numbers (table player_shirt_numbers)
  if (shirt_numbers && shirt_numbers.length > 0) {
    await createPlayerShirtNumbersRepo(insertedPlayerCareer.id, shirt_numbers);
  }

  //  Insert player contracts (table player_contracts)
  if (contracts && contracts.length > 0) {
    await createPlayerContractsRepo(insertedPlayerClubCareer.id, contracts);
  }

  //  Insert player transfer (table player_transfers)
  if (transfer) {
    await createPlayerTransferRepo(insertedPlayerClubCareer.id, transfer);
  }

  const result = await getPlayerClubCareerDetailRepo(
    insertedPlayerClubCareer.id,
  );

  if (!result) {
    throw new Error("Failed to retrieve created player club career");
  }

  return result;
}

/**
 *
 * @param playerClubCareerId
 * @param playerId
 * @param playerClubCareer
 * @returns PlayerClubCareerDetailResponse
 */
export async function updatePlayerClubCareerRepo(
  playerClubCareerId: string,
  playerId: string,
  playerClubCareer: PlayerClubCareerUpdateInput,
): Promise<PlayerClubCareerDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(
    getPlayerClubCareerDetailRepo,
    playerClubCareerId,
    getLabel(),
  );

  const {
    player_career_id,
    career,
    contracts,
    shirt_numbers,
    transfer,
    ...rest
  } = playerClubCareer;

  // Player Career: Update existing data with a new data

  const playerCareer = await updatePlayerCareerRepo(
    player_career_id ?? "",
    playerId,
    career,
  );

  // Player Club Career: Update existing data with a new data

  const { error: playerClubCareerError } = await supabase
    .from(getTable())
    .update({
      ...rest,
      updated_at: new Date().toISOString(),
    })
    .eq("id", playerClubCareerId);

  if (playerClubCareerError) throw playerClubCareerError;

  // Shirt Numbers : Delete existing shirt numbers and insert new ones

  await deletePlayerShirtNumberRepo(playerCareer.id);

  if (shirt_numbers && shirt_numbers.length > 0) {
    await createPlayerShirtNumbersRepo(playerCareer.id, shirt_numbers);
  }

  // Contracts: Delete existing contracts and insert new ones

  await deletePlayerContractRepo(playerClubCareerId);

  if (contracts && contracts.length > 0) {
    await createPlayerContractsRepo(playerClubCareerId, contracts);
  }

  // Player Transfer: Update existing data with a new data

  // Transfer : Delete existing transfer and insert new one

  await updatePlayerTransferByPlayerClubCareerIdRepo(
    playerClubCareerId,
    transfer,
  );

  // Retrieve updated player club career

  const result = await getPlayerClubCareerDetailRepo(playerClubCareerId);

  if (!result) {
    throw new Error("Failed to retrieve updated player club career");
  }

  return result;
}

/**
 *
 * @param playerClubCareerId
 */
export async function deletePlayerClubCareerRepo(
  playerClubCareerId: string,
): Promise<void> {
  const supabase = await getSupabase();

  const result = await requireEntity(
    getPlayerClubCareerDetailRepo,
    playerClubCareerId,
    getLabel(),
  );

  const { career } = result;

  await deletePlayerShirtNumberRepo(career.id);

  await deletePlayerContractRepo(playerClubCareerId);

  await deletePlayerTransferRepo(playerClubCareerId);

  const { error: deletePlayerClubCareerError } = await supabase
    .from(getTable())
    .delete()
    .eq("id", playerClubCareerId);

  if (deletePlayerClubCareerError) throw deletePlayerClubCareerError;

  await deletePlayerCareerRepo(career.id);
}
