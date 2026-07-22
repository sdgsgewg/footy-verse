import { deletePlayerNationalTeam } from "@/lib/api/player-national-team";
import { useCrudMutation } from "../useCrudMutation";
import { playerNationalTeamKeys } from "@/lib/react-query/keys/playerNationalTeamKeys";

interface DeletePlayerNationalTeamPayload {
  nationalTeamId: string;
  data: unknown;
}

export function useDeletePlayerNationalTeam(playerId: string) {
  return useCrudMutation<DeletePlayerNationalTeamPayload>({
    mutationFn: ({ nationalTeamId }) =>
      deletePlayerNationalTeam(playerId, nationalTeamId),

    invalidateQueries: [{ queryKey: playerNationalTeamKeys.lists() }],

    entityKey: "playerNationalTeam",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
