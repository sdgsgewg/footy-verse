import { errorResponse, successResponse } from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deletePlayerClubCareerService,
  getPlayerClubCareerDetailService,
  updatePlayerClubCareerService,
} from "@/lib/services/player-club-careers.service";

import { NextResponse } from "next/server";

type PlayerClubCareerRouteContext = {
  params: Promise<{ playerId: string; careerId: string }>;
};

export async function GET(
  _request: Request,
  context: PlayerClubCareerRouteContext,
) {
  try {
    const { careerId } = await context.params;
    const data = await getPlayerClubCareerDetailService(careerId);

    if (!data) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: Request,
  context: PlayerClubCareerRouteContext,
) {
  try {
    await authorizeManageContent();

    const { playerId, careerId } = await context.params;

    const currentPlayerClubCareer =
      await getPlayerClubCareerDetailService(careerId);

    if (!currentPlayerClubCareer) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    const body = await request.json();
    const data = await updatePlayerClubCareerService(careerId, playerId, body);

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function DELETE(
  _request: Request,
  context: PlayerClubCareerRouteContext,
) {
  try {
    await authorizeManageContent();

    const { careerId } = await context.params;

    const playerClubCareer = await getPlayerClubCareerDetailService(careerId);

    if (!playerClubCareer) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    await deletePlayerClubCareerService(careerId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
