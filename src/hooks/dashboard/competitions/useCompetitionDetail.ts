import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { competitionKeys } from "@/lib/react-query/keys/competitionKeys";
import { fetchCompetitionDetail } from "@/lib/api/competition";

export function useCompetitionDetail(id: string, enabled = true) {
  const query = useQuery({
    queryKey: competitionKeys.detail(id),
    queryFn: () => fetchCompetitionDetail(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    competition: query.data ?? null,
  };
}
