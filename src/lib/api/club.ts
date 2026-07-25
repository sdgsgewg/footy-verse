import { apiClient } from "./client";
import {
  createClubSchema,
  updateClubSchema,
} from "../validations/clubs.schema";
import { ClubDetailResponse, ClubEditResponse, ClubQuery } from "@/types/club";
import { ApiResponse } from "@/types/api";
import { ClubListResponse } from "@/types/club/responses";

const baseRoute = "/clubs";
const baseRouteWithApi = "/api/clubs";

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
  }>(`/clubs/${id}/edit`);

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
  }>(`/clubs/${id}`);

  return data.data;
};

/**
 *
 * @param payload
 * @returns void
 */
export const createClub = async (payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}`, {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to create club");
    }

    return;
  }

  const parsed = createClubSchema.parse(payload); // validation

  await apiClient.post(`${baseRoute}`, parsed);
};

/**
 *
 * @param id
 * @param payload
 * @returns void
 */
export const updateClub = async (id: string, payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}/${id}`, {
      method: "PUT",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to update club");
    }

    return;
  }

  const parsed = updateClubSchema.parse(payload); // validation

  await apiClient.put(`${baseRoute}/${id}`, parsed);
};

/**
 *
 * @param id
 */
export const deleteClub = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
