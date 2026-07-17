import { deletePlayerCareer } from "@/lib/api/player-career";
import { useCrudMutation } from "../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface DeletePlayerCareerPayload {
  careerId: string;
  data: unknown;
}

export function useDeletePlayerCareer(playerId: string) {
  return useCrudMutation<DeletePlayerCareerPayload>({
    mutationFn: ({ careerId }) => deletePlayerCareer(playerId, careerId),

    queryKey: queryKeys.player_careers(playerId),

    entityKey: "playerCareer",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
