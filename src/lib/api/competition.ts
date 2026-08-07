import {
  CompetitionDetailResponse,
  CompetitionEditResponse,
  CompetitionListResponse,
  CompetitionQuery,
} from "@/types/competition";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api";

const baseRoute = `/competitions`;

/**
 *
 * @param params
 * @returns CompetitionListResponse
 */
export const fetchCompetitions = async (
  params?: CompetitionQuery,
): Promise<CompetitionListResponse> => {
  const { data } = await apiClient.get<ApiResponse<CompetitionListResponse>>(
    `${baseRoute}`,
    {
      params,
    },
  );

  return data.data;
};

/**
 *
 * @param id
 * @returns CompetitionEditResponse | null
 */
export const fetchCompetitionEdit = async (
  id: string,
): Promise<CompetitionEditResponse | null> => {
  const { data } = await apiClient.get<ApiResponse<CompetitionEditResponse>>(
    `${baseRoute}/${id}/edit`,
  );

  return data.data;
};

/**
 *
 * @param id
 * @returns CompetitionDetailResponse | null
 */
export const fetchCompetitionDetail = async (
  id: string,
): Promise<CompetitionDetailResponse | null> => {
  const { data } = await apiClient.get<ApiResponse<CompetitionDetailResponse>>(
    `${baseRoute}/${id}`,
  );

  return data.data;
};

export const createCompetition = async (payload: unknown) => {
  await apiClient.post(`${baseRoute}`, payload);
};

export const updateCompetition = async (id: string, payload: unknown) => {
  await apiClient.put(`${baseRoute}/${id}`, payload);
};

export const deleteCompetition = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
