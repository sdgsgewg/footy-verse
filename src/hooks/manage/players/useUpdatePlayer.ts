import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";

import { updatePlayer } from "@/lib/api/player";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface UpdatePlayerPayload {
  id: string;
  data: unknown;
}

export function useUpdatePlayer() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const locale = useLocale();

  const tPlayers = useTranslations("manage.players");
  const tCommon = useTranslations("common");

  const hasDuplicateError = (error: unknown) =>
    axios.isAxiosError<{ error?: string }>(error) &&
    error.response?.data?.error?.includes("exists");

  const getErrorMessage = (error: unknown) =>
    axios.isAxiosError<{ error?: string }>(error)
      ? error.response?.data?.error
      : error instanceof Error
        ? error.message
        : undefined;

  return useMutation({
    mutationFn: ({ id, data }: UpdatePlayerPayload) => updatePlayer(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.players(),
      });

      let playerName = "";

      if (variables.data instanceof FormData) {
        playerName = String(variables.data.get("name") ?? "");
      } else if (
        typeof variables.data === "object" &&
        variables.data !== null &&
        "name" in variables.data
      ) {
        playerName = String((variables.data as { name: unknown }).name);
      }

      alert(`${tPlayers("form.success.edit")} ${playerName}`);

      router.push(`/${locale}/${ROUTES.MANAGE.PLAYERS.BASE}`);
    },

    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
        return;
      }

      if (hasDuplicateError(error)) {
        alert(tPlayers("form.errors.edit.duplicate"));
        return;
      }

      alert(
        [tPlayers("form.errors.edit.failed"), getErrorMessage(error)]
          .filter(Boolean)
          .join(": "),
      );
    },
  });
}
