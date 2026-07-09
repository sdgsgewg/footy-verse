import { isFormDataRequest } from "@/lib/api/request";
import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
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
      return errorResponse(new Error("Position not found"), 404);
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: PositionRouteContext) {
  try {
    const { id } = await context.params;

    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await updatePositionService(id, body);

      return successResponse(data);
    }

    const currentPosition = await getPositionByIdService(id);

    if (!currentPosition) {
      return errorResponse(new Error("Position not found"), 404);
    }

    const formData = await request.formData();
    const name = String(formData.get("name") ?? "");

    try {
      const data = await updatePositionService(id, { name });

      return successResponse(data);
    } catch (error) {
      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: PositionRouteContext) {
  try {
    const { id } = await context.params;

    await deletePositionService(id);

    // return successResponse(null);
    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
