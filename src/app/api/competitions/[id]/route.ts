import { isFormDataRequest } from "@/lib/api/request";
import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getCompetitionInputFromFormData } from "@/lib/competitions/form-data";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deleteCompetitionService,
  getCompetitionDetailService,
  getCompetitionEditService,
  updateCompetitionService,
} from "@/lib/services/competitions.service";

import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";

type CompetitionRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: CompetitionRouteContext) {
  try {
    const { id } = await context.params;
    const data = await getCompetitionDetailService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Competition not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: CompetitionRouteContext) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const currentCompetition = await getCompetitionEditService(id);

    if (!currentCompetition) {
      return errorResponse(new NotFoundError("Competition not found"));
    }

    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await updateCompetitionService(id, body);

      return successResponse(data);
    }

    const formData = await request.formData();

    const body = getCompetitionInputFromFormData(formData);

    let image = currentCompetition.image;

    const file = formData.get("image");

    if (file instanceof File && file.size > 0) {
      image = await uploadImage(file, body.name, STORAGE_BUCKETS.COMPETITIONS);
    }

    body.image = image;

    try {
      const data = await updateCompetitionService(id, body);

      return successResponse(data);
    } catch (error) {
      if (image && image !== currentCompetition.image) {
        await tryDeleteImage(image, STORAGE_BUCKETS.COMPETITIONS);
      }

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: CompetitionRouteContext,
) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const Competition = await getCompetitionEditService(id);

    if (!Competition) {
      return errorResponse(new NotFoundError("Competition not found"));
    }

    await deleteCompetitionService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
