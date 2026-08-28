import { ENTITY_CONFIG } from "@/config/entities";
import { PlayerContractCreateInput } from "@/types/player-contract";
import { createClient } from "@/utils/supabase/server";

const getTable = () => {
  return ENTITY_CONFIG["playerContract"]["table"];
};

async function getSupabase() {
  return createClient();
}

/**
 *
 * @param playerClubTeamCareerId
 * @param playerContracts
 */
export async function createPlayerContractsRepo(
  playerClubTeamCareerId: string,
  playerContracts: PlayerContractCreateInput[],
) {
  const supabase = await getSupabase();

  const playerContractInserts: PlayerContractCreateInput[] =
    playerContracts.map((pc) => ({
      player_club_team_career_id: playerClubTeamCareerId,
      contract_start: pc.contract_start,
      contract_end: pc.contract_end,
      salary: pc.salary,
    }));

  const { error: playerContractError } = await supabase
    .from(getTable())
    .insert(playerContractInserts);
  if (playerContractError) throw playerContractError;
}

/**
 *
 * @param playerClubTeamCareerId
 */
export async function deletePlayerContractRepo(playerClubTeamCareerId: string) {
  const supabase = await getSupabase();

  const { error: deleteContractError } = await supabase
    .from(getTable())
    .delete()
    .eq("player_club_team_career_id", playerClubTeamCareerId);

  if (deleteContractError) throw deleteContractError;
}
