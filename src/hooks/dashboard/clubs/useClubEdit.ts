import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { clubKeys } from "@/lib/react-query/keys/clubKeys";
import { fetchClubEdit } from "@/lib/api/club";

export function useClubEdit(id: string, enabled = true) {
  const query = useQuery({
    queryKey: clubKeys.edit(id),
    queryFn: () => fetchClubEdit(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    club: query.data ?? null,
  };
}
