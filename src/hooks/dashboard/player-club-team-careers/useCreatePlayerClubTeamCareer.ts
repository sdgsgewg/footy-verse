import { useCrudMutation } from "../useCrudMutation";
import { createPlayerClubTeamCareer } from "@/lib/api/player-club-team-career";
import { playerClubTeamCareerKeys } from "@/lib/react-query/keys/playerClubTeamCareerKeys";
import { PlayerLookupResponse } from "@/types/player";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";
import { playerTransferKeys } from "@/lib/react-query/keys/playerTransferKeys";
import { playerShirtNumberKeys } from "@/lib/react-query/keys/playerShirtNumberKeys";

interface CreatePlayerClubTeamCareerPayload {
  data: unknown;
}

export function useCreatePlayerClubTeamCareer(player: PlayerLookupResponse) {
  return useCrudMutation<CreatePlayerClubTeamCareerPayload>({
    mutationFn: ({ data }) => createPlayerClubTeamCareer(player.id, data),

    invalidateQueries: [
      { queryKey: playerClubTeamCareerKeys.lists() },

      { queryKey: playerKeys.lists() },
      { queryKey: playerKeys.details() },

      { queryKey: playerTransferKeys.lists() },

      { queryKey: playerShirtNumberKeys.clubTeams() },
      { queryKey: playerShirtNumberKeys.nationalTeams() },
    ],

    entityKey: "playerClubTeamCareer",

    action: "create",
  });
}
