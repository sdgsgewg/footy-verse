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
  params: Promise<{ competitionId: string; competitionSeasonId: string }>;
};

export async function GET(
  _request: Request,
  context: CompetitionSeasonRouteContext,
) {
  try {
    const { competitionSeasonId } = await context.params;
    const data = await getCompetitionSeasonDetailService(competitionSeasonId);

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

    const { competitionId, competitionSeasonId } = await context.params;

    const currentCompetitionSeason =
      await getCompetitionSeasonDetailService(competitionSeasonId);

    if (!currentCompetitionSeason) {
      return errorResponse(new NotFoundError("Competition season not found"));
    }

    const body = await request.json();
    const data = await updateCompetitionSeasonService(
      competitionSeasonId,
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

    const { competitionSeasonId } = await context.params;

    const club = await getCompetitionSeasonDetailService(competitionSeasonId);

    if (!club) {
      return errorResponse(new NotFoundError("Competition season not found"));
    }

    await deleteCompetitionSeasonService(competitionSeasonId);

    return noContentResponse();
  } catch (error) {
    return errorResponse(error);
  }
}
