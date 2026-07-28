import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getCompetitionScopeEditService } from "@/lib/services/competition-scopes.service";

type CompetitionScopeRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: CompetitionScopeRouteContext,
) {
  try {
    const { id } = await context.params;
    const data = await getCompetitionScopeEditService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Competition scope not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
