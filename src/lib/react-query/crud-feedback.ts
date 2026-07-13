import { _Translator } from "next-intl";
import { isLikelyConnectionError } from "../utils/connection-error";
import { getApiErrorMessage, hasDuplicateError } from "../crud/error";

export function handleCrudError(
  error: unknown,
  t: _Translator,
  entity: string,
  action: "create" | "update" | "delete",
) {
  if (isLikelyConnectionError(error)) {
    alert(t("common.feedback.connectionIssue.actionFailed"));
    return;
  }

  if (hasDuplicateError(error)) {
    alert(
      t("common.crud.error.duplicate", {
        entity,
      }),
    );
    return;
  }

  alert(
    [
      t(`common.crud.error.${action}`, {
        entity,
      }),
      getApiErrorMessage(error),
    ]
      .filter(Boolean)
      .join(": "),
  );
}
