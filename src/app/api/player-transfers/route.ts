import { getCrudQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getAllPlayerTransfersService } from "@/lib/services/player-transfers.service";
import { PlayerTransferFilter } from "@/types/player-transfer";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<PlayerTransferFilter>(request, [
      "transferDate",
      "transferFee",
      "transferType",
    ]);

    const data = await getAllPlayerTransfersService(query);

    return successResponse(data);
  } catch (error: unknown) {
    console.error(error);

    return errorResponse(error);
  }
}
