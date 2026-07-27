import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { clubTeamKeys } from "@/lib/react-query/keys/clubTeamKeys";
import { fetchClubTeams } from "@/lib/api/club-team";
import { ClubTeamQuery } from "@/types/club-team";

export function useClubTeams(params?: ClubTeamQuery, enabled = true) {
  const query = useQuery({
    queryKey: clubTeamKeys.list(params),
    queryFn: () => fetchClubTeams(params),
    enabled,
    ...queryConfig,
  });

  return {
    clubTeams: query.data ?? [],
    loading: query.isLoading,
    retrying: query.isRefetching,
    loadError: query.error,
    retryLoad: query.refetch,
  };
}
