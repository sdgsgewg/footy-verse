import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { PlayerLookupResponse } from "@/types/player";
import { updatePlayerNationalTeam } from "@/lib/api/player-national-team";
import { playerNationalTeamKeys } from "@/lib/react-query/keys/playerNationalTeamKeys";

interface UpdatePlayerNationalTeamPayload {
  nationalTeamId: string;
  data: unknown;
}

export function useUpdatePlayerNationalTeam(player: PlayerLookupResponse) {
  return useCrudMutation<UpdatePlayerNationalTeamPayload>({
    mutationFn: ({ nationalTeamId, data }) =>
      updatePlayerNationalTeam(player.id, nationalTeamId, data),

    invalidateQueries: [
      { queryKey: playerNationalTeamKeys.lists() },
      { queryKey: playerNationalTeamKeys.details() },
      { queryKey: playerNationalTeamKeys.edits() },
    ],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`,

    entityKey: "playerNationalTeam",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
