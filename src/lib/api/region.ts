import {
  RegionDetailResponse,
  RegionEditResponse,
  RegionListItem,
  RegionQuery,
} from "@/types/region";
import { apiClient } from "./client";
import { ApiResponse } from "@/types/api";

const baseRoute = `/regions`;

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

export const createRegion = async (payload: FormData) => {
  await apiClient.post(`${baseRoute}`, payload);
};

export const updateRegion = async (id: string, payload: FormData) => {
  await apiClient.put(`${baseRoute}/${id}`, payload);
};

export const deleteRegion = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
