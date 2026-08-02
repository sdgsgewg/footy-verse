import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getCompetitionEditService } from "@/lib/services/competitions.service";

type CompetitionRouteContext = {
  params: Promise<{ competitionId: string }>;
};

export async function GET(_request: Request, context: CompetitionRouteContext) {
  try {
    const { competitionId } = await context.params;
    const data = await getCompetitionEditService(competitionId);

    if (!data) {
      return errorResponse(new NotFoundError("Competition not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
