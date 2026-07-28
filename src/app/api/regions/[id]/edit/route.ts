import { errorResponse, successResponse } from "@/lib/api/response";
import { NotFoundError } from "@/lib/errors/http-error";
import { getRegionEditService } from "@/lib/services/regions.service";

type RegionRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RegionRouteContext) {
  try {
    const { id } = await context.params;
    const data = await getRegionEditService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Region not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
