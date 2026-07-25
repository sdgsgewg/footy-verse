import { UpsertPositionCategoryInput } from "@/types/position-category";
import { useCreatePositionCategory } from "./useCreatePositionCategory";
import { useUpdatePositionCategory } from "./useUpdatePositionCategory";

type SubmitOptions = {
  id?: string;
  payload: UpsertPositionCategoryInput;
};

export function usePositionCategorySubmit() {
  const createMutation = useCreatePositionCategory();
  const updateMutation = useUpdatePositionCategory();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({ id, payload }: SubmitOptions) => {
    if (id) {
      updateMutation.mutate({
        id,
        data: payload,
      });
      return;
    }

    createMutation.mutate(payload);
  };

  return {
    submit,
    isSubmitting,
    isCreating,
    isUpdating,
  };
}
