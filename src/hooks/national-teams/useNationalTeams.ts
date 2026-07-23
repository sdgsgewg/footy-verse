import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { GetNationalTeamsParams } from "@/types/national-team";
import { nationalTeamKeys } from "@/lib/react-query/keys/nationalTeamKeys";
import { fetchNationalTeams } from "@/lib/api/national-team";

interface UseNationalTeamsOptions {
  nationId?: string;
  params?: GetNationalTeamsParams;
  enabled?: boolean;
}

export function useNationalTeams({
  nationId,
  params,
  enabled = true,
}: UseNationalTeamsOptions) {
  const query = useQuery({
    queryKey: nationalTeamKeys.list(nationId!, params),
    queryFn: () => fetchNationalTeams(nationId!, params),
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
