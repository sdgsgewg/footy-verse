import { CompetitionLookupResponse } from "@/types/competition";
import { UpsertCompetitionSeasonInput } from "@/types/competition-season";
import { useCreateCompetitionSeason } from "./useCreateCompetitionSeason";
import { useUpdateCompetitionSeason } from "./useUpdateCompetitionSeason";

type SubmitOptions = {
  competitionSeasonId?: string;
  payload: UpsertCompetitionSeasonInput;

  onSuccess?: () => void;
};

export function useCompetitionSeasonSubmit(
  competition: CompetitionLookupResponse,
) {
  const createMutation = useCreateCompetitionSeason(competition);
  const updateMutation = useUpdateCompetitionSeason(competition);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;
  const isCreating = createMutation.isPending;
  const isUpdating = updateMutation.isPending;

  const submit = ({
    competitionSeasonId,
    payload,
    onSuccess,
  }: SubmitOptions) => {
    if (competition.id && competitionSeasonId) {
      updateMutation.mutate(
        {
          competitionSeasonId,
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
