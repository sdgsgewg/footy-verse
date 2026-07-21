import { isFormDataRequest } from "@/lib/api/request";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { getPlayerInputFromFormData } from "@/lib/players/form-data";
import {
  createPlayerService,
  getPlayersService,
} from "@/lib/services/players.service";
import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = {
      name: searchParams.get("name") || undefined,
      nationId: searchParams.get("nationId") || undefined,
      clubId: searchParams.get("clubId") || undefined,
    };

    const data = await getPlayersService(query);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await createPlayerService(body);

      return createdResponse(data);
    }

    const formData = await request.formData();

    const body = getPlayerInputFromFormData(formData);

    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      return errorResponse(new Error("Player image is required"));
    }

    const image = await uploadImage(file, body.name, STORAGE_BUCKETS.PLAYERS);

    body.image = image;

    try {
      const data = await createPlayerService(body);

      return createdResponse({
        success: true,
        data,
      });
    } catch (error) {
      await tryDeleteImage(image, STORAGE_BUCKETS.PLAYERS);

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
