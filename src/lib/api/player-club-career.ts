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
 * @param playerClubCareerId
 * @returns PlayerClubCareerEditResponse
 */
export const fetchPlayerClubCareerEdit = async (
  playerId: string,
  playerClubCareerId: string,
): Promise<PlayerClubCareerEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerClubCareerEditResponse;
  }>(`/players/${playerId}/club-careers/${playerClubCareerId}/edit`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param playerClubCareerId
 * @returns PlayerClubCareerDetailResponse
 */
export const fetchPlayerClubCareerDetail = async (
  playerId: string,
  playerClubCareerId: string,
): Promise<PlayerClubCareerDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerClubCareerDetailResponse;
  }>(`/players/${playerId}/club-careers/${playerClubCareerId}`);

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
 * @param playerClubCareerId
 * @param payload
 */
export const updatePlayerClubCareer = async (
  playerId: string,
  playerClubCareerId: string,
  payload: unknown,
) => {
  const parsed = updatePlayerClubCareerSchema.parse(payload); // validation

  await apiClient.put(
    `/players/${playerId}/club-careers/${playerClubCareerId}`,
    parsed,
  );
};

/**
 *
 * @param playerId
 * @param playerClubCareerId
 */
export const deletePlayerClubCareer = async (
  playerId: string,
  playerClubCareerId: string,
) => {
  await apiClient.delete(
    `/players/${playerId}/club-careers/${playerClubCareerId}`,
  );
};
