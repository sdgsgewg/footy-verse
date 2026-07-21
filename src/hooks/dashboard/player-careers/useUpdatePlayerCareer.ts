import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { updatePlayerCareer } from "@/lib/api/player-career";
import { playerCareerKeys } from "@/lib/react-query/keys/playerCareerKeys";

interface UpdatePlayerCareerPayload {
  careerId: string;
  data: unknown;
}

export function useUpdatePlayerCareer(playerId: string) {
  return useCrudMutation<UpdatePlayerCareerPayload>({
    mutationFn: ({ careerId, data }) =>
      updatePlayerCareer(playerId, careerId, data),

    invalidateQueries: [
      { queryKey: playerCareerKeys.lists() },
      { queryKey: playerCareerKeys.details() },
      { queryKey: playerCareerKeys.edits() },
    ],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}`,

    entityKey: "playerCareer",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
