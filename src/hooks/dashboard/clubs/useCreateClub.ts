import { createClub } from "@/lib/api/club";
import { useCrudMutation } from "../useCrudMutation";
import { clubKeys, clubTeamKeys } from "@/lib/react-query/keys";

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
