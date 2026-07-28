import {
  PlayerTransferListItem,
  PlayerTransferQuery,
} from "@/types/player-transfer";
import { apiClient } from "./client";

/**
 *
 * @param playerId
 * @returns PlayerTransferListItem[]
 */
export const fetchPlayerTransfers = async (
  playerId: string,
  params?: PlayerTransferQuery,
): Promise<PlayerTransferListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: PlayerTransferListItem[];
  }>(`/players/${playerId}/transfers`, {
    params,
  });

  return data.data;
};
