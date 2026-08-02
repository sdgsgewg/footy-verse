import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  deleteCompetitionSeasonService,
  getCompetitionSeasonDetailService,
  updateCompetitionSeasonService,
} from "@/lib/services/competition-seasons.service";

type CompetitionSeasonRouteContext = {
  params: Promise<{ competitionId: string; seasonId: string }>;
};

export async function GET(
  _request: Request,
  context: CompetitionSeasonRouteContext,
) {
  try {
    const { seasonId } = await context.params;
    const data = await getCompetitionSeasonDetailService(seasonId);

    if (!data) {
      return errorResponse(new NotFoundError("Competition season not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: Request,
  context: CompetitionSeasonRouteContext,
) {
  try {
    await authorizeManageContent();

    const { competitionId, seasonId } = await context.params;

    const currentCompetitionSeason =
      await getCompetitionSeasonDetailService(seasonId);

    if (!currentCompetitionSeason) {
      return errorResponse(new NotFoundError("Competition season not found"));
    }

    const body = await request.json();
    const data = await updateCompetitionSeasonService(
      seasonId,
      competitionId,
      body,
    );

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: CompetitionSeasonRouteContext,
) {
  try {
    await authorizeManageContent();

    const { seasonId } = await context.params;

    const club = await getCompetitionSeasonDetailService(seasonId);

    if (!club) {
      return errorResponse(new NotFoundError("Competition season not found"));
    }

    await deleteCompetitionSeasonService(seasonId);

    return noContentResponse();
  } catch (error) {
    return errorResponse(error);
  }
}
