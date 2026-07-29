import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { confederationKeys } from "@/lib/react-query/keys/confederationKeys";
import { fetchConfederationEdit } from "@/lib/api/confederation";

export function useConfederationEdit(id: string, enabled = true) {
  const query = useQuery({
    queryKey: confederationKeys.edit(id),
    queryFn: () => fetchConfederationEdit(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    confederation: query.data ?? null,
  };
}
