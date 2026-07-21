import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getPlayerEditService } from "@/lib/services/players.service";

type PlayerRouteContext = {
  params: Promise<{ playerId: string }>;
};

export async function GET(_request: Request, context: PlayerRouteContext) {
  try {
    const { playerId } = await context.params;
    const data = await getPlayerEditService(playerId);

    if (!data) {
      return errorResponse(new NotFoundError("Player not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
