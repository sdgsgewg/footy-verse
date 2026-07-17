import { useCreatePlayer } from "./useCreatePlayer";
import { useUpdatePlayer } from "./useUpdatePlayer";

type SubmitOptions = {
  id?: string;
  payload: FormData;
};

export function usePlayerSubmit() {
  const createMutation = useCreatePlayer();
  const updateMutation = useUpdatePlayer();

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
