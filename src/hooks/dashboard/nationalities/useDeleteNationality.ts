import { deleteNationality } from "@/lib/api/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface DeleteNationalityPayload {
  id: string;
  data: unknown;
}

export function useDeleteNationality() {
  return useCrudMutation<DeleteNationalityPayload>({
    mutationFn: ({ id }) => deleteNationality(id),

    queryKey: queryKeys.nationalities(),

    entityKey: "nationality",

    action: "delete",

    getPayload: ({ data }) => data,
  });
}
