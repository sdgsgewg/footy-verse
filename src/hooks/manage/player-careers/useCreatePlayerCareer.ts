import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import axios from "axios";
import { createPlayer } from "@/lib/api/player";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { ROUTES } from "@/constants/routes";

export function useCreatePlayerCareer() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const locale = useLocale();

  const tPlayerCareers = useTranslations("manage.playerCareers");
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
    mutationFn: createPlayer,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.players(),
      });

      let playerName = "";

      if (variables instanceof FormData) {
        playerName = String(variables.get("name") ?? "");
      } else if (
        typeof variables === "object" &&
        variables !== null &&
        "name" in variables
      ) {
        playerName = String((variables as { name: unknown }).name);
      }

      alert(`${tPlayerCareers("form.success.add")} ${playerName}`);

      router.push(`/${locale}/${ROUTES.MANAGE.PLAYERS.BASE}`);
    },

    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
        return;
      }

      if (hasDuplicateError(error)) {
        alert(tPlayerCareers("form.errors.add.duplicate"));
        return;
      }

      alert(
        [tPlayerCareers("form.errors.add.failed"), getErrorMessage(error)]
          .filter(Boolean)
          .join(": "),
      );
    },
  });
}
