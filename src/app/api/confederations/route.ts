import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getConfederationInputFromFormData } from "@/lib/confederations/form-data";
import {
  createConfederationService,
  getConfederationsService,
} from "@/lib/services/confederations.service";

import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { ConfederationQuery } from "@/types/confederation";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<ConfederationQuery>(request);

    const data = await getConfederationsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const formData = await request.formData();

    const body = getConfederationInputFromFormData(formData);

    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      return errorResponse(new Error("Confederation image is required"));
    }

    const image = await uploadImage(
      file,
      body.name,
      STORAGE_BUCKETS.CONFEDERATIONS,
    );

    body.image = image;

    try {
      const data = await createConfederationService(body);

      return createdResponse({
        success: true,
        data,
      });
    } catch (error) {
      await tryDeleteImage(image, STORAGE_BUCKETS.CONFEDERATIONS);

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
