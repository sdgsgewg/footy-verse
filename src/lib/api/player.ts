import { apiClient } from "./client";
import {
  GroupedPlayerListItem,
  GroupedPlayerQuery,
  PlayerDetailResponse,
  PlayerEditResponse,
  PlayerListResponse,
  PlayerQuery,
} from "@/types/player";
import { ApiResponse } from "@/types/api";

const baseRoute = "/players";

/**
 *
 * @param params
 * @returns PlayerListResponse
 */
export const fetchPlayers = async (
  params?: PlayerQuery,
): Promise<PlayerListResponse> => {
  const { data } = await apiClient.get<ApiResponse<PlayerListResponse>>(
    `${baseRoute}`,
    {
      params,
    },
  );

  return data.data;
};

/**
 *
 * @param params
 * @returns GroupedPlayerListItem[]
 */
export const fetchGroupedPlayers = async (
  params?: GroupedPlayerQuery,
): Promise<GroupedPlayerListItem[]> => {
  const { data } = await apiClient.get<ApiResponse<GroupedPlayerListItem[]>>(
    `${baseRoute}/grouped`,
    {
      params,
    },
  );

  return data.data;
};

/**
 *
 * @param id
 * @returns PlayerEditResponse
 */
export const fetchPlayerEdit = async (
  id: string,
): Promise<PlayerEditResponse> => {
  const { data } = await apiClient.get<ApiResponse<PlayerEditResponse>>(
    `${baseRoute}/${id}/edit`,
  );

  return data.data;
};

/**
 *
 * @param id
 * @returns PlayerDetailResponse
 */
export const fetchPlayerDetail = async (
  id: string,
): Promise<PlayerDetailResponse> => {
  const { data } = await apiClient.get<ApiResponse<PlayerDetailResponse>>(
    `${baseRoute}/${id}`,
  );

  return data.data;
};

/**
 *
 * @param payload
 * @returns void
 */
export const createPlayer = async (payload: FormData): Promise<void> => {
  await apiClient.post(`${baseRoute}`, payload);
};

/**
 *
 * @param id
 * @param payload
 * @returns void
 */
export const updatePlayer = async (
  id: string,
  payload: FormData,
): Promise<void> => {
  await apiClient.put(`${baseRoute}/${id}`, payload);
};

/**
 *
 * @param id
 */
export const deletePlayer = async (id: string): Promise<void> => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
