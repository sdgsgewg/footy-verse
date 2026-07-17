import { queryKeys } from "@/lib/react-query/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { updatePlayerCareer } from "@/lib/api/player-career";

interface UpdatePlayerCareerPayload {
  careerId: string;
  data: unknown;
}

export function useUpdatePlayerCareer(playerId: string) {
  return useCrudMutation<UpdatePlayerCareerPayload>({
    mutationFn: ({ careerId, data }) =>
      updatePlayerCareer(playerId, careerId, data),

    queryKey: queryKeys.player_careers(playerId),

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}`,

    entityKey: "playerCareer",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
