import { useCreateCompetition } from "./useCreateCompetition";
import { useUpdateCompetition } from "./useUpdateCompetition";

type SubmitOptions = {
  id?: string;
  payload: FormData;

  onSuccess?: () => void;
};

export function useCompetitionSubmit() {
  const createMutation = useCreateCompetition();
  const updateMutation = useUpdateCompetition();

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
