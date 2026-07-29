import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getPlayerNationalTeamCareerEditService } from "@/lib/services/player-national-team-careers.service";

type PlayerNationalTeamCareerRouteContext = {
  params: Promise<{ playerId: string; careerId: string }>;
};

export async function GET(
  _request: Request,
  context: PlayerNationalTeamCareerRouteContext,
) {
  try {
    const { careerId } = await context.params;
    const data = await getPlayerNationalTeamCareerEditService(careerId);

    if (!data) {
      return errorResponse(new NotFoundError("Player national team not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
