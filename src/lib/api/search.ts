import { apiClient } from "@/lib/api/client";
import { ApiResponse } from "@/types/api";
import { GlobalSearchResponse, SearchSuggestionsResponse } from "@/types/search";

const baseRoute = "/search";

export const fetchGlobalSearch = async (
  query: string,
): Promise<GlobalSearchResponse> => {
  const { data } = await apiClient.get<ApiResponse<GlobalSearchResponse>>(
    baseRoute,
    {
      params: {
        q: query,
      },
    },
  );

  return data.data;
};

export const fetchSearchSuggestions = async (
  query: string,
): Promise<SearchSuggestionsResponse> => {
  const { data } = await apiClient.get<ApiResponse<SearchSuggestionsResponse>>(
    // `${baseRoute}/suggestions`,
    `${baseRoute}/suggestions`,
    {
      params: {
        q: query,
      },
    },
  );

  return data.data;
};
