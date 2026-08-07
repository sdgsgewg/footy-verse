import { createClub } from "@/lib/api/club";
import { useCrudMutation } from "../useCrudMutation";
import { clubKeys } from "@/lib/react-query/keys/clubKeys";
import { clubTeamKeys } from "@/lib/react-query/keys/clubTeamKeys";

export function useCreateClub() {
  return useCrudMutation({
    mutationFn: createClub,

    invalidateQueries: [
      { queryKey: clubKeys.lists() },

      { queryKey: clubTeamKeys.lists() },
    ],

    entityKey: "club",

    action: "create",
  });
}
