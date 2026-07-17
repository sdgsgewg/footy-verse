import { deletePlayer } from "@/lib/api/player";
import { useCrudMutation } from "../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface DeletePlayerPayload {
  id: string;
  data: unknown;
}

export function useDeletePlayer() {
  return useCrudMutation<DeletePlayerPayload>({
    mutationFn: ({ id }) => deletePlayer(id),

    queryKey: queryKeys.players(),

    entityKey: "player",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
