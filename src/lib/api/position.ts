import { apiClient } from "./client";
import {
  createPositionSchema,
  updatePositionSchema,
} from "../validations/positions.schema";
import { Position } from "../repositories/positions.repo";

export const fetchPositions = async () => {
  const { data } = await apiClient.get<{ success: boolean; data: Position[] }>("/positions");

  return data.data;
};

export const createPosition = async (payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch("/api/positions", {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to create position");
    }

    return;
  }

  const parsed = createPositionSchema.parse(payload); // validation

  await apiClient.post("/positions", parsed);
};

export const updatePosition = async (id: string, payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch(`/api/positions/${id}`, {
      method: "PUT",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to update club");
    }

    return;
  }

  const parsed = updatePositionSchema.parse(payload); // validation

  await apiClient.put(`/positions/${id}`, parsed);
};

export const deletePosition = async (id: string) => {
  await apiClient.delete(`/positions/${id}`);
};
