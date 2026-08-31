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
  updatePlayerTransferByPlayerClubTeamCareerIdRepo,
} from "./player-transfers.repo";
import { CareerType } from "@/enums/CareerType";

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
 * @returns PlayerClubTeamCareerListItem[]
 */
export async function getPlayerClubTeamCareersRepo(
  playerId: string,
): Promise<PlayerClubTeamCareerListItem[]> {
  const supabase = await getSupabase();

  const query = supabase
    .from(getTable())
    .select(getPlayerClubTeamCareersBaseQuery())
    .eq("player_career.player_id", playerId)
    .order("joined_at", {
      referencedTable: "player_career",
      ascending: false,
    });

  const { data, error } =
    await query.overrideTypes<DbPlayerClubTeamCareerListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  return data.map(mapPlayerClubTeamCareerListItem);
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
 *
 * @param playerId
 * @param playerClubTeamCareer
 * @returns PlayerClubTeamCareerDetailResponse
 */
export async function createPlayerClubTeamCareerRepo(
  playerId: string,
  playerClubTeamCareer: PlayerClubTeamCareerCreateInput,
): Promise<PlayerClubTeamCareerDetailResponse> {
  const supabase = await getSupabase();

  const { club_team_id, career, contracts, shirt_numbers, transfer } =
    playerClubTeamCareer;

  //  Insert player career (table player_careers)

  const insertedPlayerCareer = await createPlayerCareerRepo(
    playerId,
    career,
    CareerType.CLUB,
  );

  //  Insert player club career (table player_club_team_careers)

  const {
    data: insertedPlayerClubTeamCareer,
    error: playerClubTeamCareerError,
  } = await supabase
    .from(getTable())
    .insert({
      player_career_id: insertedPlayerCareer.id,
      club_team_id,
    })
    .select("id")
    .single();

  if (playerClubTeamCareerError) throw playerClubTeamCareerError;

  //  Insert player shirt numbers (table player_shirt_numbers)
  if (shirt_numbers && shirt_numbers.length > 0) {
    await createPlayerShirtNumbersRepo(insertedPlayerCareer.id, shirt_numbers);
  }

  //  Insert player contracts (table player_contracts)
  if (contracts && contracts.length > 0) {
    await createPlayerContractsRepo(insertedPlayerClubTeamCareer.id, contracts);
  }

  //  Insert player transfer (table player_transfers)
  if (transfer) {
    await createPlayerTransferRepo(insertedPlayerClubTeamCareer.id, transfer);
  }

  const result = await getPlayerClubTeamCareerDetailRepo(
    insertedPlayerClubTeamCareer.id,
  );

  if (!result) {
    throw new Error("Failed to retrieve created player club career");
  }

  return result;
}

/**
 *
 * @param playerClubTeamCareerId
 * @param playerId
 * @param playerClubTeamCareer
 * @returns PlayerClubTeamCareerDetailResponse
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

  const {
    player_career_id,
    career,
    contracts,
    shirt_numbers,
    transfer,
    ...rest
  } = playerClubTeamCareer;

  // Player Career: Update existing data with a new data

  const playerCareer = await updatePlayerCareerRepo(
    player_career_id ?? "",
    playerId,
    career,
  );

  // Player Club Career: Update existing data with a new data

  const { error: playerClubTeamCareerError } = await supabase
    .from(getTable())
    .update({
      ...rest,
      updated_at: new Date().toISOString(),
    })
    .eq("id", playerClubTeamCareerId);

  if (playerClubTeamCareerError) throw playerClubTeamCareerError;

  // Shirt Numbers : Delete existing shirt numbers and insert new ones

  await deletePlayerShirtNumberRepo(playerCareer.id);

  if (shirt_numbers && shirt_numbers.length > 0) {
    await createPlayerShirtNumbersRepo(playerCareer.id, shirt_numbers);
  }

  // Contracts: Delete existing contracts and insert new ones

  await deletePlayerContractRepo(playerClubTeamCareerId);

  if (contracts && contracts.length > 0) {
    await createPlayerContractsRepo(playerClubTeamCareerId, contracts);
  }

  // Player Transfer: Update existing data with a new data

  // Transfer : Delete existing transfer and insert new one

  await updatePlayerTransferByPlayerClubTeamCareerIdRepo(
    playerClubTeamCareerId,
    transfer,
  );

  // Retrieve updated player club career

  const result = await getPlayerClubTeamCareerDetailRepo(
    playerClubTeamCareerId,
  );

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
  const supabase = await getSupabase();

  const result = await requireEntity(
    getPlayerClubTeamCareerDetailRepo,
    playerClubTeamCareerId,
    getLabel(),
  );

  const { career } = result;

  await deletePlayerShirtNumberRepo(career.id);

  await deletePlayerContractRepo(playerClubTeamCareerId);

  await deletePlayerTransferRepo(playerClubTeamCareerId);

  const { error: deletePlayerClubTeamCareerError } = await supabase
    .from(getTable())
    .delete()
    .eq("id", playerClubTeamCareerId);

  if (deletePlayerClubTeamCareerError) throw deletePlayerClubTeamCareerError;

  await deletePlayerCareerRepo(career.id);
}
