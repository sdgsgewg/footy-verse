import { apiClient } from "./client";
import {
  PositionDetailResponse,
  PositionEditResponse,
  PositionListItem,
  PositionQuery,
} from "@/types/position";
import { ApiResponse } from "@/types/api";

const baseRoute = "/positions";

/**
 *
 * @param params
 * @returns PositionListItem[]
 */
export const fetchPositions = async (
  params?: PositionQuery,
): Promise<PositionListItem[]> => {
  const { data } = await apiClient.get<ApiResponse<PositionListItem[]>>(
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
 * @returns PositionEditResponse
 */
export const fetchPositionEdit = async (
  id: string,
): Promise<PositionEditResponse> => {
  const { data } = await apiClient.get<ApiResponse<PositionEditResponse>>(
    `${baseRoute}/${id}/edit`,
  );

  return data.data;
};

/**
 *
 * @param id
 * @returns PositionDetailResponse
 */
export const fetchPositionDetail = async (
  id: string,
): Promise<PositionDetailResponse> => {
  const { data } = await apiClient.get<ApiResponse<PositionDetailResponse>>(
    `${baseRoute}/${id}`,
  );

  return data.data;
};

export const createPosition = async (payload: unknown) => {
  await apiClient.post(`${baseRoute}`, payload);
};

export const updatePosition = async (id: string, payload: unknown) => {
  await apiClient.put(`${baseRoute}/${id}`, payload);
};

export const reorderPositions = async (payload: unknown) => {
  await apiClient.put(`${baseRoute}/reorder`, payload);
};

export const deletePosition = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
