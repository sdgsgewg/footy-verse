"use client";

import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { positionKeys } from "@/lib/react-query/keys/positionKeys";
import { fetchPositionEdit } from "@/lib/api/position";

export function usePositionEdit(id: string, enabled = true) {
  const query = useQuery({
    queryKey: positionKeys.edit(id),
    queryFn: () => fetchPositionEdit(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    position: query.data ?? null,
  };
}
