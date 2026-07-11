import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import axios from "axios";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { createNationality } from "@/lib/api/nationality";

export function useCreateNationality() {
  const queryClient = useQueryClient();

  const tNationalities = useTranslations("manage.nationalities");
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
    mutationFn: createNationality,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.nationalities(),
      });

      let nationalityName = "";

      if (variables instanceof FormData) {
        nationalityName = String(variables.get("name") ?? "");
      } else if (
        typeof variables === "object" &&
        variables !== null &&
        "name" in variables
      ) {
        nationalityName = String((variables as { name: unknown }).name);
      }

      alert(`${tNationalities("form.success.add")} ${nationalityName}`);
    },

    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
        return;
      }

      if (hasDuplicateError(error)) {
        alert(tNationalities("form.errors.add.duplicate"));
        return;
      }

      alert(
        [tNationalities("form.errors.add.failed"), getErrorMessage(error)]
          .filter(Boolean)
          .join(": "),
      );
    },
  });
}
