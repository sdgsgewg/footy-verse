import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import axios from "axios";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { updateNationality } from "@/lib/api/nationality";

interface UpdateNationalityPayload {
  id: string;
  data: unknown;
}

export function useUpdateNationality() {
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
    mutationFn: ({ id, data }: UpdateNationalityPayload) =>
      updateNationality(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.nationalities(),
      });

      let nationalityName = "";

      if (variables.data instanceof FormData) {
        nationalityName = String(variables.data.get("name") ?? "");
      } else if (
        typeof variables.data === "object" &&
        variables.data !== null &&
        "name" in variables.data
      ) {
        nationalityName = String((variables.data as { name: unknown }).name);
      }

      alert(`${tNationalities("form.success.edit")} ${nationalityName}`);
    },

    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
        return;
      }

      if (hasDuplicateError(error)) {
        alert(tNationalities("form.errors.edit.duplicate"));
        return;
      }

      alert(
        [tNationalities("form.errors.edit.failed"), getErrorMessage(error)]
          .filter(Boolean)
          .join(": "),
      );
    },
  });
}
