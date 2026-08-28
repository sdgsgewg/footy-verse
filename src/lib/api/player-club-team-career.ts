import {
  createPlayerClubTeamCareerSchema,
  updatePlayerClubTeamCareerSchema,
} from "../validations/player-club-team-careers.schema";
import { apiClient } from "./client";
import {
  PlayerClubTeamCareerDetailResponse,
  PlayerClubTeamCareerEditResponse,
  PlayerClubTeamCareerListItem,
} from "@/types/player-club-team-career";

const baseRoute = "/players";
const clubTeamCareerRoute = "club-team-careers";

/**
 *
 * @param playerId
 * @returns PlayerClubTeamCareerListItem[]
 */
export const fetchPlayerClubTeamCareers = async (
  playerId: string,
): Promise<PlayerClubTeamCareerListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerClubTeamCareerListItem[];
  }>(`${baseRoute}/${playerId}/${clubTeamCareerRoute}`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param playerClubTeamCareerId
 * @returns PlayerClubTeamCareerEditResponse
 */
export const fetchPlayerClubTeamCareerEdit = async (
  playerId: string,
  playerClubTeamCareerId: string,
): Promise<PlayerClubTeamCareerEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerClubTeamCareerEditResponse;
  }>(
    `${baseRoute}/${playerId}/${clubTeamCareerRoute}/${playerClubTeamCareerId}/edit`,
  );

  return data.data;
};

/**
 *
 * @param playerId
 * @param playerClubTeamCareerId
 * @returns PlayerClubTeamCareerDetailResponse
 */
export const fetchPlayerClubTeamCareerDetail = async (
  playerId: string,
  playerClubTeamCareerId: string,
): Promise<PlayerClubTeamCareerDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerClubTeamCareerDetailResponse;
  }>(
    `${baseRoute}/${playerId}/${clubTeamCareerRoute}/${playerClubTeamCareerId}`,
  );

  return data.data;
};

/**
 *
 * @param playerId
 * @param payload
 */
export const createPlayerClubTeamCareer = async (
  playerId: string,
  payload: unknown,
) => {
  const parsed = createPlayerClubTeamCareerSchema.parse(payload); // validation

  await apiClient.post(
    `${baseRoute}/${playerId}/${clubTeamCareerRoute}`,
    parsed,
  );
};

/**
 *
 * @param playerId
 * @param playerClubTeamCareerId
 * @param payload
 */
export const updatePlayerClubTeamCareer = async (
  playerId: string,
  playerClubTeamCareerId: string,
  payload: unknown,
) => {
  const parsed = updatePlayerClubTeamCareerSchema.parse(payload); // validation

  await apiClient.put(
    `${baseRoute}/${playerId}/${clubTeamCareerRoute}/${playerClubTeamCareerId}`,
    parsed,
  );
};

/**
 *
 * @param playerId
 * @param playerClubTeamCareerId
 */
export const deletePlayerClubTeamCareer = async (
  playerId: string,
  playerClubTeamCareerId: string,
) => {
  await apiClient.delete(
    `${baseRoute}/${playerId}/${clubTeamCareerRoute}/${playerClubTeamCareerId}`,
  );
};
