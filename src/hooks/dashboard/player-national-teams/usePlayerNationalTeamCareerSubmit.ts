import { PlayerLookupResponse } from "@/types/player";
import {
  PlayerNationalTeamCareerCreateInput,
  PlayerNationalTeamCareerUpdateInput,
} from "@/types/player-national-team-career";
import { useCreatePlayerNationalTeamCareer } from "./useCreatePlayerNationalTeamCareer";
import { useUpdatePlayerNationalTeamCareer } from "./useUpdatePlayerNationalTeamCareer";

type SubmitOptions = {
  playerNationalTeamCareerId?: string;
  payload:
    | PlayerNationalTeamCareerCreateInput
    | PlayerNationalTeamCareerUpdateInput;

  onSuccess?: () => void;
};

export function usePlayerNationalTeamCareerSubmit(
  player: PlayerLookupResponse,
) {
  const createMutation = useCreatePlayerNationalTeamCareer(player);
  const updateMutation = useUpdatePlayerNationalTeamCareer(player);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({
    playerNationalTeamCareerId,
    payload,
    onSuccess,
  }: SubmitOptions) => {
    if (player.id && playerNationalTeamCareerId) {
      updateMutation.mutate(
        {
          playerNationalTeamCareerId,
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
