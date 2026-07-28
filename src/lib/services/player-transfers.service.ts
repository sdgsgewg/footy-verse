import { PlayerTransferListItem } from "@/types/player-transfer";
import { playerTransfersQuerySchema } from "../validations/player-transfers.schema";
import { getPlayerTransfersRepo } from "../repositories/player-transfers.repo";
import { idSchema } from "../validations/primitives.schema";

export async function getPlayerTransfersService(
  playerId: string,
  query: unknown,
): Promise<PlayerTransferListItem[]> {
  const parsedId = idSchema.parse(playerId);
  const parsedQuery = playerTransfersQuerySchema.parse(query);

  return getPlayerTransfersRepo(parsedId, parsedQuery);
}
