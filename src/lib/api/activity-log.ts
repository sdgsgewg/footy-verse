import {
  ActivityLogListResponse,
  ActivityLogQuery,
} from "@/types/activity-log";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api";

const baseRoute = `/activity-logs`;

/**
 *
 * @param params
 * @returns ActivityLogListResponse
 */
export const fetchActivityLogs = async (
  params?: ActivityLogQuery,
): Promise<ActivityLogListResponse> => {
  const { data } = await apiClient.get<ApiResponse<ActivityLogListResponse>>(
    `${baseRoute}`,
    {
      params,
    },
  );

  return data.data;
};
