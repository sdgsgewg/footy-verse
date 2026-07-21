import { updateNationality } from "@/lib/api/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { nationalityKeys } from "@/lib/react-query/keys/nationalityKeys";

interface UpdateNationalityPayload {
  id: string;
  data: unknown;
}

export function useUpdateNationality(onSuccess?: () => void) {
  return useCrudMutation<UpdateNationalityPayload>({
    mutationFn: ({ id, data }) => updateNationality(id, data),

    invalidateQueries: [
      { queryKey: nationalityKeys.lists() },
      { queryKey: nationalityKeys.details() },
    ],

    entityKey: "nationality",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
