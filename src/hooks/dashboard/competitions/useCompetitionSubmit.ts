import { useCreateCompetition } from "./useCreateCompetition";
import { useUpdateCompetition } from "./useUpdateCompetition";

type SubmitOptions = {
  id?: string;
  payload: FormData;
};

export function useCompetitionSubmit() {
  const createMutation = useCreateCompetition();
  const updateMutation = useUpdateCompetition();

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
