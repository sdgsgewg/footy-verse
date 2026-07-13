import { updateNationality } from "@/lib/api/nationality";
import { useCrudMutation } from "../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface UpdateNationalityPayload {
  id: string;
  data: unknown;
}

export function useUpdateNationality(onSuccess?: () => void) {
  return useCrudMutation<UpdateNationalityPayload>({
    mutationFn: ({ id, data }) => updateNationality(id, data),

    queryKey: queryKeys.nationalities(),

    entityKey: "nationality",

    action: "update",

    getPayload: ({ data }) => data,

    onSuccess,
  });
}
