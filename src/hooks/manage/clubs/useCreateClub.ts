import { createClub } from "@/lib/api/club";
import { useCrudMutation } from "../useCrudMutation";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { ROUTES } from "@/constants/routes";

export function useCreateClub() {
  return useCrudMutation({
    mutationFn: createClub,

    queryKey: queryKeys.clubs(),

    redirectTo: ROUTES.MANAGE.CLUBS.BASE,

    entityKey: "club",

    action: "create",
  });
}
