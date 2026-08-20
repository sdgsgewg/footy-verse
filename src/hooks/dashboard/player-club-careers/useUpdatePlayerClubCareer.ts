import { useCrudMutation } from "../useCrudMutation";
import { updatePlayerClubCareer } from "@/lib/api/player-club-career";
import { playerClubCareerKeys } from "@/lib/react-query/keys/playerClubCareerKeys";
import { PlayerLookupResponse } from "@/types/player";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";
import { playerTransferKeys } from "@/lib/react-query/keys/playerTransferKeys";
import { playerShirtNumberKeys } from "@/lib/react-query/keys/playerShirtNumberKeys";

interface UpdatePlayerClubCareerPayload {
  playerClubCareerId: string;
  data: unknown;
}

export function useUpdatePlayerClubCareer(player: PlayerLookupResponse) {
  return useCrudMutation<UpdatePlayerClubCareerPayload>({
    mutationFn: ({ playerClubCareerId, data }) =>
      updatePlayerClubCareer(player.id, playerClubCareerId, data),

    invalidateQueries: [
      { queryKey: playerClubCareerKeys.lists() },
      { queryKey: playerClubCareerKeys.details() },
      { queryKey: playerClubCareerKeys.edits() },

      { queryKey: playerKeys.lists() },
      { queryKey: playerKeys.details() },

      { queryKey: playerTransferKeys.lists() },

      { queryKey: playerShirtNumberKeys.clubTeams() },
      { queryKey: playerShirtNumberKeys.nationalTeams() },
    ],

    entityKey: "playerClubCareer",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
