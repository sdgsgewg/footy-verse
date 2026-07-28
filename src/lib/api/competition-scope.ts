import {
  CompetitionScopeDetailResponse,
  CompetitionScopeEditResponse,
  CompetitionScopeListItem,
  CompetitionScopeQuery,
} from "@/types/competition-scope";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api";
import {
  createCompetitionScopeSchema,
  updateCompetitionScopeSchema,
} from "../validations/competition-scopes.schema";

const baseRoute = "/competitions/scopes";

/**
 *
 * @param params
 * @returns CompetitionScopeListItem[]
 */
export const fetchCompetitionScopes = async (
  params?: CompetitionScopeQuery,
): Promise<CompetitionScopeListItem[]> => {
  const { data } = await apiClient.get<ApiResponse<CompetitionScopeListItem[]>>(
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
 * @returns CompetitionEditResponse
 */
export const fetchCompetitionScopeEdit = async (
  id: string,
): Promise<CompetitionScopeEditResponse> => {
  const { data } = await apiClient.get<
    ApiResponse<CompetitionScopeEditResponse>
  >(`${baseRoute}/${id}/edit`);

  return data.data;
};

/**
 *
 * @param id
 * @returns CompetitionDetailResponse
 */
export const fetchCompetitionScopeDetail = async (
  id: string,
): Promise<CompetitionScopeDetailResponse> => {
  const { data } = await apiClient.get<
    ApiResponse<CompetitionScopeDetailResponse>
  >(`${baseRoute}/${id}`);

  return data.data;
};

export const createCompetitionScope = async (payload: unknown) => {
  const parsed = createCompetitionScopeSchema.parse(payload); // validation
  await apiClient.post(`${baseRoute}`, parsed);
};

export const updateCompetitionScope = async (id: string, payload: unknown) => {
  const parsed = updateCompetitionScopeSchema.parse(payload); // validation
  await apiClient.put(`${baseRoute}}/${id}`, parsed);
};

export const deleteCompetitionScope = async (id: string) => {
  await apiClient.delete(`${baseRoute}}/${id}`);
};
