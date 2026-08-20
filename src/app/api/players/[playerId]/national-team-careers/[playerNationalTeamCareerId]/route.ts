import { errorResponse, successResponse } from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deletePlayerNationalTeamCareerService,
  getPlayerNationalTeamCareerDetailService,
  updatePlayerNationalTeamCareerService,
} from "@/lib/services/player-national-team-careers.service";
import { NextResponse } from "next/server";

type PlayerNationalTeamCareerRouteContext = {
  params: Promise<{ playerId: string; playerNationalTeamCareerId: string }>;
};

export async function GET(
  _request: Request,
  context: PlayerNationalTeamCareerRouteContext,
) {
  try {
    const { playerNationalTeamCareerId } = await context.params;
    const data = await getPlayerNationalTeamCareerDetailService(
      playerNationalTeamCareerId,
    );

    if (!data) {
      return errorResponse(new NotFoundError("Player national team not found"));
    }

    return successResponse(data);
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function PUT(
  request: Request,
  context: PlayerNationalTeamCareerRouteContext,
) {
  try {
    await authorizeManageContent();

    const { playerId, playerNationalTeamCareerId } = await context.params;

    const currentPlayerNationalTeamCareer =
      await getPlayerNationalTeamCareerDetailService(
        playerNationalTeamCareerId,
      );

    if (!currentPlayerNationalTeamCareer) {
      return errorResponse(
        new NotFoundError("Player national team career not found"),
      );
    }

    const body = await request.json();
    const data = await updatePlayerNationalTeamCareerService(
      playerNationalTeamCareerId,
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
  context: PlayerNationalTeamCareerRouteContext,
) {
  try {
    await authorizeManageContent();

    const { playerNationalTeamCareerId } = await context.params;

    const playerNationalTeamCareer =
      await getPlayerNationalTeamCareerDetailService(
        playerNationalTeamCareerId,
      );

    if (!playerNationalTeamCareer) {
      return errorResponse(new NotFoundError("Player national team not found"));
    }

    await deletePlayerNationalTeamCareerService(playerNationalTeamCareerId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
