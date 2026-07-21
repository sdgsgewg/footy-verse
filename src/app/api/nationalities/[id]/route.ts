import { isFormDataRequest } from "@/lib/api/request";
import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import { getNationalityInputFromFormData } from "@/lib/nationalities/form-data";
import {
  deleteNationalityService,
  getNationalityDetailService,
  getNationalityEditService,
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
    const data = await getNationalityDetailService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Nationality not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: NationalityRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const currentNationality = await getNationalityEditService(id);

    if (!currentNationality) {
      return errorResponse(new NotFoundError("Nationality not found"));
    }

    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await updateNationalityService(id, body);

      return successResponse(data);
    }

    const formData = await request.formData();

    const body = getNationalityInputFromFormData(formData);

    let image = currentNationality.image;

    const file = formData.get("image");

    if (file instanceof File && file.size > 0) {
      image = await uploadImage(file, body.name, STORAGE_BUCKETS.NATIONALITIES);
    }

    body.image = image;

    try {
      const data = await updateNationalityService(id, body);

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
    await authorizeManageContent();

    const { id } = await context.params;

    const nationality = await getNationalityEditService(id);

    if (!nationality) {
      return errorResponse(new NotFoundError("Nationality not found"));
    }

    await deleteNationalityService(id);

    // return successResponse(null);
    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
