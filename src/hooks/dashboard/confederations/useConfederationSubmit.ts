import { useCreateConfederation } from "./useCreateConfederation";
import { useUpdateConfederation } from "./useUpdateConfederation";

type SubmitOptions = {
  id?: string;
  payload: FormData;
};

export function useConfederationSubmit() {
  const createMutation = useCreateConfederation();
  const updateMutation = useUpdateConfederation();

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
