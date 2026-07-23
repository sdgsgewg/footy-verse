import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { nationalTeamKeys } from "@/lib/react-query/keys/nationalTeamKeys";
import { fetchNationalTeamEdit } from "@/lib/api/national-team";

interface UseNationalTeamOptions {
  nationId: string;
  teamId: string;
  enabled?: boolean;
}

export function useNationalTeamEdit({
  nationId,
  teamId,
  enabled = true,
}: UseNationalTeamOptions) {
  const query = useQuery({
    queryKey: nationalTeamKeys.edit(nationId, teamId),
    queryFn: () => fetchNationalTeamEdit(nationId, teamId),
    enabled: enabled && !!nationId && !!teamId,
    ...queryConfig,
  });

  return {
    ...query,
    nationalTeam: query.data ?? null,
  };
}
