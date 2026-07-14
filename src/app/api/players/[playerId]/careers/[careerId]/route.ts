import { errorResponse, successResponse } from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deletePlayerCareerService,
  getPlayerCareerByIdService,
  updatePlayerCareerService,
} from "@/lib/services/player-careers.service";

import { NextResponse } from "next/server";

type PlayerCareerRouteContext = {
  params: Promise<{ playerId: string; careerId: string }>;
};

export async function GET(
  _request: Request,
  context: PlayerCareerRouteContext,
) {
  try {
    const { careerId } = await context.params;
    const data = await getPlayerCareerByIdService(careerId);

    if (!data) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(request: Request, context: PlayerCareerRouteContext) {
  try {
    await authorizeManageContent();

    const { playerId, careerId } = await context.params;

    const currentPlayerCareer = await getPlayerCareerByIdService(careerId);

    if (!currentPlayerCareer) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    const body = await request.json();
    const data = await updatePlayerCareerService(careerId, playerId, body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: PlayerCareerRouteContext,
) {
  try {
    await authorizeManageContent();

    const { careerId } = await context.params;

    const playerCareer = await getPlayerCareerByIdService(careerId);

    if (!playerCareer) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    await deletePlayerCareerService(careerId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
