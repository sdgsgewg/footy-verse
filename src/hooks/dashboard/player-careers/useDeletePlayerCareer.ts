import { deletePlayerCareer } from "@/lib/api/player-career";
import { useCrudMutation } from "../useCrudMutation";
import { playerCareerKeys } from "@/lib/react-query/keys/playerCareerKeys";

interface DeletePlayerCareerPayload {
  careerId: string;
  data: unknown;
}

export function useDeletePlayerCareer(playerId: string) {
  return useCrudMutation<DeletePlayerCareerPayload>({
    mutationFn: ({ careerId }) => deletePlayerCareer(playerId, careerId),

    invalidateQueries: [{ queryKey: playerCareerKeys.lists() }],

    entityKey: "playerCareer",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
