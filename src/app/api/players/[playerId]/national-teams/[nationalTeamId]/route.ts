import { errorResponse, successResponse } from "@/lib/api/response";
import { authorizeManageContent } from "@/lib/auth/api-authorization";
import { NotFoundError } from "@/lib/errors/http-error";
import {
  deletePlayerNationalTeamService,
  getPlayerNationalTeamDetailService,
  updatePlayerNationalTeamService,
} from "@/lib/services/player-national-teams.service";
import { NextResponse } from "next/server";

type PlayerNationalTeamRouteContext = {
  params: Promise<{ playerId: string; nationalTeamId: string }>;
};

export async function GET(
  _request: Request,
  context: PlayerNationalTeamRouteContext,
) {
  try {
    const { nationalTeamId } = await context.params;
    const data = await getPlayerNationalTeamDetailService(nationalTeamId);

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
  context: PlayerNationalTeamRouteContext,
) {
  try {
    await authorizeManageContent();

    const { playerId, nationalTeamId } = await context.params;

    const currentPlayerNationalTeam =
      await getPlayerNationalTeamDetailService(nationalTeamId);

    if (!currentPlayerNationalTeam) {
      return errorResponse(new NotFoundError("Player national team not found"));
    }

    const body = await request.json();
    const data = await updatePlayerNationalTeamService(
      nationalTeamId,
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
  context: PlayerNationalTeamRouteContext,
) {
  try {
    await authorizeManageContent();

    const { nationalTeamId } = await context.params;

    const playerNationalTeam =
      await getPlayerNationalTeamDetailService(nationalTeamId);

    if (!playerNationalTeam) {
      return errorResponse(new NotFoundError("Player national team not found"));
    }

    await deletePlayerNationalTeamService(nationalTeamId);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
