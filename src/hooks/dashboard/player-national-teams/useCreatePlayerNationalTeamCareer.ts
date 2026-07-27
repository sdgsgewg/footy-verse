import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { PlayerLookupResponse } from "@/types/player";
import { createPlayerNationalTeamCareer } from "@/lib/api/player-national-team-career";
import { playerNationalTeamCareerKeys } from "@/lib/react-query/keys/playerNationalTeamCareerKeys";

interface CreatePlayerNationalTeamCareerPayload {
  data: unknown;
}

export function useCreatePlayerNationalTeamCareer(
  player: PlayerLookupResponse,
) {
  return useCrudMutation<CreatePlayerNationalTeamCareerPayload>({
    mutationFn: ({ data }) => createPlayerNationalTeamCareer(player.id, data),

    invalidateQueries: [{ queryKey: playerNationalTeamCareerKeys.lists() }],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`,

    entityKey: "playerNationalTeamCareer",

    action: "create",
  });
}
