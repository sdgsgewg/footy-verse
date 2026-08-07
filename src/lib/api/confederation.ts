import {
  ConfederationDetailResponse,
  ConfederationEditResponse,
  ConfederationListItem,
  ConfederationQuery,
} from "@/types/confederation";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api";

const baseRoute = `/confederations`;

/**
 *
 * @param params
 * @returns ConfederationListItem[]
 */
export const fetchConfederations = async (
  params?: ConfederationQuery,
): Promise<ConfederationListItem[]> => {
  const { data } = await apiClient.get<ApiResponse<ConfederationListItem[]>>(
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
 * @returns ConfederationEditResponse | null
 */
export const fetchConfederationEdit = async (
  id: string,
): Promise<ConfederationEditResponse | null> => {
  const { data } = await apiClient.get<ApiResponse<ConfederationEditResponse>>(
    `${baseRoute}/${id}/edit`,
  );

  return data.data;
};

/**
 *
 * @param id
 * @returns ConfederationDetailResponse | null
 */
export const fetchConfederationDetail = async (
  id: string,
): Promise<ConfederationDetailResponse | null> => {
  const { data } = await apiClient.get<
    ApiResponse<ConfederationDetailResponse>
  >(`${baseRoute}/${id}`);

  return data.data;
};

export const createConfederation = async (payload: unknown) => {
  await apiClient.post(`${baseRoute}`, payload);
};

export const updateConfederation = async (id: string, payload: unknown) => {
  await apiClient.put(`${baseRoute}/${id}`, payload);
};

export const deleteConfederation = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
