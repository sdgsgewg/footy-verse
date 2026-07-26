import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { updatePlayerClubCareer } from "@/lib/api/player-club-career";
import { playerClubCareerKeys } from "@/lib/react-query/keys/playerClubCareerKeys";
import { PlayerLookupResponse } from "@/types/player";

interface UpdatePlayerClubCareerPayload {
  careerId: string;
  data: unknown;
}

export function useUpdatePlayerClubCareer(player: PlayerLookupResponse) {
  return useCrudMutation<UpdatePlayerClubCareerPayload>({
    mutationFn: ({ careerId, data }) =>
      updatePlayerClubCareer(player.id, careerId, data),

    invalidateQueries: [
      { queryKey: playerClubCareerKeys.lists() },
      { queryKey: playerClubCareerKeys.details() },
      { queryKey: playerClubCareerKeys.edits() },
    ],

    redirectTo: `${ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE}/${player.slug}`,

    entityKey: "playerClubCareer",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
