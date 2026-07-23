import { ClubLookupResponse } from "@/types/club";
import { useCreateClubTeam } from "./useCreateClubTeam";
import { useUpdateClubTeam } from "./useUpdateClubTeam";
import { UpsertClubTeamInput } from "@/types/club-team";

type SubmitOptions = {
  teamId?: string;
  payload: UpsertClubTeamInput;
};

export function useClubTeamSubmit(club: ClubLookupResponse) {
  const createMutation = useCreateClubTeam(club);
  const updateMutation = useUpdateClubTeam(club);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({ teamId, payload }: SubmitOptions) => {
    if (club.id && teamId) {
      updateMutation.mutate({
        teamId,
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
