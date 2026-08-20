import { ReorderPositionCategoriesInput } from "@/types/position-category";
import { useReorderPositionCategories } from "./useReorderPositionCategories";

type SubmitOptions = {
  payload: ReorderPositionCategoriesInput;

  onSuccess?: () => void;
};

export function useReorderPositionCategoriesSubmit() {
  const reorderMutation = useReorderPositionCategories();

  const isSubmitting = reorderMutation.isPending;
  const isReordering = reorderMutation.isPending;

  const submit = ({ payload, onSuccess }: SubmitOptions) => {
    reorderMutation.mutate(
      {
        data: payload,
      },
      { onSuccess },
    );
  };

  return {
    submit,
    isSubmitting,
    isReordering,
  };
}
