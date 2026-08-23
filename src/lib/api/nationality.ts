import { apiClient } from "./client";
import {
  NationalityDetailResponse,
  NationalityEditResponse,
  NationalityListResponse,
  NationalityQuery,
} from "@/types/nationality";
import { ApiResponse } from "@/types/api";
import { Option } from "@/types/option";

const baseRoute = `/nationalities`;

/**
 *
 * @param params
 * @returns NationalityListResponse
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
 * @returns Option[]
 */
export const fetchNationalityOptions = async (): Promise<Option[]> => {
  const { data } = await apiClient.get<ApiResponse<Option[]>>(
    `${baseRoute}/options`,
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

export const createNationality = async (payload: FormData) => {
  await apiClient.post(`${baseRoute}`, payload);
};

export const updateNationality = async (id: string, payload: FormData) => {
  await apiClient.put(`${baseRoute}/${id}`, payload);
};

export const deleteNationality = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
