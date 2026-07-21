import { deleteNationality } from "@/lib/api/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { nationalityKeys } from "@/lib/react-query/keys/nationalityKeys";

interface DeleteNationalityPayload {
  id: string;
  data: unknown;
}

export function useDeleteNationality() {
  return useCrudMutation<DeleteNationalityPayload>({
    mutationFn: ({ id }) => deleteNationality(id),

    invalidateQueries: [{ queryKey: nationalityKeys.lists() }],

    entityKey: "nationality",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
