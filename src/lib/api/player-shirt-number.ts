import {
  PlayerClubTeamShirtNumberListItem,
  PlayerNationalTeamShirtNumberListItem,
  PlayerShirtNumberQuery,
} from "@/types/player-shirt-number";
import { apiClient } from "./client";

/**
 *
 * @param playerId
 * @returns PlayerClubTeamShirtNumberListItem[]
 */
export const fetchPlayerClubTeamShirtNumbers = async (
  playerId: string,
  params?: PlayerShirtNumberQuery,
): Promise<PlayerClubTeamShirtNumberListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerClubTeamShirtNumberListItem[];
  }>(`/players/${playerId}/shirt-numbers/club-teams`, {
    params,
  });

  return data.data;
};

/**
 *
 * @param playerId
 * @returns PlayerNationalTeamShirtNumberListItem[]
 */
export const fetchPlayerNationalTeamShirtNumbers = async (
  playerId: string,
  params?: PlayerShirtNumberQuery,
): Promise<PlayerNationalTeamShirtNumberListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerNationalTeamShirtNumberListItem[];
  }>(`/players/${playerId}/shirt-numbers/national-teams`, {
    params,
  });

  return data.data;
};
