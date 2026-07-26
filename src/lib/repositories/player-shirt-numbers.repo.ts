import { ENTITY_CONFIG } from "@/config/entities";
import { PlayerShirtNumberCreateInput } from "@/types/player-shirt-number";
import { createClient } from "@/utils/supabase/server";

const getTable = () => {
  return ENTITY_CONFIG["playerShirtNumber"]["table"];
};

async function getSupabase() {
  return createClient();
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
