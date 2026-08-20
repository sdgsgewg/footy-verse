import { deletePlayerNationalTeamCareer } from "@/lib/api/player-national-team-career";
import { useCrudMutation } from "../useCrudMutation";
import { playerNationalTeamCareerKeys } from "@/lib/react-query/keys/playerNationalTeamCareerKeys";

interface DeletePlayerNationalTeamCareerPayload {
  playerNationalTeamCareerId: string;
  data: unknown;
}

export function useDeletePlayerNationalTeamCareer(playerId: string) {
  return useCrudMutation<DeletePlayerNationalTeamCareerPayload>({
    mutationFn: ({ playerNationalTeamCareerId }) =>
      deletePlayerNationalTeamCareer(playerId, playerNationalTeamCareerId),

    invalidateQueries: [{ queryKey: playerNationalTeamCareerKeys.lists() }],

    entityKey: "playerNationalTeamCareer",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
