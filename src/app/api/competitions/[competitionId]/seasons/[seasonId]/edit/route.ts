import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getCompetitionSeasonEditService } from "@/lib/services/competition-seasons.service";

type CompetitionSeasonRouteContext = {
  params: Promise<{ competitionId: string; seasonId: string }>;
};

export async function GET(
  _request: Request,
  context: CompetitionSeasonRouteContext,
) {
  try {
    const { seasonId } = await context.params;
    const data = await getCompetitionSeasonEditService(seasonId);

    if (!data) {
      return errorResponse(new NotFoundError("Competition season not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
