import { errorResponse, successResponse } from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deletePlayerClubTeamCareerService,
  getPlayerClubTeamCareerDetailService,
  updatePlayerClubTeamCareerService,
} from "@/lib/services/player-club-team-careers.service";

import { NextResponse } from "next/server";

type PlayerClubTeamCareerRouteContext = {
  params: Promise<{ playerId: string; playerClubTeamCareerId: string }>;
};

export async function GET(
  _request: Request,
  context: PlayerClubTeamCareerRouteContext,
) {
  try {
    const { playerClubTeamCareerId } = await context.params;
    const data = await getPlayerClubTeamCareerDetailService(
      playerClubTeamCareerId,
    );

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
  context: PlayerClubTeamCareerRouteContext,
) {
  try {
    await authorizeManageContent();

    const { playerId, playerClubTeamCareerId } = await context.params;

    const currentPlayerClubTeamCareer =
      await getPlayerClubTeamCareerDetailService(playerClubTeamCareerId);

    if (!currentPlayerClubTeamCareer) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    const body = await request.json();
    const data = await updatePlayerClubTeamCareerService(
      playerClubTeamCareerId,
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
  context: PlayerClubTeamCareerRouteContext,
) {
  try {
    await authorizeManageContent();

    const { playerClubTeamCareerId } = await context.params;

    const playerClubTeamCareer = await getPlayerClubTeamCareerDetailService(
      playerClubTeamCareerId,
    );

    if (!playerClubTeamCareer) {
      return errorResponse(new NotFoundError("Player career not found"));
    }

    await deletePlayerClubTeamCareerService(playerClubTeamCareerId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
