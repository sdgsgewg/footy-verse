import {
  PlayerNationalTeamCareerDetailResponse,
  PlayerNationalTeamCareerEditResponse,
  PlayerNationalTeamCareerListItem,
} from "@/types/player-national-team-career";
import { apiClient } from "./client";
import {
  createPlayerNationalTeamCareerSchema,
  updatePlayerNationalTeamCareerSchema,
} from "../validations/player-national-team-careers.schema";

/**
 *
 * @param playerId
 * @returns PlayerNationalTeamCareerListItem[]
 */
export const fetchPlayerNationalTeamCareers = async (
  playerId: string,
): Promise<PlayerNationalTeamCareerListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerNationalTeamCareerListItem[];
  }>(`/players/${playerId}/national-team-careers`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param playerNationalTeamCareerId
 * @returns PlayerNationalTeamCareerEditResponse
 */
export const fetchPlayerNationalTeamCareerEdit = async (
  playerId: string,
  playerNationalTeamCareerId: string,
): Promise<PlayerNationalTeamCareerEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerNationalTeamCareerEditResponse;
  }>(
    `/players/${playerId}/national-team-careers/${playerNationalTeamCareerId}/edit`,
  );

  return data.data;
};

/**
 *
 * @param playerId
 * @param playerNationalTeamCareerId
 * @returns PlayerNationalTeamCareerDetailResponse
 */
export const fetchPlayerNationalTeamCareerDetail = async (
  playerId: string,
  playerNationalTeamCareerId: string,
): Promise<PlayerNationalTeamCareerDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerNationalTeamCareerDetailResponse;
  }>(
    `/players/${playerId}/national-team-careers/${playerNationalTeamCareerId}`,
  );

  return data.data;
};

/**
 *
 * @param playerId
 * @param payload
 */
export const createPlayerNationalTeamCareer = async (
  playerId: string,
  payload: unknown,
) => {
  const parsed = createPlayerNationalTeamCareerSchema.parse(payload); // validation

  await apiClient.post(`/players/${playerId}/national-team-careers`, parsed);
};

/**
 *
 * @param playerId
 * @param playerNationalTeamCareerId
 * @param payload
 */
export const updatePlayerNationalTeamCareer = async (
  playerId: string,
  playerNationalTeamCareerId: string,
  payload: unknown,
) => {
  const parsed = updatePlayerNationalTeamCareerSchema.parse(payload); // validation

  await apiClient.put(
    `/players/${playerId}/national-team-careers/${playerNationalTeamCareerId}`,
    parsed,
  );
};

/**
 *
 * @param playerId
 * @param playerNationalTeamCareerId
 */
export const deletePlayerNationalTeamCareer = async (
  playerId: string,
  playerNationalTeamCareerId: string,
) => {
  await apiClient.delete(
    `/players/${playerId}/national-team-careers/${playerNationalTeamCareerId}`,
  );
};
