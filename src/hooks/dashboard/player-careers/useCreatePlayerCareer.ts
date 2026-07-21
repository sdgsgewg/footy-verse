import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { createPlayerCareer } from "@/lib/api/player-career";
import { playerCareerKeys } from "@/lib/react-query/keys/playerCareerKeys";

interface CreatePlayerCareerPayload {
  data: unknown;
}

export function useCreatePlayerCareer(playerId: string) {
  return useCrudMutation<CreatePlayerCareerPayload>({
    mutationFn: ({ data }) => createPlayerCareer(playerId, data),

    invalidateQueries: [{ queryKey: playerCareerKeys.lists() }],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${playerId}`,

    entityKey: "playerCareer",

    action: "create",
  });
}
