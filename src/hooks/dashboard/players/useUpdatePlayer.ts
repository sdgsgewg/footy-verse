import { updatePlayer } from "@/lib/api/player";
import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";
import { playerKeys } from "@/lib/react-query/keys/playerKeys";

interface UpdatePlayerPayload {
  id: string;
  data: unknown;
}

export function useUpdatePlayer() {
  return useCrudMutation<UpdatePlayerPayload>({
    mutationFn: ({ id, data }) => updatePlayer(id, data),

    invalidateQueries: [
      { queryKey: playerKeys.lists() },
      { queryKey: playerKeys.details() },
      { queryKey: playerKeys.edits() },
    ],

    redirectTo: ROUTES.DASHBOARD.CONTENT.PLAYERS.BASE,

    entityKey: "player",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
