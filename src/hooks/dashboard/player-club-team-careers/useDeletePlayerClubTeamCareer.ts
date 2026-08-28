import { deletePlayerClubTeamCareer } from "@/lib/api/player-club-team-career";
import { useCrudMutation } from "../useCrudMutation";
import { playerClubTeamCareerKeys } from "@/lib/react-query/keys/playerClubTeamCareerKeys";

interface DeletePlayerClubTeamCareerPayload {
  playerClubTeamCareerId: string;
  data: unknown;
}

export function useDeletePlayerClubTeamCareer(playerId: string) {
  return useCrudMutation<DeletePlayerClubTeamCareerPayload>({
    mutationFn: ({ playerClubTeamCareerId }) =>
      deletePlayerClubTeamCareer(playerId, playerClubTeamCareerId),

    invalidateQueries: [{ queryKey: playerClubTeamCareerKeys.lists() }],

    entityKey: "playerClubTeamCareer",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
