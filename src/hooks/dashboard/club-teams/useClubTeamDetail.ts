import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { clubTeamKeys } from "@/lib/react-query/keys/clubTeamKeys";
import { fetchClubTeamDetail } from "@/lib/api/club-team";

interface UseClubTeamOptions {
  clubId: string;
  teamId: string;
  enabled?: boolean;
}

export function useClubTeamDetail({
  clubId,
  teamId,
  enabled = true,
}: UseClubTeamOptions) {
  const query = useQuery({
    queryKey: clubTeamKeys.detail(clubId, teamId),
    queryFn: () => fetchClubTeamDetail(clubId, teamId),
    enabled: enabled && !!clubId && !!teamId,
    ...queryConfig,
  });

  return {
    ...query,
    clubTeam: query.data ?? null,
  };
}
