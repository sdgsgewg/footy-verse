import {
    PlayerNationalTeamDetailResponse,
  PlayerNationalTeamEditResponse,
  PlayerNationalTeamListItem,
} from "@/types/player-national-teams";
import { apiClient } from "./client";
import { createPlayerNationalTeamSchema, updatePlayerNationalTeamSchema } from "../validations/player-national-teams.schema";

/**
 *
 * @param playerId
 * @returns PlayerNationalTeamListItem[]
 */
export const fetchPlayerNationalTeams = async (
  playerId: string,
): Promise<PlayerNationalTeamListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerNationalTeamListItem[];
  }>(`/players/${playerId}/national-teams`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param nationalTeamId
 * @returns PlayerNationalTeamEditResponse
 */
export const fetchPlayerNationalTeamEdit = async (
  playerId: string,
  nationalTeamId: string,
): Promise<PlayerNationalTeamEditResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerNationalTeamEditResponse;
  }>(`/players/${playerId}/national-teams/${nationalTeamId}/edit`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param nationalTeamId
 * @returns PlayerNationalTeamDetailResponse
 */
export const fetchPlayerNationalTeamDetail = async (
  playerId: string,
  nationalTeamId: string,
): Promise<PlayerNationalTeamDetailResponse> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerNationalTeamDetailResponse;
  }>(`/players/${playerId}/national-teams/${nationalTeamId}`);

  return data.data;
};

/**
 *
 * @param playerId
 * @param payload
 */
export const createPlayerNationalTeam = async (
  playerId: string,
  payload: unknown,
) => {
  const parsed = createPlayerNationalTeamSchema.parse(payload); // validation

  await apiClient.post(`/players/${playerId}/national-teams`, parsed);
};

/**
 *
 * @param playerId
 * @param nationalTeamId
 * @param payload
 */
export const updatePlayerNationalTeam = async (
  playerId: string,
  nationalTeamId: string,
  payload: unknown,
) => {
  const parsed = updatePlayerNationalTeamSchema.parse(payload); // validation

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
export const deletePlayerNationalTeam = async (
  playerId: string,
  nationalTeamId: string,
) => {
  await apiClient.delete(
    `/players/${playerId}/national-teams/${nationalTeamId}`,
  );
};
