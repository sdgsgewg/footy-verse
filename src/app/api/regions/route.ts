import { getCrudQuery } from "@/lib/api/query";
import { isFormDataRequest } from "@/lib/api/request";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getRegionInputFromFormData } from "@/lib/regions/form-data";
import {
  createRegionService,
  getRegionsService,
} from "@/lib/services/regions.service";
import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { RegionQuery } from "@/types/region";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<RegionQuery>(request);

    const data = await getRegionsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    console.error("Error: ", error);
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await createRegionService(body);

      return createdResponse(data);
    }

    const formData = await request.formData();

    const body = getRegionInputFromFormData(formData);

    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      return errorResponse(new Error("Region image is required"));
    }

    const image = await uploadImage(file, body.name, STORAGE_BUCKETS.REGIONS);

    body.image = image;

    try {
      const data = await createRegionService(body);

      return createdResponse({
        success: true,
        data,
      });
    } catch (error) {
      await tryDeleteImage(image, STORAGE_BUCKETS.REGIONS);

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
