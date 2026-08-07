import { apiClient } from "./client";
import { ClubDetailResponse, ClubEditResponse, ClubQuery } from "@/types/club";
import { ApiResponse } from "@/types/api";
import { ClubListResponse } from "@/types/club/responses";

const baseRoute = "/clubs";

/**
 *
 * @param params
 * @returns ClubListResponse
 */
export const fetchClubs = async (
  params?: ClubQuery,
): Promise<ClubListResponse> => {
  const { data } = await apiClient.get<ApiResponse<ClubListResponse>>(
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
 * @returns ClubEditResponse
 */
export const fetchClubEdit = async (id: string): Promise<ClubEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: ClubEditResponse;
  }>(`${baseRoute}/${id}/edit`);

  return data.data;
};

/**
 *
 * @param id
 * @returns ClubDetailResponse
 */
export const fetchClubDetail = async (
  id: string,
): Promise<ClubDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: ClubDetailResponse;
  }>(`${baseRoute}/${id}`);

  return data.data;
};

/**
 *
 * @param payload
 * @returns void
 */
export const createClub = async (payload: FormData) => {
  await apiClient.post(`${baseRoute}`, payload);
};

/**
 *
 * @param id
 * @param payload
 * @returns void
 */
export const updateClub = async (id: string, payload: FormData) => {
  await apiClient.put(`${baseRoute}/${id}`, payload);
};

/**
 *
 * @param id
 */
export const deleteClub = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
