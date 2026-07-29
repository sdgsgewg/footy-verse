import {
  ConfederationDetailResponse,
  ConfederationEditResponse,
  ConfederationListItem,
  ConfederationQuery,
} from "@/types/confederation";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api";
import {
  createConfederationSchema,
  updateConfederationSchema,
} from "../validations/confederations.schema";

const baseRoute = `/confederations`;
const baseRouteWithApi = `/api/confederations`;

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
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}`, {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to create confederation");
    }

    return;
  }

  const parsed = createConfederationSchema.parse(payload); // validation

  await apiClient.post(`${baseRoute}`, parsed);
};

export const updateConfederation = async (id: string, payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}/${id}`, {
      method: "PUT",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to update confederation");
    }

    return;
  }

  const parsed = updateConfederationSchema.parse(payload); // validation

  await apiClient.put(`${baseRoute}/${id}`, parsed);
};

export const deleteConfederation = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
