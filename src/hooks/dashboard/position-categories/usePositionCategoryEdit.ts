"use client";

import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { positionCategoryKeys } from "@/lib/react-query/keys/positionCategoryKeys";
import { fetchPositionCategoryEdit } from "@/lib/api/position-category";

export function usePositionCategoryEdit(id: string, enabled = true) {
  const query = useQuery({
    queryKey: positionCategoryKeys.edit(id),
    queryFn: () => fetchPositionCategoryEdit(id!),
    enabled: enabled && !!id,
    ...queryConfig,
  });

  return {
    ...query,
    positionCategory: query.data ?? null,
  };
}
