import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getConfederationInputFromFormData } from "@/lib/confederations/form-data";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deleteConfederationService,
  getConfederationDetailService,
  getConfederationEditService,
  precheckUpdateConfederationService,
  updateConfederationService,
} from "@/lib/services/confederations.service";

import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { validateImageFile } from "@/lib/validations/image.schema";

type ConfederationRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: ConfederationRouteContext,
) {
  try {
    const { id } = await context.params;
    const data = await getConfederationDetailService(id);

    if (!data) {
      return errorResponse(new NotFoundError("Confederation not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: Request,
  context: ConfederationRouteContext,
) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const currentConfederation = await getConfederationEditService(id);

    if (!currentConfederation) {
      return errorResponse(new NotFoundError("Confederation not found"));
    }

    const formData = await request.formData();

    const body = await precheckUpdateConfederationService(
      id,
      getConfederationInputFromFormData(formData),
    );

    let image = currentConfederation.image;

    const file = validateImageFile(formData.get("image"));

    if (file) {
      image = await uploadImage(
        file,
        body.name,
        STORAGE_BUCKETS.CONFEDERATIONS,
      );
    }

    body.image = image;

    try {
      const data = await updateConfederationService(id, body);

      return successResponse(data);
    } catch (error) {
      if (image && image !== currentConfederation.image) {
        await tryDeleteImage(image, STORAGE_BUCKETS.CONFEDERATIONS);
      }

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: ConfederationRouteContext,
) {
  try {
    await authorizeManageContent();

    const { id } = await context.params;

    const confederation = await getConfederationDetailService(id);

    if (!confederation) {
      return errorResponse(new NotFoundError("Confederation not found"));
    }

    await deleteConfederationService(id);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
