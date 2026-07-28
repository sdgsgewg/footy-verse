import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getCompetitionCategoryEditService } from "@/lib/services/competition-categories.service";

type CompetitionCategoryRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: CompetitionCategoryRouteContext,
) {
  try {
    const { id } = await context.params;
    const data = await getCompetitionCategoryEditService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Competition category not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
