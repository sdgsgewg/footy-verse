import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import { GlobalSearchResponse } from "@/types/search";

export const fetchGlobalSearch = async (
  query: string,
): Promise<GlobalSearchResponse> => {
  const { data } = await apiClient.get<ApiResponse<GlobalSearchResponse>>(
    "/search",
    {
      params: {
        q: query,
      },
    },
  );

  return data.data;
};
