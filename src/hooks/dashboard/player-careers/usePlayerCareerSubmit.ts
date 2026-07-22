import { UpsertPlayerCareerInput } from "@/types/player-career";
import { useCreatePlayerCareer } from "./useCreatePlayerCareer";
import { useUpdatePlayerCareer } from "./useUpdatePlayerCareer";
import { PlayerLookupResponse } from "@/types/player";

type SubmitOptions = {
  careerId?: string;
  payload: UpsertPlayerCareerInput;
};

export function usePlayerCareerSubmit(player: PlayerLookupResponse) {
  const createMutation = useCreatePlayerCareer(player);
  const updateMutation = useUpdatePlayerCareer(player);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({ careerId, payload }: SubmitOptions) => {
    if (player.id && careerId) {
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
