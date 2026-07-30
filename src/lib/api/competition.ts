import {
  CompetitionDetailResponse,
  CompetitionEditResponse,
  CompetitionListResponse,
  CompetitionQuery,
} from "@/types/competition";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api";
import {
  createCompetitionSchema,
  updateCompetitionSchema,
} from "../validations/competitions.schema";

const baseRoute = `/competitions`;
const baseRouteWithApi = `/api/competitions`;

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
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}`, {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to create Competition");
    }

    return;
  }

  const parsed = createCompetitionSchema.parse(payload); // validation

  await apiClient.post(`${baseRoute}`, parsed);
};

export const updateCompetition = async (id: string, payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}/${id}`, {
      method: "PUT",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to update Competition");
    }

    return;
  }

  const parsed = updateCompetitionSchema.parse(payload); // validation

  await apiClient.put(`${baseRoute}/${id}`, parsed);
};

export const deleteCompetition = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
