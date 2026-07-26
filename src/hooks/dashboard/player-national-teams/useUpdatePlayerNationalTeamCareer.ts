import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { PlayerLookupResponse } from "@/types/player";
import { updatePlayerNationalTeamCareer } from "@/lib/api/player-national-team";
import { playerNationalTeamCareerKeys } from "@/lib/react-query/keys/playerNationalTeamCareerKeys";

interface UpdatePlayerNationalTeamCareerPayload {
  nationalTeamId: string;
  data: unknown;
}

export function useUpdatePlayerNationalTeamCareer(
  player: PlayerLookupResponse,
) {
  return useCrudMutation<UpdatePlayerNationalTeamCareerPayload>({
    mutationFn: ({ nationalTeamId, data }) =>
      updatePlayerNationalTeamCareer(player.id, nationalTeamId, data),

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
