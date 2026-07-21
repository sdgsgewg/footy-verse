import {
  createPlayerCareerSchema,
  updatePlayerCareerSchema,
} from "../validations/player-careers.schema";
import { apiClient } from "./client";
import {
  PlayerCareerDetailResponse,
  PlayerCareerEditResponse,
  PlayerCareerListItem,
} from "@/types/player-career";

/**
 *
 * @param playerId
 * @returns PlayerCareerListItem[]
 */
export const fetchPlayerCareers = async (
  playerId: string,
): Promise<PlayerCareerListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerCareerListItem[];
  }>(`/players/${playerId}/careers`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param careerId
 * @returns PlayerCareerEditResponse
 */
export const fetchPlayerCareerEdit = async (
  playerId: string,
  careerId: string,
): Promise<PlayerCareerEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerCareerEditResponse;
  }>(`/players/${playerId}/careers/${careerId}/edit`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param careerId
 * @returns PlayerCareerDetailResponse
 */
export const fetchPlayerCareerDetail = async (
  playerId: string,
  careerId: string,
): Promise<PlayerCareerDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerCareerDetailResponse;
  }>(`/players/${playerId}/careers/${careerId}`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param payload
 */
export const createPlayerCareer = async (
  playerId: string,
  payload: unknown,
) => {
  const parsed = createPlayerCareerSchema.parse(payload); // validation

  await apiClient.post(`/players/${playerId}/careers`, parsed);
};

/**
 *
 * @param playerId
 * @param careerId
 * @param payload
 */
export const updatePlayerCareer = async (
  playerId: string,
  careerId: string,
  payload: unknown,
) => {
  const parsed = updatePlayerCareerSchema.parse(payload); // validation

  await apiClient.put(`/players/${playerId}/careers/${careerId}`, parsed);
};

/**
 *
 * @param playerId
 * @param careerId
 */
export const deletePlayerCareer = async (
  playerId: string,
  careerId: string,
) => {
  await apiClient.delete(`/players/${playerId}/careers/${careerId}`);
};
