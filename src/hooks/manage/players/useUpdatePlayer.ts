import { updatePlayer } from "@/lib/api/player";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { ROUTES } from "@/constants/routes";
import { useCrudMutation } from "../useCrudMutation";

interface UpdatePlayerPayload {
  id: string;
  data: unknown;
}

export function useUpdatePlayer() {
  return useCrudMutation<UpdatePlayerPayload>({
    mutationFn: ({ id, data }) => updatePlayer(id, data),

    queryKey: queryKeys.players(),

    redirectTo: ROUTES.MANAGE.PLAYERS.BASE,

    entityKey: "player",

    action: "update",

    getPayload: (variables) => variables.data,
  });
}
