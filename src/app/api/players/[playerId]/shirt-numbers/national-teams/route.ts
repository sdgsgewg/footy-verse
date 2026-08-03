import { getCrudQuery } from "@/lib/api/query";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getPlayerNationalTeamShirtNumbersService } from "@/lib/services/player-shirt-numbers.service";
import { PlayerShirtNumberFilter } from "@/types/player-shirt-number";
import { NextRequest } from "next/server";

type PlayerShirtNumberRouteContext = {
  params: Promise<{ playerId: string }>;
};

export async function GET(
  request: NextRequest,
  context: PlayerShirtNumberRouteContext,
) {
  try {
    const { playerId } = await context.params;

    const query = getCrudQuery<PlayerShirtNumberFilter>(request, [
      "startDate",
      "endDate",
    ]);

    const data = await getPlayerNationalTeamShirtNumbersService(
      playerId,
      query,
    );

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
