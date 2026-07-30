import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { competitionKeys } from "@/lib/react-query/keys/competitionKeys";
import { fetchCompetitionEdit } from "@/lib/api/competition";

export function useCompetitionEdit(id: string, enabled = true) {
  const query = useQuery({
    queryKey: competitionKeys.edit(id),
    queryFn: () => fetchCompetitionEdit(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    competition: query.data ?? null,
  };
}
