import { Entity } from "@/config/entities";
import { getApiErrorMessage, hasDuplicateError } from "@/lib/crud/error";
import { getApiFormErrors } from "@/lib/forms/errors";
import { isLikelyConnectionError } from "@/lib/utils/connection-error";
import { CrudAction, CrudMutationError } from "@/types/crud";
import { _Translator } from "next-intl";

interface HandleCrudErrorOptions {
  error: unknown;
  t: _Translator;
  entityKey: Entity;
  action: CrudAction;
  onError?: (error: CrudMutationError) => void;
}

export function handleCrudError({
  error,
  t,
  entityKey,
  action,
  onError,
}: HandleCrudErrorOptions) {
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
      getApiErrorMessage(error) ??
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
}
