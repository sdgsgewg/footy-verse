import {
  AllPlayerTransferListItem,
  PlayerTransferListItem,
  PlayerTransferQuery,
} from "@/types/player-transfer";
import { apiClient } from "./client";

/**
 *
 * @param params
 * @returns AllPlayerTransferListItem[]
 */
export const fetchAllPlayerTransfers = async (
  params?: PlayerTransferQuery,
): Promise<AllPlayerTransferListItem[]> => {
  const { data } = await apiClient.get<{
    success: boolean;
    data: AllPlayerTransferListItem[];
  }>(`/player-transfers`, {
    params,
  });

  return data.data;
};

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
