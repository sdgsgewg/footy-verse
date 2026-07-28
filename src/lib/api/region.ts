import {
  RegionDetailResponse,
  RegionEditResponse,
  RegionListItem,
  RegionQuery,
} from "@/types/region";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api";
import {
  createRegionSchema,
  updateRegionSchema,
} from "../validations/regions.schema";

const baseRoute = `/regions`;
const baseRouteWithApi = `/api/regions`;

/**
 *
 * @param params
 * @returns RegionListItem[]
 */
export const fetchRegions = async (
  params?: RegionQuery,
): Promise<RegionListItem[]> => {
  const { data } = await apiClient.get<ApiResponse<RegionListItem[]>>(
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
 * @returns RegionEditResponse | null
 */
export const fetchRegionEdit = async (
  id: string,
): Promise<RegionEditResponse | null> => {
  const { data } = await apiClient.get<ApiResponse<RegionEditResponse>>(
    `${baseRoute}/${id}/edit`,
  );

  return data.data;
};

/**
 *
 * @param id
 * @returns RegionDetailResponse | null
 */
export const fetchRegionDetail = async (
  id: string,
): Promise<RegionDetailResponse | null> => {
  const { data } = await apiClient.get<ApiResponse<RegionDetailResponse>>(
    `${baseRoute}/${id}`,
  );

  return data.data;
};

export const createRegion = async (payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}`, {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to create region");
    }

    return;
  }

  const parsed = createRegionSchema.parse(payload); // validation

  await apiClient.post(`${baseRoute}`, parsed);
};

export const updateRegion = async (id: string, payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}/${id}`, {
      method: "PUT",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to update region");
    }

    return;
  }

  const parsed = updateRegionSchema.parse(payload); // validation

  await apiClient.put(`${baseRoute}/${id}`, parsed);
};

export const deleteRegion = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
