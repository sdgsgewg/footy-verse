import { useTranslations } from "next-intl";
import { UpsertCompetitionScopeInput } from "@/types/competition-scope";
import { useCreateCompetitionScope } from "./useCreateCompetitionScope";
import { useUpdateCompetitionScope } from "./useUpdateCompetitionScope";

interface SubmitOptions {
  id?: string;
  payload: UpsertCompetitionScopeInput;
  onSuccess?: () => void;
}

export function useCompetitionScopeSubmit() {
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const createMutation = useCreateCompetitionScope();

  const updateMutation = useUpdateCompetitionScope();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const getButtonText = (isEditing: boolean) => {
    if (isCreating) {
      return tCommonStates("creating");
    }

    if (isUpdating) {
      return tCommonStates("updating");
    }

    return isEditing ? tCommonActions("update") : tCommonActions("create");
  };

  const submit = ({ id, payload, onSuccess }: SubmitOptions) => {
    if (id) {
      updateMutation.mutate(
        {
          id,
          data: payload,
        },
        {
          onSuccess,
        },
      );

      return;
    }

    createMutation.mutate(payload, {
      onSuccess,
    });
  };

  return {
    isSubmitting,
    isCreating,
    isUpdating,
    getButtonText,
    submit,
  };
}
