import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { deleteClub } from "@/lib/api/club";

interface DeleteClubPayload {
  id: string;
  name: string;
}

export function useDeleteClub() {
  const queryClient = useQueryClient();

  const tClubs = useTranslations("manage.clubs");
  const tCommon = useTranslations("common");

  return useMutation({
    mutationFn: ({ id }: DeleteClubPayload) => deleteClub(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.clubs(),
      });

      alert(`${tClubs("form.success.delete")} ${variables.name}`);
    },

    onError: (error: unknown) => {
      const message = isLikelyConnectionError(error)
        ? tCommon("feedback.connectionIssue.actionFailed")
        : [
            tClubs("form.errors.delete.failed"),
            error instanceof Error ? error.message : undefined,
          ]
            .filter(Boolean)
            .join(": ");

      alert(message);
    },
  });
}
