import { UpsertPlayerClubCareerInput } from "@/types/player-club-career";
import { useCreatePlayerClubCareer } from "./useCreatePlayerClubCareer";
import { PlayerLookupResponse } from "@/types/player";
import { useUpdatePlayerClubCareer } from "./useUpdatePlayerCareer";

type SubmitOptions = {
  careerId?: string;
  payload: UpsertPlayerClubCareerInput;
};

export function usePlayerClubCareerSubmit(player: PlayerLookupResponse) {
  const createMutation = useCreatePlayerClubCareer(player);
  const updateMutation = useUpdatePlayerClubCareer(player);

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
