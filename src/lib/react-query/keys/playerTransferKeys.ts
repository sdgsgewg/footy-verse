import { PlayerTransferQuery } from "@/types/player-transfer";

export const playerTransferKeys = {
  all: ["player-transfers"] as const,

  lists: () => [...playerTransferKeys.all, "list"] as const,

  list: (playerId: string, params?: PlayerTransferQuery) =>
    [...playerTransferKeys.lists(), playerId, params] as const,

  details: () => [...playerTransferKeys.all, "detail"] as const,

  detail: (playerId: string, transferId: string) =>
    [...playerTransferKeys.details(), playerId, transferId] as const,

  edits: () => [...playerTransferKeys.all, "edit"] as const,

  edit: (playerId: string, transferId: string) =>
    [...playerTransferKeys.edits(), playerId, transferId] as const,
};
