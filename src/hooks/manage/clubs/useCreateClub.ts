import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { createClub } from "@/lib/api/club";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export function useCreateClub() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const locale = useLocale();

  const tClubs = useTranslations("manage.clubs");
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
    mutationFn: createClub,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.clubs(),
      });

      let clubName = "";

      if (variables instanceof FormData) {
        clubName = String(variables.get("name") ?? "");
      } else if (
        typeof variables === "object" &&
        variables !== null &&
        "name" in variables
      ) {
        clubName = String((variables as { name: unknown }).name);
      }

      alert(`${tClubs("form.success.add")} ${clubName}`);

      router.push(`/${locale}/${ROUTES.MANAGE.CLUBS.BASE}`);
    },

    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
        return;
      }

      if (hasDuplicateError(error)) {
        alert(tClubs("form.errors.add.duplicate"));
        return;
      }

      alert(
        [tClubs("form.errors.add.failed"), getErrorMessage(error)]
          .filter(Boolean)
          .join(": "),
      );
    },
  });
}
