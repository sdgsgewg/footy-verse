import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query/config/queryConfig";
import { ActivityLogQuery } from "@/types/activity-log";
import { activityLogKeys } from "@/lib/react-query/keys/activityLogKeys";
import { fetchActivityLogs } from "@/lib/api/activity-log";

export function useActivityLogs(params?: ActivityLogQuery) {
  const { data, isLoading, isRefetching, error, refetch } = useQuery({
    queryKey: activityLogKeys.list(params),
    queryFn: () => fetchActivityLogs(params),
    ...queryConfig,
  });

  return {
    activityLogs: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? 20,

    loading: isLoading,
    retrying: isRefetching,
    loadError: error ?? null,
    retryLoad: refetch,
  };
}
