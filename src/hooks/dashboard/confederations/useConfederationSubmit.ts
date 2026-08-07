import { useCreateConfederation } from "./useCreateConfederation";
import { useUpdateConfederation } from "./useUpdateConfederation";

type SubmitOptions = {
  id?: string;
  payload: FormData;

  onSuccess?: () => void;
};

export function useConfederationSubmit() {
  const createMutation = useCreateConfederation();
  const updateMutation = useUpdateConfederation();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({ id, payload, onSuccess }: SubmitOptions) => {
    if (id) {
      updateMutation.mutate(
        {
          id,
          data: payload,
        },
        { onSuccess },
      );
      return;
    }

    createMutation.mutate(payload, { onSuccess });
  };

  return {
    submit,
    isSubmitting,
    isCreating,
    isUpdating,
  };
}
