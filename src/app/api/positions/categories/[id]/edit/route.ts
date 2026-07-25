import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getPositionCategoryEditService } from "@/lib/services/position-categories.service";

type PositionCategoryRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: PositionCategoryRouteContext,
) {
  try {
    const { id } = await context.params;
    const data = await getPositionCategoryEditService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Position category not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}
