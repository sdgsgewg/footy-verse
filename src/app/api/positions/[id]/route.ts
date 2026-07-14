import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deletePositionService,
  getPositionByIdService,
  updatePositionService,
} from "@/lib/services/positions.service";

type PositionRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: PositionRouteContext) {
  try {
    const { id } = await context.params;
    const data = await getPositionByIdService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Position not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: PositionRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const currentPosition = await getPositionByIdService(id);

    if (!currentPosition) {
      return errorResponse(new NotFoundError("Position not found"));
    }

    const body = await request.json();
    const data = await updatePositionService(id, body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: PositionRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const position = await getPositionByIdService(id);

    if (!position) {
      return errorResponse(new NotFoundError("Position not found"));
    }

    await deletePositionService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
