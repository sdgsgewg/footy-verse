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

const baseRoute = "/player-careers";

export const fetchPlayerCareers = async (): Promise<PlayerCareerListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerCareerListItem[];
  }>(baseRoute);

  return data.data;
};

export const fetchPlayerCareerById = async (
  id: string,
): Promise<PlayerCareerDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerCareerDetailResponse;
  }>(`${baseRoute}/${id}`);

  return data.data;
};

export const createPlayerCareer = async (payload: UpsertPlayerCareerInput) => {
  const parsed = createPlayerCareerSchema.parse(payload); // validation

  await apiClient.post(baseRoute, parsed);
};

export const updatePlayer = async (
  id: string,
  payload: UpsertPlayerCareerInput,
) => {
  const parsed = updatePlayerCareerSchema.parse(payload); // validation

  await apiClient.put(`${baseRoute}/${id}`, parsed);
};

export const deletePlayer = async (id: string) => {
  await apiClient.delete(`${baseRoute}/${id}`);
};
