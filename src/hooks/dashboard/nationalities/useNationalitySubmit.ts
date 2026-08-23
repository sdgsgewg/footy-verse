import { FormErrors } from "@/types/form";
import { useCreateNationality } from "./useCreateNationality";
import { useUpdateNationality } from "./useUpdateNationality";
import { NationalityFormField } from "@/types/nationality";

type SubmitOptions = {
  id?: string;
  payload: FormData;

  onSuccess?: () => void;

  onError?: (
    error: unknown,
    fieldErrors?: FormErrors<NationalityFormField>,
  ) => void;
};

export function useNationalitySubmit() {
  const createMutation = useCreateNationality();
  const updateMutation = useUpdateNationality();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const submit = ({ id, payload, onSuccess }: SubmitOptions) => {
    if (id) {
      updateMutation.mutate(
        {
          id,
          data: payload,
        },
        {
          onSuccess,
        },
      );

      return;
    }

    createMutation.mutate(payload, {
      onSuccess,
    });
  };

  return {
    submit,
    isSubmitting,
  };
}
