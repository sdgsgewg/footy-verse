import { UpsertPlayerClubTeamCareerInput } from "@/types/player-club-team-career";
import { useCreatePlayerClubTeamCareer } from "./useCreatePlayerClubTeamCareer";
import { PlayerLookupResponse } from "@/types/player";
import { useUpdatePlayerClubTeamCareer } from "./useUpdatePlayerClubTeamCareer";

type SubmitOptions = {
  playerClubTeamCareerId?: string;
  payload: UpsertPlayerClubTeamCareerInput;

  onSuccess?: () => void;
};

export function usePlayerClubTeamCareerSubmit(player: PlayerLookupResponse) {
  const createMutation = useCreatePlayerClubTeamCareer(player);
  const updateMutation = useUpdatePlayerClubTeamCareer(player);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({
    playerClubTeamCareerId,
    payload,
    onSuccess,
  }: SubmitOptions) => {
    if (player.id && playerClubTeamCareerId) {
      updateMutation.mutate(
        {
          playerClubTeamCareerId,
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
