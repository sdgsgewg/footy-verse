import {
  CompetitionCategoryDetailResponse,
  CompetitionCategoryEditResponse,
  CompetitionCategoryListItem,
  CompetitionCategoryQuery,
} from "@/types/competition-category";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api";
import {
  createCompetitionCategorySchema,
  updateCompetitionCategorySchema,
} from "../validations/competition-categories.schema";
import { Option } from "@/types/option";

const baseRoute = "/competitions/categories";

/**
 *
 * @param params
 * @returns CompetitionCategoryListItem[]
 */
export const fetchCompetitionCategories = async (
  params?: CompetitionCategoryQuery,
): Promise<CompetitionCategoryListItem[]> => {
  const { data } = await apiClient.get<
    ApiResponse<CompetitionCategoryListItem[]>
  >(`${baseRoute}`, {
    params,
  });

  return data.data;
};

/**
 *
 * @returns Option[]
 */
export const fetchCompetitionCategoryOptions = async (): Promise<Option[]> => {
  const { data } = await apiClient.get<ApiResponse<Option[]>>(
    `${baseRoute}/options`,
  );

  return data.data;
};

/**
 *
 * @param id
 * @returns CompetitionEditResponse
 */
export const fetchCompetitionCategoryEdit = async (
  id: string,
): Promise<CompetitionCategoryEditResponse> => {
  const { data } = await apiClient.get<
    ApiResponse<CompetitionCategoryEditResponse>
  >(`${baseRoute}/${id}/edit`);

  return data.data;
};

/**
 *
 * @param id
 * @returns CompetitionDetailResponse
 */
export const fetchCompetitionCategoryDetail = async (
  id: string,
): Promise<CompetitionCategoryDetailResponse> => {
  const { data } = await apiClient.get<
    ApiResponse<CompetitionCategoryDetailResponse>
  >(`${baseRoute}/${id}`);

  return data.data;
};

export const createCompetitionCategory = async (payload: unknown) => {
  const parsed = createCompetitionCategorySchema.parse(payload); // validation
  await apiClient.post(`${baseRoute}`, parsed);
};

export const updateCompetitionCategory = async (
  id: string,
  payload: unknown,
) => {
  const parsed = updateCompetitionCategorySchema.parse(payload); // validation
  await apiClient.put(`${baseRoute}}/${id}`, parsed);
};

export const deleteCompetitionCategory = async (id: string) => {
  await apiClient.delete(`${baseRoute}}/${id}`);
};
