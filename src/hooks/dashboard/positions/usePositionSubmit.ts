import { UpsertPositionInput } from "@/types/position";
import { useCreatePosition } from "./useCreatePosition";
import { useUpdatePosition } from "./useUpdatePosition";

type SubmitOptions = {
  id?: string;
  payload: UpsertPositionInput;
};

export function usePositionSubmit() {
  const createMutation = useCreatePosition();
  const updateMutation = useUpdatePosition();

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
