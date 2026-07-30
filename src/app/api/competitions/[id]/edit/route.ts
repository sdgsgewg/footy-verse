import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getCompetitionEditService } from "@/lib/services/competitions.service";

type CompetitionRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: CompetitionRouteContext) {
  try {
    const { id } = await context.params;
    const data = await getCompetitionEditService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Competition not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
