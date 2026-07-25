import { useCreateNationality } from "./useCreateNationality";
import { useUpdateNationality } from "./useUpdateNationality";

type SubmitOptions = {
  id?: string;
  payload: FormData;
};

export function useNationalitySubmit() {
  const createMutation = useCreateNationality();
  const updateMutation = useUpdateNationality();

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
