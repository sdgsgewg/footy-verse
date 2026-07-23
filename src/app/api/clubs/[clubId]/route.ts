import {
  deleteClubService,
  getClubDetailService,
  getClubEditService,
  updateClubService,
} from "@/lib/services/clubs.service";
import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { isFormDataRequest } from "@/lib/api/request";
import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { getClubInputFromFormData } from "@/lib/clubs/form-data";
import { NotFoundError } from "@/lib/errors/http-error";
import { authorizeManageContent } from "@/lib/auth/api-authorization";

type ClubRouteContext = {
  params: Promise<{ clubId: string }>;
};

export async function GET(_request: Request, context: ClubRouteContext) {
  try {
    const { clubId } = await context.params;
    const data = await getClubDetailService(clubId);

    if (!data) {
      return errorResponse(new NotFoundError("Club not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: ClubRouteContext) {
  try {
    await authorizeManageContent();

    const { clubId } = await context.params;

    const currentClub = await getClubEditService(clubId);

    if (!currentClub) {
      return errorResponse(new NotFoundError("Club not found"));
    }

    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await updateClubService(clubId, body);

      return successResponse(data);
    }

    const formData = await request.formData();

    const body = getClubInputFromFormData(formData);

    let image = currentClub.image;

    const file = formData.get("image");

    if (file instanceof File && file.size > 0) {
      image = await uploadImage(file, body.name, STORAGE_BUCKETS.CLUBS);
    }

    body.image = image;

    try {
      const data = await updateClubService(clubId, body);

      return successResponse(data);
    } catch (error) {
      if (image && image !== currentClub.image) {
        await tryDeleteImage(image, STORAGE_BUCKETS.CLUBS);
      }

      throw error;
    }
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: ClubRouteContext) {
  try {
    await authorizeManageContent();

    const { clubId } = await context.params;

    const club = await getClubDetailService(clubId);

    if (!club) {
      return errorResponse(new NotFoundError("Club not found"));
    }

    await deleteClubService(clubId);

    return noContentResponse();
  } catch (error) {
    return errorResponse(error);
  }
}
