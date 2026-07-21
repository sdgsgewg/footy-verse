import { createClub } from "@/lib/api/club";
import { useCrudMutation } from "../useCrudMutation";
import { ROUTES } from "@/constants/routes";
import { clubKeys } from "@/lib/react-query/keys/clubKeys";

export function useCreateClub() {
  return useCrudMutation({
    mutationFn: createClub,

    invalidateQueries: [{ queryKey: clubKeys.lists() }],

    redirectTo: ROUTES.DASHBOARD.CONTENT.CLUBS.BASE,

    entityKey: "club",

    action: "create",
  });
}
