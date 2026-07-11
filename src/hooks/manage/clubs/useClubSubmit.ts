import { useCreateClub } from "./useCreateClub";
import { useUpdateClub } from "./useUpdateClub";

type SubmitOptions = {
  id?: string;
  payload: FormData;
};

export function useClubSubmit() {
  const createMutation = useCreateClub();
  const updateMutation = useUpdateClub();

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
