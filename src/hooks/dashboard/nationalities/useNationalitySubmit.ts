import { useCreateNationality } from "./useCreateNationality";
import { useUpdateNationality } from "./useUpdateNationality";

type SubmitOptions = {
  id?: string;
  payload: FormData;

  onSuccess?: () => void;
};

export function useNationalitySubmit() {
  const createMutation = useCreateNationality();
  const updateMutation = useUpdateNationality();

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
