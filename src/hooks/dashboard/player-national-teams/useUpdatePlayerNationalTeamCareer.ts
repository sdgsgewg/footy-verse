import { useCrudMutation } from "../useCrudMutation";
import { PlayerLookupResponse } from "@/types/player";
import { updatePlayerNationalTeamCareer } from "@/lib/api/player-national-team-career";
import { playerNationalTeamCareerKeys } from "@/lib/react-query/keys/playerNationalTeamCareerKeys";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";
import { playerTransferKeys } from "@/lib/react-query/keys/playerTransferKeys";
import { playerShirtNumberKeys } from "@/lib/react-query/keys/playerShirtNumberKeys";

interface UpdatePlayerNationalTeamCareerPayload {
  playerNationalTeamCareerId: string;
  data: unknown;
}

export function useUpdatePlayerNationalTeamCareer(
  player: PlayerLookupResponse,
) {
  return useCrudMutation<UpdatePlayerNationalTeamCareerPayload>({
    mutationFn: ({ playerNationalTeamCareerId, data }) =>
      updatePlayerNationalTeamCareer(
        player.id,
        playerNationalTeamCareerId,
        data,
      ),

    invalidateQueries: [
      { queryKey: playerNationalTeamCareerKeys.lists() },
      { queryKey: playerNationalTeamCareerKeys.details() },
      { queryKey: playerNationalTeamCareerKeys.edits() },

      { queryKey: playerKeys.lists() },
      { queryKey: playerKeys.details() },

      { queryKey: playerTransferKeys.lists() },

      { queryKey: playerShirtNumberKeys.clubTeams() },
      { queryKey: playerShirtNumberKeys.nationalTeams() },
    ],

    entityKey: "playerNationalTeamCareer",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
