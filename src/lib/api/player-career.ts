import {
  createPlayerCareerSchema,
  updatePlayerCareerSchema,
} from "../validations/player-careers.schema";
import { apiClient } from "./client";
import {
  PlayerCareerDetailResponse,
  PlayerCareerListItem,
} from "@/types/player-career";

export const fetchPlayerCareers = async (
  playerId: string,
): Promise<PlayerCareerListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerCareerListItem[];
  }>(`/players/${playerId}/careers`);

  return data.data;
};

export const fetchPlayerCareerById = async (
  playerId: string,
  careerId: string,
): Promise<PlayerCareerDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerCareerDetailResponse;
  }>(`/players/${playerId}/careers/${careerId}`);

  return data.data;
};

export const createPlayerCareer = async (
  playerId: string,
  payload: unknown,
) => {
  const parsed = createPlayerCareerSchema.parse(payload); // validation

  await apiClient.post(`/players/${playerId}/careers`, parsed);
};

export const updatePlayerCareer = async (
  playerId: string,
  careerId: string,
  payload: unknown,
) => {
  const parsed = updatePlayerCareerSchema.parse(payload); // validation

  await apiClient.put(`/players/${playerId}/careers/${careerId}`, parsed);
};

export const deletePlayerCareer = async (
  playerId: string,
  careerId: string,
) => {
  await apiClient.delete(`/players/${playerId}/careers/${careerId}`);
};
