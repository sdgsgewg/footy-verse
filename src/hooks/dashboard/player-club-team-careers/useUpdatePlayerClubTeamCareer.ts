import { useCrudMutation } from "../useCrudMutation";
import { updatePlayerClubTeamCareer } from "@/lib/api/player-club-team-career";
import { playerClubTeamCareerKeys } from "@/lib/react-query/keys/playerClubTeamCareerKeys";
import { PlayerLookupResponse } from "@/types/player";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";
import { playerTransferKeys } from "@/lib/react-query/keys/playerTransferKeys";
import { playerShirtNumberKeys } from "@/lib/react-query/keys/playerShirtNumberKeys";

interface UpdatePlayerClubTeamCareerPayload {
  playerClubTeamCareerId: string;
  data: unknown;
}

export function useUpdatePlayerClubTeamCareer(player: PlayerLookupResponse) {
  return useCrudMutation<UpdatePlayerClubTeamCareerPayload>({
    mutationFn: ({ playerClubTeamCareerId, data }) =>
      updatePlayerClubTeamCareer(player.id, playerClubTeamCareerId, data),

    invalidateQueries: [
      { queryKey: playerClubTeamCareerKeys.lists() },
      { queryKey: playerClubTeamCareerKeys.details() },
      { queryKey: playerClubTeamCareerKeys.edits() },

      { queryKey: playerKeys.lists() },
      { queryKey: playerKeys.details() },

      { queryKey: playerTransferKeys.lists() },

      { queryKey: playerShirtNumberKeys.clubTeams() },
      { queryKey: playerShirtNumberKeys.nationalTeams() },
    ],

    entityKey: "playerClubTeamCareer",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
