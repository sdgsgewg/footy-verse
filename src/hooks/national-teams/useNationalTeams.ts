import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { nationalTeamKeys } from "@/lib/react-query/keys/nationalTeamKeys";
import { fetchNationalTeams } from "@/lib/api/national-team";
import { NationalTeamQuery } from "@/types/national-team";

export function useNationalTeams(params?: NationalTeamQuery, enabled = true) {
  const query = useQuery({
    queryKey: nationalTeamKeys.list(params),
    queryFn: () => fetchNationalTeams(params),
    enabled,
    ...queryConfig,
  });

  return {
    nationalTeams: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error,
    retryLoad: query.refetch,
  };
}
