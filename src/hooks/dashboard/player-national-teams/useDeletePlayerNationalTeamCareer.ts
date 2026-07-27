import { deletePlayerNationalTeamCareer } from "@/lib/api/player-national-team-career";
import { useCrudMutation } from "../useCrudMutation";
import { playerNationalTeamCareerKeys } from "@/lib/react-query/keys/playerNationalTeamCareerKeys";

interface DeletePlayerNationalTeamCareerPayload {
  nationalTeamId: string;
  data: unknown;
}

export function useDeletePlayerNationalTeamCareer(playerId: string) {
  return useCrudMutation<DeletePlayerNationalTeamCareerPayload>({
    mutationFn: ({ nationalTeamId }) =>
      deletePlayerNationalTeamCareer(playerId, nationalTeamId),

    invalidateQueries: [{ queryKey: playerNationalTeamCareerKeys.lists() }],

    entityKey: "playerNationalTeamCareer",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
