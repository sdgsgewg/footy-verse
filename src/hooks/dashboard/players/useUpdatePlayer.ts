import { updatePlayer } from "@/lib/api/player";
import { useCrudMutation } from "../useCrudMutation";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";

interface UpdatePlayerPayload {
  id: string;
  data: FormData;
}

export function useUpdatePlayer() {
  return useCrudMutation<UpdatePlayerPayload>({
    mutationFn: ({ id, data }) => updatePlayer(id, data),

    invalidateQueries: [
      { queryKey: playerKeys.lists() },
      { queryKey: playerKeys.groupedLists() },
      { queryKey: playerKeys.details() },
      { queryKey: playerKeys.edits() },
    ],

    entityKey: "player",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
