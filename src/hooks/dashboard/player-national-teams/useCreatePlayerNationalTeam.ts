import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { PlayerLookupResponse } from "@/types/player";
import { createPlayerNationalTeam } from "@/lib/api/player-national-team";
import { playerNationalTeamKeys } from "@/lib/react-query/keys/playerNationalTeamKeys";

interface CreatePlayerNationalTeamPayload {
  data: unknown;
}

export function useCreatePlayerNationalTeam(player: PlayerLookupResponse) {
  return useCrudMutation<CreatePlayerNationalTeamPayload>({
    mutationFn: ({ data }) => createPlayerNationalTeam(player.id, data),

    invalidateQueries: [{ queryKey: playerNationalTeamKeys.lists() }],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`,

    entityKey: "playerNationalTeam",

    action: "create",
  });
}
