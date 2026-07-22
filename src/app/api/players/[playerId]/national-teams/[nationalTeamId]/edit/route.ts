import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getPlayerNationalTeamEditService } from "@/lib/services/player-national-teams.service";

type PlayerNationalTeamRouteContext = {
  params: Promise<{ playerId: string; nationalTeamId: string }>;
};

export async function GET(
  _request: Request,
  context: PlayerNationalTeamRouteContext,
) {
  try {
    const { nationalTeamId } = await context.params;
    const data = await getPlayerNationalTeamEditService(nationalTeamId);

    if (!data) {
      return errorResponse(new NotFoundError("Player national team not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
