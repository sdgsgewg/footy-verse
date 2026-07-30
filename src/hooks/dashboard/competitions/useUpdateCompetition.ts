import { updateCompetition } from "@/lib/api/competition";
import { useCrudMutation } from "../useCrudMutation";
import { ROUTES } from "@/constants/routes";
import { competitionKeys } from "@/lib/react-query/keys/competitionKeys";

interface UpdateCompetitionPayload {
  id: string;
  data: unknown;
}

export function useUpdateCompetition() {
  return useCrudMutation<UpdateCompetitionPayload>({
    mutationFn: ({ id, data }) => updateCompetition(id, data),

    invalidateQueries: [
      { queryKey: competitionKeys.lists() },
      { queryKey: competitionKeys.details() },
      { queryKey: competitionKeys.edits() },
    ],

    redirectTo: ROUTES.DASHBOARD.CONTENT.COMPETITIONS.BASE,

    entityKey: "competition",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
