import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { updatePlayerCareer } from "@/lib/api/player-career";
import { playerCareerKeys } from "@/lib/react-query/keys/playerCareerKeys";
import { PlayerLookupResponse } from "@/types/player";

interface UpdatePlayerCareerPayload {
  careerId: string;
  data: unknown;
}

export function useUpdatePlayerCareer(player: PlayerLookupResponse) {
  return useCrudMutation<UpdatePlayerCareerPayload>({
    mutationFn: ({ careerId, data }) =>
      updatePlayerCareer(player.id, careerId, data),

    invalidateQueries: [
      { queryKey: playerCareerKeys.lists() },
      { queryKey: playerCareerKeys.details() },
      { queryKey: playerCareerKeys.edits() },
    ],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`,

    entityKey: "playerCareer",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
