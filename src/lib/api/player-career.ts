import {
  createPlayerCareerSchema,
  updatePlayerCareerSchema,
} from "../validations/player-careers.schema";
import { apiClient } from "./client";
import {
  PlayerCareerDetailResponse,
  PlayerCareerListItem,
  UpsertPlayerCareerInput,
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
  careerId: string,
  playerId: string,
): Promise<PlayerCareerDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerCareerDetailResponse;
  }>(`/players/${playerId}/careers/${careerId}`);

  return data.data;
};

export const createPlayerCareer = async (
  playerId: string,
  payload: UpsertPlayerCareerInput,
) => {
  const parsed = createPlayerCareerSchema.parse(payload); // validation

  await apiClient.post(`/players/${playerId}/careers`, parsed);
};

export const updatePlayer = async (
  careerId: string,
  playerId: string,
  payload: UpsertPlayerCareerInput,
) => {
  const parsed = updatePlayerCareerSchema.parse(payload); // validation

  await apiClient.put(`/players/${playerId}/careers/${careerId}`, parsed);
};

export const deletePlayer = async (careerId: string, playerId: string) => {
  await apiClient.delete(`/players/${playerId}/careers/${careerId}`);
};
