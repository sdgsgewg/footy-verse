import { apiClient } from "./client";
import {
  createClubSchema,
  updateClubSchema,
} from "../validations/clubs.schema";
import { Club } from "../repositories/clubs.repo";

// clubs
export const fetchClubs = async () => {
  const { data } = await apiClient.get<{ success: boolean; data: Club[] }>("/clubs");

  return data.data;
};

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

export const deleteClub = async (id: string) => {
  await apiClient.delete(`/clubs/${id}`);
};
