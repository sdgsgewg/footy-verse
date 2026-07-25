import { apiClient } from "./client";
import {
  createNationalitySchema,
  updateNationalitySchema,
} from "../validations/nationalities.schema";
import {
  NationalityDetailResponse,
  NationalityEditResponse,
  NationalityListResponse,
  NationalityQuery,
} from "@/types/nationality";
import { ApiResponse } from "@/types/api";

const baseRoute = `/nationalities`;
const baseRouteWithApi = `/api/nationalities`;

/**
 *
 * @param params
 * @returns NationalityListItem[]
 */
export const fetchNationalities = async (
  params?: NationalityQuery,
): Promise<NationalityListResponse> => {
  const { data } = await apiClient.get<ApiResponse<NationalityListResponse>>(
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
 * @returns NationalityEditResponse | null
 */
export const fetchNationalityEdit = async (
  id: string,
): Promise<NationalityEditResponse | null> => {
  const { data } = await apiClient.get<ApiResponse<NationalityEditResponse>>(
    `${baseRoute}/${id}/edit`,
  );

  return data.data;
};

/**
 *
 * @param id
 * @returns NationalityDetailResponse | null
 */
export const fetchNationalityDetail = async (
  id: string,
): Promise<NationalityDetailResponse | null> => {
  const { data } = await apiClient.get<ApiResponse<NationalityDetailResponse>>(
    `${baseRoute}/${id}`,
  );

  return data.data;
};

export const createNationality = async (payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}`, {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to create nationality");
    }

    return;
  }

  const parsed = createNationalitySchema.parse(payload); // validation

  await apiClient.post(`${baseRoute}`, parsed);
};

export const updateNationality = async (id: string, payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}/${id}`, {
      method: "PUT",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to update nationality");
    }

    return;
  }

  const parsed = updateNationalitySchema.parse(payload); // validation

  await apiClient.put(`${baseRoute}/${id}`, parsed);
};

export const deleteNationality = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
