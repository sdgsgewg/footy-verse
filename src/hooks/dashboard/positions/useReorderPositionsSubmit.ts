import { ReorderPositionsInput } from "@/types/position";
import { useReorderPositions } from "./useReorderPositions";

type SubmitOptions = {
  payload: ReorderPositionsInput;

  onSuccess?: () => void;
};

export function useReorderPositionsSubmit() {
  const reorderMutation = useReorderPositions();

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
