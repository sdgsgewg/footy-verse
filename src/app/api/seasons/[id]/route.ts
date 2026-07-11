import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import {
  deleteSeasonService,
  getSeasonByIdService,
  updateSeasonService,
} from "@/lib/services/seasons.service";

type SeasonRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: SeasonRouteContext) {
  try {
    const { id } = await context.params;
    const data = await getSeasonByIdService(id);

    if (!data) {
      return errorResponse(new Error("Season not found"), 404);
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: SeasonRouteContext) {
  try {
    const { id } = await context.params;

    const body = await request.json();
    const data = await updateSeasonService(id, body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: SeasonRouteContext) {
  try {
    const { id } = await context.params;

    await deleteSeasonService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
