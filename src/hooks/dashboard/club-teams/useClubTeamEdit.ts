import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { clubTeamKeys } from "@/lib/react-query/keys/clubTeamKeys";
import { fetchClubTeamEdit } from "@/lib/api/club-team";

interface UseClubTeamOptions {
  clubId: string;
  teamId: string;
  enabled?: boolean;
}

export function useClubTeamEdit({
  clubId,
  teamId,
  enabled = true,
}: UseClubTeamOptions) {
  const query = useQuery({
    queryKey: clubTeamKeys.edit(clubId, teamId),
    queryFn: () => fetchClubTeamEdit(clubId, teamId),
    enabled: enabled && !!clubId && !!teamId,
    ...queryConfig,
  });

  return {
    ...query,
    clubTeam: query.data ?? null,
  };
}
