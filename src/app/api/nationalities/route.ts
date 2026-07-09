import { isFormDataRequest } from "@/lib/api/request";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import {
  createNationalityService,
  getNationalitiesService,
} from "@/lib/services/nationalities.service";
import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      name: searchParams.get("name") || undefined,
      slug: searchParams.get("slug") || undefined,
    };

    const data = await getNationalitiesService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await createNationalityService(body);

      return createdResponse(data);
    }

    const formData = await request.formData();
    const name = String(formData.get("name") ?? "");
    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      return errorResponse(new Error("Nationality image is required"));
    }

    const image = await uploadImage(file, name, STORAGE_BUCKETS.NATIONALITIES);

    try {
      const data = await createNationalityService({ name, image });

      return createdResponse({
        success: true,
        data,
      });
    } catch (error) {
      await tryDeleteImage(image, STORAGE_BUCKETS.NATIONALITIES);

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
