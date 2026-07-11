import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { deleteNationality } from "@/lib/api/nationality";

interface DeleteNationalityPayload {
  id: string;
  name: string;
}

export function useDeleteNationality() {
  const queryClient = useQueryClient();

  const tNationalities = useTranslations("manage.nationalities");
  const tCommon = useTranslations("common");

  return useMutation({
    mutationFn: ({ id }: DeleteNationalityPayload) => deleteNationality(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.nationalities(),
      });

      alert(`${tNationalities("form.success.delete")} ${variables.name}`);
    },

    onError: (error: unknown) => {
      const message = isLikelyConnectionError(error)
        ? tCommon("feedback.connectionIssue.actionFailed")
        : [
            tNationalities("form.errors.delete.failed"),
            error instanceof Error ? error.message : undefined,
          ]
            .filter(Boolean)
            .join(": ");

      alert(message);
    },
  });
}
