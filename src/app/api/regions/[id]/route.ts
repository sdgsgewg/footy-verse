import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import { getRegionInputFromFormData } from "@/lib/regions/form-data";
import {
  deleteRegionService,
  getRegionDetailService,
  updateRegionService,
} from "@/lib/services/regions.service";

type RegionRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RegionRouteContext) {
  try {
    const { id } = await context.params;
    const data = await getRegionDetailService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Region not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: RegionRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const formData = await request.formData();

    const data = await updateRegionService(
      id,
      getRegionInputFromFormData(formData),
      formData,
    );

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: RegionRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    await deleteRegionService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
