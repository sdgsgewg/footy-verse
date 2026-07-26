import {
  createPlayerClubCareerSchema,
  updatePlayerClubCareerSchema,
} from "../validations/player-club-careers.schema";
import { apiClient } from "./client";
import {
  PlayerClubCareerDetailResponse,
  PlayerClubCareerEditResponse,
  PlayerClubCareerListItem,
} from "@/types/player-club-career";

/**
 *
 * @param playerId
 * @returns PlayerClubCareerListItem[]
 */
export const fetchPlayerClubCareers = async (
  playerId: string,
): Promise<PlayerClubCareerListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerClubCareerListItem[];
  }>(`/players/${playerId}/club-careers`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param careerId
 * @returns PlayerClubCareerEditResponse
 */
export const fetchPlayerClubCareerEdit = async (
  playerId: string,
  careerId: string,
): Promise<PlayerClubCareerEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerClubCareerEditResponse;
  }>(`/players/${playerId}/club-careers/${careerId}/edit`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param careerId
 * @returns PlayerClubCareerDetailResponse
 */
export const fetchPlayerClubCareerDetail = async (
  playerId: string,
  careerId: string,
): Promise<PlayerClubCareerDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerClubCareerDetailResponse;
  }>(`/players/${playerId}/club-careers/${careerId}`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param payload
 */
export const createPlayerClubCareer = async (
  playerId: string,
  payload: unknown,
) => {
  const parsed = createPlayerClubCareerSchema.parse(payload); // validation

  await apiClient.post(`/players/${playerId}/club-careers`, parsed);
};

/**
 *
 * @param playerId
 * @param careerId
 * @param payload
 */
export const updatePlayerClubCareer = async (
  playerId: string,
  careerId: string,
  payload: unknown,
) => {
  const parsed = updatePlayerClubCareerSchema.parse(payload); // validation

  await apiClient.put(`/players/${playerId}/club-careers/${careerId}`, parsed);
};

/**
 *
 * @param playerId
 * @param careerId
 */
export const deletePlayerClubCareer = async (
  playerId: string,
  careerId: string,
) => {
  await apiClient.delete(`/players/${playerId}/club-careers/${careerId}`);
};
