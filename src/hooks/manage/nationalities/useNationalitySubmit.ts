import { useTranslations } from "next-intl";
import { useCreateNationality } from "./useCreateNationality";
import { useUpdateNationality } from "./useUpdateNationality";

type SubmitOptions = {
  id?: string;
  payload: FormData;
};

export function useNationalitySubmit() {
  const tCommonStates = useTranslations("common.states");
  const tCommonActions = useTranslations("common.actions");

  const createMutation = useCreateNationality();
  const updateMutation = useUpdateNationality();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const buttonText = isSubmitting
    ? isUpdating
      ? tCommonStates("updating")
      : tCommonStates("creating")
    : isUpdating
      ? tCommonActions("update")
      : tCommonActions("create");

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
    buttonText,
  };
}
