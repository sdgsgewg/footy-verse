import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getConfederationEditService } from "@/lib/services/confederations.service";

type ConfederationRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: ConfederationRouteContext,
) {
  try {
    const { id } = await context.params;
    const data = await getConfederationEditService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Confederation not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
