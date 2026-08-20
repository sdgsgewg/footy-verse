import { useTranslations } from "next-intl";
import { UpsertPositionCategoryInput } from "@/types/position-category";
import { useCreatePositionCategory } from "./useCreatePositionCategory";
import { useUpdatePositionCategory } from "./useUpdatePositionCategory";

interface SubmitOptions {
  id?: string;
  payload: UpsertPositionCategoryInput;
  onSuccess?: () => void;
}

export function usePositionCategorySubmit() {
  const tCommonActions = useTranslations("common.actions");
  const tCommonStates = useTranslations("common.states");

  const createMutation = useCreatePositionCategory();

  const updateMutation = useUpdatePositionCategory();

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
