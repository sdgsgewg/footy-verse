import {
  deleteClubService,
  getClubByIdService,
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

type ClubRouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: ClubRouteContext) {
  try {
    const { id } = await context.params;

    const data = await getClubByIdService(id);

    if (!data) {
      return errorResponse(new Error("Club not found"), 404);
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: ClubRouteContext) {
  try {
    const { id } = await context.params;

    if (!isFormDataRequest(request)) {
      const body = await request.json();

      const data = await updateClubService(id, body);

      return successResponse(data);
    }

    const currentClub = await getClubByIdService(id);

    if (!currentClub) {
      return errorResponse(new Error("Club not found"), 404);
    }

    const formData = await request.formData();
    const name = String(formData.get("name") ?? "");
    const file = formData.get("image");

    let image = currentClub.image;

    if (file instanceof File && file.size > 0) {
      image = await uploadImage(file, name, STORAGE_BUCKETS.CLUBS);
    }

    try {
      const data = await updateClubService(id, {
        name,
        image,
      });

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
    const { id } = await context.params;

    await deleteClubService(id);

    // return successResponse(null);
    return noContentResponse();
  } catch (error) {
    return errorResponse(error);
  }
}
