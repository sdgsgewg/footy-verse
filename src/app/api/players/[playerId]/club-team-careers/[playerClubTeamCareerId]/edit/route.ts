import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getPlayerClubTeamCareerEditService } from "@/lib/services/player-club-team-careers.service";

type PlayerClubTeamCareerRouteContext = {
  params: Promise<{ playerId: string; playerClubTeamCareerId: string }>;
};

export async function GET(
  _request: Request,
  context: PlayerClubTeamCareerRouteContext,
) {
  try {
    const { playerClubTeamCareerId } = await context.params;
    const data = await getPlayerClubTeamCareerEditService(
      playerClubTeamCareerId,
    );

    if (!data) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
