import { PlayerLookupResponse } from "@/types/player";
import {
  PlayerNationalTeamCareerCreateInput,
  PlayerNationalTeamCareerUpdateInput,
} from "@/types/player-national-team-career";
import { useCreatePlayerNationalTeamCareer } from "./useCreatePlayerNationalTeamCareer";
import { useUpdatePlayerNationalTeamCareer } from "./useUpdatePlayerNationalTeamCareer";

type SubmitOptions = {
  careerId?: string;
  payload:
    | PlayerNationalTeamCareerCreateInput
    | PlayerNationalTeamCareerUpdateInput;
};

export function usePlayerNationalTeamCareerSubmit(
  player: PlayerLookupResponse,
) {
  const createMutation = useCreatePlayerNationalTeamCareer(player);
  const updateMutation = useUpdatePlayerNationalTeamCareer(player);

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
