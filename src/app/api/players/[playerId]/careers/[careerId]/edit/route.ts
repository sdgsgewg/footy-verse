import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getPlayerCareerEditService } from "@/lib/services/player-careers.service";

type PlayerCareerRouteContext = {
  params: Promise<{ playerId: string; careerId: string }>;
};

export async function GET(
  _request: Request,
  context: PlayerCareerRouteContext,
) {
  try {
    const { careerId } = await context.params;
    const data = await getPlayerCareerEditService(careerId);

    if (!data) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
