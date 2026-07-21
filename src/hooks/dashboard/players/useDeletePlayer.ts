import { deletePlayer } from "@/lib/api/player";
import { useCrudMutation } from "../useCrudMutation";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";

interface DeletePlayerPayload {
  id: string;
  data: unknown;
}

export function useDeletePlayer() {
  return useCrudMutation<DeletePlayerPayload>({
    mutationFn: ({ id }) => deletePlayer(id),

    invalidateQueries: [{ queryKey: playerKeys.lists() }],

    entityKey: "player",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
