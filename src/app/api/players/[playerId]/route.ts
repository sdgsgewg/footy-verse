import { isFormDataRequest } from "@/lib/api/request";
import { errorResponse, successResponse } from "@/lib/api/response";
import { getPlayerInputFromFormData } from "@/lib/players/form-data";
import {
  deletePlayerService,
  getPlayerByIdService,
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
    const data = await getPlayerByIdService(playerId);

    if (!data) {
      return errorResponse(new Error("Player not found"), 404);
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: PlayerRouteContext) {
  try {
    const { playerId } = await context.params;

    if (!isFormDataRequest(request)) {
      const body = await request.json();

      const data = await updatePlayerService(playerId, body);

      return successResponse(data);
    }

    const currentPlayer = await getPlayerByIdService(playerId);

    if (!currentPlayer) {
      return errorResponse(new Error("Player not found"), 404);
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
    const { playerId } = await context.params;

    await deletePlayerService(playerId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
