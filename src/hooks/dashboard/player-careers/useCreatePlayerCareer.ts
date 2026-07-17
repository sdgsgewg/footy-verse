import { queryKeys } from "@/lib/react-query/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { createPlayerCareer } from "@/lib/api/player-career";

interface CreatePlayerCareerPayload {
  data: unknown;
}

export function useCreatePlayerCareer(playerId: string) {
  return useCrudMutation<CreatePlayerCareerPayload>({
    mutationFn: ({ data }) => createPlayerCareer(playerId, data),

    queryKey: queryKeys.player_careers(playerId),

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}`,

    entityKey: "playerCareer",

    action: "create",
  });
}
