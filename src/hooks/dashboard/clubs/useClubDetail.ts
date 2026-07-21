import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { clubKeys } from "@/lib/react-query/keys/clubKeys";
import { fetchClubDetail } from "@/lib/api/club";

export function useClubDetail(id: string, enabled = true) {
  const query = useQuery({
    queryKey: clubKeys.detail(id),
    queryFn: () => fetchClubDetail(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    club: query.data ?? null,
  };
}
