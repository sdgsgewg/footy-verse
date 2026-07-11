import { SeasonListItem } from "@/types/season";
import { apiClient } from "./client";
import {
  createSeasonSchema,
  updateSeasonSchema,
} from "../validations/seasons.schema";

export const fetchSeasons = async (): Promise<SeasonListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: SeasonListItem[];
  }>("/seasons");

  return data.data;
};

export const createSeason = async (payload: unknown) => {
  const parsed = createSeasonSchema.parse(payload); // validation
  await apiClient.post("/seasons", parsed);
};

export const updateSeason = async (id: string, payload: unknown) => {
  const parsed = updateSeasonSchema.parse(payload); // validation
  await apiClient.put(`/seasons/${id}`, parsed);
};

export const deleteSeason = async (id: string) => {
  await apiClient.delete(`/seasons/${id}`);
};
