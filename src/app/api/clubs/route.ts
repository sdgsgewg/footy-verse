import {
  createClubService,
  getClubsService,
  precheckCreateClubService,
} from "@/lib/services/clubs.service";
import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { getClubInputFromFormData } from "@/lib/clubs/form-data";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getCrudQuery } from "@/lib/api/query";
import { ClubQuery } from "@/types/club";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<ClubQuery>(request, ["nationId"]);

    const data = await getClubsService(query);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const formData = await request.formData();

    const body = await precheckCreateClubService(
      getClubInputFromFormData(formData),
    );

    let image = "";

    const file = formData.get("image");

    if (file instanceof File && file.size > 0) {
      image = await uploadImage(file, body.short_name, STORAGE_BUCKETS.CLUBS);
    }

    body.image = image;

    try {
      const data = await createClubService(body);

      return createdResponse({
        success: true,
        data,
      });
    } catch (error) {
      await tryDeleteImage(image, STORAGE_BUCKETS.CLUBS);

      throw error;
    }
  } catch (error) {
    return errorResponse(error);
  }
}
