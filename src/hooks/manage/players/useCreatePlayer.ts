import { createPlayer } from "@/lib/api/player";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";

export function useCreatePlayer() {
  return useCrudMutation({
    mutationFn: createPlayer,

    queryKey: queryKeys.players(),

    redirectTo: ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE,

    entityKey: "player",

    action: "create",
  });
}
