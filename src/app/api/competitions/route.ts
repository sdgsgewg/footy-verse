import { getCrudQuery } from "@/lib/api/query";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getCompetitionInputFromFormData } from "@/lib/competitions/form-data";
import {
  createCompetitionService,
  getCompetitionsService,
} from "@/lib/services/competitions.service";

import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { CompetitionQuery } from "@/types/competition";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<CompetitionQuery>(request);

    const data = await getCompetitionsService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const formData = await request.formData();

    const body = getCompetitionInputFromFormData(formData);

    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      return errorResponse(new Error("Competition image is required"));
    }

    const image = await uploadImage(
      file,
      body.name,
      STORAGE_BUCKETS.COMPETITIONS,
    );

    body.image = image;

    try {
      const data = await createCompetitionService(body);

      return createdResponse({
        success: true,
        data,
      });
    } catch (error) {
      await tryDeleteImage(image, STORAGE_BUCKETS.COMPETITIONS);

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
