import { PlayerTransferQuery } from "@/types/player-transfer";

export const playerTransferKeys = {
  all: ["player-transfers"] as const,

  lists: () => [...playerTransferKeys.all, "list"] as const,

  // Semua transfer
  list: (params?: PlayerTransferQuery) =>
    [...playerTransferKeys.lists(), "all", params] as const,

  // Transfer milik player tertentu
  playerLists: () => [...playerTransferKeys.all, "player-list"] as const,

  playerList: (playerId: string, params?: PlayerTransferQuery) =>
    [...playerTransferKeys.playerLists(), playerId, params] as const,

  details: () => [...playerTransferKeys.all, "detail"] as const,

  detail: (playerId: string, transferId: string) =>
    [...playerTransferKeys.details(), playerId, transferId] as const,

  edits: () => [...playerTransferKeys.all, "edit"] as const,

  edit: (playerId: string, transferId: string) =>
    [...playerTransferKeys.edits(), playerId, transferId] as const,
};
