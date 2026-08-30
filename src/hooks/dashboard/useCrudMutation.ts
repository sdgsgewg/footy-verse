"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { getNameFromPayload } from "@/lib/crud/payload";
import { CrudMutationOptions } from "@/types/crud";
import { activityLogKeys } from "@/lib/react-query/keys/activityLogKeys";
import { useRouter } from "@/navigation";
import { handleCrudError } from "@/lib/react-query/config/crud-feedback";
import { toast } from "sonner";

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

      const modifiedEntity = t(`entities.${entityKey}`).toLocaleLowerCase();

      if (
        ["playerClubTeamCareer", "playerNationalTeamCareer"].includes(entityKey)
      ) {
        toast.success(
          `${t(`common.crud.success.${action}`, {
            entity: modifiedEntity,
          })}`,
        );
      } else {
        const payload = getPayload ? getPayload(variables) : variables;

        const name = getNameFromPayload(payload);

        if (name) {
          toast.success(
            `${t(`common.crud.success.${action}`, {
              entity: modifiedEntity,
            })}: ${name}`,
          );
        } else {
          toast.success(
            `${t(`common.crud.success.${action}`, {
              entity: modifiedEntity,
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
      handleCrudError({
        error,
        t,
        entityKey,
        action,
        onError,
      });
    },
  });
}
