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
import {
  createPlayerCareerRepo,
  deletePlayerCareerRepo,
  updatePlayerCareerRepo,
} from "./player-careers.repo";
import {
  createPlayerShirtNumbersRepo,
  deletePlayerShirtNumberRepo,
} from "./player-shirt-numbers.repo";
import { CareerType } from "@/enums/CareerType";

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
      gernder,
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
    .eq("player_career.player_id", playerId)
    .order("joined_at", {
      referencedTable: "player_career",
      ascending: false,
    });

  const { data, error } =
    await query.overrideTypes<DbPlayerNationalTeamCareerListRow[]>();

  if (error) throw error;
  if (!data || data.length === 0) return [];

  return data.map(mapPlayerNationalTeamCareerListItem);
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
 *
 * @param playerId
 * @param playerNationalTeamCareers
 * @returns void
 */
export async function createPlayerNationalTeamCareerRepo(
  playerId: string,
  playerNationalTeamCareers: PlayerNationalTeamCareerCreateInput,
): Promise<void> {
  const supabase = await getSupabase();

  await Promise.all(
    playerNationalTeamCareers.map(async (careerItem) => {
      const { career, shirt_numbers, national_team_id } = careerItem;

      /**
       * Insert player_careers
       */
      const insertedPlayerCareer = await createPlayerCareerRepo(
        playerId,
        career,
        CareerType.NATIONAL_TEAM,
      );

      /**
       * Insert player_national_team_careers
       */
      const { error: nationalTeamCareerError } = await supabase
        .from(getTable())
        .insert({
          player_career_id: insertedPlayerCareer.id,
          national_team_id,
        })
        .select("id")
        .single();

      if (nationalTeamCareerError) {
        throw nationalTeamCareerError;
      }

      /**
       * Insert player_shirt_numbers
       */
      if (shirt_numbers && shirt_numbers.length > 0) {
        await createPlayerShirtNumbersRepo(
          insertedPlayerCareer.id,
          shirt_numbers,
        );
      }
    }),
  );
}

/**
 *
 * @param playerNationalTeamCareerId
 * @param playerId
 * @param playerNationalTeamCareer
 * @returns PlayerNationalTeamCareerDetailResponse
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

  const { player_career_id, career, shirt_numbers, ...rest } =
    playerNationalTeamCareer;

  // Player Career: Update existing data with a new data

  const playerCareer = await updatePlayerCareerRepo(
    player_career_id ?? "",
    playerId,
    career,
  );

  // Player National Team Career: Update existing data with a new data

  const { error: playerNationalTeamCareerError } = await supabase
    .from(getTable())
    .update({
      ...rest,
      updated_at: new Date().toISOString(),
    })
    .eq("id", playerNationalTeamCareerId);

  if (playerNationalTeamCareerError) throw playerNationalTeamCareerError;

  // Shirt Numbers : Delete existing shirt numbers and insert new ones

  await deletePlayerShirtNumberRepo(playerCareer.id);

  if (shirt_numbers && shirt_numbers.length > 0) {
    await createPlayerShirtNumbersRepo(playerCareer.id, shirt_numbers);
  }

  // Retrieve updated player national team career

  const result = await getPlayerNationalTeamCareerDetailRepo(
    playerNationalTeamCareerId,
  );

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
  const supabase = await getSupabase();

  const result = await requireEntity(
    getPlayerNationalTeamCareerDetailRepo,
    playerNationalTeamCareerId,
    getLabel(),
  );

  const { career } = result;

  await deletePlayerShirtNumberRepo(career.id);

  const { error: deletePlayerNationalTeamCareerError } = await supabase
    .from(getTable())
    .delete()
    .eq("id", playerNationalTeamCareerId);

  if (deletePlayerNationalTeamCareerError)
    throw deletePlayerNationalTeamCareerError;

  await deletePlayerCareerRepo(career.id);
}
