import { isFormDataRequest } from "@/lib/api/request";
import { errorResponse, noContentResponse, successResponse } from "@/lib/api/response";
import {
  deleteNationalityService,
  getNationalityByIdService,
  updateNationalityService,
} from "@/lib/services/nationalities.service";
import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";

type NationalityRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: NationalityRouteContext) {
  try {
    const { id } = await context.params;

    const data = await getNationalityByIdService(id);

    if (!data) {
      return errorResponse(new Error("Nationality not found"), 404);
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: NationalityRouteContext) {
  try {
    const { id } = await context.params;

    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await updateNationalityService(id, body);

      return successResponse(data);
    }

    const currentNationality = await getNationalityByIdService(id);

    if (!currentNationality) {
      return errorResponse(new Error("Nationality not found"), 404);
    }

    const formData = await request.formData();
    const name = String(formData.get("name") ?? "");
    const file = formData.get("image");

    let image = currentNationality.image;

    if (file instanceof File && file.size > 0) {
      image = await uploadImage(file, name, STORAGE_BUCKETS.NATIONALITIES);
    }

    try {
      const data = await updateNationalityService(id, { name, image });

      return successResponse(data);
    } catch (error) {
      if (image && image !== currentNationality.image) {
        await tryDeleteImage(image, STORAGE_BUCKETS.NATIONALITIES);
      }

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: NationalityRouteContext,
) {
  try {
    const { id } = await context.params;

    await deleteNationalityService(id);

    // return successResponse(null);
    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
