import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { createPlayerCareer } from "@/lib/api/player-career";
import { playerCareerKeys } from "@/lib/react-query/keys/playerCareerKeys";
import { PlayerLookupResponse } from "@/types/player";

interface CreatePlayerCareerPayload {
  data: unknown;
}

export function useCreatePlayerCareer(player: PlayerLookupResponse) {
  return useCrudMutation<CreatePlayerCareerPayload>({
    mutationFn: ({ data }) => createPlayerCareer(player.id, data),

    invalidateQueries: [{ queryKey: playerCareerKeys.lists() }],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`,

    entityKey: "playerCareer",

    action: "create",
  });
}
