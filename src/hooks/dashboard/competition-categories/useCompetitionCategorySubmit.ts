import { useTranslations } from "next-intl";
import { UpsertCompetitionCategoryInput } from "@/types/competition-category";
import { useCreateCompetitionCategory } from "./useCreateCompetitionCategory";
import { useUpdateCompetitionCategory } from "./useUpdateCompetitionCategory";

interface SubmitOptions {
  id?: string;
  payload: UpsertCompetitionCategoryInput;
  onSuccess?: () => void;
}

export function useCompetitionCategorySubmit() {
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const createMutation = useCreateCompetitionCategory();

  const updateMutation = useUpdateCompetitionCategory();

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
