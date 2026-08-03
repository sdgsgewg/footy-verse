import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { PlayerLookupResponse } from "@/types/player";
import { createPlayerNationalTeamCareer } from "@/lib/api/player-national-team-career";
import { playerNationalTeamCareerKeys } from "@/lib/react-query/keys/playerNationalTeamCareerKeys";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";
import { playerTransferKeys } from "@/lib/react-query/keys/playerTransferKeys";
import { playerShirtNumberKeys } from "@/lib/react-query/keys/playerShirtNumberKeys";

interface CreatePlayerNationalTeamCareerPayload {
  data: unknown;
}

export function useCreatePlayerNationalTeamCareer(
  player: PlayerLookupResponse,
) {
  return useCrudMutation<CreatePlayerNationalTeamCareerPayload>({
    mutationFn: ({ data }) => createPlayerNationalTeamCareer(player.id, data),

    invalidateQueries: [
      { queryKey: playerNationalTeamCareerKeys.lists() },

      { queryKey: playerKeys.lists() },
      { queryKey: playerKeys.details() },

      { queryKey: playerTransferKeys.lists() },

      { queryKey: playerShirtNumberKeys.clubTeams() },
      { queryKey: playerShirtNumberKeys.nationalTeams() },
    ],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`,

    entityKey: "playerNationalTeamCareer",

    action: "create",
  });
}
