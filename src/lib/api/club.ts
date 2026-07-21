import { apiClient } from "./client";
import {
  createClubSchema,
  updateClubSchema,
} from "../validations/clubs.schema";
import {
  ClubDetailResponse,
  ClubEditResponse,
  ClubListItem,
  GetClubsParams,
} from "@/types/club";

/**
 *
 * @param params
 * @returns ClubListItem[]
 */
export const fetchClubs = async (
  params?: GetClubsParams,
): Promise<ClubListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: ClubListItem[];
  }>("/clubs", {
    params,
  });

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
    const response = await fetch("/api/clubs", {
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

  await apiClient.post("/clubs", parsed);
};

/**
 *
 * @param id
 * @param payload
 * @returns void
 */
export const updateClub = async (id: string, payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch(`/api/clubs/${id}`, {
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

  await apiClient.put(`/clubs/${id}`, parsed);
};

/**
 *
 * @param id
 */
export const deleteClub = async (id: string) => {
  await apiClient.delete(`/clubs/${id}`);
};
