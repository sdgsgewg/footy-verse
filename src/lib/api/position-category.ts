import {
  PositionCategoryDetailResponse,
  PositionCategoryEditResponse,
  PositionCategoryListItem,
  PositionCategoryQuery,
} from "@/types/position-category";
import { apiClient } from "./client";

import { ApiResponse } from "@/types/api";
import {
  createPositionCategorySchema,
  updatePositionCategorySchema,
} from "../validations/position-categories.schema";
import { Option } from "@/types/option";

const baseRoute = "/positions/categories";

/**
 *
 * @param params
 * @returns PositionCategoryListItem[]
 */
export const fetchPositionCategories = async (
  params?: PositionCategoryQuery,
): Promise<PositionCategoryListItem[]> => {
  const { data } = await apiClient.get<ApiResponse<PositionCategoryListItem[]>>(
    `${baseRoute}`,
    {
      params,
    },
  );

  return data.data;
};

/**
 *
 * @returns Option[]
 */
export const fetchPositionCategoryOptions = async (): Promise<Option[]> => {
  const { data } = await apiClient.get<ApiResponse<Option[]>>(
    `${baseRoute}/options`,
  );

  return data.data;
};

/**
 *
 * @param id
 * @returns PositionEditResponse
 */
export const fetchPositionCategoryEdit = async (
  id: string,
): Promise<PositionCategoryEditResponse> => {
  const { data } = await apiClient.get<
    ApiResponse<PositionCategoryEditResponse>
  >(`${baseRoute}/${id}/edit`);

  return data.data;
};

/**
 *
 * @param id
 * @returns PositionDetailResponse
 */
export const fetchPositionCategoryDetail = async (
  id: string,
): Promise<PositionCategoryDetailResponse> => {
  const { data } = await apiClient.get<
    ApiResponse<PositionCategoryDetailResponse>
  >(`${baseRoute}/${id}`);

  return data.data;
};

export const createPositionCategory = async (payload: unknown) => {
  const parsed = createPositionCategorySchema.parse(payload); // validation
  await apiClient.post(`${baseRoute}`, parsed);
};

export const updatePositionCategory = async (id: string, payload: unknown) => {
  const parsed = updatePositionCategorySchema.parse(payload); // validation
  await apiClient.put(`${baseRoute}/${id}`, parsed);
};

export const reorderPositionCategories = async (payload: unknown) => {
  await apiClient.put(`${baseRoute}/reorder`, payload);
};

export const deletePositionCategory = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
