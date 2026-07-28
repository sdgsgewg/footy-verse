import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deleteCompetitionCategoryService,
  getCompetitionCategoryDetailService,
  updateCompetitionCategoryService,
} from "@/lib/services/competition-categories.service";

type CompetitionCategoryRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: CompetitionCategoryRouteContext,
) {
  try {
    const { id } = await context.params;
    const data = await getCompetitionCategoryDetailService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Competition category not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: Request,
  context: CompetitionCategoryRouteContext,
) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const currentPosition = await getCompetitionCategoryDetailService(id);

    if (!currentPosition) {
      return errorResponse(new NotFoundError("Competition category not found"));
    }

    const body = await request.json();
    const data = await updateCompetitionCategoryService(id, body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: CompetitionCategoryRouteContext,
) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const position = await getCompetitionCategoryDetailService(id);

    if (!position) {
      return errorResponse(new NotFoundError("Competition category not found"));
    }

    await deleteCompetitionCategoryService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
