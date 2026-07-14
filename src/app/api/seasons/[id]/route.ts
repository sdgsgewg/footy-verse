import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
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
      return errorResponse(new NotFoundError("Season not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: SeasonRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const currentSeason = await getSeasonByIdService(id);

    if (!currentSeason) {
      return errorResponse(new NotFoundError("Season not found"));
    }

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

    const season = await getSeasonByIdService(id);

    if (!season) {
      return errorResponse(new NotFoundError("Season not found"));
    }

    await deleteSeasonService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
