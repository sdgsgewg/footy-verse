import { getCrudQuery } from "@/lib/api/query";
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
import { validateImageFile } from "@/lib/validations/image.schema";
import { PlayerFilter } from "@/types/player";

export async function GET(request: Request) {
  try {
    const query = getCrudQuery<PlayerFilter>(request, [
      "positionId",
      "clubTeamId",
      "nationId",
    ]);

    const data = await getPlayersService(query);

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await authorizeManageContent();

    const formData = await request.formData();

    const body = getPlayerInputFromFormData(formData);

    const file = validateImageFile(formData.get("image"));

    let image: string | null = null;

    if (file) {
      image = await uploadImage(file, body.short_name, STORAGE_BUCKETS.CLUBS);
    }

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
