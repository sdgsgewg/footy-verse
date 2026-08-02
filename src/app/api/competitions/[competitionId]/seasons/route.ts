import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import {
  createCompetitionSeasonService,
  getCompetitionSeasonsService,
} from "@/lib/services/competition-seasons.service";
import { CompetitionSeasonQuery } from "@/types/competition-season";

type CompetitionSeasonRouteContext = {
  params: Promise<{ competitionId: string }>;
};

export async function GET(
  request: Request,
  context: CompetitionSeasonRouteContext,
) {
  try {
    const { competitionId } = await context.params;

    const query = getCrudQuery<CompetitionSeasonQuery>(request);

    const data = await getCompetitionSeasonsService(competitionId, query);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(
  request: Request,
  context: CompetitionSeasonRouteContext,
) {
  try {
    await authorizeManageContent();

    const { competitionId } = await context.params;

    const body = await request.json();
    const data = await createCompetitionSeasonService(competitionId, body);

    return createdResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
