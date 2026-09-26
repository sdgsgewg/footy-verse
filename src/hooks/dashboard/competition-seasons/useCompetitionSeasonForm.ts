import { competitionSeasonMutationSchema } from "@/lib/validations/competition-seasons.schema";
import {
  CompetitionSeasonCreateInput,
  CompetitionSeasonEditResponse,
  UpsertCompetitionSeasonInput,
} from "@/types/competition-season";
import { useForm } from "@tanstack/react-form";
import { useMemo } from "react";

const createEmptyCompetitionSeason = (): CompetitionSeasonCreateInput => ({
  name: "",
  season_label: "",
  start_date: "",
  end_date: "",
  winner_club_team_id: null,
  winner_national_team_id: null,
});

function mapCompetitionSeason(
  competitionSeason: CompetitionSeasonEditResponse,
): UpsertCompetitionSeasonInput {
  const {
    id,
    name,
    seasonLabel,
    startDate,
    endDate,
    winnerClubTeamId,
    winnerNationalTeamId,
  } = competitionSeason;

  return {
    id,
    name,
    season_label: seasonLabel,
    start_date: startDate,
    end_date: endDate,
    winner_club_team_id: winnerClubTeamId,
    winner_national_team_id: winnerNationalTeamId,
  };
}

interface UseCompetitionSeasonFormOptions {
  competitionSeason?: CompetitionSeasonEditResponse;
  onSubmit: (payload: UpsertCompetitionSeasonInput) => void;
}

export function useCompetitionSeasonForm({
  competitionSeason,
  onSubmit,
}: UseCompetitionSeasonFormOptions) {
  const defaultValues = useMemo(
    () =>
      competitionSeason
        ? mapCompetitionSeason(competitionSeason)
        : createEmptyCompetitionSeason(),
    [competitionSeason],
  );

  const form = useForm({
    defaultValues,

    validators: {
      onMount: competitionSeasonMutationSchema,
      onChange: competitionSeasonMutationSchema,
      onSubmit: competitionSeasonMutationSchema,
    },

    onSubmit: async ({ value }) => {
      const payload: UpsertCompetitionSeasonInput = {
        name: value.name === "" ? null : value.name,
        season_label: value.season_label,
        start_date: value.start_date,
        end_date: value.end_date,
        winner_club_team_id: value.winner_club_team_id,
        winner_national_team_id: value.winner_national_team_id,
      };

      onSubmit(payload);
    },
  });

  return form;
}

export type CompetitionSeasonForm = ReturnType<typeof useCompetitionSeasonForm>;
