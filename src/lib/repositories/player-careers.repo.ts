import { ENTITY_CONFIG } from "@/config/entities";
import { CareerType } from "@/enums/CareerType";
import {
  PlayerCareerCreateInput,
  PlayerCareerDetailResponse,
  PlayerCareerUpdateInput,
} from "@/types/player-career";
import { createClient } from "@/utils/supabase/server";
import { requireEntity } from "./helpers/require-entity";
import { mapPlayerCareerDetailResponse } from "../player-careers/mapper";

const getLabel = () => {
  return ENTITY_CONFIG["playerCareer"]["label"];
};

const getTable = () => {
  return ENTITY_CONFIG["playerCareer"]["table"];
};

async function getSupabase() {
  return createClient();
}

/**
 *
 * @param playerCareerId
 * @returns PlayerCareerDetailResponse | null
 */
export async function getPlayerCareerDetailRepo(
  playerCareerId: string,
): Promise<PlayerCareerDetailResponse | null> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from(getTable())
    .select(`*`)
    .eq("id", playerCareerId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return mapPlayerCareerDetailResponse(data);
}

/**
 *
 * @param playerCareerId
 * @param playerShirtNumbers
 */
export async function createPlayerCareerRepo(
  playerId: string,
  career: PlayerCareerCreateInput,
) {
  const supabase = await getSupabase();

  const { ...careerRest } = career;

  const { data: insertedPlayerCareer, error: playerCareerError } =
    await supabase
      .from(getTable())
      .insert({
        ...careerRest,
        player_id: playerId,
        career_type: CareerType.CLUB,
      })
      .select("id")
      .single();

  if (playerCareerError) throw playerCareerError;

  return insertedPlayerCareer;
}

/**
 *
 * @param playerCareerId
 * @param playerId
 * @param playerCareer
 * @returns PlayerCareerDetailResponse
 */
export async function updatePlayerCareerRepo(
  playerCareerId: string,
  playerId: string,
  playerCareer: PlayerCareerUpdateInput,
): Promise<PlayerCareerDetailResponse> {
  const supabase = await getSupabase();

  await requireEntity(getPlayerCareerDetailRepo, playerCareerId, getLabel());

  const { ...rest } = playerCareer;

  const { error: playerCareerError } = await supabase
    .from(getTable())
    .update({
      ...rest,
      player_id: playerId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", playerCareerId);

  if (playerCareerError) throw playerCareerError;

  const result = await getPlayerCareerDetailRepo(playerCareerId);
  if (!result) {
    throw new Error("Failed to retrieve updated player career");
  }

  return result;
}

/**
 *
 * @param playerCareerId
 */
export async function deletePlayerCareerRepo(playerCareerId: string) {
  const supabase = await getSupabase();

  const { error: deleteCareerError } = await supabase
    .from(getTable())
    .delete()
    .eq("id", playerCareerId);

  if (deleteCareerError) throw deleteCareerError;
}
