import { createPlayer } from "@/lib/api/player";
import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";

export function useCreatePlayer() {
  return useCrudMutation({
    mutationFn: createPlayer,

    invalidateQueries: [{ queryKey: playerKeys.lists() }],

    redirectTo: ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE,

    entityKey: "player",

    action: "create",
  });
}
