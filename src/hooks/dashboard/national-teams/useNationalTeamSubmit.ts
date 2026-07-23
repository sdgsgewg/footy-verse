import { UpsertNationalTeamInput } from "@/types/national-team";
import { NationalityLookupResponse } from "@/types/nationality";
import { useCreateNationalTeam } from "./useCreateNationalTeam";
import { useUpdateNationalTeam } from "./useUpdateNationalTeam";

type SubmitOptions = {
  teamId?: string;
  payload: UpsertNationalTeamInput;
};

export function useNationalTeamSubmit(nation: NationalityLookupResponse) {
  const createMutation = useCreateNationalTeam(nation);
  const updateMutation = useUpdateNationalTeam(nation);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({ teamId, payload }: SubmitOptions) => {
    if (nation.id && teamId) {
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
