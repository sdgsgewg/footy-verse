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

    const data = await createPlayerService(
      getPlayerInputFromFormData(formData),
      formData,
    );

    return createdResponse({
      success: true,
      data,
    });
  } catch (error: unknown) {
    console.error(error);
    return errorResponse(error);
  }
}
