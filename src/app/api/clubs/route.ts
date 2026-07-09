import {
  createClubService,
  getClubsService,
} from "@/lib/services/clubs.service";
import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { isFormDataRequest } from "@/lib/api/request";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      name: searchParams.get("name") || undefined,
      slug: searchParams.get("slug") || undefined,
    };

    const data = await getClubsService(query);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await createClubService(body);

      return createdResponse(data);
    }

    const formData = await request.formData();
    const name = String(formData.get("name") ?? "");
    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      return errorResponse(new Error("Club image is required"));
    }

    const image = await uploadImage(file, name, STORAGE_BUCKETS.CLUBS);

    try {
      const data = await createClubService({
        name,
        image,
      });

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
