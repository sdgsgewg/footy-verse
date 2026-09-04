import { HomeStatisticsResponse } from "@/types/statistics";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api";

const baseRoute = "/statistics";

export const fetchHomeStatistics =
  async (): Promise<HomeStatisticsResponse> => {
    const { data } = await apiClient.get<ApiResponse<HomeStatisticsResponse>>(
      `${baseRoute}/summary`,
    );

    return data.data;
  };
