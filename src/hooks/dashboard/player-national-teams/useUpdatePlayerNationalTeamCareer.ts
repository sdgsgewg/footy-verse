import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { PlayerLookupResponse } from "@/types/player";
import { updatePlayerNationalTeamCareer } from "@/lib/api/player-national-team-career";
import { playerNationalTeamCareerKeys } from "@/lib/react-query/keys/playerNationalTeamCareerKeys";

interface UpdatePlayerNationalTeamCareerPayload {
  careerId: string;
  data: unknown;
}

export function useUpdatePlayerNationalTeamCareer(
  player: PlayerLookupResponse,
) {
  return useCrudMutation<UpdatePlayerNationalTeamCareerPayload>({
    mutationFn: ({ careerId, data }) =>
      updatePlayerNationalTeamCareer(player.id, careerId, data),

    invalidateQueries: [
      { queryKey: playerNationalTeamCareerKeys.lists() },
      { queryKey: playerNationalTeamCareerKeys.details() },
      { queryKey: playerNationalTeamCareerKeys.edits() },
    ],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`,

    entityKey: "playerNationalTeamCareer",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
