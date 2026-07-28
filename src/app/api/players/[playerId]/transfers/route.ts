import { getCrudQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getPlayerTransfersService } from "@/lib/services/player-transfers.service";
import { PlayerTransferFilter } from "@/types/player-transfer";
import { NextRequest } from "next/server";

type PlayerTransferRouteContext = {
  params: Promise<{ playerId: string }>;
};

export async function GET(
  request: NextRequest,
  context: PlayerTransferRouteContext,
) {
  try {
    const { playerId } = await context.params;

    const query = getCrudQuery<PlayerTransferFilter>(request, [
      "transferDate",
      "transferFee",
      "transferType",
    ]);

    const data = await getPlayerTransfersService(playerId, query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
