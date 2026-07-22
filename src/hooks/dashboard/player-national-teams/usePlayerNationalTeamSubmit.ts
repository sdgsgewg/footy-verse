import {
  PlayerLookupResponse,
  PlayerNationalTeamCreateInput,
} from "@/types/player";
import { PlayerNationalTeamUpdateInput } from "@/types/player-national-teams";
import { useCreatePlayerNationalTeam } from "./useCreatePlayerNationalTeam";
import { useUpdatePlayerNationalTeam } from "./useUpdatePlayerNationalTeam";

type SubmitOptions = {
  nationalTeamId?: string;
  payload: PlayerNationalTeamCreateInput | PlayerNationalTeamUpdateInput;
};

export function usePlayerNationalTeamSubmit(player: PlayerLookupResponse) {
  const createMutation = useCreatePlayerNationalTeam(player);
  const updateMutation = useUpdatePlayerNationalTeam(player);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({ nationalTeamId, payload }: SubmitOptions) => {
    if (player.id && nationalTeamId) {
      updateMutation.mutate({
        nationalTeamId,
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
