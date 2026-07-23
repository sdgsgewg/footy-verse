import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { nationalTeamKeys } from "@/lib/react-query/keys/nationalTeamKeys";
import { fetchNationalTeamDetail } from "@/lib/api/national-team";

interface UseNationalTeamOptions {
  nationId: string;
  teamId: string;
  enabled?: boolean;
}

export function useNationalTeamDetail({
  nationId,
  teamId,
  enabled = true,
}: UseNationalTeamOptions) {
  const query = useQuery({
    queryKey: nationalTeamKeys.detail(nationId, teamId),
    queryFn: () => fetchNationalTeamDetail(nationId, teamId),
    enabled: enabled && !!nationId && !!teamId,
    ...queryConfig,
  });

  return {
    ...query,
    nationalTeam: query.data ?? null,
  };
}
