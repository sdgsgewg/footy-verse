import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { GetClubTeamsParams } from "@/types/club-team";
import { clubTeamKeys } from "@/lib/react-query/keys/clubTeamKeys";
import { fetchClubTeams } from "@/lib/api/club-team";

interface UseClubTeamsOptions {
  clubId?: string;
  params?: GetClubTeamsParams;
  enabled?: boolean;
}

export function useClubTeams({
  clubId,
  params,
  enabled = true,
}: UseClubTeamsOptions) {
  const query = useQuery({
    queryKey: clubTeamKeys.list(clubId!, params),
    queryFn: () => fetchClubTeams(clubId!, params),
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
