import { updateClub } from "@/lib/api/club";
import { useCrudMutation } from "../useCrudMutation";
import { ROUTES } from "@/constants/routes";
import { queryKeys } from "@/lib/react-query/queryKeys";

interface UpdateClubPayload {
  id: string;
  data: unknown;
}

export function useUpdateClub() {
  return useCrudMutation<UpdateClubPayload>({
    mutationFn: ({ id, data }) => updateClub(id, data),

    queryKey: queryKeys.clubs(),

    redirectTo: ROUTES.DASHBOARD.CONTENT.CLUBS.BASE,

    entityKey: "club",

    action: "update",

    getPayload: ({ data }) => data,
  });
}
