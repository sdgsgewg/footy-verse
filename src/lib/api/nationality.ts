import { apiClient } from "./client";
import {
  createNationalitySchema,
  updateNationalitySchema,
} from "../validations/nationalities.schema";
import { NationalityListItem } from "@/types/nationality";

export const fetchNationalities = async (): Promise<NationalityListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: NationalityListItem[];
  }>("/nationalities");

  return data.data;
};

export const createNationality = async (payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch("/api/nationalities", {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to create nationality");
    }

    return;
  }

  const parsed = createNationalitySchema.parse(payload); // validation

  await apiClient.post("/nationalities", parsed);
};

export const updateNationality = async (id: string, payload: unknown) => {
  if (payload instanceof FormData) {
    const response = await fetch(`/api/nationalities/${id}`, {
      method: "PUT",
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);

      throw new Error(data?.error ?? "Failed to update nationality");
    }

    return;
  }

  const parsed = updateNationalitySchema.parse(payload); // validation

  await apiClient.put(`/nationalities/${id}`, parsed);
};

export const deleteNationality = async (id: string) => {
  await apiClient.delete(`/nationalities/${id}`);
};
