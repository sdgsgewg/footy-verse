import { apiClient } from "./client";
import {
  createPlayerSchema,
  updatePlayerSchema,
} from "../validations/players.schema";
import {
  GetPlayersParams,
  PlayerDetailResponse,
  PlayerEditResponse,
  PlayerListResponse,
} from "@/types/player";
import { ApiResponse } from "@/types/api";

const baseRoute = "/players";
const baseRouteWithApi = "/api/players";

/**
 *
 * @param params
 * @returns PlayerListResponse
 */
export const fetchPlayers = async (
  params?: GetPlayersParams,
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
export const createPlayer = async (payload: unknown): Promise<void> => {
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}`, {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to create player");
    }

    return;
  }

  const parsed = createPlayerSchema.parse(payload); // validation

  await apiClient.post(`${baseRoute}`, parsed);
};

/**
 *
 * @param id
 * @param payload
 * @returns void
 */
export const updatePlayer = async (
  id: string,
  payload: unknown,
): Promise<void> => {
  if (payload instanceof FormData) {
    const response = await fetch(`${baseRouteWithApi}/${id}`, {
      method: "PUT",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to update player");
    }

    return;
  }

  const parsed = updatePlayerSchema.parse(payload); // validation

  await apiClient.put(`${baseRoute}/${id}`, parsed);
};

/**
 *
 * @param id
 */
export const deletePlayer = async (id: string): Promise<void> => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
