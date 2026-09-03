import { useCompetitionScopeOptions } from "../dashboard/competition-scopes";
import { getGenderOptions } from "@/lib/constants/options";
import { getParticipantTypeOptions } from "@/lib/competitions/options";
import { useCompetitionCategoryOptions } from "../dashboard/competition-categories";
import { useTranslations } from "next-intl";

export function useCompetitionFilterOptions() {
  const t = useTranslations();

  const { competitionCategoryOptions, loading: competitionCategoryLoading } =
    useCompetitionCategoryOptions();

  const { competitionScopeOptions, loading: competitionScopeLoading } =
    useCompetitionScopeOptions();

  const genderOptions = getGenderOptions(t);

  const participantTypeOptions = getParticipantTypeOptions(t);

  return {
    competitionCategoryOptions,
    competitionScopeOptions,
    genderOptions,
    participantTypeOptions,

    loading: {
      competitionCategory: competitionCategoryLoading,
      competitionScope: competitionScopeLoading,
    },
  };
}
