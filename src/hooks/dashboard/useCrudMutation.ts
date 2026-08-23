"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { getApiErrorMessage, hasDuplicateError } from "@/lib/crud/error";
import { getNameFromPayload } from "@/lib/crud/payload";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { CrudMutationOptions } from "@/types/crud";
import { activityLogKeys } from "@/lib/react-query/keys/activityLogKeys";
import { useRouter } from "@/navigation";
import { getApiFormErrors } from "@/lib/forms/errors";

export function useCrudMutation<TVariables>({
  mutationFn,
  invalidateQueries,
  allowRedirect = false,
  redirectTo,
  entityKey,
  action,
  getPayload,
  onSuccess,
  onError,
}: CrudMutationOptions<TVariables>) {
  const queryClient = useQueryClient();

  const router = useRouter();

  const t = useTranslations();

  return useMutation({
    mutationFn,

    onSuccess: (data, variables) => {
      invalidateQueries?.forEach((filters) => {
        queryClient.invalidateQueries(filters);
      });

      queryClient.invalidateQueries({
        queryKey: activityLogKeys.lists(),
      });

      if (
        ["playerClubCareer", "playerNationalTeamCareer"].includes(entityKey)
      ) {
        alert(
          `${t(`common.crud.success.${action}`, {
            entity: t(`entities.${entityKey}`),
          })}`,
        );
      } else {
        const payload = getPayload ? getPayload(variables) : variables;

        const name = getNameFromPayload(payload);

        if (name) {
          alert(
            `${t(`common.crud.success.${action}`, {
              entity: t(`entities.${entityKey}`),
            })}: ${name}`,
          );
        } else {
          alert(
            `${t(`common.crud.success.${action}`, {
              entity: t(`entities.${entityKey}`),
            })}.`,
          );
        }
      }

      onSuccess?.(data, variables);

      if (redirectTo) {
        router.push(`${redirectTo}`);
      } else if (allowRedirect) {
        router.back();
      }
    },

    onError: (error) => {
      // Field Errors

      const fieldErrors = getApiFormErrors(error);

      if (fieldErrors) {
        onError?.({
          error,
          fieldErrors,
        });
        return;
      }

      // Non-Field Errors

      if (isLikelyConnectionError(error)) {
        alert(t("common.feedback.connectionIssue.actionFailed"));
        return;
      }

      if (hasDuplicateError(error)) {
        alert(
          t("common.crud.error.duplicate", {
            entity: t(`entities.${entityKey}`),
          }),
        );
        return;
      }

      alert(
        [
          t(`common.crud.error.${action}`, {
            entity: t(`entities.${entityKey}`),
          }),
          getApiErrorMessage(error),
        ]
          .filter(Boolean)
          .join(": "),
      );

      onError?.({
        error,
        fieldErrors: null,
      });
    },
  });
}
