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
  params: Promise<{ playerId: string; playerClubCareerId: string }>;
};

export async function GET(
  _request: Request,
  context: PlayerClubCareerRouteContext,
) {
  try {
    const { playerClubCareerId } = await context.params;
    const data = await getPlayerClubCareerDetailService(playerClubCareerId);

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

    const { playerId, playerClubCareerId } = await context.params;

    const currentPlayerClubCareer =
      await getPlayerClubCareerDetailService(playerClubCareerId);

    if (!currentPlayerClubCareer) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    const body = await request.json();
    const data = await updatePlayerClubCareerService(
      playerClubCareerId,
      playerId,
      body,
    );

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

    const { playerClubCareerId } = await context.params;

    const playerClubCareer =
      await getPlayerClubCareerDetailService(playerClubCareerId);

    if (!playerClubCareer) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    await deletePlayerClubCareerService(playerClubCareerId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
