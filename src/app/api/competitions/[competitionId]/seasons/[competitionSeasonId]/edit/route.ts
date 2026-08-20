import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getCompetitionSeasonEditService } from "@/lib/services/competition-seasons.service";

type CompetitionSeasonRouteContext = {
  params: Promise<{ competitionId: string; competitionSeasonId: string }>;
};

export async function GET(
  _request: Request,
  context: CompetitionSeasonRouteContext,
) {
  try {
    const { competitionSeasonId } = await context.params;
    const data = await getCompetitionSeasonEditService(competitionSeasonId);

    if (!data) {
      return errorResponse(new NotFoundError("Competition season not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
