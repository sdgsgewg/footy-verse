import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getPlayerClubCareerEditService } from "@/lib/services/player-club-careers.service";

type PlayerClubCareerRouteContext = {
  params: Promise<{ playerId: string; careerId: string }>;
};

export async function GET(
  _request: Request,
  context: PlayerClubCareerRouteContext,
) {
  try {
    const { careerId } = await context.params;
    const data = await getPlayerClubCareerEditService(careerId);

    if (!data) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
