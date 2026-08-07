import { isFormDataRequest } from "@/lib/api/request";
import { errorResponse, successResponse } from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import { getPlayerInputFromFormData } from "@/lib/players/form-data";
import {
  deletePlayerService,
  getPlayerDetailService,
  getPlayerEditService,
  updatePlayerService,
} from "@/lib/services/players.service";
import { tryDeleteImage, uploadImage } from "@/lib/services/storage.service";
import { STORAGE_BUCKETS } from "@/lib/storage";
import { NextResponse } from "next/server";

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

    const currentPlayer = await getPlayerEditService(playerId);

    if (!currentPlayer) {
      return errorResponse(new NotFoundError("Player not found"));
    }

    if (!isFormDataRequest(request)) {
      const body = await request.json();
      const data = await updatePlayerService(playerId, body);

      return successResponse(data);
    }

    const formData = await request.formData();

    const body = getPlayerInputFromFormData(formData);

    let image = currentPlayer.image;

    const file = formData.get("image");

    if (file instanceof File && file.size > 0) {
      image = await uploadImage(file, body.name, STORAGE_BUCKETS.PLAYERS);
    }

    body.image = image;

    try {
      const data = await updatePlayerService(playerId, body);

      return successResponse(data);
    } catch (error) {
      if (image && image !== currentPlayer.image) {
        await tryDeleteImage(image, STORAGE_BUCKETS.PLAYERS);
      }

      throw error;
    }
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(_request: Request, context: PlayerRouteContext) {
  try {
    await authorizeManageContent();

    const { playerId } = await context.params;

    const player = await getPlayerEditService(playerId);

    if (!player) {
      return errorResponse(new NotFoundError("Player not found"));
    }

    await deletePlayerService(playerId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
