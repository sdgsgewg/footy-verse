import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { isLikelyConnectionError } from "@/lib/utils/error";
import { updateClub } from "@/lib/api/club";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface UpdateClubPayload {
  id: string;
  data: unknown;
}

export function useUpdateClub() {
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
    mutationFn: ({ id, data }: UpdateClubPayload) => updateClub(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.clubs(),
      });

      let clubName = "";

      if (variables.data instanceof FormData) {
        clubName = String(variables.data.get("name") ?? "");
      } else if (
        typeof variables.data === "object" &&
        variables.data !== null &&
        "name" in variables.data
      ) {
        clubName = String((variables.data as { name: unknown }).name);
      }

      alert(`${tClubs("form.success.edit")} ${clubName}`);

      router.push(`/${locale}/${ROUTES.MANAGE.CLUBS.BASE}`);
    },

    onError: (error: unknown) => {
      if (isLikelyConnectionError(error)) {
        alert(tCommon("feedback.connectionIssue.actionFailed"));
        return;
      }

      if (hasDuplicateError(error)) {
        alert(tClubs("form.errors.edit.duplicate"));
        return;
      }

      alert(
        [tClubs("form.errors.edit.failed"), getErrorMessage(error)]
          .filter(Boolean)
          .join(": "),
      );
    },
  });
}
