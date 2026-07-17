import { UpsertPlayerCareerInput } from "@/types/player-career";
import { useCreatePlayerCareer } from "./useCreatePlayerCareer";
import { useUpdatePlayerCareer } from "./useUpdatePlayerCareer";

type SubmitOptions = {
  careerId?: string;
  payload: UpsertPlayerCareerInput;
};

export function usePlayerCareerSubmit(playerId: string) {
  const createMutation = useCreatePlayerCareer(playerId);
  const updateMutation = useUpdatePlayerCareer(playerId);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({ careerId, payload }: SubmitOptions) => {
    if (playerId && careerId) {
      updateMutation.mutate({
        careerId,
        data: payload,
      });
      return;
    }

    createMutation.mutate({ data: payload });
  };

  return {
    submit,
    isSubmitting,
    isCreating,
    isUpdating,
  };
}
