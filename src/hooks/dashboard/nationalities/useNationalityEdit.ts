import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { nationalityKeys } from "@/lib/react-query/keys/nationalityKeys";
import { fetchNationalityEdit } from "@/lib/api/nationality";

export function useNationalityEdit(id: string, enabled = true) {
  const query = useQuery({
    queryKey: nationalityKeys.edit(id),
    queryFn: () => fetchNationalityEdit(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    nationality: query.data ?? null,
  };
}
