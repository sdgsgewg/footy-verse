import {
  errorResponse,
  noContentResponse,
  successResponse,
} from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import { getPlayerInputFromFormData } from "@/lib/players/form-data";
import {
  deletePlayerService,
  getPlayerDetailService,
  updatePlayerService,
} from "@/lib/services/players.service";

type PlayerRouteContext = {
  params: Promise<{ playerId: string }>;
};

export async function GET(_request: Request, context: PlayerRouteContext) {
  try {
    const { playerId } = await context.params;
    const data = await getPlayerDetailService(playerId);

    if (!data) {
      return errorResponse(new NotFoundError("Player not found"));
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: PlayerRouteContext) {
  try {
    await authorizeManageContent();

    const { playerId } = await context.params;

    const formData = await request.formData();

    const data = await updatePlayerService(
      playerId,
      getPlayerInputFromFormData(formData),
      formData,
    );

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: PlayerRouteContext) {
  try {
    await authorizeManageContent();

    const { playerId } = await context.params;

    await deletePlayerService(playerId);

    return noContentResponse();
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
