import { deleteNationality } from "@/lib/api/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { nationalityKeys, nationalTeamKeys } from "@/lib/react-query/keys";

interface DeleteNationalityPayload {
  id: string;
  data: unknown;
}

export function useDeleteNationality() {
  return useCrudMutation<DeleteNationalityPayload>({
    mutationFn: ({ id }) => deleteNationality(id),

    invalidateQueries: [
      { queryKey: nationalityKeys.lists() },
      { queryKey: nationalityKeys.options() },

      { queryKey: nationalTeamKeys.lists() },
    ],

    entityKey: "nationality",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
