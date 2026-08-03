import { createPlayer } from "@/lib/api/player";
import { useCrudMutation } from "../useCrudMutation";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";

export function useCreatePlayer() {
  return useCrudMutation({
    mutationFn: createPlayer,

    invalidateQueries: [{ queryKey: playerKeys.lists() }],

    entityKey: "player",

    action: "create",
  });
}
