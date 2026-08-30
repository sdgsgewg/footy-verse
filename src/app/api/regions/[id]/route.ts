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
  getRegionEditService,
  precheckUpdateRegionService,
  updateRegionService,
} from "@/lib/services/regions.service";
import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";

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

    const currentRegion = await getRegionEditService(id);

    if (!currentRegion) {
      return errorResponse(new NotFoundError("Region not found"));
    }

    const formData = await request.formData();

    const body = await precheckUpdateRegionService(
      id,
      getRegionInputFromFormData(formData),
    );

    let image = currentRegion.image;

    const file = formData.get("image");

    if (file instanceof File && file.size > 0) {
      image = await uploadImage(file, body.name, STORAGE_BUCKETS.REGIONS);
    }

    body.image = image;

    try {
      const data = await updateRegionService(id, body);

      return successResponse(data);
    } catch (error) {
      if (image && image !== currentRegion.image) {
        await tryDeleteImage(image, STORAGE_BUCKETS.REGIONS);
      }

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: RegionRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const region = await getRegionEditService(id);

    if (!region) {
      return errorResponse(new NotFoundError("Region not found"));
    }

    await deleteRegionService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
