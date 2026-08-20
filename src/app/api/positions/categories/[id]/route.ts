import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deletePositionCategoryService,
  getPositionCategoryDetailService,
  updatePositionCategoryService,
} from "@/lib/services/position-categories.service";

type PositionCategoryRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: PositionCategoryRouteContext,
) {
  try {
    const { id } = await context.params;
    const data = await getPositionCategoryDetailService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Position category not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: Request,
  context: PositionCategoryRouteContext,
) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const currentPosition = await getPositionCategoryDetailService(id);

    if (!currentPosition) {
      return errorResponse(new NotFoundError("Position category not found"));
    }

    const body = await request.json();
    const data = await updatePositionCategoryService(id, body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: PositionCategoryRouteContext,
) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const position = await getPositionCategoryDetailService(id);

    if (!position) {
      return errorResponse(new NotFoundError("Position category not found"));
    }

    await deletePositionCategoryService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
