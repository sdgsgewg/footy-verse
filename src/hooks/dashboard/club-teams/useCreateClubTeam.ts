import { createClubTeam } from "@/lib/api/club-team";
import { useCrudMutation } from "../useCrudMutation";
import { clubTeamKeys } from "@/lib/react-query/keys/clubTeamKeys";
import { ClubLookupResponse } from "@/types/club";

interface CreateClubTeamPayload {
  data: unknown;
}

export function useCreateClubTeam(club: ClubLookupResponse) {
  return useCrudMutation<CreateClubTeamPayload>({
    mutationFn: ({ data }) => createClubTeam(club.id, data),

    invalidateQueries: [{ queryKey: clubTeamKeys.lists() }],

    entityKey: "clubTeam",

    action: "create",
  });
}
