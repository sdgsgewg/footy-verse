import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { deletePlayer } from "@/lib/api/player";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { isLikelyConnectionError } from "@/lib/utils/error";

interface DeletePlayerPayload {
  id: string;
  name: string;
}

export function useDeletePlayer() {
  const queryClient = useQueryClient();

  const tPlayers = useTranslations("manage.players");
  const tCommon = useTranslations("common");

  return useMutation({
    mutationFn: ({ id }: DeletePlayerPayload) => deletePlayer(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.players(),
      });

      alert(`${tPlayers("form.success.delete")} ${variables.name}`);
    },

    onError: (error: unknown) => {
      const message = isLikelyConnectionError(error)
        ? tCommon("feedback.connectionIssue.actionFailed")
        : [
            tPlayers("form.errors.delete.failed"),
            error instanceof Error ? error.message : undefined,
          ]
            .filter(Boolean)
            .join(": ");

      alert(message);
    },
  });
}
