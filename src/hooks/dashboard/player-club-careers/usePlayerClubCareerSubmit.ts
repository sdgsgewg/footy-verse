import { UpsertPlayerClubCareerInput } from "@/types/player-club-career";
import { useCreatePlayerClubCareer } from "./useCreatePlayerClubCareer";
import { PlayerLookupResponse } from "@/types/player";
import { useUpdatePlayerClubCareer } from "./useUpdatePlayerClubCareer";

type SubmitOptions = {
  playerClubCareerId?: string;
  payload: UpsertPlayerClubCareerInput;

  onSuccess?: () => void;
};

export function usePlayerClubCareerSubmit(player: PlayerLookupResponse) {
  const createMutation = useCreatePlayerClubCareer(player);
  const updateMutation = useUpdatePlayerClubCareer(player);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({
    playerClubCareerId,
    payload,
    onSuccess,
  }: SubmitOptions) => {
    if (player.id && playerClubCareerId) {
      updateMutation.mutate(
        {
          playerClubCareerId,
          data: payload,
        },
        { onSuccess },
      );
      return;
    }

    createMutation.mutate({ data: payload }, { onSuccess });
  };

  return {
    submit,
    isSubmitting,
    isCreating,
    isUpdating,
  };
}
