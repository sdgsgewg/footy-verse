import { apiClient } from "./client";
import {
  createPlayerSchema,
  updatePlayerSchema,
} from "../validations/players.schema";
import { PlayerWithDetails } from "../repositories/players.repo";

export const fetchPlayers = async (): Promise<PlayerWithDetails[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerWithDetails[];
  }>("/players");

  return data.data;
};

export const fetchPlayerById = async (
  id: string,
): Promise<PlayerWithDetails> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerWithDetails;
  }>(`/players/${id}`);

  return data.data;
};

export const createPlayer = async (payload: unknown) => {
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

export const updatePlayer = async (id: string, payload: unknown) => {
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

export const deletePlayer = async (id: string) => {
  await apiClient.delete(`/players/${id}`);
};
