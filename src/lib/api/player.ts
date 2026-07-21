import { apiClient } from "./client";
import {
  createPlayerSchema,
  updatePlayerSchema,
} from "../validations/players.schema";
import {
  GetPlayersParams,
  PlayerDetailResponse,
  PlayerEditResponse,
  PlayerListItem,
} from "@/types/player";

/**
 *
 * @param params
 * @returns PlayerListItem[]
 */
export const fetchPlayers = async (
  params?: GetPlayersParams,
): Promise<PlayerListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerListItem[];
  }>("/players", {
    params,
  });

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
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerEditResponse;
  }>(`/players/${id}/edit`);

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
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerDetailResponse;
  }>(`/players/${id}`);

  return data.data;
};

/**
 *
 * @param payload
 * @returns void
 */
export const createPlayer = async (payload: unknown): Promise<void> => {
  if (payload instanceof FormData) {
    const response = await fetch("/api/players", {
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

  await apiClient.post("/players", parsed);
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
    const response = await fetch(`/api/players/${id}`, {
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

  await apiClient.put(`/players/${id}`, parsed);
};

/**
 *
 * @param id
 */
export const deletePlayer = async (id: string): Promise<void> => {
  await apiClient.delete(`/players/${id}`);
};
