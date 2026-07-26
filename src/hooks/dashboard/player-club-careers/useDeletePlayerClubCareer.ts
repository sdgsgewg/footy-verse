import { deletePlayerClubCareer } from "@/lib/api/player-club-career";
import { useCrudMutation } from "../useCrudMutation";
import { playerClubCareerKeys } from "@/lib/react-query/keys/playerClubCareerKeys";

interface DeletePlayerClubCareerPayload {
  careerId: string;
  data: unknown;
}

export function useDeletePlayerClubCareer(playerId: string) {
  return useCrudMutation<DeletePlayerClubCareerPayload>({
    mutationFn: ({ careerId }) => deletePlayerClubCareer(playerId, careerId),

    invalidateQueries: [{ queryKey: playerClubCareerKeys.lists() }],

    entityKey: "playerClubCareer",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
