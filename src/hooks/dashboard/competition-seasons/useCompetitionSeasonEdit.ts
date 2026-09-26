"use client";

import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { competitionSeasonKeys } from "@/lib/react-query/keys";
import { fetchCompetitionSeasonEdit } from "@/lib/api/competition-season";

interface UseCompetitionSeasonEditOptions {
  competitionId: string;
  competitionSeasonId: string;
  enabled?: boolean;
}

export function useCompetitionSeasonEdit({
  competitionId,
  competitionSeasonId,
  enabled = true,
}: UseCompetitionSeasonEditOptions) {
  const query = useQuery({
    queryKey: competitionSeasonKeys.edit(competitionId, competitionSeasonId),
    queryFn: () =>
      fetchCompetitionSeasonEdit(competitionId, competitionSeasonId),
    enabled: enabled && !!competitionId && !!competitionSeasonId,
    ...queryConfig,
  });

  return {
    ...query,
    competitionSeason: query.data ?? null,
  };
}
