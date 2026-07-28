import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { createPlayerClubCareer } from "@/lib/api/player-club-career";
import { playerClubCareerKeys } from "@/lib/react-query/keys/playerClubCareerKeys";
import { PlayerLookupResponse } from "@/types/player";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";

interface CreatePlayerClubCareerPayload {
  data: unknown;
}

export function useCreatePlayerClubCareer(player: PlayerLookupResponse) {
  return useCrudMutation<CreatePlayerClubCareerPayload>({
    mutationFn: ({ data }) => createPlayerClubCareer(player.id, data),

    invalidateQueries: [
      { queryKey: playerClubCareerKeys.lists() },
      { queryKey: playerKeys.details() },
    ],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`,

    entityKey: "playerClubCareer",

    action: "create",
  });
}
