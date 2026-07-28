import { useCreateRegion } from "./useCreateRegion";
import { useUpdateRegion } from "./useUpdateRegion";

type SubmitOptions = {
  id?: string;
  payload: FormData;
};

export function useRegionSubmit() {
  const createMutation = useCreateRegion();
  const updateMutation = useUpdateRegion();

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
