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
  }>(`/players/${playerId}/national-teams`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param nationalTeamId
 * @returns PlayerNationalTeamCareerEditResponse
 */
export const fetchPlayerNationalTeamCareerEdit = async (
  playerId: string,
  nationalTeamId: string,
): Promise<PlayerNationalTeamCareerEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerNationalTeamCareerEditResponse;
  }>(`/players/${playerId}/national-teams/${nationalTeamId}/edit`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param nationalTeamId
 * @returns PlayerNationalTeamCareerDetailResponse
 */
export const fetchPlayerNationalTeamCareerDetail = async (
  playerId: string,
  nationalTeamId: string,
): Promise<PlayerNationalTeamCareerDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerNationalTeamCareerDetailResponse;
  }>(`/players/${playerId}/national-teams/${nationalTeamId}`);

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

  await apiClient.post(`/players/${playerId}/national-teams`, parsed);
};

/**
 *
 * @param playerId
 * @param nationalTeamId
 * @param payload
 */
export const updatePlayerNationalTeamCareer = async (
  playerId: string,
  nationalTeamId: string,
  payload: unknown,
) => {
  const parsed = updatePlayerNationalTeamCareerSchema.parse(payload); // validation

  await apiClient.put(
    `/players/${playerId}/national-teams/${nationalTeamId}`,
    parsed,
  );
};

/**
 *
 * @param playerId
 * @param nationalTeamId
 */
export const deletePlayerNationalTeamCareer = async (
  playerId: string,
  nationalTeamId: string,
) => {
  await apiClient.delete(
    `/players/${playerId}/national-teams/${nationalTeamId}`,
  );
};
