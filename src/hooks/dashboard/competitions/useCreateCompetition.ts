import { createCompetition } from "@/lib/api/competition";
import { useCrudMutation } from "../useCrudMutation";
import { ROUTES } from "@/constants/routes";
import { competitionKeys } from "@/lib/react-query/keys/competitionKeys";

export function useCreateCompetition() {
  return useCrudMutation({
    mutationFn: createCompetition,

    invalidateQueries: [{ queryKey: competitionKeys.lists() }],

    redirectTo: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE,

    entityKey: "competition",

    action: "create",
  });
}
